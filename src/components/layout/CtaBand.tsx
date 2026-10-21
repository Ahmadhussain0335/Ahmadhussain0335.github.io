import { ArrowRightIcon, DownloadIcon } from "lucide-react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="relative isolate overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0b1220_0%,#1e3a8a_55%,#1d4ed8_100%)] px-6 py-12 text-white sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]"
          />
          <div
            aria-hidden="true"
            className="animate-drift absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.5),transparent_70%)] blur-2xl"
          />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="cta-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Interested in work like this?
              </h2>
              <p className="mt-3 text-lg text-blue-100/85">
                I&apos;m happy to talk through the architecture, the device communication or the release setup behind any of these projects.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/#contact" variant="light" className="group" data-magnetic="">
                Get in touch
                <ArrowRightIcon aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href={site.cvPath} variant="outline-light" download data-magnetic="">
                <DownloadIcon aria-hidden="true" className="size-4" />
                Download CV
              </ButtonLink>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
