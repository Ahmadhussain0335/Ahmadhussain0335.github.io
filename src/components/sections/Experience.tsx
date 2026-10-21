import Link from "next/link";
import { experience, experienceAnchor } from "@/content/experience";
import { getProject } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { ChipList } from "@/components/ui/Chip";
import { CollapsibleList } from "@/components/ui/CollapsibleList";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Professional experience"
      intro="From junior Android developer in 2017 to mobile team lead and senior engineer, building Android, Flutter and connected-device software for automotive, IoT, healthcare and e-commerce companies."
      tone="surface"
    >
      <ol className="relative space-y-6 before:absolute before:bottom-4 before:left-[7px] before:top-4 before:w-px before:bg-border sm:space-y-8">
        <span
          aria-hidden="true"
          className="timeline-progress absolute bottom-4 left-[7px] top-4 w-px origin-top bg-gradient-to-b from-accent via-blue-400 to-sky-300"
        />
        {experience.map((job, index) => {
          const relatedProjects = (job.projectSlugs ?? []).map(getProject).filter((p) => p !== undefined);
          return (
            <li key={job.company} id={experienceAnchor(job.company)} className="relative scroll-mt-24 pl-8 sm:pl-10">
              <span aria-hidden="true" className="absolute left-0 top-8 flex size-[15px] items-center justify-center">
                {index === 0 ? <span className="animate-pulse-ring absolute inset-0 rounded-full bg-accent/40" /> : null}
                <span className="relative size-[15px] rounded-full border-[3px] border-surface bg-accent ring-1 ring-accent-line" />
              </span>
              <FadeIn>
                <article className="rounded-2xl border border-border bg-card p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-strong hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.3)] sm:p-8">
                  <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="flex flex-wrap items-center gap-2 text-xl font-semibold tracking-tight text-foreground">
                        {job.company}
                        {job.roles.some((role) => role.period.includes("Present")) ? (
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-800">Current</span>
                        ) : null}
                      </h3>
                      <p className="mt-1 text-sm text-subtle">
                        {job.location} · {job.domain}
                      </p>
                    </div>
                    <ul className="space-y-1 sm:shrink-0 sm:text-right">
                      {job.roles.map((role) => (
                        <li key={role.title}>
                          <p className="font-medium text-foreground">{role.title}</p>
                          <p className="whitespace-nowrap font-mono text-xs text-muted">{role.period}</p>
                        </li>
                      ))}
                    </ul>
                  </header>

                  <CollapsibleList
                    items={job.highlights}
                    className="mt-6 space-y-3 text-[15px] leading-relaxed text-muted"
                    itemClassName="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-strong"
                  />

                  <div className="mt-6">
                    <ChipList items={job.tech} label={`Technologies at ${job.company}`} />
                  </div>

                  {relatedProjects.length > 0 ? (
                    <p className="mt-6 border-t border-border pt-5 text-sm text-subtle">
                      Projects:{" "}
                      {relatedProjects.map((p, i) => (
                        <span key={p.slug}>
                          <Link href={`/projects/${p.slug}`} className="font-medium text-accent underline-offset-4 hover:underline max-sm:inline-flex max-sm:min-h-11 max-sm:items-center">
                            {p.name}
                          </Link>
                          {i < relatedProjects.length - 1 ? ", " : null}
                        </span>
                      ))}
                    </p>
                  ) : null}
                </article>
              </FadeIn>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
