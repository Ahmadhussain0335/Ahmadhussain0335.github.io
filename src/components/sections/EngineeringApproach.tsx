import { BluetoothIcon, FlaskConicalIcon, GaugeIcon, LayersIcon, RocketIcon, ShieldCheckIcon } from "lucide-react";
import { engineeringPrinciples } from "@/content/engineering";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";

const icons = [LayersIcon, FlaskConicalIcon, BluetoothIcon, ShieldCheckIcon, RocketIcon, GaugeIcon];

export function EngineeringApproach() {
  return (
    <Section id="engineering" eyebrow="Approach" title="How I build">
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {engineeringPrinciples.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={item.label} className="group bg-card p-6 transition-colors duration-300 hover:bg-accent-soft/40 sm:p-8">
              <FadeIn index={i % 3}>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-accent-line bg-accent-soft text-accent transition-[transform,background-color,color] duration-300 group-hover:-translate-y-0.5 group-hover:bg-accent group-hover:text-on-accent">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{item.label}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.detail}</p>
              </FadeIn>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
