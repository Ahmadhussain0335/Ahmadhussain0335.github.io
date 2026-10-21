type ChipProps = {
  children: string;
  variant?: "default" | "accent";
};

export function Chip({ children, variant = "default" }: ChipProps) {
  const styles =
    variant === "accent"
      ? "border-accent-line bg-accent-soft text-accent-strong"
      : "border-border bg-card text-muted";
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium transition-colors duration-200 hover:border-accent-line hover:bg-accent-soft hover:text-accent-strong ${styles}`}
    >
      {children}
    </span>
  );
}

export function ChipList({ items, label, variant }: { items: readonly string[]; label: string; variant?: ChipProps["variant"] }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Chip variant={variant}>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}
