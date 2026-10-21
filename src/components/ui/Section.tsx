import type { ReactNode } from "react";
import { FadeIn } from "./FadeIn";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  tone?: "default" | "surface" | "tint";
};

const toneClasses = {
  default: "",
  surface: "bg-surface",
  tint: "bg-[linear-gradient(180deg,var(--accent-soft)_0%,var(--surface)_60%,var(--background)_100%)]",
};

export function Section({ id, eyebrow, title, intro, children, tone = "default" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`border-t border-border py-16 sm:py-28 ${toneClasses[tone]}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <header className="mb-10 max-w-3xl sm:mb-12">
            <p className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
              <span aria-hidden="true" className="eyebrow-line h-px w-8 bg-accent" />
              {eyebrow}
            </p>
            <h2 id={`${id}-heading`} className="heading-reveal mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            {intro ? <div className="mt-4 text-lg leading-relaxed text-muted">{intro}</div> : null}
          </header>
        </FadeIn>
        {children}
      </div>
    </section>
  );
}
