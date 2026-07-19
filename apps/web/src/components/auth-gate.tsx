"use client";

import type { ReactNode } from "react";
import { useSession } from "@/hooks/use-session";
import { LandingPage } from "./landing-page";

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useSession();

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center p-6">
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return <>{children}</>;
}

