"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || !user) return;
    router.replace(`/dashboard/${user.role}`);
  }, [loading, user, router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
    </div>
  );
}
DashboardRedirect
