import { SITE_URL } from "./site";

// Hostname for the fake browser bar. Paths on this site (e.g. "/#ask")
// resolve against the portfolio's own domain.
export function getDomain(url: string) {
  try {
    return new URL(url, SITE_URL).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// Other sites open in a new tab; links within this site stay in the same tab
export function linkTarget(url: string) {
  return url.startsWith("/")
    ? {}
    : { target: "_blank", rel: "noopener noreferrer" };
}
