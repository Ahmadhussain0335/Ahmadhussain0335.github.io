"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

type CollapsibleListProps = {
  items: string[];
  /** Items shown on phones before "Show more"; tablets and up always show everything. */
  visible?: number;
  className?: string;
  itemClassName?: string;
};

/**
 * Long lists collapse on small screens only. Hidden items stay in the HTML
 * (CSS-hidden), so search engines and the desktop layout see the full list.
 */
export function CollapsibleList({ items, visible = 3, className = "", itemClassName = "" }: CollapsibleListProps) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const hiddenCount = Math.max(0, items.length - visible);

  return (
    <>
      <ul id={id} className={className}>
        {items.map((item, i) => (
          <li key={item} className={`${itemClassName} ${!expanded && i >= visible ? "max-sm:hidden" : ""}`}>
            {item}
          </li>
        ))}
      </ul>
      {hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={id}
          className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent sm:hidden"
        >
          {expanded ? "Show less" : `Show ${hiddenCount} more`}
          <ChevronDownIcon aria-hidden="true" className={`size-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </button>
      ) : null}
    </>
  );
}
