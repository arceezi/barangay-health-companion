import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/Screen";
import { RiskBadge, RiskMeter, type RiskLevel } from "@/components/RiskBadge";
import { Activity, Droplet, Scale, Download, Info, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/risk-results")({
  component: Results,
});

const cards: { name: string; tl: string; level: RiskLevel; Icon: any; note: string }[] = [
  {
    name: "Hypertension",
    tl: "Katamtamang panganib",
    level: "Moderate",
    Icon: Activity,
    note: "Bantayan ang presyon ng dugo lingguhan.",
  },
  {
    name: "Type 2 Diabetes",
    tl: "Mababang panganib",
    level: "Low",
    Icon: Droplet,
    note: "Magandang gawi — ipagpatuloy lang!",
  },
  {
    name: "Obesity-related",
    tl: "Mataas na panganib",
    level: "High",
    Icon: Scale,
    note: "Pansinin ang timbang at aktibidad.",
  },
];

function Results() {
  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Your Risk Results" back="/check" />

      <div className="px-5">
        <div
          className="rounded-3xl p-5"
          style={{
            background:
              "linear-gradient(140deg, oklch(0.92 0.07 140), oklch(0.985 0.012 95))",
          }}
        >
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--olive)]">
            Pangkalahatang panganib
          </p>
          <div className="mt-1 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-[color:var(--sage-deep)]">
              Moderate
            </h2>
            <RiskBadge level="Moderate" showTl />
          </div>
          <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
            May ilang salik na pwedeng mapabuti — pero kaya ito.
          </p>
        </div>
      </div>

      <div className="mt-5 px-5">
        <h3 className="mb-2 text-sm font-semibold text-[color:var(--sage-deep)]">
          Mga Risk Area
        </h3>
        <div className="space-y-3">
          {cards.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl bg-[color:var(--cream)] p-4 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--mint-bg)] text-[color:var(--sage-deep)]">
                  <c.Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[color:var(--sage-deep)]">
                      {c.name}
                    </p>
                    <RiskBadge level={c.level} />
                  </div>
                  <p className="text-xs text-[color:var(--muted-foreground)]">
                    {c.tl}
                  </p>
                  <div className="mt-3">
                    <RiskMeter level={c.level} />
                  </div>
                  <p className="mt-2 text-xs text-[color:var(--foreground)]">
                    💡 {c.note}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream)]/60 p-3 text-xs text-[color:var(--muted-foreground)]">
          <Info size={14} className="mt-0.5 text-[color:var(--olive)]" />
          <p>
            <span className="font-semibold text-[color:var(--sage-deep)]">
              Hindi ito diagnosis.
            </span>{" "}
            Para sa medical advice, kumonsulta sa health worker o doktor.
          </p>
        </div>

        <div className="mt-5 space-y-3 pb-6">
          <Link
            to="/recommendations"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--sage-deep)] py-3.5 text-sm font-semibold text-[color:var(--cream)] shadow-[var(--shadow-soft)]"
          >
            Tingnan ang Mga Rekomendasyon <ArrowRight size={16} />
          </Link>
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream)] py-3 text-sm font-medium text-[color:var(--sage-deep)]">
            <Download size={14} /> Download Result (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}