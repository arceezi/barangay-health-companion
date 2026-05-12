import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/Screen";
import { Bell, Lightbulb, Users, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/recommendations")({
  component: Recos,
});

const items = [
  "Bisitahin ang Barangay Health Center kung tuloy-tuloy ang sintomas.",
  "Mag-iskedyul ng RHU consultation sa loob ng 2 linggo.",
  "Sukatin ang blood pressure 1× kada linggo.",
  "Maglakad ng 20 minuto araw-araw.",
  "Bawasan ang sugary drinks at maaalat na pagkain.",
];

function Recos() {
  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Recommended Steps" back="/risk-results" />
      <div className="space-y-5 px-5">
        <div
          className="rounded-3xl p-5"
          style={{
            background:
              "linear-gradient(140deg, oklch(0.92 0.07 140), oklch(0.985 0.012 95))",
          }}
        >
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--olive)]">
            Susunod na hakbang
          </p>
          <h2 className="mt-1 text-xl font-bold text-[color:var(--sage-deep)]">
            Maliit na hakbang, malaking pagbabago.
          </h2>
        </div>

        <ul className="space-y-2.5">
          {items.map((t, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl bg-[color:var(--cream)] p-4 shadow-[var(--shadow-card)]"
            >
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-[color:var(--sage-deep)]"
              />
              <span className="text-sm text-[color:var(--foreground)]">{t}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-3 gap-2.5 pb-6">
          <Action to="/reminders" Icon={Bell} label="Set Reminder" />
          <Action to="/tips" Icon={Lightbulb} label="Health Tips" />
          <Action to="/map" Icon={Users} label="Community" />
        </div>
      </div>
    </div>
  );
}

function Action({ to, Icon, label }: { to: string; Icon: any; label: string }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-2 rounded-2xl bg-[color:var(--sage-deep)] p-4 text-center text-[11px] font-semibold text-[color:var(--cream)] shadow-[var(--shadow-soft)]"
    >
      <Icon size={18} />
      {label}
    </Link>
  );
}