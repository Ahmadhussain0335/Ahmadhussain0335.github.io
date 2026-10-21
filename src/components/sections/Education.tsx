import { AwardIcon, GraduationCapIcon } from "lucide-react";
import { certifications, education } from "@/content/education";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education & certifications" tone="surface">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <ul className="space-y-6">
          {education.map((item, i) => (
            <li key={item.degree}>
              <FadeIn index={i}>
                <article className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <GraduationCapIcon aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" />
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.degree}</h3>
                        <p className="mt-1 text-muted">{item.institution}</p>
                        <p className="text-sm text-subtle">{item.location}</p>
                      </div>
                    </div>
                    <div className="pl-9 sm:shrink-0 sm:pl-0 sm:text-right">
                      <p className="whitespace-nowrap font-mono text-xs text-muted">{item.period}</p>
                      {item.grade ? <p className="mt-1 text-sm font-medium text-foreground">{item.grade}</p> : null}
                    </div>
                  </div>
                  <p className="mt-5 pl-9 text-sm leading-relaxed text-muted">
                    <span className="text-subtle">Coursework: </span>
                    {item.focus.join(", ")}
                  </p>
                </article>
              </FadeIn>
            </li>
          ))}
        </ul>

        <FadeIn index={1}>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
              <AwardIcon aria-hidden="true" className="size-5 text-accent" />
              Certifications
            </h3>
            <ul className="mt-5 divide-y divide-border">
              {certifications.map((cert) => (
                <li key={cert.name} className="flex items-baseline justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-medium text-foreground">{cert.name}</p>
                    <p className="text-sm text-subtle">{cert.issuer}</p>
                  </div>
                  <span className="font-mono text-xs text-muted">{cert.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
