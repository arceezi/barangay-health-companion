import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/Screen";
import { BottomNav } from "@/components/BottomNav";
import {
  Activity,
  AlertTriangle,
  Building2,
  ClipboardList,
  Eye,
  Info,
  Layers,
  Lock,
  MapPin,
  Navigation,
  Thermometer,
  Users,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/map")({ component: MapView });

const heatSpots = [
  {
    name: "Sitio Mabini",
    concern: "Hypertension follow-up",
    intensity: "high",
    className: "left-[39%] top-[33%] h-28 w-32",
  },
  {
    name: "Palengke Area",
    concern: "Diabetes screening",
    intensity: "moderate",
    className: "left-[56%] top-[39%] h-24 w-28",
  },
  {
    name: "Purok 3",
    concern: "Fever clustering",
    intensity: "moderate",
    className: "left-[18%] top-[45%] h-24 w-24",
  },
  {
    name: "Tabing-Ilog",
    concern: "Respiratory symptoms",
    intensity: "low",
    className: "left-[67%] top-[18%] h-20 w-20",
  },
  {
    name: "Purok 5",
    concern: "Routine BHW visits",
    intensity: "low",
    className: "left-[14%] top-[16%] h-20 w-24",
  },
] as const;

const markers = [
  { className: "left-[23%] top-[24%]" },
  { className: "left-[36%] top-[48%]" },
  { className: "left-[46%] top-[38%]" },
  { className: "left-[53%] top-[57%]" },
  { className: "left-[61%] top-[43%]" },
  { className: "left-[70%] top-[28%]" },
  { className: "left-[27%] top-[66%]" },
  { className: "left-[77%] top-[61%]" },
] as const;

const concerns = [
  { area: "Sitio Mabini", metric: "18 high-priority", color: "var(--risk-high)" },
  { area: "Palengke Area", metric: "12 glucose checks", color: "var(--risk-moderate)" },
  { area: "Purok 3", metric: "9 fever reports", color: "var(--olive)" },
] as const;

const buildingRows = [
  { x: 20, y: 24, count: 5, rotate: -12 },
  { x: 112, y: 18, count: 5, rotate: 8 },
  { x: 226, y: 20, count: 4, rotate: -8 },
  { x: 24, y: 78, count: 7, rotate: -8 },
  { x: 128, y: 76, count: 5, rotate: 7 },
  { x: 226, y: 74, count: 7, rotate: -10 },
  { x: 38, y: 136, count: 6, rotate: 12 },
  { x: 152, y: 130, count: 5, rotate: -7 },
  { x: 236, y: 138, count: 5, rotate: 8 },
  { x: 22, y: 200, count: 6, rotate: -12 },
  { x: 126, y: 206, count: 7, rotate: 9 },
  { x: 232, y: 206, count: 5, rotate: -7 },
  { x: 40, y: 270, count: 6, rotate: 8 },
  { x: 154, y: 278, count: 5, rotate: -10 },
] as const;

const standaloneBuildings = [
  { x: 74, y: 34, w: 18, h: 11, rotate: -18 },
  { x: 180, y: 40, w: 28, h: 13, rotate: 9 },
  { x: 274, y: 42, w: 22, h: 10, rotate: -8 },
  { x: 83, y: 98, w: 30, h: 12, rotate: -7 },
  { x: 185, y: 104, w: 24, h: 11, rotate: 8 },
  { x: 286, y: 116, w: 20, h: 11, rotate: -9 },
  { x: 92, y: 168, w: 34, h: 14, rotate: 11 },
  { x: 180, y: 172, w: 28, h: 12, rotate: -8 },
  { x: 272, y: 176, w: 26, h: 12, rotate: 7 },
  { x: 70, y: 232, w: 28, h: 12, rotate: -12 },
  { x: 188, y: 246, w: 38, h: 15, rotate: 8 },
  { x: 264, y: 282, w: 26, h: 12, rotate: -9 },
] as const;

const mapLabels = [
  { text: "Rizal St.", x: 43, y: 95, rotate: -22 },
  { text: "Mabini Rd.", x: 110, y: 58, rotate: 72 },
  { text: "Palengke", x: 214, y: 123, rotate: -8 },
  { text: "Tabing-Ilog", x: 254, y: 206, rotate: 78 },
  { text: "Purok 3", x: 61, y: 222, rotate: -12 },
  { text: "Health Center", x: 228, y: 62, rotate: -8 },
  { text: "Sitio Mabini", x: 143, y: 184, rotate: -12 },
] as const;

function MapView() {
  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Community Health Map" back="/home" />

      <div className="space-y-4 px-5">
        <div>
          <p className="text-sm leading-relaxed text-[color:var(--muted-foreground)]">
            Aggregated barangay risk signals for BHW planning and follow-up routing.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--cream)] px-3 py-1.5 text-xs font-semibold text-[color:var(--sage-deep)] shadow-[var(--shadow-card)]">
            <MapPin size={13} />
            Brgy. San Isidro, Laguna
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl bg-[color:var(--cream)] p-3 text-[color:var(--sage-deep)] shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between gap-3 px-1 pb-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[color:var(--olive)]">
                Barangay risk layer
              </p>
              <p className="text-sm font-semibold leading-tight text-[color:var(--sage-deep)]">
                Heatmap for chronic care and symptom follow-up
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--mint-bg)] px-2.5 py-1 text-[10px] font-semibold text-[color:var(--sage-deep)]">
              <Lock size={10} /> Anonymized
            </span>
          </div>

          <div className="relative aspect-[0.94] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--mint-bg)]">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                backgroundImage:
                  "linear-gradient(30deg, oklch(0.42 0.05 145 / 0.08) 1px, transparent 1px), linear-gradient(120deg, oklch(0.62 0.07 125 / 0.07) 1px, transparent 1px)",
                backgroundSize: "34px 34px, 42px 42px",
              }}
            />
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 320 340"
              preserveAspectRatio="none"
            >
              <g>
                <path
                  d="M-10 300 C42 275 84 286 130 258 C174 232 215 238 332 224 L332 360 L-10 360 Z"
                  fill="oklch(0.85 0.07 140 / 0.38)"
                />
                <path
                  d="M238 -8 C254 42 250 93 236 132 C222 171 226 213 251 353"
                  fill="none"
                  stroke="oklch(0.8 0.08 220 / 0.45)"
                  strokeWidth="5"
                />
                <path
                  d="M244 -8 C260 42 256 93 242 132 C228 171 232 213 257 353"
                  fill="none"
                  stroke="oklch(0.985 0.012 95 / 0.7)"
                  strokeWidth="1.5"
                />
              </g>

              <g opacity=".78">
                {buildingRows.map((row) =>
                  Array.from({ length: row.count }, (_, index) => (
                    <rect
                      key={`${row.x}-${row.y}-${index}`}
                      x={row.x + index * 13}
                      y={row.y + (index % 2) * 7}
                      width="9"
                      height={index % 3 === 0 ? 16 : 11}
                      rx="1.5"
                      transform={`rotate(${row.rotate} ${row.x + index * 13} ${row.y})`}
                      fill="oklch(0.86 0.018 145 / 0.78)"
                      stroke="oklch(0.42 0.05 145 / 0.08)"
                      strokeWidth=".5"
                    />
                  )),
                )}
                {standaloneBuildings.map((building) => (
                  <rect
                    key={`${building.x}-${building.y}`}
                    x={building.x}
                    y={building.y}
                    width={building.w}
                    height={building.h}
                    rx="2"
                    transform={`rotate(${building.rotate} ${building.x} ${building.y})`}
                    fill="oklch(0.82 0.018 145 / 0.72)"
                    stroke="oklch(0.42 0.05 145 / 0.1)"
                    strokeWidth=".6"
                  />
                ))}
                <path
                  d="M204 126 L248 118 L266 144 L244 171 L203 160 Z"
                  fill="oklch(0.82 0.018 95 / 0.72)"
                  stroke="oklch(0.42 0.05 145 / 0.1)"
                />
                <path
                  d="M34 252 L88 242 L101 269 L62 288 Z"
                  fill="oklch(0.84 0.05 140 / 0.42)"
                  stroke="oklch(0.62 0.07 125 / 0.15)"
                />
              </g>

              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M-15 90 C62 72 94 83 141 56 S246 29 341 38" stroke="oklch(0.985 0.012 95 / 0.86)" strokeWidth="5" />
                <path d="M12 242 C74 212 119 221 164 184 S242 135 332 143" stroke="oklch(0.985 0.012 95 / 0.9)" strokeWidth="7" />
                <path d="M35 -12 C74 50 92 109 96 171 S116 280 150 360" stroke="oklch(0.985 0.012 95 / 0.78)" strokeWidth="6" />
                <path d="M210 -10 C194 49 198 101 218 153 S248 258 233 360" stroke="oklch(0.985 0.012 95 / 0.76)" strokeWidth="6" />
                <path d="M-18 43 L47 58 L101 42 L165 48 L225 23 L342 18" stroke="oklch(0.985 0.012 95 / 0.64)" strokeWidth="3.5" />
                <path d="M-12 123 L52 111 L102 119 L145 103 L198 112 L255 90 L334 94" stroke="oklch(0.985 0.012 95 / 0.72)" strokeWidth="3.5" />
                <path d="M-14 205 L43 187 L96 198 L138 180 L197 188 L251 170 L336 177" stroke="oklch(0.985 0.012 95 / 0.68)" strokeWidth="4" />
                <path d="M-18 315 L58 303 L127 312 L191 289 L257 302 L340 286" stroke="oklch(0.985 0.012 95 / 0.66)" strokeWidth="3.5" />
                <path d="M72 -10 C71 50 63 101 78 151 C94 205 89 261 76 352" stroke="oklch(0.985 0.012 95 / 0.66)" strokeWidth="3.5" />
                <path d="M132 -14 C127 43 145 84 156 130 C170 187 171 237 164 354" stroke="oklch(0.985 0.012 95 / 0.64)" strokeWidth="3.5" />
                <path d="M279 -8 C286 55 279 100 293 147 C306 188 302 249 287 352" stroke="oklch(0.985 0.012 95 / 0.62)" strokeWidth="3.5" />
                <path d="M-20 165 L70 145 L132 154 L211 120 L340 111" stroke="oklch(0.42 0.05 145 / 0.22)" strokeWidth="2" />
                <path d="M-18 286 L73 273 L138 286 L221 264 L340 275" stroke="oklch(0.42 0.05 145 / 0.2)" strokeWidth="2" />
                <path d="M30 48 L104 91 L176 91 L275 64" stroke="oklch(0.42 0.05 145 / 0.18)" strokeWidth="2" />
                <path d="M55 318 L115 260 L173 234 L287 213" stroke="oklch(0.42 0.05 145 / 0.18)" strokeWidth="2" />
                <path d="M18 22 L68 91 M103 36 L89 126 M149 28 L187 115 M237 54 L304 86" stroke="oklch(0.42 0.05 145 / 0.14)" strokeWidth="1.5" />
                <path d="M34 151 L112 181 M128 219 L203 238 M217 218 L304 249" stroke="oklch(0.42 0.05 145 / 0.15)" strokeWidth="1.5" />
                <path d="M18 114 L84 130 M116 116 L171 140 M226 164 L306 191" stroke="oklch(0.62 0.07 125 / 0.32)" strokeWidth="1.5" />
                <path d="M121 21 L142 84 M157 166 L191 226 M246 35 L272 92" stroke="oklch(0.62 0.07 125 / 0.28)" strokeWidth="1.5" />
              </g>

              <g fontFamily="ui-sans-serif, system-ui" fontSize="9" fontWeight="700" fill="oklch(0.42 0.05 145 / 0.33)">
                {mapLabels.map((label) => (
                  <text
                    key={label.text}
                    x={label.x}
                    y={label.y}
                    transform={`rotate(${label.rotate} ${label.x} ${label.y})`}
                  >
                    {label.text}
                  </text>
                ))}
              </g>
            </svg>

            <div className="absolute inset-0">
              {heatSpots.map((spot) => (
                <HeatBlob key={spot.name} intensity={spot.intensity} className={spot.className} />
              ))}
            </div>

            <div className="absolute inset-0">
              {markers.map((marker, index) => (
                <span
                  key={marker.className}
                  className={`absolute flex h-3 w-3 items-center justify-center rounded-full bg-[color:var(--sage-deep)] shadow-[0_0_10px_oklch(0.42_0.05_145_/_0.45)] ring-2 ring-[color:var(--cream)] ${marker.className}`}
                  aria-label={`Aggregated case marker ${index + 1}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cream)]" />
                </span>
              ))}
            </div>

            <div className="absolute left-[37%] top-[48%] w-32 rounded-xl border border-[color:var(--border)] bg-[color:var(--cream)]/95 p-2 shadow-[var(--shadow-card)]">
              <p className="text-[9px] font-semibold uppercase tracking-wide text-[color:var(--olive)]">Hotspot</p>
              <p className="mt-0.5 text-[11px] font-bold leading-tight text-[color:var(--sage-deep)]">Sitio Mabini</p>
              <p className="mt-0.5 text-[9px] leading-snug text-[color:var(--muted-foreground)]">18 high-priority hypertension follow-ups</p>
            </div>

            <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-[color:var(--cream)]/85 px-2.5 py-1.5 text-[10px] font-semibold text-[color:var(--sage-deep)] backdrop-blur">
              <Layers size={11} />
              Heat map
            </div>
            <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-[color:var(--cream)]/85 px-2.5 py-1.5 text-[10px] font-semibold text-[color:var(--sage-deep)] backdrop-blur">
              <Building2 size={11} />
              Health Center
            </div>
            <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--sage-deep)] px-2.5 py-1.5 text-[10px] font-bold text-[color:var(--cream)] shadow-[var(--shadow-card)]">
              <Navigation size={11} />
              North
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--mint-bg)] p-1 text-[11px] font-semibold">
            <span className="rounded-xl bg-[color:var(--cream)] px-3 py-2 text-center text-[color:var(--sage-deep)] shadow-[var(--shadow-card)]">
              Preview
            </span>
            <span className="px-3 py-2 text-center text-[color:var(--muted-foreground)]">Planner</span>
          </div>

          <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-[color:var(--olive)]">
                <span>Color legend</span>
                <span>Low to urgent</span>
              </div>
              <div className="h-2 rounded-full bg-[linear-gradient(90deg,var(--risk-low)_0%,var(--olive)_38%,var(--risk-moderate)_67%,var(--risk-high)_100%)]" />
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--mint-bg)] px-3 py-2 text-right">
              <p className="text-[10px] text-[color:var(--muted-foreground)]">Avg. priority</p>
              <p className="text-xl font-bold leading-none text-[color:var(--sage-deep)]">21<span className="text-xs text-[color:var(--muted-foreground)]">%</span></p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-3 gap-2.5">
          <Stat Icon={Users} label="Screened Residents" value="1,284" />
          <Stat Icon={AlertTriangle} label="Hotspots" value="5" tone="high" />
          <Stat Icon={ClipboardList} label="Follow-ups Needed" value="42" tone="moderate" />
        </div>

        <section className="rounded-2xl bg-[color:var(--cream)] p-4 shadow-[var(--shadow-card)]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--mint-bg)] text-[color:var(--sage-deep)]">
                <Thermometer size={15} />
              </div>
              <p className="text-sm font-semibold text-[color:var(--sage-deep)]">Specific concerns</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--mint-bg)] px-2 py-1 text-[10px] font-semibold text-[color:var(--sage-deep)]">
              <Eye size={10} />
              Preview
            </span>
          </div>

          <div className="space-y-2">
            {concerns.map((item) => (
              <div
                key={item.area}
                className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--mint-bg)]/45 p-3"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: item.color }} />
                  <p className="truncate text-xs font-semibold text-[color:var(--sage-deep)]">{item.area}</p>
                </div>
                <p className="shrink-0 text-[10px] font-semibold text-[color:var(--muted-foreground)]">
                  {item.metric}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-[color:var(--cream)] p-4 shadow-[var(--shadow-card)]">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--mint-bg)] text-[color:var(--sage-deep)]">
              <Activity size={15} />
            </div>
            <p className="text-sm font-semibold text-[color:var(--sage-deep)]">Planning insight</p>
          </div>
          <p className="text-xs leading-relaxed text-[color:var(--muted-foreground)]">
            Prioritize BHW visits around Sitio Mabini and the Palengke Area, then schedule
            household reminders for Purok 3 fever checks within the next barangay round.
          </p>
        </section>

        <div className="flex items-start gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--cream)]/70 p-3 text-xs text-[color:var(--muted-foreground)]">
          <Info size={14} className="mt-0.5 text-[color:var(--olive)]" />
          <p>Walang personal na impormasyon ang ipinapakita. Aggregated at illustrative data lamang.</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function HeatBlob({
  intensity,
  className,
}: {
  intensity: "low" | "moderate" | "high";
  className: string;
}) {
  const color =
    intensity === "high"
      ? "rgba(255,68,55,0.9)"
      : intensity === "moderate"
        ? "rgba(255,190,46,0.82)"
        : "rgba(110,255,89,0.72)";
  const core =
    intensity === "high"
      ? "rgba(255,45,111,0.7)"
      : intensity === "moderate"
        ? "rgba(246,248,88,0.7)"
        : "rgba(103,240,98,0.62)";

  return (
    <span
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[9px] ${className}`}
      style={{
        background: `radial-gradient(circle, ${core} 0 18%, ${color} 20% 36%, rgba(185,255,73,0.38) 46%, transparent 72%)`,
        boxShadow: `0 0 30px ${color}`,
        opacity: 0.9,
      }}
      aria-hidden="true"
    />
  );
}

function Stat({
  Icon,
  label,
  value,
  tone,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  tone?: "high" | "moderate";
}) {
  const color =
    tone === "high"
      ? "var(--risk-high)"
      : tone === "moderate"
        ? "var(--risk-moderate)"
        : "var(--sage-deep)";

  return (
    <div className="rounded-2xl bg-[color:var(--cream)] p-3 shadow-[var(--shadow-card)]">
      <div
        className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--mint-bg)]"
        style={{ color }}
      >
        <Icon size={14} />
      </div>
      <p className="text-lg font-bold" style={{ color }}>
        {value}
      </p>
      <p className="text-[10px] leading-tight text-[color:var(--muted-foreground)]">{label}</p>
    </div>
  );
}
