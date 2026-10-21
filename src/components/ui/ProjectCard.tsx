import Link from "next/link";
import { ArrowUpRightIcon, GlobeIcon } from "lucide-react";
import type { Project } from "@/content/types";
import { ChipList } from "./Chip";
import { ProjectBanner } from "./ProjectVisual";
import { Spotlight } from "./Spotlight";
import { AppleIcon, GooglePlayIcon } from "./BrandIcons";
import { linkIcon } from "./LinkIcons";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const tech = project.tech.slice(0, compact ? 5 : 6);
  const stores = [
    project.links.playStore && {
      label: "Google Play",
      ariaLabel: `${project.name} on Google Play`,
      href: project.links.playStore,
      icon: GooglePlayIcon,
    },
    project.links.appStore && {
      label: "App Store",
      ariaLabel: `${project.name} on the App Store`,
      href: project.links.appStore,
      icon: AppleIcon,
    },
    project.links.website && {
      label: "Website",
      ariaLabel: `${project.name} website`,
      href: project.links.website,
      icon: GlobeIcon,
    },
    ...(project.links.other ?? [])
      .filter((link) => link.icon)
      .map((link) => ({
        label: link.caption ? `${link.label} · ${link.caption}` : link.label,
        ariaLabel: `${project.name} ${link.label}${link.caption ? `, ${link.caption}` : ""}`,
        href: link.href,
        icon: linkIcon(link),
      })),
  ].filter((store) => Boolean(store)) as { label: string; ariaLabel: string; href: string; icon: typeof AppleIcon }[];
  return (
    <Spotlight
      as="article"
      tilt
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-strong hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.35)]"
    >
      <ProjectBanner
        slug={project.slug}
        label={project.domain}
        screenshot={project.screenshots?.[0]}
        className={compact ? "h-28" : "h-40"}
      />

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-subtle">
          <span>{project.platforms.join(" · ")}</span>
          {project.period ? (
            <>
              <span aria-hidden="true">/</span>
              <span>{project.period}</span>
            </>
          ) : null}
        </div>

        <h3 className={`mt-3 font-semibold tracking-tight text-foreground ${compact ? "text-xl" : "text-2xl"}`}>
          <Link
            href={`/projects/${project.slug}`}
            data-cursor-label="View"
            className="after:absolute after:inset-0 after:z-10 after:rounded-2xl focus-visible:outline-none group-focus-within:underline"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-muted">{project.tagline}</p>

        <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>

        <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-subtle">Company</dt>
            <dd className="font-medium text-foreground">{project.company}</dd>
          </div>
          <div>
            <dt className="text-subtle">Role</dt>
            <dd className="font-medium text-foreground">{project.role}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <ChipList items={tech} label={`${project.name} technologies`} />
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-accent-strong">
            View project
            <ArrowUpRightIcon
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span aria-hidden="true" className="ml-1 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-8" />
          </span>
          {stores.length > 0 ? (
            // z-20 lifts these above the card-wide link overlay so they stay clickable.
            <ul className="relative z-20 flex items-center gap-2" aria-label={`${project.name} links`}>
              {stores.map(({ label, ariaLabel, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ariaLabel}
                    title={label}
                    className="grid size-11 place-items-center rounded-full sm:size-10 border border-border bg-card text-foreground transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-strong hover:text-accent"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </Spotlight>
  );
}
