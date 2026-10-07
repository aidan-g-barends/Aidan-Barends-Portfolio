import type { LucideIcon } from "lucide-react";
import { Briefcase, FolderKanban, House, Mail, User } from "lucide-react";

// Shared by the desktop navbar and the mobile tab bar
export const navLinks: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Mail },
];

// "Projects" stays active on /projects/[slug], but "Home" only on "/"
export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
