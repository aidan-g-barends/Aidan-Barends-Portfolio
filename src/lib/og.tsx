import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Satori can't read WebP, so screenshots are converted to PNG first
async function toDataUrl(publicPath: string) {
  const file = await readFile(join(process.cwd(), "public", publicPath));
  const png = await sharp(file)
    .resize({ width: 1000, height: 625, fit: "cover", position: "top" })
    .png()
    .toBuffer();

  return `data:image/png;base64,${png.toString("base64")}`;
}

// Branded social preview card shared by every page
export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: string;
}) {
  const screenshot = image ? await toDataUrl(image) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#0B0F14",
          color: "#E7ECF2",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glows */}
        <div
          style={{
            position: "absolute",
            left: -160,
            top: -200,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle closest-side, rgba(61,219,217,0.35) 0%, rgba(61,219,217,0) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -200,
            bottom: -260,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle closest-side, rgba(91,141,239,0.3) 0%, rgba(91,141,239,0) 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: screenshot ? 620 : "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 12,
                background: "linear-gradient(135deg, #3DDBD9, #5B8DEF)",
                color: "#0B0F14",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              AB
            </div>
            <div style={{ fontSize: 26, fontWeight: 600 }}>
              Aidan Barends
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 20,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#3DDBD9",
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: screenshot ? 56 : 72,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -1.5,
              }}
            >
              {title}
            </div>
            <div
              style={{
                marginTop: 22,
                fontSize: 26,
                lineHeight: 1.4,
                color: "#8B97A8",
              }}
            >
              {subtitle}
            </div>
          </div>

          <div style={{ fontSize: 20, color: "#8B97A8" }}>
            aidan-barends.vercel.app
          </div>
        </div>

        {screenshot && (
          <div
            style={{
              position: "absolute",
              right: -60,
              top: 90,
              display: "flex",
              flexDirection: "column",
              width: 560,
              borderRadius: 18,
              overflow: "hidden",
              border: "1px solid #232C38",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
              background: "#131922",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 8,
                padding: "14px 16px",
                borderBottom: "1px solid #232C38",
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#F87171" }} />
              <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#FBBF24" }} />
              <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#34D399" }} />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori needs a plain img */}
            <img
              src={screenshot}
              width={560}
              height={350}
              alt=""
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </div>
        )}
      </div>
    ),
    ogSize
  );
}
