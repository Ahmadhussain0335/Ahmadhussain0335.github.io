import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";

const facts = [
  { label: "Current role", value: "Senior Software Engineer, MRS Technologies" },
  { label: "Location", value: `${site.location} · ${site.remoteStatement.toLowerCase()}` },
  { label: "Experience", value: "9+ years Android · 5+ years Flutter" },
  { label: "Platforms", value: "Android, Flutter (Android & iOS), native iOS" },
  { label: "Domains", value: "Automotive, IoT, Healthcare, Fintech, E-commerce, Construction tech" },
  { label: "Connectivity", value: "BLE / GATT, CAN Bus (J1939, OBD-II), nRF Mesh, MQTT" },
  { label: "Languages", value: site.languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(", ") },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Production mobile software for connected products">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <FadeIn className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            I&apos;m a senior Android and mobile engineer with more than nine years of Android application development in Kotlin and Java,
            and more than five years of cross-platform development with Flutter and Dart. At MRS Technologies I architect and deliver Android
            and Flutter apps for automotive and industrial IoT hardware: connected devices that the apps discover, pair with and configure
            over Bluetooth Low Energy, with real-time CAN data, MQTT telemetry and over-the-air firmware updates.
          </p>
          <p>
            From 2022 to 2024 I also built a Flutter telemedicine platform remotely for a US-based healthcare company, and earlier I led a
            five-engineer team shipping a three-app food delivery ecosystem in native Android. Across these roles I have owned mobile
            architecture (Clean Architecture, MVVM, Jetpack Compose), automated testing with JUnit and Espresso, CI/CD with Fastlane and
            GitHub Actions, and Google Play and App Store releases. I have also mentored other engineers through code reviews and shared standards.
          </p>
        </FadeIn>

        <FadeIn>
          <dl className="divide-y divide-border rounded-2xl border border-border bg-card">
            {facts.map((fact) => (
              <div key={fact.label} className="grid gap-1 px-5 py-4 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl hover:bg-surface sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="text-sm text-subtle">{fact.label}</dt>
                <dd className="text-sm font-medium text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </Section>
  );
}
