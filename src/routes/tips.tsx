import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Screen";
import { BottomNav } from "@/components/BottomNav";
import { Search, Bookmark } from "lucide-react";

export const Route = createFileRoute("/tips")({ component: Tips });

const cats = ["Lahat", "Blood Pressure", "Diabetes", "Nutrisyon", "Ehersisyo", "Pamilya"];

const tips = [
  {
    cat: "Blood Pressure",
    title: "Bawasan ang maaalat na pagkain",
    body: "Sobra sa asin ay nagpapataas ng presyon ng dugo. Iwasan ang sobrang patis at toyo.",
    emoji: "🧂",
  },
  {
    cat: "Ehersisyo",
    title: "Maglakad kahit 20 minuto bawat araw",
    body: "Sapat na ang banayad na lakad para mapabuti ang puso at sirkulasyon.",
    emoji: "🚶",
  },
  {
    cat: "Nutrisyon",
    title: "Pumili ng gulay at prutas",
    body: "Punan ng kulay ang plato — mas masustansya, mas masarap.",
    emoji: "🥗",
  },
  {
    cat: "Diabetes",
    title: "Iwasan ang sugary drinks",
    body: "Inumin ng tubig kapalit ng softdrinks at juice na maraming asukal.",
    emoji: "💧",
  },
  {
    cat: "Pamilya",
    title: "Vaccine schedule ng anak",
    body: "Kausapin ang BHW para sa libreng bakuna sa Brgy. Health Center.",
    emoji: "👶",
  },
];

function Tips() {
  const [active, setActive] = useState("Lahat");
  const filtered = active === "Lahat" ? tips : tips.filter((t) => t.cat === active);

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Health Tips" back="/home" />

      <div className="px-5">
        <div className="flex items-center gap-2 rounded-2xl bg-[color:var(--cream)] px-3 py-2.5 shadow-[var(--shadow-card)]">
          <Search size={16} className="text-[color:var(--muted-foreground)]" />
          <input
            placeholder="Maghanap ng tip..."
            className="w-full bg-transparent text-sm placeholder:text-[color:var(--muted-foreground)] focus:outline-none"
          />
        </div>

        <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 no-scrollbar">
          {cats.map((c) => {
            const a = c === active;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors"
                style={{
                  background: a ? "var(--sage-deep)" : "var(--cream)",
                  color: a ? "var(--cream)" : "var(--sage-deep)",
                  border: `1px solid ${a ? "var(--sage-deep)" : "var(--border)"}`,
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="mt-4 space-y-3">
          {filtered.map((t, i) => (
            <article
              key={i}
              className="rounded-2xl bg-[color:var(--cream)] p-4 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--mint-bg)] text-2xl">
                  {t.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[color:var(--olive)]">
                      {t.cat}
                    </span>
                    <button className="text-[color:var(--muted-foreground)]">
                      <Bookmark size={14} />
                    </button>
                  </div>
                  <h3 className="text-sm font-semibold text-[color:var(--sage-deep)]">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[color:var(--muted-foreground)]">
                    {t.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}