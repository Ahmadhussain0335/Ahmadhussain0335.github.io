import { ArrowUpRightIcon, QuoteIcon, StarIcon } from "lucide-react";
import { allReviews, featuredReview, reviews, reviewsSource } from "@/content/reviews";
import type { ClientReview } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { Slider } from "@/components/ui/Slider";

const avatarTones = [
  "bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-900",
  "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900",
  "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-900",
  "bg-violet-50 text-violet-700 ring-violet-100 dark:bg-violet-950 dark:text-violet-300 dark:ring-violet-900",
  "bg-rose-50 text-rose-700 ring-rose-100 dark:bg-rose-950 dark:text-rose-300 dark:ring-rose-900",
  "bg-sky-50 text-sky-700 ring-sky-100 dark:bg-sky-950 dark:text-sky-300 dark:ring-sky-900",
];

function avatarTone(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return avatarTones[hash % avatarTones.length];
}

function Stars({ rating, className = "size-4" }: { rating: number; className?: string }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          aria-hidden="true"
          className={`${className} ${i < rating ? "fill-amber-400 text-amber-400" : "fill-strong text-strong"}`}
        />
      ))}
    </span>
  );
}

function Reviewer({ review }: { review: ClientReview }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`grid size-10 shrink-0 place-items-center rounded-full font-semibold uppercase ring-1 ${avatarTone(review.author)}`}
      >
        {review.author.charAt(0)}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-medium text-foreground">{review.author}</span>
        <span className="block text-sm text-subtle">
          {review.country} · {review.year}
        </span>
      </span>
    </div>
  );
}

const countries = new Set(allReviews.map((review) => review.country)).size;
const average = (allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length).toFixed(1);

export function Reviews() {
  return (
    <Section
      id="reviews"
      eyebrow="Client reviews"
      title="What clients say"
      intro={`Verbatim reviews from my freelance clients on ${reviewsSource.name}, from ${countries} countries across Europe, Asia, the Middle East and Latin America.`}
      tone="tint"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <FadeIn className="h-full">
          <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_24px_48px_-32px_rgba(15,23,42,0.35)] sm:p-10">
            <QuoteIcon aria-hidden="true" className="absolute right-6 top-6 size-20 text-accent-soft sm:right-10 sm:top-8 sm:size-28" strokeWidth={1.25} />
            <Stars rating={featuredReview.rating} className="size-5" />
            <blockquote className="relative mt-6 flex-1 text-xl font-medium leading-relaxed tracking-tight text-foreground sm:text-2xl">
              <p>“{featuredReview.quote}”</p>
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <Reviewer review={featuredReview} />
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-strong">Android app development</span>
            </figcaption>
          </figure>
        </FadeIn>

        <FadeIn className="h-full">
          <div className="relative isolate flex h-full flex-col overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#0f172a_0%,#1e3a8a_60%,#1d4ed8_100%)] p-6 text-white sm:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px]"
            />
            <div
              aria-hidden="true"
              className="animate-drift absolute -right-16 -top-20 -z-10 size-64 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.25),transparent_70%)] blur-2xl"
            />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-blue-200">{reviewsSource.name} rating</p>
            <p className="mt-4 flex items-end gap-3">
              <span className="text-6xl font-semibold tracking-tight">{average}</span>
              <span className="pb-2 text-blue-100/80">/ 5</span>
            </p>
            <div className="mt-3">
              <Stars rating={5} className="size-5" />
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-6">
              <div>
                <dt className="text-sm text-blue-100/75">Reviews shown</dt>
                <dd className="mt-1 text-2xl font-semibold">{allReviews.length}</dd>
              </div>
              <div>
                <dt className="text-sm text-blue-100/75">Client countries</dt>
                <dd className="mt-1 text-2xl font-semibold">{countries}</dd>
              </div>
            </dl>
            <p className="mt-6 flex-1 text-sm leading-relaxed text-blue-50/85">
              Repeat clients came back for second and third projects, citing communication, responsiveness and on-time delivery.
            </p>
            <a
              href={reviewsSource.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 text-sm font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-white/10"
            >
              View all reviews on {reviewsSource.name}
              <ArrowUpRightIcon aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </FadeIn>
      </div>

      <FadeIn className="mt-12">
        <h3 className="sr-only">More client reviews</h3>
        <Slider label="Client reviews" slideLabels={reviews.map((review, i) => `${review.author} (${i + 1})`)} variant="compact">
          {reviews.map((review, i) => (
            <figure
              key={`${review.author}-${i}`}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-strong hover:shadow-[0_16px_32px_-20px_rgba(15,23,42,0.3)]"
            >
              <Stars rating={review.rating} />
              <blockquote className="mt-4 flex-1 leading-relaxed text-muted">
                <p>“{review.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <Reviewer review={review} />
              </figcaption>
            </figure>
          ))}
        </Slider>
      </FadeIn>
    </Section>
  );
}
