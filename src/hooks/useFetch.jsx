"use client";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { apiFetch } from "@/lib/api";

export function useFetch(path) {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await apiFetch(path);

    if (result.ok) setData(result.data);
    else toast.error(result.data.message || "Failed to load data");

    setLoading(false);
  }, [path]);

  useEffect(() => {
    if (!path || authLoading || !user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, authLoading, user?.email, load]);

  return { data, loading, reload: load };
}
