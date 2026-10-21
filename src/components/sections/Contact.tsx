import { MailIcon } from "lucide-react";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "@/components/ContactForm";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: MailIcon, external: false },
  { label: "LinkedIn", value: "in/ahmad-hussain-b3268a15a", href: site.linkedin, icon: LinkedInIcon, external: true },
  { label: "GitHub", value: "Ahmadhussain0335", href: site.github, icon: GitHubIcon, external: true },
];

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk"
      intro="I'm open to remote senior Android and mobile engineering roles with international teams. Send a message here, or reach me directly by email or LinkedIn."
      tone="surface"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] [&>*]:min-w-0">
        <FadeIn className="h-full">
          <div className="relative isolate h-full overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#0f172a_0%,#1e3a8a_60%,#1d4ed8_100%)] p-6 text-white sm:p-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px]"
            />
            <div
              aria-hidden="true"
              className="animate-drift absolute -right-20 -top-24 -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.45),transparent_70%)] blur-2xl"
            />
            <h3 className="text-xl font-semibold tracking-tight">{site.name}</h3>
            <p className="mt-1 text-blue-100/80">
              {site.title} · {site.location}
            </p>
            <p className="mt-6 leading-relaxed text-blue-50/90">
              Senior mobile engineering across Android, Flutter and connected-device products, from BLE and CAN integration to store release.
            </p>
            <ul className="mt-8 space-y-2">
              {channels.map(({ label, value, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-h-14 items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm transition-[background-color,border-color,transform] duration-300 hover:translate-x-1 hover:border-white/25 hover:bg-white/10"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/10 text-white">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-blue-100/70">{label}</span>
                      <span className="block break-all font-medium text-white sm:truncate sm:break-normal">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
        <FadeIn className="relative">
          <ContactForm />
        </FadeIn>
      </div>
    </Section>
  );
}
