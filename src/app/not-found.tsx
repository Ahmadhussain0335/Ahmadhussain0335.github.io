import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-4 py-32 sm:px-6 lg:px-8">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Page not found</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">The page you are looking for does not exist or has moved.</p>
      <ButtonLink href="/" className="mt-8">
        Back to home
      </ButtonLink>
    </section>
  );
}
