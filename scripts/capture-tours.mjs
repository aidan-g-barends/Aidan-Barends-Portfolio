// Records a walkthrough video of apps that need a login, for the hover
// previews on project cards. A visible cursor signs in, then clicks through
// the app's own navigation and scrolls each page, the way a visitor would.
//
// Usage:
//   npm run capture:tours                 every tour
//   npm run capture:tours -- golden-way   one tour, by project slug
//
// Logins are read from .env.local (never committed), for example:
//   PRACTICEFLOW_EMAIL=...
//   PRACTICEFLOW_PASSWORD=...
//   GOLDENWAY_EMAIL=...
//   GOLDENWAY_PASSWORD=...
//
// Uses the Chrome already installed on this machine. Frames are captured
// straight from Chrome and encoded with ffmpeg (H.264, plays everywhere).
// Writes public/projects/tours/<slug>.mp4 plus a poster image, and records
// them in src/data/tours.json, which projects.ts reads.

import { chromium } from "playwright-core";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

try {
  process.loadEnvFile(".env.local");
} catch {
  // No .env.local; the variables may already be set in the shell
}

const TOURS = [
  {
    slug: "practiceflow-crm",
    origin: "https://practiceflow-crm-iota.vercel.app",
    env: "PRACTICEFLOW",
    loginPath: "/",
    pages: [
      "/dashboard",
      "/patients",
      "/scheduling",
      "/clinical-workspace",
      "/billing",
      "/staff-management",
    ],
  },
  {
    slug: "golden-way",
    origin: "https://goldenwayapp.vercel.app",
    env: "GOLDENWAY",
    loginPath: "/login",
    // Staff pages depend on the account's role, so read them from the
    // console's own navigation instead of listing them here
    discoverFrom: "/staff",
    // Phone-sized app: a smaller window so it fills more of the video
    viewport: { width: 960, height: 600 },
  },
];

// Same 16:10 shape as the preview frame on the cards
const DEFAULT_VIEWPORT = { width: 1440, height: 900 };
const MAX_DISCOVERED_PAGES = 6;
// Slow backends (cold starts) get this long to replace their loading states
// while warming up; the recorded pass is quicker since they're awake by then
const DATA_TIMEOUT_MS = 30000;
const RECORDING_DATA_TIMEOUT_MS = 8000;
// Moments where nothing changes on screen are trimmed to this in the video
const MAX_STILL_SECONDS = 1.2;
const OUT_DIR = "public/projects/tours";
// Pages render at 1.5x pixel density; Chrome sends frames at window size
const SCALE = 1.5;
const FPS = 30;
// Lower is sharper and bigger; 20-24 suits mostly still app screens
const QUALITY_CRF = 21;

// Cursor and click ripple drawn into the page, since recordings don't show
// the real pointer. Re-added on every page load, at the last known position.
const CURSOR_SCRIPT = `
  addEventListener("DOMContentLoaded", () => {
    const cursor = document.createElement("div");
    cursor.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 2l16 9.5-7 1.6-3.6 6.6z" fill="#0B0F14" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    const saved = JSON.parse(sessionStorage.getItem("tour-cursor") || '{"x":-40,"y":-40}');
    Object.assign(cursor.style, {
      position: "fixed", left: "0", top: "0", zIndex: "2147483647",
      pointerEvents: "none", transform: "translate(" + saved.x + "px," + saved.y + "px)",
      filter: "drop-shadow(0 2px 3px rgba(0,0,0,.35))",
    });
    document.body.appendChild(cursor);

    addEventListener("mousemove", (event) => {
      cursor.style.transform = "translate(" + event.clientX + "px," + event.clientY + "px)";
      sessionStorage.setItem("tour-cursor", JSON.stringify({ x: event.clientX, y: event.clientY }));
    }, true);

    addEventListener("mousedown", (event) => {
      const ripple = document.createElement("div");
      Object.assign(ripple.style, {
        position: "fixed", left: event.clientX - 18 + "px", top: event.clientY - 18 + "px",
        width: "36px", height: "36px", borderRadius: "50%", zIndex: "2147483646",
        pointerEvents: "none", background: "rgba(61,219,217,.45)",
        transition: "transform .45s ease-out, opacity .45s ease-out",
      });
      document.body.appendChild(ripple);
      requestAnimationFrame(() => {
        ripple.style.transform = "scale(1.8)";
        ripple.style.opacity = "0";
      });
      setTimeout(() => ripple.remove(), 500);
    }, true);
  });
`;

let cursorAt = { x: 0, y: 0 };

