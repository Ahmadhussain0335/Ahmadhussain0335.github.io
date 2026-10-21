"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDownIcon } from "lucide-react";

type MobileDetailsProps = {
  /** Appended for screen readers, so each button's name says what it expands, e.g. "Show details for ble_keeper". */
  label: string;
  children: ReactNode;
};

/**
 * Collapses secondary content on phones behind a toggle; tablets and up always
 * show it. The content stays in the HTML (CSS-hidden), like CollapsibleList.
 */
export function MobileDetails({ label, children }: MobileDetailsProps) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();

  return (
    <>
      <div id={id} className={expanded ? "" : "max-sm:hidden"}>
        {children}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={id}
        className="mt-4 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-accent sm:hidden"
      >
        {expanded ? "Hide details" : "Show details"}
        <span className="sr-only"> for {label}</span>
        <ChevronDownIcon aria-hidden="true" className={`size-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>
    </>
  );
}
