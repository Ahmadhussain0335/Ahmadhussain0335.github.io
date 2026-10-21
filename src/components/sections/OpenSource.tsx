import Image from "next/image";
import { ArrowUpRightIcon, CheckIcon, PackageIcon } from "lucide-react";
import { packages, repos } from "@/content/open-source";
import type { OpenSourcePackage } from "@/content/types";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { ChipList } from "@/components/ui/Chip";
import { CopyCommand } from "@/components/ui/CopyCommand";
import { MobileDetails } from "@/components/ui/MobileDetails";
import { GitHubIcon } from "@/components/ui/BrandIcons";

function packageLinks(pkg: OpenSourcePackage) {
  return [
    pkg.links.npm && { label: "npm", href: pkg.links.npm, icon: PackageIcon },
    pkg.links.pubDev && {
      label: "pub.dev",
      href: pkg.links.pubDev,
      icon: PackageIcon,
    },
    { label: "GitHub", href: pkg.links.github, icon: GitHubIcon },
  ].filter(Boolean) as {
    label: string;
    href: string;
    icon: typeof PackageIcon;
  }[];
}

/** `wide` spans both grid columns and splits highlights and install commands into two columns. */
function PackageCard({ pkg, wide = false }: { pkg: OpenSourcePackage; wide?: boolean }) {
  const shots = pkg.screenshots ?? [];
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-[border-color,box-shadow] duration-300 hover:border-strong hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.35)] sm:p-8">
      <div className={shots.length ? "grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_auto]" : ""}>
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-subtle">
            <span>{pkg.kind}</span>
            {pkg.license ? (
              <>
                <span aria-hidden="true">/</span>
                <span>{pkg.license}</span>
              </>
            ) : null}
            {pkg.status ? (
              <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 font-sans font-medium text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
                {pkg.status}
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 font-mono text-2xl font-semibold tracking-tight text-foreground">{pkg.name}</h3>
          <p className="mt-4 leading-relaxed text-muted">{pkg.summary}</p>

          <MobileDetails label={pkg.name}>
            <ul className={`mt-6 grid gap-3 text-sm leading-relaxed text-muted ${wide ? "lg:grid-cols-2 lg:gap-x-10" : ""}`}>
              {pkg.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {pkg.install?.length ? (
              <div className="mt-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-subtle">Install</p>
                <div className={`grid gap-2 ${wide ? "lg:grid-cols-2" : ""}`}>
                  {pkg.install.map((command) => (
                    <CopyCommand key={command} command={command} />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6">
              <ChipList items={pkg.tech} label={`${pkg.name} technologies`} />
            </div>
          </MobileDetails>

          <ul className="mt-auto flex flex-wrap gap-2 pt-6 sm:pt-8" aria-label={`${pkg.name} links`}>
            {packageLinks(pkg).map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${pkg.name} on ${label}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-3.5 text-sm font-medium text-foreground transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-strong hover:text-accent sm:min-h-10"
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {label}
                  <ArrowUpRightIcon aria-hidden="true" className="size-3.5 text-subtle max-sm:hidden" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {shots.length ? (
          <ul className="flex gap-4 justify-self-center" aria-label={`${pkg.name} screenshots`}>
            {shots.map((shot) => (
              <li key={shot.src}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 640px) 200px, 40vw"
                  className="h-auto w-[40vw] max-w-[200px] rounded-2xl border border-border shadow-[0_16px_32px_-24px_rgba(15,23,42,0.45)]"
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

export function OpenSource() {
  const cards = packages.filter((pkg) => !pkg.screenshots?.length);
  const showcases = packages.filter((pkg) => pkg.screenshots?.length);
  return (
    <Section
      id="open-source"
      eyebrow="Open source"
      title="Packages & open source"
      tone="surface"
      intro="Tools I publish for other mobile developers on pub.dev and npm: Flutter plugins for BLE and CAN bus, privacy and security packages, an analytics code generator and Agent Skills, plus an accessibility app."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {cards.map((pkg, i) => {
          // An unpaired last card spans the row instead of leaving a gap.
          const wide = i === cards.length - 1 && cards.length % 2 === 1;
          return (
            <FadeIn key={pkg.name} index={i % 2} className={`h-full ${wide ? "lg:col-span-2" : ""}`}>
              <PackageCard pkg={pkg} wide={wide} />
            </FadeIn>
          );
        })}
      </div>
      {showcases.map((pkg) => (
        <FadeIn key={pkg.name} className="mt-6">
          <PackageCard pkg={pkg} />
        </FadeIn>
      ))}

      <div className="mt-16">
        <FadeIn className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">More on GitHub</h3>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
          >
            <GitHubIcon className="size-4" />
            All repositories
            <ArrowUpRightIcon aria-hidden="true" className="size-4" />
          </a>
        </FadeIn>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <li key={repo.name} className="h-full">
              <FadeIn index={i} className="h-full">
                <a
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-strong"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="break-all font-mono text-sm font-semibold text-foreground group-hover:text-accent">{repo.name}</span>
                    <ArrowUpRightIcon aria-hidden="true" className="size-4 shrink-0 text-subtle group-hover:text-accent" />
                  </span>
                  <span className="mt-3 flex-1 text-sm leading-relaxed text-muted">{repo.description}</span>
                  {repo.language ? <span className="mt-4 font-mono text-xs text-subtle">{repo.language}</span> : null}
                </a>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
