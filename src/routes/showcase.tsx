import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, MapPin, Bell, Lightbulb, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/showcase")({ component: Showcase });

function Showcase() {
  return (
    <div className="flex min-h-full flex-col px-5 pt-10 pb-8">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--sage-deep)] text-[color:var(--cream)]">
          <Heart size={18} fill="currentColor" />
        </div>
        <span className="text-base font-bold text-[color:var(--sage-deep)]">KalusuganAI</span>
      </div>
      <h1 className="mt-5 text-3xl font-bold leading-tight text-[color:var(--sage-deep)]">
        Maagang gabay para sa kalusugan ng barangay.
      </h1>
      <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
        Prevention-focused. Aggregated community insights. Offline-friendly reminders.
      </p>

      <div className="relative mt-6 h-64">
        <Mock title="Home" tilt="-8deg" left="0%" z={2}>
          <p className="text-[10px] text-[color:var(--muted-foreground)]">Magandang araw</p>
          <p className="text-sm font-bold text-[color:var(--sage-deep)]">Ana Reyes</p>
          <div className="mt-2 grid grid-cols-3 gap-1">
            <div className="h-10 rounded-md bg-[color:var(--sage-soft)]" />
            <div className="h-10 rounded-md bg-[color:var(--mint-bg)]" />
            <div className="h-10 rounded-md bg-[color:var(--sage-soft)]" />
          </div>
        </Mock>
        <Mock title="Risk" tilt="4deg" left="33%" z={3}>
          <p className="text-[10px] text-[color:var(--olive)]">Moderate</p>
          <div className="mt-1 h-1.5 w-full rounded-full bg-[color:var(--mint-bg)]">
            <div className="h-full w-2/3 rounded-full bg-[color:var(--risk-moderate)]" />
          </div>
          <div className="mt-2 h-2 w-3/4 rounded bg-[color:var(--mint-bg)]" />
          <div className="mt-1 h-2 w-1/2 rounded bg-[color:var(--mint-bg)]" />
        </Mock>
        <Mock title="Map" tilt="10deg" left="62%" z={2}>
          <div className="grid h-20 grid-cols-3 gap-1">
            {["L", "M", "L", "M", "H", "M", "L", "M", "L"].map((k, i) => (
              <div
                key={i}
                className="rounded"
                style={{
                  background:
                    k === "L"
                      ? "var(--risk-low)"
                      : k === "M"
                        ? "var(--risk-moderate)"
                        : "var(--risk-high)",
                  opacity: 0.7,
                }}
              />
            ))}
          </div>
        </Mock>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-3">
        <Feature Icon={ShieldCheck} title="AI Risk Screening" sub="Bilingual questions" />
        <Feature Icon={MapPin} title="Barangay Heatmap" sub="Anonymized data" />
        <Feature Icon={Bell} title="Health Reminders" sub="Offline-friendly" />
        <Feature Icon={Lightbulb} title="Bilingual Tips" sub="Filipino + English" />
      </div>

      <Link
        to="/"
        className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--sage-deep)] py-3.5 text-sm font-semibold text-[color:var(--cream)] shadow-[var(--shadow-soft)]"
      >
        Try the demo <ArrowRight size={16} />
      </Link>
      <p className="mt-3 text-center text-[10px] text-[color:var(--muted-foreground)]">
        Tayo'y magtulungan para sa mas malusog na kinabukasan.
      </p>
    </div>
  );
}

function Mock({
  title,
  tilt,
  left,
  z,
  children,
}: {
  title: string;
  tilt: string;
  left: string;
  z: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute top-2 w-[36%] rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream)] p-2.5 shadow-[var(--shadow-soft)]"
      style={{ left, transform: `rotate(${tilt})`, zIndex: z, height: 220 }}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-wide text-[color:var(--olive)]">
          {title}
        </span>
        <span className="h-1 w-6 rounded-full bg-[color:var(--border)]" />
      </div>
      {children}
    </div>
  );
}

function Feature({ Icon, title, sub }: { Icon: any; title: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-[color:var(--cream)] p-3 shadow-[var(--shadow-card)]">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--mint-bg)] text-[color:var(--sage-deep)]">
        <Icon size={14} />
      </div>
      <p className="text-xs font-semibold text-[color:var(--sage-deep)]">{title}</p>
      <p className="text-[10px] text-[color:var(--muted-foreground)]">{sub}</p>
    </div>
  );
}