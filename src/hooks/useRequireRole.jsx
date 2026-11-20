"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export function useRequireRole(role) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/sign-in");
    else if (user.role !== role) router.replace("/dashboard");
  }, [loading, user, role, router]);

  return !loading && user?.role === role;
}
