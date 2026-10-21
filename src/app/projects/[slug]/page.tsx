import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import type { ExternalLink, Project } from "@/content/types";
import { ChipList } from "@/components/ui/Chip";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectBanner } from "@/components/ui/ProjectVisual";
import { CtaBand } from "@/components/layout/CtaBand";
import { site } from "@/content/site";
import { experienceAnchor } from "@/content/experience";
import { baseOpenGraph, baseTwitter, ogImage } from "@/lib/metadata";
import { JsonLd, projectGraph } from "@/lib/structured-data";
import { AppleIcon, GooglePlayIcon } from "@/components/ui/BrandIcons";
import { linkIcon } from "@/components/ui/LinkIcons";
import { ScreenshotGallery } from "@/components/ui/ScreenshotGallery";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const description = `${project.summary} ${site.name}, ${project.role} at ${project.company}.`;
  const url = `/projects/${project.slug}/`;
  const image = ogImage(project.slug, project.seoTitle);
  return {
    title: project.seoTitle,
    description,
    alternates: { canonical: url },
    openGraph: { ...baseOpenGraph, title: project.seoTitle, description, url, type: "article", images: [image] },
    twitter: { ...baseTwitter, title: project.seoTitle, description, images: [image] },
  };
}

type StoreLink = { label: string; caption: string; href: string; icon: typeof AppleIcon };

function storeLinks(project: Project): StoreLink[] {
  const { appStore, playStore } = project.links;
  return [
    playStore && { label: "Google Play", caption: "Get it on", href: playStore, icon: GooglePlayIcon },
    appStore && { label: "App Store", caption: "Download on the", href: appStore, icon: AppleIcon },
  ].filter((link): link is StoreLink => Boolean(link));
}

