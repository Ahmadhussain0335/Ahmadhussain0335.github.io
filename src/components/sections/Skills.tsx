import { exploring, skillGroups } from "@/content/skills";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { ChipList } from "@/components/ui/Chip";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technical skills"
      intro="Android development in Kotlin and Java with Jetpack Compose, cross-platform Flutter, and native iOS in Swift, plus the connectivity, testing and release tooling needed to ship connected-device apps."
      tone="surface"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <li key={group.title}>
            <FadeIn className="h-full" index={i % 3}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent-line hover:shadow-[0_16px_40px_-24px_rgba(30,64,175,0.35)]">
                <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  {group.title}
                </h3>
                <div className="mt-4">
                  <ChipList items={group.skills} label={`${group.title} skills`} />
                </div>
              </div>
            </FadeIn>
          </li>
        ))}
        <li>
          <FadeIn className="h-full" index={skillGroups.length % 3}>
            <div className="h-full rounded-2xl border border-dashed border-strong bg-card p-6">
              <h3 className="text-base font-semibold text-foreground">Exploring</h3>
              <p className="mt-1 text-sm text-subtle">Not yet used in a shipped product.</p>
              <div className="mt-4">
                <ChipList items={exploring} label="Technologies being explored" variant="accent" />
              </div>
            </div>
          </FadeIn>
        </li>
      </ul>
    </Section>
  );
}
