import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Screen";
import { ArrowRight, Wifi } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/check")({
  component: Check,
});

const questions = [
  {
    en: "How often do you eat salty food?",
    tl: "Gaano kadalas kumain ng maaalat na pagkain?",
    options: ["Halos hindi kailanman", "1–2 beses kada linggo", "3–4 beses kada linggo", "Araw-araw"],
  },
  {
    en: "Do you often feel dizzy or have headaches?",
    tl: "Madalas ka bang mahilo o sumakit ang ulo?",
    options: ["Hindi", "Minsan", "Madalas"],
  },
  {
    en: "How often do you exercise or walk?",
    tl: "Gaano kadalas mag-ehersisyo o maglakad?",
    options: ["Halos hindi", "1–2 beses", "3–4 beses", "Araw-araw"],
  },
  {
    en: "Family history of diabetes or hypertension?",
    tl: "May pamilyang may diabetes o hypertension?",
    options: ["Wala", "Isa sa pamilya", "Higit isa"],
  },
];

function Check() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null),
  );
  const nav = useNavigate();
  const q = questions[step];
  const total = questions.length;
  const pct = ((step + 1) / total) * 100;

  const next = () => {
    if (step < total - 1) setStep(step + 1);
    else nav({ to: "/risk-results" });
  };

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Health Risk Check" back="/home" />

      <div className="px-5">
        <div className="flex items-center justify-between text-xs text-[color:var(--muted-foreground)]">
          <span>Question {step + 1} of {total}</span>
          <span className="inline-flex items-center gap-1 text-[color:var(--olive)]">
            <Wifi size={12} /> Offline-ready
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[color:var(--border)]">
          <div
            className="h-full rounded-full bg-[color:var(--sage-deep)] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex-1 px-5 pt-6">
        <div className="rounded-3xl bg-[color:var(--cream)] p-5 shadow-[var(--shadow-card)]">
          <p className="text-[11px] uppercase tracking-wide text-[color:var(--olive)]">
            AI screener
          </p>
          <h2 className="mt-1 text-xl font-bold leading-snug text-[color:var(--sage-deep)]">
            {q.en}
          </h2>
          <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">{q.tl}</p>
        </div>

        <div className="mt-5 space-y-2.5">
          {q.options.map((opt) => {
            const selected = answers[step] === opt;
            return (
              <button
                key={opt}
                onClick={() =>
                  setAnswers((a) => a.map((v, i) => (i === step ? opt : v)))
                }
                className="flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-all"
                style={{
                  background: selected ? "var(--sage-deep)" : "var(--cream)",
                  color: selected ? "var(--cream)" : "var(--foreground)",
                  borderColor: selected ? "var(--sage-deep)" : "var(--border)",
                  boxShadow: selected ? "var(--shadow-soft)" : "var(--shadow-card)",
                }}
              >
                <span>{opt}</span>
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full border"
                  style={{
                    borderColor: selected ? "var(--cream)" : "var(--border)",
                    background: selected ? "var(--cream)" : "transparent",
                  }}
                >
                  {selected && (
                    <span className="h-2 w-2 rounded-full bg-[color:var(--sage-deep)]" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-0 flex gap-3 bg-gradient-to-t from-[color:var(--mint-bg)] p-5 pt-8">
        <button
          onClick={() => (step > 0 ? setStep(step - 1) : null)}
          disabled={step === 0}
          className="flex-1 rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream)] py-3.5 text-sm font-medium text-[color:var(--sage-deep)] disabled:opacity-40"
        >
          Bumalik
        </button>
        <button
          onClick={next}
          className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-[color:var(--sage-deep)] py-3.5 text-sm font-semibold text-[color:var(--cream)] shadow-[var(--shadow-soft)]"
        >
          {step === total - 1 ? "Tingnan ang resulta" : "Susunod"}
          <ArrowRight size={16} />
        </button>
      </div>

      <Link to="/home" className="hidden">home</Link>
      <BottomNav />
    </div>
  );
}