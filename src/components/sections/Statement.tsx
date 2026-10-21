import type { CSSProperties } from "react";

const statement =
  "I build mobile software that talks to real hardware, from vehicle gateways and data loggers to smart homes, and ship it to production on Google Play and the App Store.";

const emphasis = new Set(["real", "hardware", "production"]);

/** Dark band whose words light up as it scrolls through the viewport (CSS scroll timeline). */
export function Statement() {
  const words = statement.split(" ");
  const span = 30 / words.length;
  return (
    <section aria-label="Summary" className="relative isolate overflow-clip bg-[#0b1220] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_30%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="animate-drift absolute -left-40 top-1/2 -z-10 size-[32rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.35),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-drift absolute -right-32 -top-20 -z-10 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.25),transparent_70%)] blur-3xl"
        style={{ "--duration": "24s" } as CSSProperties}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-blue-300">What I do</p>
        <p className="statement-text mt-6 text-3xl font-semibold leading-[1.25] tracking-tight text-white sm:text-4xl lg:text-5xl">
          {words.map((word, i) => {
            const clean = word.replace(/[^a-z]/gi, "").toLowerCase();
            return (
              <span key={`${word}-${i}`}>
                <span
                  className={`statement-word ${emphasis.has(clean) ? "underline decoration-blue-400/70 decoration-2 underline-offset-[0.2em]" : ""}`}
                  style={{ "--start": `${22 + i * span}%`, "--end": `${22 + (i + 1) * span}%` } as CSSProperties}
                >
                  {word}
                </span>{" "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
