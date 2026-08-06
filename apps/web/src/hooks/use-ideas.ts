"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateIdeaInput, IdeaStatus, UpdateIdeaInput } from "@createvity/shared";
import { api } from "@/lib/api";
import { useSession } from "./use-session";

export function useIdeas(status?: IdeaStatus | "all") {
  const { user, accessToken } = useSession();
  return useQuery({
    queryKey: ["ideas", status ?? "all", user?.id],
    enabled: Boolean(user && accessToken),
    queryFn: () =>
      api.listIdeas(status && status !== "all" ? { status } : undefined),
  });
}

export function useCreateIdea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateIdeaInput) => api.createIdea(body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["ideas"] });
    },
  });
}

export function useUpdateIdea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateIdeaInput }) =>
      api.updateIdea(id, body),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["ideas"] });
    },
  });
}

export function useDeleteIdea() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteIdea(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["ideas"] });
    },
  });
}

export function useProfile() {
  const { user, accessToken } = useSession();
  return useQuery({
    queryKey: ["profile", user?.id],
    enabled: Boolean(user && accessToken),
    queryFn: () => api.getProfile(),
  });
}
