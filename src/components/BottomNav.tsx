import { Link, useLocation } from "@tanstack/react-router";
import { Home, ShieldCheck, MapPin, Lightbulb, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/check", label: "Check", icon: ShieldCheck },
  { to: "/map", label: "Map", icon: MapPin },
  { to: "/tips", label: "Tips", icon: Lightbulb },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 mt-auto border-t border-[color:var(--border)] bg-[color:var(--cream)]/95 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--cream)]/80">
      <ul className="grid grid-cols-5 px-2 pt-2 pb-3">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <li key={to} className="flex">
              <Link
                to={to}
                className="mx-auto flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-colors"
                style={{
                  color: active ? "var(--sage-deep)" : "var(--muted-foreground)",
                }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-all"
                  style={{
                    background: active ? "var(--sage-soft)" : "transparent",
                  }}
                >
                  <Icon size={20} strokeWidth={active ? 2.4 : 2} />
                </span>
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
