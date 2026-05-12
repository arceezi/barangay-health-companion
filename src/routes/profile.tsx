import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/Screen";
import { BottomNav } from "@/components/BottomNav";
import { Settings, Globe, ShieldCheck, FileText, Users, ChevronRight, LogOut } from "lucide-react";

export const Route = createFileRoute("/profile")({ component: Profile });

function Row({ Icon, label, hint, to }: { Icon: any; label: string; hint?: string; to?: string }) {
  const inner = (
    <div className="flex items-center gap-3 rounded-2xl bg-[color:var(--cream)] p-4 shadow-[var(--shadow-card)]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--mint-bg)] text-[color:var(--sage-deep)]">
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-[color:var(--sage-deep)]">{label}</p>
        {hint && <p className="text-xs text-[color:var(--muted-foreground)]">{hint}</p>}
      </div>
      <ChevronRight size={16} className="text-[color:var(--muted-foreground)]" />
    </div>
  );
  return to ? <Link to={to}>{inner}</Link> : <button className="block w-full text-left">{inner}</button>;
}

function Profile() {
  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Profile" right={<button className="text-[color:var(--sage-deep)]"><Settings size={18} /></button>} />

      <div className="px-5">
        <div className="rounded-3xl bg-[color:var(--cream)] p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--sage-deep)] text-xl font-bold text-[color:var(--cream)]">
              A
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-[color:var(--sage-deep)]">Ana Reyes</p>
              <p className="text-xs text-[color:var(--muted-foreground)]">34 · Brgy. San Isidro</p>
              <span className="mt-1 inline-block rounded-full bg-[color:var(--sage-soft)] px-2 py-0.5 text-[10px] font-semibold text-[color:var(--sage-deep)]">
                Resident
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 divide-x divide-[color:var(--border)] text-center">
            <Stat n="3" l="Risk checks" />
            <Stat n="4" l="Reminders" />
            <Stat n="12" l="Tips read" />
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          <Row Icon={ShieldCheck} label="Health profile" hint="Edit basic info" to="/profile-setup" />
          <Row Icon={FileText} label="Past risk results" hint="3 saved" to="/risk-results" />
          <Row Icon={Users} label="Switch to BHW view" hint="Para sa health workers" to="/bhw" />
          <Row Icon={Globe} label="Wika / Language" hint="Filipino + English" />
          <Row Icon={LogOut} label="Sign out" />
        </div>

        <Link
          to="/showcase"
          className="mt-5 block rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--cream)]/60 p-3 text-center text-xs font-medium text-[color:var(--olive)]"
        >
          Tingnan ang Product Showcase →
        </Link>

        <p className="mt-4 pb-4 text-center text-[10px] text-[color:var(--muted-foreground)]">
          KalusuganAI v0.1 · Prototype
        </p>
      </div>
      <BottomNav />
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="text-lg font-bold text-[color:var(--sage-deep)]">{n}</p>
      <p className="text-[10px] text-[color:var(--muted-foreground)]">{l}</p>
    </div>
  );
}