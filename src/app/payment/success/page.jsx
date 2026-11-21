"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { apiFetch } from "@/lib/api";
import { buttonVariants } from "@/components/ui/button";

function SuccessContent() {
  const sessionId = useSearchParams().get("session_id");
  const { user, loading, refresh } = useAuth();
  const called = useRef(false);
  const [status, setStatus] = useState(sessionId ? "checking" : "failed");

  useEffect(() => {
    if (loading || !user || !sessionId || called.current) return;
    called.current = true;

    apiFetch("/payments/verify", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    }).then(async ({ ok, data }) => {
      if (ok) {
        await refresh();
        setStatus("done");
        toast.success("You are now a Pro member!");
      } else {
        setStatus("failed");
        toast.error(data.message || "Payment verification failed");
      }
    });
  }, [loading, user, sessionId]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      {status === "checking" && (
        <>
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="mt-4 text-muted-foreground">
            Verifying your payment...
          </p>
        </>
      )}
      {status === "done" && (
        <>
          <LuCircleCheck className="h-16 w-16 text-primary" />
          <h1 className="mt-4 text-3xl font-extrabold">Payment Successful</h1>
          <p className="mt-2 text-muted-foreground">
            Your account has been upgraded to Pro.
          </p>
          <Link href="/dashboard" className={`${buttonVariants()} mt-6`}>
            Go to Dashboard
          </Link>
        </>
      )}
      {status === "failed" && (
        <>
          <LuCircleX className="h-16 w-16 text-destructive" />
          <h1 className="mt-4 text-3xl font-extrabold">
            Could not verify payment
          </h1>
          <p className="mt-2 text-muted-foreground">
            If money was deducted, please contact support.
          </p>
          <Link href="/pricing" className={`${buttonVariants()} mt-6`}>
            Back to Pricing
          </Link>
        </>
      )}
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
