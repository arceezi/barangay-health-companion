import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Screen";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/profile-setup")({
  component: ProfileSetup,
});

const steps = ["Basics", "Body", "Lifestyle"] as const;

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-[color:var(--sage-deep)]">
        {label}
      </span>
      {hint && (
        <span className="ml-2 text-[11px] text-[color:var(--muted-foreground)]">
          {hint}
        </span>
      )}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--cream)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--sage-soft)]";

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
      style={{
        background: active ? "var(--sage-deep)" : "var(--cream)",
        color: active ? "var(--cream)" : "var(--sage-deep)",
        border: `1px solid ${active ? "var(--sage-deep)" : "var(--border)"}`,
      }}
    >
      {children}
    </button>
  );
}

function ProfileSetup() {
  const [step, setStep] = useState(0);
  const [sex, setSex] = useState<"F" | "M" | null>("F");
  const [smoking, setSmoking] = useState<string | null>("Never");
  const [activity, setActivity] = useState<string | null>("Light");

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Health Profile" back="/" />
      <div className="px-5">
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div
                className="h-1.5 flex-1 rounded-full"
                style={{
                  background: i <= step ? "var(--sage-deep)" : "var(--border)",
                }}
              />
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-[color:var(--muted-foreground)]">
          Step {step + 1} of {steps.length} · {steps[step]}
        </p>
      </div>

      <div className="flex-1 space-y-4 px-5 pt-5">
        {step === 0 && (
          <>
            <Field label="Pangalan / Name">
              <input className={inputCls} defaultValue="Ana Reyes" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Edad / Age">
                <input className={inputCls} type="number" defaultValue={34} />
              </Field>
              <Field label="Kasarian">
                <div className="flex gap-2">
                  <Pill active={sex === "F"} onClick={() => setSex("F")}>
                    Babae
                  </Pill>
                  <Pill active={sex === "M"} onClick={() => setSex("M")}>
                    Lalaki
                  </Pill>
                </div>
              </Field>
            </div>
            <Field label="Barangay">
              <input className={inputCls} defaultValue="Brgy. San Isidro" />
            </Field>
          </>
        )}
        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Tangkad" hint="cm">
                <input className={inputCls} defaultValue={158} />
              </Field>
              <Field label="Timbang" hint="kg">
                <input className={inputCls} defaultValue={62} />
              </Field>
            </div>
            <Field label="Existing conditions" hint="optional">
              <textarea
                className={inputCls}
                rows={3}
                placeholder="e.g. mild hypertension"
              />
            </Field>
            <Field label="Family history">
              <div className="flex flex-wrap gap-2">
                {["Diabetes", "Hypertension", "Heart disease", "None"].map(
                  (t) => (
                    <Pill key={t} active={t === "Hypertension"} onClick={() => {}}>
                      {t}
                    </Pill>
                  ),
                )}
              </div>
            </Field>
          </>
        )}
        {step === 2 && (
          <>
            <Field label="Smoking status">
              <div className="flex flex-wrap gap-2">
                {["Never", "Dati", "Kasalukuyan"].map((t) => (
                  <Pill
                    key={t}
                    active={smoking === t}
                    onClick={() => setSmoking(t)}
                  >
                    {t}
                  </Pill>
                ))}
              </div>
            </Field>
            <Field label="Physical activity">
              <div className="flex flex-wrap gap-2">
                {["None", "Light", "Moderate", "Active"].map((t) => (
                  <Pill
                    key={t}
                    active={activity === t}
                    onClick={() => setActivity(t)}
                  >
                    {t}
                  </Pill>
                ))}
              </div>
            </Field>
            <div className="rounded-2xl bg-[color:var(--cream)] p-4 text-xs text-[color:var(--muted-foreground)] shadow-[var(--shadow-card)]">
              Your profile stays on this device for the prototype demo. Walang
              ipapadala sa server.
            </div>
          </>
        )}
      </div>

      <div className="sticky bottom-0 mt-6 flex gap-3 bg-gradient-to-t from-[color:var(--mint-bg)] to-transparent p-5 pt-8">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex-1 rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream)] py-3.5 text-sm font-medium text-[color:var(--sage-deep)]"
          >
            Bumalik
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-[color:var(--sage-deep)] py-3.5 text-sm font-semibold text-[color:var(--cream)] shadow-[var(--shadow-soft)]"
          >
            Susunod <ArrowRight size={16} />
          </button>
        ) : (
          <Link
            to="/home"
            className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-[color:var(--sage-deep)] py-3.5 text-sm font-semibold text-[color:var(--cream)] shadow-[var(--shadow-soft)]"
          >
            Tapos na <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}