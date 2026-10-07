// Captures a multi-page "tour" of apps that need a login, for the hover
// previews on project cards. It signs in, visits each page, and stitches the
// screenshots into one tall image with a label bar above each page.
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
// Uses the Chrome already installed on this machine, so there is no browser
// download. Writes public/projects/previews/<slug>-tour.webp and records its
// size in src/data/tours.json, which projects.ts reads.

import { chromium } from "playwright-core";
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

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
  },
];

// Capture size, then the stitched image is scaled down to the preview width
const VIEWPORT = { width: 1440, height: 900 };
const OUTPUT_WIDTH = 960;
// Long pages are cut off so one page doesn't take over the tour
const MAX_PAGE_HEIGHT = 1800;
const MAX_DISCOVERED_PAGES = 6;
const LABEL_HEIGHT = 64;
// Time for data to load and entrance animations to finish
const SETTLE_MS = 2000;

function labelFromPath(path) {
  const last = path.split("/").filter(Boolean).pop() ?? "Home";

  return last
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function escapeXml(text) {
  return text.replace(/[<>&"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

// Dark bar with "02 / 07   Patients", matching the portfolio's colours
function labelBar(index, total, label) {
  const count = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return Buffer.from(`
    <svg width="${VIEWPORT.width}" height="${LABEL_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#0B0F14"/>
      <rect y="${LABEL_HEIGHT - 2}" width="100%" height="2" fill="#232C38"/>
      <text x="40" y="${LABEL_HEIGHT / 2 + 8}" font-family="Consolas, Menlo, monospace" font-size="22" fill="#3DDBD9" letter-spacing="3">${count}</text>
      <text x="170" y="${LABEL_HEIGHT / 2 + 9}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="#E7ECF2">${escapeXml(label)}</text>
    </svg>`);
}

async function settle(page) {
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(SETTLE_MS);
}

// Scroll down the page so lazy-loaded images load, then back to the top
async function loadLazyContent(page) {
  await page.evaluate(async (maxHeight) => {
    for (let y = 0; y < Math.min(document.body.scrollHeight, maxHeight); y += 500) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    window.scrollTo(0, 0);
  }, MAX_PAGE_HEIGHT);
  await page.waitForTimeout(1500);
}

async function screenshot(page) {
  await loadLazyContent(page);

  const buffer = await page.screenshot({ fullPage: true });
  const { height } = await sharp(buffer).metadata();

  if (height <= MAX_PAGE_HEIGHT) return { buffer, height };

  return {
    buffer: await sharp(buffer)
      .extract({ left: 0, top: 0, width: VIEWPORT.width, height: MAX_PAGE_HEIGHT })
      .toBuffer(),
    height: MAX_PAGE_HEIGHT,
  };
}

async function logIn(page, tour) {
  const email = process.env[`${tour.env}_EMAIL`];
  const password = process.env[`${tour.env}_PASSWORD`];

  if (!email || !password) {
    throw new Error(
      `Add ${tour.env}_EMAIL and ${tour.env}_PASSWORD to .env.local first`
    );
  }

  const loginUrl = tour.origin + tour.loginPath;

  await page.goto(loginUrl);
  await settle(page);

  // The sign-in screen is the first stop of the tour, before anything is typed
  const signIn = await screenshot(page);

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');

  await page
    .waitForURL((url) => url.href !== loginUrl, { timeout: 20000 })
    .catch(() => {
      throw new Error("Login didn't redirect; check the email and password");
    });

  return signIn;
}

async function discoverPages(page, tour) {
  await page.goto(tour.origin + tour.discoverFrom);
  await settle(page);

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

async function captureTour(browser, tour) {
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  const shots = [{ label: "Sign in", ...(await logIn(page, tour)) }];
  const paths = tour.pages ?? (await discoverPages(page, tour));

  for (const path of paths) {
    await page.goto(tour.origin + path);
    await settle(page);

    // A bounce back to the login page means this account can't open it
    if (new URL(page.url()).pathname === tour.loginPath) {
      console.warn(`  skipped ${path} (redirected to login)`);
      continue;
    }

    shots.push({ label: labelFromPath(path), ...(await screenshot(page)) });
    console.log(`  captured ${path}`);
  }

  await context.close();

  const layers = [];
  let top = 0;

  shots.forEach((shot, index) => {
    layers.push({ input: labelBar(index, shots.length, shot.label), top, left: 0 });
    top += LABEL_HEIGHT;
    layers.push({ input: shot.buffer, top, left: 0 });
    top += shot.height;
  });

  const stitched = await sharp({
    create: {
      width: VIEWPORT.width,
      height: top,
      channels: 3,
      background: "#0B0F14",
    },
  })
    .composite(layers)
    .png()
    .toBuffer();

  const src = `/projects/previews/${tour.slug}-tour.webp`;
  const info = await sharp(stitched)
    .resize({ width: OUTPUT_WIDTH })
    .webp({ quality: 78 })
    .toFile(`public${src}`);

  return { src, height: info.height, pages: shots.length };
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
      manifest[tour.slug] = await captureTour(browser, tour);
      console.log(`  saved ${manifest[tour.slug].pages} pages to public${manifest[tour.slug].src}`);
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
