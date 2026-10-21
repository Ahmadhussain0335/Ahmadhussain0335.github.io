import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/ui/FadeIn";

const highlights = [
  { value: 9, suffix: "+", label: "years of Android development", detail: "Kotlin and Java, from consumer apps to automotive gateways" },
  { value: 5, suffix: "+", label: "years of Flutter & Dart", detail: "Cross-platform apps on Google Play and the App Store" },
  { value: 3000, suffix: "+", label: "automated tests authored", detail: "Unit, widget and UI tests across Flutter and native projects" },
  { value: 10000, suffix: "+", label: "active users on Mia Vitals", detail: "Flutter telemedicine platform for a US healthcare company" },
];

export function Highlights() {
  return (
    <section aria-label="Highlights" className="bg-surface py-10 sm:py-16">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 sm:gap-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {highlights.map((item, i) => (
          <li key={item.label}>
            <FadeIn className="h-full" index={i}>
              <div className="group h-full rounded-2xl border border-border bg-card p-4 transition-[border-color,box-shadow,transform] sm:p-6 duration-300 hover:-translate-y-1 hover:border-accent-line hover:shadow-[0_16px_40px_-20px_rgba(30,64,175,0.35)]">
                <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  <CountUp value={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-foreground sm:text-base">{item.label}</p>
                <p className="mt-1 hidden text-sm leading-relaxed text-subtle sm:block">{item.detail}</p>
                <span aria-hidden="true" className="mt-4 block h-0.5 w-10 rounded-full sm:mt-5 bg-accent transition-[width] duration-500 group-hover:w-20" />
              </div>
            </FadeIn>
          </li>
        ))}
      </ul>
    </section>
  );
}
