import Link from "next/link";
import { MailIcon } from "lucide-react";
import { navItems, site } from "@/content/site";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

const socials = [
  { label: "LinkedIn profile", href: site.linkedin, icon: LinkedInIcon, external: true },
  { label: "GitHub profile", href: site.github, icon: GitHubIcon, external: true },
  { label: "Send email", href: `mailto:${site.email}`, icon: MailIcon, external: false },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_auto] md:items-start lg:px-8">
        <div>
          <Link href="/#top" className="inline-flex min-h-11 items-center gap-2.5 font-semibold tracking-tight text-foreground">
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg bg-foreground font-mono text-xs font-semibold text-background">
              AH
            </span>
            {site.name}
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {site.title}. Android, Flutter and iOS applications for connected devices, built for production.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-muted sm:min-h-8 transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-1">
          {socials.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-muted transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent-line hover:text-accent"
              >
                <Icon className="size-[18px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-subtle sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
