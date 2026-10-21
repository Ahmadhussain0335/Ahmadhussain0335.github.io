import type { CSSProperties, ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Position among siblings; staggers the reveal so items appear one after another. */
  index?: number;
};

/**
 * Scroll-driven reveal in pure CSS (see `.reveal` in globals.css). Content stays
 * fully visible without JS, in browsers without `animation-timeline`, and for
 * users who prefer reduced motion.
 */
export function FadeIn({ children, className = "", index }: FadeInProps) {
  return (
    <div className={`reveal ${className}`} style={index ? ({ "--i": index } as CSSProperties) : undefined}>
      {children}
    </div>
  );
}
