import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/Screen";
import { Users, AlertTriangle, Syringe, TrendingUp, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/bhw")({ component: BHW });

const priorities = [
  { area: "Sitio Mabini", note: "High hypertension risk", tone: "var(--risk-high)", count: "18 residents" },
  { area: "Sitio Rizal", note: "Follow-up visits needed", tone: "var(--risk-moderate)", count: "9 residents" },
  { area: "Sitio Bonifacio", note: "Vaccination reminder campaign", tone: "var(--risk-low)", count: "24 children" },
];

function BHW() {
  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="BHW Overview" back="/home" />
      <div className="space-y-5 px-5 pb-8">
        <div
          className="rounded-3xl p-5"
          style={{
            background:
              "linear-gradient(140deg, oklch(0.45 0.05 145), oklch(0.55 0.06 130))",
          }}
        >
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--cream)]/70">
            Brgy. San Isidro
          </p>
          <h2 className="mt-1 text-xl font-bold text-[color:var(--cream)]">
            Barangay Health Overview
          </h2>
          <p className="text-xs text-[color:var(--cream)]/80">
            Anonymized aggregate · Updated today
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Metric Icon={Users} value="1,284" label="Screened residents" />
          <Metric Icon={AlertTriangle} value="142" label="High-risk flagged" tone="var(--risk-high)" />
          <Metric Icon={Syringe} value="58" label="Pending vaccines" tone="var(--risk-moderate)" />
          <Metric Icon={TrendingUp} value="+12%" label="Engagement vs last mo." tone="var(--risk-low)" />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-[color:var(--sage-deep)]">
            Priority follow-ups
          </h3>
          <div className="space-y-2.5">
            {priorities.map((p) => (
              <div
                key={p.area}
                className="flex items-center gap-3 rounded-2xl bg-[color:var(--cream)] p-4 shadow-[var(--shadow-card)]"
              >
                <div
                  className="h-10 w-1.5 rounded-full"
                  style={{ background: p.tone }}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[color:var(--sage-deep)]">
                    {p.area}
                  </p>
                  <p className="text-xs text-[color:var(--muted-foreground)]">
                    {p.note} · {p.count}
                  </p>
                </div>
                <ChevronRight size={16} className="text-[color:var(--muted-foreground)]" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[color:var(--cream)] p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[color:var(--sage-deep)]">
              Risk distribution
            </p>
            <span className="text-[10px] text-[color:var(--muted-foreground)]">
              Last 30 days
            </span>
          </div>
          <div className="mt-4 flex h-3 overflow-hidden rounded-full">
            <span style={{ width: "55%", background: "var(--risk-low)" }} />
            <span style={{ width: "30%", background: "var(--risk-moderate)" }} />
            <span style={{ width: "15%", background: "var(--risk-high)" }} />
          </div>
          <div className="mt-3 grid grid-cols-3 text-[11px]">
            <Legend c="var(--risk-low)" l="Mababa 55%" />
            <Legend c="var(--risk-moderate)" l="Katamtaman 30%" />
            <Legend c="var(--risk-high)" l="Mataas 15%" />
          </div>
        </div>

        <p className="text-center text-[10px] text-[color:var(--muted-foreground)]">
          Walang nakikitang personal na impormasyon ng residente.
        </p>
      </div>
    </div>
  );
}

function Metric({
  Icon,
  value,
  label,
  tone = "var(--sage-deep)",
}: {
  Icon: any;
  value: string;
  label: string;
  tone?: string;
}) {
  return (
    <div className="rounded-2xl bg-[color:var(--cream)] p-4 shadow-[var(--shadow-card)]">
      <div
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ background: `color-mix(in oklab, ${tone} 18%, transparent)`, color: tone }}
      >
        <Icon size={16} />
      </div>
      <p className="text-xl font-bold" style={{ color: tone }}>
        {value}
      </p>
      <p className="text-[11px] leading-tight text-[color:var(--muted-foreground)]">
        {label}
      </p>
    </div>
  );
}

function Legend({ c, l }: { c: string; l: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[color:var(--muted-foreground)]">
      <span className="h-2 w-2 rounded-full" style={{ background: c }} /> {l}
    </span>
  );
}