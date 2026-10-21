"use client";

import { useEffect, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint: a saved choice wins, otherwise the system
 * setting. The toggle below reads the attribute this script sets.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})();`;

// The <html data-theme> attribute is the single source of truth.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const getServerSnapshot = (): Theme | null => null;

function savedTheme(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Follow the system setting until the visitor makes an explicit choice.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (event: MediaQueryListEvent) => {
      if (!savedTheme()) document.documentElement.dataset.theme = event.matches ? "dark" : "light";
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  function toggle() {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : isDark}
      title={isDark ? "Switch to day theme" : "Switch to night theme"}
      className={`relative grid size-11 place-items-center sm:size-10 overflow-hidden rounded-lg border border-border text-foreground transition-[color,border-color,background-color] duration-200 hover:border-strong hover:bg-surface ${className}`}
    >
      {/* Both icons render on the server; CSS shows the right one, so there is no hydration mismatch. */}
      <SunIcon
        aria-hidden="true"
        className="absolute size-[18px] rotate-90 scale-0 opacity-0 transition-[transform,opacity] duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
      <MoonIcon
        aria-hidden="true"
        className="absolute size-[18px] rotate-0 scale-100 opacity-100 transition-[transform,opacity] duration-300 dark:-rotate-90 dark:scale-0 dark:opacity-0"
      />
    </button>
  );
}
