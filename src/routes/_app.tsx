import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}