function otherLinks(project: Project): ExternalLink[] {
  const { website, other = [] } = project.links;
  const site = website ? [{ label: `Visit ${new URL(website).hostname.replace(/^www\./, "")}`, href: website }] : [];
  return [...site, ...other];
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const stores = storeLinks(project);
  const links = otherLinks(project);

  const facts = [
    { label: "Company", value: project.company },
    project.client ? { label: "Client", value: project.client } : null,
    { label: "Role", value: project.role },
    project.period ? { label: "Period", value: project.period } : null,
    { label: "Industry", value: project.domain },
    { label: "Platforms", value: project.platforms.join(", ") },
    project.distribution.length > 0 ? { label: "Published on", value: project.distribution.join(", ") } : null,
  ].filter((f): f is { label: string; value: string } => f !== null);

  return (
    <article>
      <JsonLd data={projectGraph(project)} />
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
            All projects
          </Link>
          <div className="animate-rise group mt-6 overflow-hidden rounded-3xl">
            <ProjectBanner slug={project.slug} label={project.domain} className="h-40 sm:h-56" />
          </div>
          <p className="animate-rise mt-10 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent" style={{ "--delay": "80ms" } as CSSProperties}>
            {project.tagline}
          </p>
          <h1 className="animate-rise mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl" style={{ "--delay": "140ms" } as CSSProperties}>
            {project.name}
          </h1>
          <p className="animate-rise mt-5 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl" style={{ "--delay": "200ms" } as CSSProperties}>
            {project.summary}
          </p>

          <dl className="animate-rise mt-10 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3" style={{ "--delay": "260ms" } as CSSProperties}>
            {facts.map((fact) => (
              <div key={fact.label} className="min-w-0 rounded-xl border border-border bg-card px-3.5 py-3 sm:px-5 sm:py-4">
                <dt className="text-xs text-subtle">{fact.label}</dt>
                <dd className="mt-1 text-sm font-medium text-foreground sm:text-base">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {stores.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-3" aria-label={`${project.name} in app stores`}>
              {stores.map(({ label, caption, href, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-14 items-center gap-3 rounded-xl bg-foreground px-5 text-background shadow-[0_10px_24px_-12px_rgba(15,23,42,0.6)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:opacity-90"
                  >
                    <Icon className="size-6" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-[11px] text-background/70">{caption}</span>{" "}
                      <span className="text-base font-semibold">{label}</span>
                    </span>
                    <span className="sr-only">{`, ${project.name}`}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          {links.length > 0 ? (
            <ul className={`flex flex-wrap gap-3 ${stores.length > 0 ? "mt-4" : "mt-6"}`} aria-label={`${project.name} links`}>
              {links.map((link) => {
                const Icon = linkIcon(link);
                return (
                  <li key={link.href}>
                    {link.caption ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-14 items-center gap-3 rounded-xl bg-foreground px-5 text-background shadow-[0_10px_24px_-12px_rgba(15,23,42,0.6)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:opacity-90"
                      >
                        <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                        <span className="flex flex-col leading-tight">
                          <span className="text-[11px] text-background/70">{link.caption}</span>{" "}
                          <span className="text-base font-semibold">{link.label}</span>
                        </span>
                        <span className="sr-only">{`, ${project.name}`}</span>
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-strong hover:bg-surface"
                      >
                        {link.label}
                        <ExternalLinkIcon aria-hidden="true" className="size-4 text-subtle" />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </header>

      {project.screenshots && project.screenshots.length > 0 ? (
        <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
          <FadeIn>
            <ScreenshotGallery projectName={project.name} screenshots={project.screenshots} credit={project.screenshotCredit} />
          </FadeIn>
        </div>
      ) : null}

      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16 lg:px-8">
        <div className="space-y-14">
          <FadeIn>
            <section aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="text-2xl font-semibold tracking-tight text-foreground">Overview</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
                {project.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section aria-labelledby="contributions-heading">
              <h2 id="contributions-heading" className="text-2xl font-semibold tracking-tight text-foreground">My contributions</h2>
              <ul className="mt-5 space-y-3.5 leading-relaxed text-muted">
                {project.contributions.map((item) => (
                  <li key={item} className="relative pl-6 before:absolute before:left-0 before:top-[0.65em] before:h-px before:w-3 before:bg-accent">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>
        </div>

        <aside className="space-y-10">
          <FadeIn>
            <section aria-labelledby="engineering-heading" className="rounded-2xl border border-border bg-surface p-6">
              <h2 id="engineering-heading" className="text-lg font-semibold tracking-tight text-foreground">Engineering</h2>
              <dl className="mt-4 space-y-4">
                {project.engineering.map((note) => (
                  <div key={note.label}>
                    <dt className="text-sm font-medium text-foreground">{note.label}</dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-muted">{note.detail}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </FadeIn>

          <FadeIn>
            <section aria-labelledby="tech-heading">
              <h2 id="tech-heading" className="text-lg font-semibold tracking-tight text-foreground">Technology</h2>
              <div className="mt-4">
                <ChipList items={project.tech} label={`${project.name} technologies`} />
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <nav aria-labelledby="related-heading" className="rounded-2xl border border-border p-6">
              <h2 id="related-heading" className="text-lg font-semibold tracking-tight text-foreground">Related</h2>
              <ul className="mt-4 space-y-1 text-sm">
                {[
                  { href: `/#${experienceAnchor(project.company)}`, label: `My role at ${project.company}` },
                  { href: "/#skills", label: "Technical skills" },
                  { href: "/#engineering", label: "Engineering approach" },
                  { href: "/#contact", label: `Contact ${site.name}` },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 -mx-2 text-muted transition-colors hover:bg-surface hover:text-accent"
                    >
                      {link.label}
                      <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </FadeIn>
        </aside>
      </div>

      <nav aria-label="More projects" className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:px-8">
          <Link
            href={`/projects/${previous.slug}`}
            className="group flex min-h-20 flex-col justify-center rounded-xl border border-border p-5 transition-colors hover:border-strong hover:bg-surface"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-subtle">
              <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
              Previous project
            </span>
            <span className="mt-1 font-medium text-foreground group-hover:text-accent">{previous.name}</span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex min-h-20 flex-col justify-center rounded-xl border border-border p-5 text-right transition-colors hover:border-strong hover:bg-surface"
          >
            <span className="inline-flex items-center justify-end gap-1.5 text-xs text-subtle">
              Next project
              <ArrowRightIcon aria-hidden="true" className="size-3.5" />
            </span>
            <span className="mt-1 font-medium text-foreground group-hover:text-accent">{next.name}</span>
          </Link>
        </div>
      </nav>
      <CtaBand />
    </article>
  );
}
