import Image from "next/image";
import {
  BikeIcon,
  CarFrontIcon,
  HeartPulseIcon,
  HouseIcon,
  RouterIcon,
  RulerIcon,
  type LucideIcon,
} from "lucide-react";
import type { Screenshot } from "@/content/types";

type Visual = { icon: LucideIcon; gradient: string; glow: string };

const visuals: Record<string, Visual> = {
  "nx-nexthmi": { icon: CarFrontIcon, gradient: "from-[#0f172a] via-[#1e3a8a] to-[#1d4ed8]", glow: "rgba(96,165,250,0.45)" },
  "connected-logger-gateway": { icon: RouterIcon, gradient: "from-[#0f172a] via-[#134e4a] to-[#0f766e]", glow: "rgba(45,212,191,0.4)" },
  mtronic: { icon: HouseIcon, gradient: "from-[#1e1b4b] via-[#312e81] to-[#4338ca]", glow: "rgba(129,140,248,0.45)" },
  "mia-vitals": { icon: HeartPulseIcon, gradient: "from-[#0c4a6e] via-[#0369a1] to-[#0ea5e9]", glow: "rgba(125,211,252,0.45)" },
  mafell: { icon: RulerIcon, gradient: "from-[#292524] via-[#44403c] to-[#78716c]", glow: "rgba(214,211,209,0.35)" },
  foodrunner: { icon: BikeIcon, gradient: "from-[#431407] via-[#9a3412] to-[#ea580c]", glow: "rgba(253,186,116,0.4)" },
};

const fallback: Visual = visuals["nx-nexthmi"];

export function getProjectVisual(slug: string) {
  return visuals[slug] ?? fallback;
}

type ProjectBannerProps = {
  slug: string;
  label: string;
  className?: string;
  /** When set, a real app screen peeks up from the bottom instead of the domain icon. */
  screenshot?: Screenshot;
};

/** Decorative banner: domain gradient, blueprint grid and either an app screen or the domain icon. */
export function ProjectBanner({ slug, label, className = "", screenshot }: ProjectBannerProps) {
  const { icon: Icon, gradient, glow } = getProjectVisual(slug);
  const landscape = screenshot ? screenshot.width > screenshot.height : false;
  return (
    <div aria-hidden="true" className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:28px_28px] transition-transform duration-700 group-hover:scale-110" />
      <div
        className="absolute -right-10 -top-16 size-64 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-70"
        style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }}
      />
      <div className="absolute bottom-5 left-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">{label}</div>
      {screenshot ? (
        <div
          className={`absolute bottom-0 right-5 overflow-hidden rounded-t-xl border-[3px] border-b-0 border-white/25 bg-slate-900 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:-translate-y-1.5 sm:right-6 ${
            landscape ? "h-[78%] w-[52%] max-w-56" : "h-[86%] w-[30%] max-w-32"
          }`}
        >
          <Image src={screenshot.src} alt="" fill sizes="(min-width: 640px) 224px, 40vw" className="object-cover object-top" />
        </div>
      ) : (
        <div className="absolute right-6 top-1/2 grid size-16 -translate-y-1/2 place-items-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-[60%] group-hover:rotate-3 sm:size-20">
          <Icon className="size-8 sm:size-10" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}
