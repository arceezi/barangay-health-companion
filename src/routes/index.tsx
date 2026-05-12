import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Heart, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative flex min-h-full flex-col overflow-hidden">
      {/* Decorative background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, oklch(0.9 0.08 140) 0%, oklch(0.96 0.03 140) 55%, oklch(0.985 0.012 95) 100%)",
        }}
      />
      <div className="absolute -right-12 top-24 -z-10 h-56 w-56 rounded-full bg-[color:var(--sage-soft)] opacity-50 blur-3xl" />
      <div className="absolute -left-16 bottom-40 -z-10 h-56 w-56 rounded-full bg-[color:var(--olive)] opacity-30 blur-3xl" />

      <div className="flex items-center justify-between px-6 pt-12">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--sage-deep)] text-[color:var(--cream)] shadow-[var(--shadow-soft)]">
            <Heart size={20} fill="currentColor" />
          </div>
          <span className="text-base font-bold tracking-tight text-[color:var(--sage-deep)]">
            KalusuganAI
          </span>
        </div>
        <Link
          to="/home"
          className="text-xs font-medium text-[color:var(--muted-foreground)]"
        >
          Skip
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-7 pt-10">
        <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[color:var(--cream)] px-3 py-1.5 text-[11px] font-medium text-[color:var(--sage-deep)] shadow-[var(--shadow-card)]">
          <Sparkles size={12} /> AI Health Companion
        </div>

        <h1 className="mt-5 text-[34px] font-bold leading-[1.1] tracking-tight text-[color:var(--sage-deep)]">
          Maagang gabay
          <br />
          para sa kalusugan
          <br />
          ng <span className="text-[color:var(--olive)]">barangay.</span>
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--muted-foreground)]">
          Check your health risk, get reminders, and learn simple tips —
          built for every Filipino household.
        </p>

        {/* Hero illustration */}
        <div className="relative mt-8 flex-1">
          <div className="absolute inset-0 mx-auto flex items-center justify-center">
            <div className="relative h-64 w-64">
              <div className="absolute inset-0 rounded-[40%_60%_55%_45%] bg-[color:var(--sage-soft)] opacity-70 blur-md" />
              <div className="absolute inset-6 rounded-[55%_45%_50%_50%] bg-[color:var(--cream)] shadow-[var(--shadow-soft)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart
                  size={88}
                  className="text-[color:var(--sage-deep)]"
                  fill="currentColor"
                  strokeWidth={1.2}
                />
              </div>
              {[
                { t: "BP", x: "left-2 top-6", c: "var(--risk-moderate)" },
                { t: "💧", x: "right-2 top-12", c: "var(--sage-soft)" },
                { t: "🥗", x: "left-6 bottom-6", c: "var(--cream)" },
                { t: "🚶", x: "right-4 bottom-2", c: "var(--cream)" },
              ].map((b, i) => (
                <div
                  key={i}
                  className={`absolute ${b.x} flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold shadow-[var(--shadow-card)]`}
                  style={{ background: b.c, color: "var(--sage-deep)" }}
                >
                  {b.t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 pb-8 pt-6">
          <Link
            to="/profile-setup"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--sage-deep)] px-6 py-4 text-base font-semibold text-[color:var(--cream)] shadow-[var(--shadow-soft)] active:scale-[0.98]"
          >
            Simulan <ArrowRight size={18} />
          </Link>
          <Link
            to="/home"
            className="block w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream)]/60 px-6 py-3.5 text-center text-sm font-medium text-[color:var(--sage-deep)]"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}
