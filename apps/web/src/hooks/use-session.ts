"use client";

import { useCallback, useEffect, useState } from "react";
import { setCachedAccessToken } from "@/lib/auth-token";
import { api } from "@/lib/api";

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
};

type SessionState = {
  user: AuthUser | null;
  accessToken: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

export function useSession(): SessionState {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session", { credentials: "include" });
      const data = (await res.json()) as {
        user: AuthUser | null;
        accessToken: string | null;
      };
      setUser(data.user);
      setAccessToken(data.accessToken);
      setCachedAccessToken(data.accessToken);

      // Persist / refresh user row in Postgres (Supabase)
      if (data.user && data.accessToken) {
        try {
          const { user: saved } = await api.me();
          setUser({
            id: saved.id,
            email: saved.email,
            name: saved.name ?? undefined,
            picture: saved.picture ?? undefined,
          });
        } catch (err) {
          console.warn("Failed to sync user to database:", err);
        }
      }
    } catch {
      setUser(null);
      setAccessToken(null);
      setCachedAccessToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    setAccessToken(null);
    setCachedAccessToken(null);
  }, []);

  return { user, accessToken, loading, refresh, logout };
}
