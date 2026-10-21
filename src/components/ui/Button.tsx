import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "btn-shine bg-accent text-on-accent shadow-[0_8px_20px_-8px_rgba(30,64,175,0.6)] hover:-translate-y-px hover:bg-accent-strong hover:shadow-[0_12px_28px_-10px_rgba(30,64,175,0.7)]",
  secondary: "border border-border bg-card text-foreground hover:-translate-y-px hover:border-strong hover:shadow-[0_8px_20px_-12px_rgba(15,23,42,0.25)]",
  ghost: "text-foreground hover:bg-surface",
  light: "btn-shine bg-white text-slate-900 hover:-translate-y-px hover:bg-blue-50",
  "outline-light": "border border-white/25 text-white hover:-translate-y-px hover:bg-white/10",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "children">;

export function ButtonLink({ href, variant = "primary", children, external, className = "", ...rest }: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (external || href.startsWith("mailto:") || href.endsWith(".pdf")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export const buttonClasses = (variant: Variant = "primary") => `${base} ${variants[variant]}`;
