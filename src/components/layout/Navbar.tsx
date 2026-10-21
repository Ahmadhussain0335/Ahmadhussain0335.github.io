"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DownloadIcon, MenuIcon, XIcon } from "lucide-react";
import { navItems, site } from "@/content/site";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const sectionIds = navItems.map((item) => item.href.replace("/#", ""));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    if (pathname !== "/") return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.intersectionRatio);
        let best = "top";
        let bestRatio = 0;
        for (const id of sectionIds) {
          const ratio = visible.get(id) ?? 0;
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (bestRatio > 0) setActive(best);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.01, 0.25, 0.5, 0.75, 1] },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pathname]);

  const activeId = pathname === "/" ? active : null;

  // Sliding highlight behind the active desktop link, positioned from the link's box.
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const link = activeId ? list.querySelector<HTMLElement>(`a[href="/#${activeId}"]`) : null;
      // Measured against the list: each <li> is `relative`, so offsetLeft would be 0.
      setPill(link ? { left: link.getBoundingClientRect().left - list.getBoundingClientRect().left, width: link.offsetWidth } : null);
    };
    measure();
    // Re-measure when web fonts swap in or the layout changes width.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [activeId]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-card/90 backdrop-blur-md transition-[border-color,box-shadow] duration-200 ${
        scrolled || open ? "border-border shadow-[0_1px_0_rgba(15,23,42,0.02)]" : "border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/#top" className="flex min-h-11 items-center gap-2.5 text-[15px] font-semibold tracking-tight text-foreground" onClick={() => setOpen(false)}>
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-lg bg-foreground font-mono text-xs font-semibold text-background">
            AH
          </span>
          {site.name}
        </Link>

        <ul ref={listRef} className="relative hidden items-center gap-1 lg:flex">
          <li
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 rounded-md bg-accent-soft transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              pill ? "opacity-100" : "opacity-0"
            }`}
            style={pill ? { left: pill.left, width: pill.width } : undefined}
          />
          {navItems.map((item) => {
            const isActive = activeId === item.href.replace("/#", "");
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors xl:px-3 ${
                    isActive ? "text-accent-strong" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={site.cvPath}
            download
            data-magnetic=""
            className="hidden min-h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:border-strong hover:bg-surface sm:inline-flex"
          >
            <DownloadIcon aria-hidden="true" className="size-4" />
            CV
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XIcon aria-hidden="true" className="size-5" /> : <MenuIcon aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        inert={!open}
        className={`grid bg-card transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "grid-rows-[1fr] border-t border-border opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-foreground transition-colors hover:bg-surface"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-border pt-3 sm:hidden">
              <a
                href={site.cvPath}
                download
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center gap-2 rounded-lg px-3 text-base font-medium text-accent hover:bg-surface"
              >
                <DownloadIcon aria-hidden="true" className="size-4" />
                Download CV
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
