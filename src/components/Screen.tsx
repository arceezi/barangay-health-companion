import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function ScreenHeader({
  title,
  back,
  right,
}: {
  title?: string;
  back?: string;
  right?: ReactNode;
}) {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between bg-[color:var(--mint-bg)]/85 px-5 pt-5 pb-3 backdrop-blur">
      <div className="flex min-w-0 items-center gap-2">
        {back && (
          <Link
            to={back}
            className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--cream)] text-[color:var(--sage-deep)] shadow-[var(--shadow-card)]"
            aria-label="Back"
          >
            <ChevronLeft size={20} />
          </Link>
        )}
        {title && (
          <h1 className="truncate text-lg font-semibold text-[color:var(--sage-deep)]">
            {title}
          </h1>
        )}
      </div>
      <div>{right}</div>
    </div>
  );
}

export function Screen({ children }: { children: ReactNode }) {
  return <div className="flex min-h-full flex-col pb-2">{children}</div>;
}