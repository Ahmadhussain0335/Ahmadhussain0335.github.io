import type { CSSProperties } from "react";

const technologies = [
  "Kotlin",
  "Jetpack Compose",
  "Flutter",
  "Dart",
  "Swift",
  "SwiftUI",
  "Bluetooth Low Energy",
  "CAN J1939",
  "OBD-II",
  "nRF Mesh",
  "MQTT",
  "Clean Architecture",
  "MVVM",
  "Coroutines & Flow",
  "Room",
  "Hilt",
  "AWS Cognito",
  "Firebase",
  "Fastlane",
  "GitHub Actions",
];

export function TechMarquee() {
  return (
    <div className="marquee relative overflow-hidden border-y border-border bg-card py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-card to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-card to-transparent sm:w-32" />
      <div className="animate-marquee flex w-max" style={{ "--duration": "45s" } as CSSProperties}>
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-label={copy === 0 ? "Technologies I work with" : undefined}
            aria-hidden={copy === 1 ? true : undefined}
            className="flex shrink-0 items-center"
          >
            {technologies.map((tech) => (
              <li key={tech} className="flex items-center gap-8 pr-8 font-mono text-sm text-subtle">
                <span className="whitespace-nowrap transition-colors hover:text-accent">{tech}</span>
                <span aria-hidden="true" className="size-1 rounded-full bg-strong" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
