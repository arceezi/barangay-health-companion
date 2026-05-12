import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/Screen";
import { BottomNav } from "@/components/BottomNav";
import { Lock, Info } from "lucide-react";

export const Route = createFileRoute("/map")({ component: MapView });

// Generate a stable abstract barangay grid
const zones = [
  ["L", "L", "M", "M", "L"],
  ["L", "M", "H", "M", "L"],
  ["M", "H", "H", "M", "L"],
  ["L", "M", "M", "L", "L"],
  ["L", "L", "M", "L", "L"],
] as const;

const colorOf = (k: string) =>
  k === "L" ? "var(--risk-low)" : k === "M" ? "var(--risk-moderate)" : "var(--risk-high)";

function MapView() {
  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Community Health Map" back="/home" />

      <div className="px-5">
        <p className="text-sm text-[color:var(--muted-foreground)]">
          Aggregated and anonymized barangay health risk overview.
        </p>

        <div className="mt-4 overflow-hidden rounded-3xl bg-[color:var(--cream)] p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-[color:var(--olive)]">
                Brgy. San Isidro
              </p>
              <p className="text-sm font-semibold text-[color:var(--sage-deep)]">
                Hypertension risk heatmap
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--mint-bg)] px-2.5 py-1 text-[10px] font-medium text-[color:var(--sage-deep)]">
              <Lock size={10} /> Anonymized
            </span>
          </div>

          <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-2xl bg-[color:var(--mint-bg)] p-2">
            {/* faux streets */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 right-0 top-1/3 h-px bg-[color:var(--border)]" />
              <div className="absolute left-0 right-0 top-2/3 h-px bg-[color:var(--border)]" />
              <div className="absolute top-0 bottom-0 left-1/3 w-px bg-[color:var(--border)]" />
              <div className="absolute top-0 bottom-0 left-2/3 w-px bg-[color:var(--border)]" />
            </div>
            <div className="grid h-full grid-cols-5 grid-rows-5 gap-1.5">
              {zones.flat().map((k, i) => (
                <div
                  key={i}
                  className="rounded-md transition-transform hover:scale-105"
                  style={{
                    background: `color-mix(in oklab, ${colorOf(k)} ${
                      k === "L" ? 35 : k === "M" ? 55 : 75
                    }%, var(--cream))`,
                  }}
                />
              ))}
            </div>
            {/* Health center pin */}
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[color:var(--cream)] px-2 py-1 text-[10px] font-semibold text-[color:var(--sage-deep)] shadow-[var(--shadow-card)]">
              📍 Health Center
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px]">
            <Legend label="Mababa" color="var(--risk-low)" />
            <Legend label="Katamtaman" color="var(--risk-moderate)" />
            <Legend label="Mataas" color="var(--risk-high)" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <Stat label="Screened" value="1,284" />
          <Stat label="High-risk areas" value="3" tone="high" />
          <Stat label="Follow-ups" value="42" tone="moderate" />
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream)]/60 p-3 text-xs text-[color:var(--muted-foreground)]">
          <Info size={14} className="mt-0.5 text-[color:var(--olive)]" />
          <p>Walang ipinapakitang personal na impormasyon. Aggregate data lamang.</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function Legend({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[color:var(--muted-foreground)]">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "high" | "moderate";
}) {
  const color =
    tone === "high"
      ? "var(--risk-high)"
      : tone === "moderate"
        ? "var(--risk-moderate)"
        : "var(--sage-deep)";
  return (
    <div className="rounded-2xl bg-[color:var(--cream)] p-3 shadow-[var(--shadow-card)]">
      <p className="text-[10px] uppercase tracking-wide text-[color:var(--muted-foreground)]">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}