import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/Screen";
import { BottomNav } from "@/components/BottomNav";
import { Pill, Stethoscope, Syringe, FileHeart, Plus, WifiOff } from "lucide-react";

export const Route = createFileRoute("/reminders")({ component: Reminders });

const list = [
  {
    Icon: Pill,
    title: "Maintenance medicine",
    sub: "Losartan 50mg",
    when: "Today · 8:00 AM",
    tone: "var(--sage-soft)",
  },
  {
    Icon: Stethoscope,
    title: "RHU Check-up",
    sub: "Brgy. Health Center",
    when: "Bukas · 9:00 AM",
    tone: "oklch(0.93 0.07 90)",
  },
  {
    Icon: FileHeart,
    title: "PhilHealth Konsulta",
    sub: "Annual screening",
    when: "May 24 · 10:30 AM",
    tone: "oklch(0.92 0.05 130)",
  },
  {
    Icon: Syringe,
    title: "Vaccine for Ana Jr.",
    sub: "MMR booster",
    when: "Next week · Wed",
    tone: "oklch(0.9 0.07 60)",
  },
];

function Reminders() {
  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader
        title="Reminders"
        back="/home"
        right={
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--sage-deep)] text-[color:var(--cream)] shadow-[var(--shadow-soft)]">
            <Plus size={18} />
          </button>
        }
      />

      <div className="px-5">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--cream)] px-3 py-1.5 text-[11px] font-medium text-[color:var(--sage-deep)] shadow-[var(--shadow-card)]">
          <WifiOff size={12} /> Gumagana kahit offline
        </div>

        <div className="space-y-3">
          {list.map((r) => (
            <div
              key={r.title}
              className="relative flex items-center gap-3 overflow-hidden rounded-2xl bg-[color:var(--cream)] p-4 shadow-[var(--shadow-card)]"
            >
              <div
                className="absolute left-0 top-0 h-full w-1.5"
                style={{ background: r.tone }}
              />
              <div
                className="ml-1 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: r.tone, color: "var(--sage-deep)" }}
              >
                <r.Icon size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[color:var(--sage-deep)]">
                  {r.title}
                </p>
                <p className="text-xs text-[color:var(--muted-foreground)]">
                  {r.sub}
                </p>
              </div>
              <p className="text-[11px] font-medium text-[color:var(--olive)]">
                {r.when}
              </p>
            </div>
          ))}
        </div>

        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--cream)]/60 py-3.5 text-sm font-medium text-[color:var(--sage-deep)]">
          <Plus size={16} /> Magdagdag ng paalala
        </button>
      </div>

      <BottomNav />
    </div>
  );
}