// Eased mouse movement, so the cursor glides like a real hand
async function glide(page, x, y, duration = 700) {
  const from = cursorAt;
  const steps = Math.max(12, Math.round(duration / 16));

  for (let step = 1; step <= steps; step++) {
    const t = step / steps;
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;

    await page.mouse.move(from.x + (x - from.x) * eased, from.y + (y - from.y) * eased);
    await page.waitForTimeout(16);
  }

  cursorAt = { x, y };
}

async function clickElement(page, locator) {
  const box = await locator.boundingBox();
  if (!box) return false;

  await glide(page, box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(200);
  await page.mouse.down();
  await page.waitForTimeout(80);
  await page.mouse.up();

  return true;
}

async function waitForData(page, timeout = DATA_TIMEOUT_MS) {
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});

  // Wait until spinners, skeletons and "Loading..." text are gone
  await page
    .waitForFunction(
      () =>
        !document.querySelector(".animate-spin, .animate-pulse, [aria-busy='true']") &&
        !/\bloading\b/i.test(document.body.innerText),
      null,
      { timeout, polling: 300 }
    )
    .catch(() =>
      console.warn(`  ${new URL(page.url()).pathname} still loading after ${timeout / 1000}s`)
    );
}

// Scroll down through the content a little and back, like someone skimming
async function skim(page, viewport) {
  await glide(page, viewport.width * 0.6, viewport.height * 0.55, 500);

  for (let tick = 0; tick < 4; tick++) {
    await page.mouse.wheel(0, 220);
    await page.waitForTimeout(260);
  }

  await page.waitForTimeout(500);
  await page.mouse.wheel(0, -2000);
  await page.waitForTimeout(500);
}

function credentials(tour) {
  const email = process.env[`${tour.env}_EMAIL`];
  const password = process.env[`${tour.env}_PASSWORD`];

  if (!email || !password) {
    throw new Error(`Add ${tour.env}_EMAIL and ${tour.env}_PASSWORD to .env.local first`);
  }

  return { email, password };
}

// Signs in without any typing animation (used to warm up the backend)
async function quickLogIn(page, tour) {
  const { email, password } = credentials(tour);
  const loginUrl = tour.origin + tour.loginPath;

  await page.goto(loginUrl);
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  await page
    .waitForURL((url) => url.href !== loginUrl, { timeout: 30000 })
    .catch(() => {
      throw new Error("Login didn't redirect; check the email and password");
    });
}

async function discoverPages(page, tour) {
  if (tour.pages) return tour.pages;

  await page.goto(tour.origin + tour.discoverFrom);
  await waitForData(page);

  const paths = await page.$$eval(
    "a[href]",
    (links, from) =>
      links
        .map((link) => new URL(link.href, location.href))
        .filter((url) => url.origin === location.origin)
        .map((url) => url.pathname)
        .filter((path) => path.startsWith(from) && !/log-?out|sign-?out/i.test(path)),
    tour.discoverFrom
  );

  return [tour.discoverFrom, ...new Set(paths)]
    .filter((path, index, all) => all.indexOf(path) === index)
    .slice(0, MAX_DISCOVERED_PAGES + 1);
}

// First pass, not recorded: wakes up sleeping backends and finds the pages,
// so the video isn't mostly loading spinners
async function warmUp(browser, tour, viewport) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  await quickLogIn(page, tour);
  const paths = await discoverPages(page, tour);

  for (const path of paths) {
    await page.goto(tour.origin + path);
    await waitForData(page);
  }

  await context.close();
  return paths;
}

// Collects Chrome's own screencast frames (sent whenever the screen changes)
// as high-quality JPEGs in a temp folder, with their timestamps
async function startRecorder(page, viewport) {
  const dir = await mkdtemp(join(tmpdir(), "tour-"));
  const cdp = await page.context().newCDPSession(page);
  const frames = [];
  const writes = [];

  cdp.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
    const file = join(dir, `${String(frames.length).padStart(6, "0")}.jpg`);

    frames.push({ file, time: metadata.timestamp });
    writes.push(writeFile(file, Buffer.from(data, "base64")));
    cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  });

  await cdp.send("Page.startScreencast", {
    format: "jpeg",
    quality: 92,
    maxWidth: Math.round(viewport.width * SCALE),
    maxHeight: Math.round(viewport.height * SCALE),
  });

  return {
    async stop(output) {
      await cdp.send("Page.stopScreencast");
      await Promise.all(writes);

      // Each frame stays on screen until the next one arrived
      const entry = (frame) => `file '${frame.file.replaceAll("\\", "/")}'`;
      const lines = frames.flatMap((frame, index) => {
        const next = frames[index + 1]?.time ?? frame.time + 1;
        const hold = Math.min(next - frame.time, MAX_STILL_SECONDS);
        return [entry(frame), `duration ${hold.toFixed(4)}`];
      });

      // ffmpeg's concat format needs the last file listed again to hold it
      const listFile = join(dir, "frames.txt");
      await writeFile(listFile, [...lines, entry(frames.at(-1)), ""].join("\n"));

      await promisify(execFile)(ffmpegPath, [
        "-y", "-loglevel", "error",
        "-f", "concat", "-safe", "0", "-i", listFile,
        "-vf", `fps=${FPS},scale=trunc(iw/2)*2:trunc(ih/2)*2:flags=lanczos`,
        "-c:v", "libx264", "-preset", "slow", "-crf", String(QUALITY_CRF),
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
        output,
      ]);

      await rm(dir, { recursive: true, force: true });
      return frames.reduce(
        (total, frame, index) =>
          total + Math.min((frames[index + 1]?.time ?? frame.time + 1) - frame.time, MAX_STILL_SECONDS),
        0
      );
    },
  };
}

