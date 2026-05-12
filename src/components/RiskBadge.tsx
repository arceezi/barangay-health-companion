export type RiskLevel = "Low" | "Moderate" | "High";

const map: Record<RiskLevel, { color: string; label: string; tl: string }> = {
  Low: { color: "var(--risk-low)", label: "Low", tl: "Mababa" },
  Moderate: { color: "var(--risk-moderate)", label: "Moderate", tl: "Katamtaman" },
  High: { color: "var(--risk-high)", label: "High", tl: "Mataas" },
};

export function RiskBadge({ level, showTl = false }: { level: RiskLevel; showTl?: boolean }) {
  const m = map[level];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{ background: `color-mix(in oklab, ${m.color} 22%, transparent)`, color: m.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.color }} />
      {m.label}{showTl ? ` · ${m.tl}` : ""}
    </span>
  );
}

export function RiskMeter({ level }: { level: RiskLevel }) {
  const pct = level === "Low" ? 28 : level === "Moderate" ? 58 : 85;
  const color = map[level].color;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--border)]">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}