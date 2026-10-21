import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BluetoothIcon,
  CpuIcon,
  DownloadIcon,
  MailIcon,
  MapPinIcon,
  SmartphoneIcon,
  WifiIcon,
} from "lucide-react";
import { site } from "@/content/site";
import { featuredProjects } from "@/content/projects";
import { ButtonLink } from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { WordRotator } from "@/components/ui/WordRotator";

const socialLinks = [
  { label: "LinkedIn", href: site.linkedin, icon: LinkedInIcon, external: true },
  { label: "GitHub", href: site.github, icon: GitHubIcon, external: true },
  { label: "Email", href: `mailto:${site.email}`, icon: MailIcon, external: false },
];

const rotatingDomains = ["automotive systems", "connected IoT devices", "healthcare platforms", "smart homes"] as const;

const floatingBadges = [
  { label: "BLE / GATT", icon: BluetoothIcon, className: "left-[-8%] top-[30%]", duration: "6s", delay: "0ms" },
  { label: "CAN J1939", icon: CpuIcon, className: "right-[-10%] top-[44%]", duration: "7s", delay: "400ms" },
  { label: "MQTT", icon: WifiIcon, className: "left-[-4%] bottom-[16%]", duration: "6.5s", delay: "900ms" },
  { label: "Kotlin · Flutter", icon: SmartphoneIcon, className: "right-[-6%] bottom-[6%]", duration: "7.5s", delay: "200ms" },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="parallax pointer-events-none absolute inset-0 -z-10"
        style={{ "--parallax": "140px" } as CSSProperties}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_45%,transparent_100%)]" />
        <div
          className="animate-drift absolute -right-[10%] -top-[20%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_65%)] blur-2xl"
          style={{ "--duration": "22s" } as CSSProperties}
        />
        <div
          className="animate-drift absolute -left-[15%] top-[30%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.10),transparent_65%)] blur-2xl"
          style={{ "--duration": "28s" } as CSSProperties}
        />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:px-8 lg:pt-24">
        <div className="hero-recede min-w-0">
          <p
            className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-border bg-card/80 py-1.5 pl-1.5 pr-4 text-xs font-medium text-muted shadow-sm backdrop-blur"
            style={delay(0)}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-background">
              <span aria-hidden="true" className="relative flex size-1.5">
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
                <span className="relative size-1.5 rounded-full bg-emerald-400" />
              </span>
              Now
            </span>
            <span>
              {site.currentRole.title} at <span className="font-semibold text-foreground">{site.currentRole.company}</span>
            </span>
          </p>

          <h1 id="hero-heading" className="mt-7 tracking-tight text-foreground">
            <span className="animate-rise-solid block pb-1 text-5xl font-semibold sm:text-6xl lg:text-7xl" style={delay(80)}>
              <span className="text-gradient">{site.name}</span>
              <span className="sr-only">, </span>
            </span>
            <span className="animate-rise-solid mt-3 block text-2xl font-medium sm:text-3xl" style={delay(160)}>
              {site.title}
              <span className="text-muted">
                <span className="sr-only">, </span>
                <span aria-hidden="true"> · </span>
                {site.specialisation}
              </span>
            </span>
          </h1>
          <p className="animate-rise mt-3 text-lg text-muted sm:text-xl" style={delay(240)}>
            Building production software for <WordRotator words={rotatingDomains} />
          </p>

          <ul className="animate-rise mt-6 flex flex-wrap gap-2" style={delay(320)} aria-label="Focus areas">
            {site.focus.map((item) => (
              <li
                key={item}
                className="rounded-md border border-accent-line bg-accent-soft/70 px-2.5 py-1 font-mono text-xs font-medium text-accent-strong"
              >
                {item}
              </li>
            ))}
          </ul>

          <p className="animate-rise mt-7 max-w-2xl text-lg leading-relaxed text-muted" style={delay(400)}>
            {site.summary}
          </p>

          <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={delay(480)}>
            <ButtonLink href="/#projects" className="group" data-magnetic="">
              View projects
              <ArrowRightIcon aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={site.cvPath} variant="secondary" download className="group" data-magnetic="">
              <DownloadIcon aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              Download CV
            </ButtonLink>
            <ButtonLink href="/#contact" variant="secondary" data-magnetic="">
              Contact me
            </ButtonLink>
          </div>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted" style={delay(560)}>
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon aria-hidden="true" className="size-4" />
              {site.location}
            </span>
            <ul className="flex items-center gap-1" aria-label="Profiles">
              {socialLinks.map(({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex size-11 items-center justify-center rounded-lg text-muted transition-[color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-card hover:text-accent hover:shadow-sm"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Key projects" className="animate-rise mt-5 text-sm text-muted" style={delay(620)}>
            <span className="mr-2 text-subtle">Key projects:</span>
            {featuredProjects.map((project, i) => (
              <span key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-medium text-foreground underline decoration-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent max-sm:inline-flex max-sm:min-h-11 max-sm:items-center"
                >
                  {project.name}
                </Link>
                {i < featuredProjects.length - 1 ? <span aria-hidden="true" className="mx-2 text-strong">·</span> : null}
              </span>
            ))}
          </nav>
        </div>

        <div className="animate-portrait relative isolate order-first w-full max-w-[230px] sm:mx-auto sm:max-w-[320px] lg:order-none lg:mr-0 lg:max-w-[420px]">
          <div className="parallax relative isolate" style={{ "--parallax": "60px" } as CSSProperties}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="animate-spin-slow absolute inset-x-[4%] bottom-[2%] top-[20%] rounded-[2.5rem] bg-[conic-gradient(from_0deg,rgba(59,130,246,0.35),rgba(14,165,233,0.05),rgba(99,102,241,0.3),rgba(14,165,233,0.05),rgba(59,130,246,0.35))] opacity-70 blur-2xl" />
              {[0, 1, 2].map((ring) => (
                <span
                  key={ring}
                  className="animate-signal absolute left-1/2 top-[30%] size-[70%] rounded-full border border-blue-300/60"
                  style={{ "--delay": `${ring * 1.2}s` } as CSSProperties}
                />
              ))}
            </div>
            <div className="relative overflow-hidden rounded-b-[2rem]">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 top-[22%] rounded-[2rem] border border-accent-line bg-[linear-gradient(160deg,var(--accent-soft)_0%,var(--surface)_55%,var(--surface-2)_100%)]"
              >
                <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_15%,rgba(59,130,246,0.18),transparent_60%)]" />
                <div className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-accent-line to-transparent" />
              </div>
              <Image
                src={site.portrait.webSrc}
                alt={site.portrait.alt}
                width={site.portrait.width}
                height={site.portrait.height}
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 320px, 230px"
                loading="eager"
                fetchPriority="high"
                className="relative h-auto w-full drop-shadow-[0_20px_30px_rgba(15,23,42,0.18)]"
              />
            </div>

            <ul aria-label="Core technologies" className="hidden sm:block">
              {floatingBadges.map(({ label, icon: Icon, className, duration, delay: badgeDelay }) => (
                <li
                  key={label}
                  className={`animate-float absolute ${className}`}
                  style={{ "--duration": duration, "--delay": badgeDelay } as CSSProperties}
                >
                  <span className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-[0_10px_30px_-12px_rgba(15,23,42,0.3)]">
                    <span className="grid size-6 place-items-center rounded-md bg-accent-soft text-accent">
                      <Icon aria-hidden="true" className="size-3.5" />
                    </span>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-subtle transition-colors hover:text-accent lg:flex"
      >
        <span className="flex h-9 w-6 justify-center rounded-full border-2 border-strong pt-1.5 transition-colors group-hover:border-accent">
          <span className="animate-scroll-cue size-1.5 rounded-full bg-stronger group-hover:bg-accent" />
        </span>
      </a>
    </section>
  );
}
