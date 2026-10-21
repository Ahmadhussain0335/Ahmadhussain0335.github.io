"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

/** A shell command in a code box with a copy-to-clipboard button. */
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the text stays selectable.
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-surface py-1 pl-4 pr-1">
      <code className="min-w-0 flex-1 py-2 [overflow-wrap:anywhere] font-mono text-sm text-foreground">
        <span aria-hidden="true" className="select-none text-subtle">
          ${" "}
        </span>
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `Copied: ${command}` : `Copy command: ${command}`}
        className="grid size-11 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-card hover:text-accent sm:size-10"
      >
        {copied ? <CheckIcon aria-hidden="true" className="size-4 text-accent" /> : <CopyIcon aria-hidden="true" className="size-4" />}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
