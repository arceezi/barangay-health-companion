import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  ShieldCheck,
  MapPin,
  Lightbulb,
  Calendar,
  Activity,
  Droplet,
  Scale,
  ChevronRight,
  Users,
} from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { RiskBadge, RiskMeter, type RiskLevel } from "@/components/RiskBadge";

export const Route = createFileRoute("/home")({
  component: Home,
});

const risks: { name: string; tl: string; level: RiskLevel; Icon: any }[] = [
  { name: "Hypertension", tl: "Presyon ng dugo", level: "Moderate", Icon: Activity },
  { name: "Type 2 Diabetes", tl: "Diabetes", level: "Low", Icon: Droplet },
  { name: "Obesity-related", tl: "Timbang", level: "Moderate", Icon: Scale },
];

function Home() {
  return (
    <div className="flex min-h-full flex-col">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-6"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--sage-deep)] text-[color:var(--cream)] text-base font-semibold">
              A
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-[color:var(--muted-foreground)]">
                Magandang araw
              </p>
              <p className="text-base font-semibold text-[color:var(--sage-deep)]">
                Ana Reyes
              </p>
            </div>
          </div>
          <Link
            to="/reminders"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--cream)] text-[color:var(--sage-deep)] shadow-[var(--shadow-card)]"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[color:var(--risk-high)]" />
          </Link>
        </div>

        <div className="mt-5">
          <h1 className="text-2xl font-bold text-[color:var(--sage-deep)]">
            Your health overview
          </h1>
          <p className="text-sm text-[color:var(--muted-foreground)]">
            Mga rekomendasyon batay sa iyong huling check.
          </p>
        </div>
      </div>

      <div className="-mt-3 space-y-5 px-5">
        {/* Risk cards */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[color:var(--sage-deep)]">
              Risk summary
            </h2>
            <Link
              to="/risk-results"
              className="text-xs font-medium text-[color:var(--olive)]"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {risks.map((r) => (
              <Link
                to="/risk-results"
                key={r.name}
                className="rounded-2xl bg-[color:var(--cream)] p-3 shadow-[var(--shadow-card)]"
              >
                <div
                  className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: "var(--mint-bg)" }}
                >
                  <r.Icon size={16} className="text-[color:var(--sage-deep)]" />
                </div>
                <p className="text-[11px] font-semibold leading-tight text-[color:var(--foreground)]">
                  {r.name}
                </p>
                <div className="mt-2">
                  <RiskBadge level={r.level} />
                </div>
                <div className="mt-2">
                  <RiskMeter level={r.level} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Next reminder */}
        <Link
          to="/reminders"
          className="flex items-center gap-3 rounded-2xl bg-[color:var(--cream)] p-4 shadow-[var(--shadow-card)]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--sage-soft)] text-[color:var(--sage-deep)]">
            <Calendar size={20} />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-medium uppercase tracking-wide text-[color:var(--olive)]">
              Susunod na paalala
            </p>
            <p className="text-sm font-semibold text-[color:var(--sage-deep)]">
              RHU Check-up
            </p>
            <p className="text-xs text-[color:var(--muted-foreground)]">
              Bukas, 9:00 AM · Brgy. Health Center
            </p>
          </div>
          <ChevronRight size={18} className="text-[color:var(--muted-foreground)]" />
        </Link>

        {/* Tip */}
        <Link
          to="/tips"
          className="flex items-center gap-3 rounded-2xl p-4"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.92 0.07 140), oklch(0.96 0.04 100))",
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--cream)] text-[color:var(--sage-deep)]">
            <Lightbulb size={20} />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-medium uppercase tracking-wide text-[color:var(--olive)]">
              Tip ng araw
            </p>
            <p className="text-sm font-semibold text-[color:var(--sage-deep)]">
              Bawasan ang maaalat na pagkain.
            </p>
            <p className="text-xs text-[color:var(--muted-foreground)]">
              Para sa mas mababang blood pressure.
            </p>
          </div>
        </Link>

        {/* Quick actions */}
        <div>
          <h2 className="mb-2 text-sm font-semibold text-[color:var(--sage-deep)]">
            Mga Mabilis na Gawain
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickAction to="/check" Icon={ShieldCheck} title="Risk Check" sub="Sagutan ang AI" />
            <QuickAction to="/reminders" Icon={Bell} title="Mga Paalala" sub="Set & track" />
            <QuickAction to="/tips" Icon={Lightbulb} title="Health Tips" sub="Bilingual feed" />
            <QuickAction to="/map" Icon={MapPin} title="Community Map" sub="Barangay view" />
          </div>
        </div>

        {/* BHW link */}
        <Link
          to="/bhw"
          className="flex items-center gap-3 rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--cream)]/60 p-3.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--sage-soft)] text-[color:var(--sage-deep)]">
            <Users size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[color:var(--sage-deep)]">
              BHW Demo View
            </p>
            <p className="text-xs text-[color:var(--muted-foreground)]">
              Para sa Barangay Health Workers
            </p>
          </div>
          <ChevronRight size={18} className="text-[color:var(--muted-foreground)]" />
        </Link>

        <div className="pb-4 text-center text-[10px] text-[color:var(--muted-foreground)]">
          Hindi ito diagnosis. Para sa medical advice, kumonsulta sa health worker.
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function QuickAction({
  to,
  Icon,
  title,
  sub,
}: {
  to: string;
  Icon: any;
  title: string;
  sub: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-2xl bg-[color:var(--cream)] p-3.5 shadow-[var(--shadow-card)] active:scale-[0.98]"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--mint-bg)] text-[color:var(--sage-deep)]">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold text-[color:var(--sage-deep)]">{title}</p>
        <p className="text-[11px] text-[color:var(--muted-foreground)]">{sub}</p>
      </div>
    </Link>
  );
}