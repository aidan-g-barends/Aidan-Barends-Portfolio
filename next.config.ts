import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: lets a phone on the same Wi-Fi load the dev server's
  // JavaScript at http://192.168.x.x:3000. Without this, Next blocks it and
  // only the server-rendered HTML/CSS works (no interactivity).
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
