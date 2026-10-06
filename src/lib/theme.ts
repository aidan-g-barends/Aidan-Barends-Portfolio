export const THEME_EVENT = "themechange";

// Flip between light and dark, remember the choice, and let listeners
// (ThemeToggle, CommandPalette) know.
export function toggleTheme() {
  const nextIsDark = !document.documentElement.classList.contains("dark");

  document.documentElement.classList.toggle("dark", nextIsDark);
  localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  window.dispatchEvent(new Event(THEME_EVENT));
}