async function recordTour(browser, tour) {
  const viewport = tour.viewport ?? DEFAULT_VIEWPORT;

  console.log("  warming up");
  const paths = await warmUp(browser, tour, viewport);

  const context = await browser.newContext({ viewport, deviceScaleFactor: SCALE });
  await context.addInitScript(CURSOR_SCRIPT);

  const page = await context.newPage();
  const { email, password } = credentials(tour);
  const loginUrl = tour.origin + tour.loginPath;

  cursorAt = { x: viewport.width * 0.5, y: viewport.height * 0.8 };

  await page.goto(loginUrl);
  await waitForData(page);
  await page.mouse.move(cursorAt.x, cursorAt.y);

  // Recording starts once the login page is showing, so there's no blank lead-in
  const recorder = await startRecorder(page, viewport);
  await page.waitForTimeout(600);

  console.log("  signing in");
  const emailField = page.locator('input[type="email"]').first();
  const passwordField = page.locator('input[type="password"]').first();

  await clickElement(page, emailField);
  await emailField.fill("");
  await emailField.pressSequentially(email, { delay: 45 });
  await clickElement(page, passwordField);
  await passwordField.fill("");
  await passwordField.pressSequentially(password, { delay: 45 });
  await page.waitForTimeout(300);
  await clickElement(page, page.locator('button[type="submit"]').first());

  await page.waitForURL((url) => url.href !== loginUrl, { timeout: 30000 });
  await waitForData(page, RECORDING_DATA_TIMEOUT_MS);
  await page.waitForTimeout(1200);

  let poster;

  for (const path of paths) {
    const current = new URL(page.url()).pathname;

    if (current !== path) {
      // Click the app's own link, like a visitor would; jump straight
      // there only if the page has no visible link to it
      const link = page.locator(`a[href="${path}"]:visible`).first();
      const clicked = (await link.count()) > 0 && (await clickElement(page, link));

      if (clicked) {
        await page.waitForURL((url) => url.pathname === path, { timeout: 15000 }).catch(() => {});
      } else {
        await page.goto(tour.origin + path);
      }

      await waitForData(page, RECORDING_DATA_TIMEOUT_MS);
      await page.waitForTimeout(700);
    }

    // A bounce back to the login page means this account can't open it
    if (new URL(page.url()).pathname === tour.loginPath) {
      console.warn(`  skipped ${path} (redirected to login)`);
      continue;
    }

    // The first page after signing in doubles as the poster image
    poster ??= await page.screenshot();

    await skim(page, viewport);
    console.log(`  visited ${path}`);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const src = `/projects/tours/${tour.slug}.mp4`;
  const posterSrc = `/projects/tours/${tour.slug}.webp`;

  console.log("  encoding video");
  const duration = await recorder.stop(`public${src}`);
  await context.close();

  await sharp(poster).resize({ width: 1440 }).webp({ quality: 85 }).toFile(`public${posterSrc}`);

  return {
    video: src,
    poster: posterSrc,
    duration: Math.round(duration),
  };
}

const only = process.argv[2];
const selected = TOURS.filter((tour) => !only || tour.slug === only);

if (selected.length === 0) {
  console.error(`No tour called "${only}". Options: ${TOURS.map((t) => t.slug).join(", ")}`);
  process.exit(1);
}

const manifestPath = "src/data/tours.json";
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const browser = await chromium.launch({ channel: "chrome" });
let failed = false;

try {
  for (const tour of selected) {
    console.log(`${tour.slug}:`);

    try {
      manifest[tour.slug] = await recordTour(browser, tour);
      console.log(`  saved a ${manifest[tour.slug].duration}s walkthrough to public${manifest[tour.slug].video}`);
    } catch (error) {
      failed = true;
      console.error(`  failed: ${error.message}`);
    }
  }
} finally {
  await browser.close();
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
process.exit(failed ? 1 : 0);
