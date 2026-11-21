"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { useFetch } from "@/hooks/useFetch";
import { useRequireRole } from "@/hooks/useRequireRole";
import { buttonVariants } from "@/components/ui/button";
import PageHeader from "@/components/dashboard/PageHeader";
import PageSkeleton from "@/components/dashboard/PageSkeleton";
import TuitionForm from "@/components/dashboard/TuitionForm";

const PostTuitionPage = () => {
  const ready = useRequireRole("tutor");

  const router = useRouter();
  const { user } = useAuth();

  const { data: myTuitions, loading } = useFetch(
    ready ? "/tutor/tuitions" : null,
  );

  if (!ready || loading || !myTuitions) return <PageSkeleton />;

  const limitReached = user.plan !== "pro" && myTuitions.length >= 2;

  const handleSubmit = async (form) => {
    const { ok, data } = await apiFetch("/tuitions", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (!ok) return toast.error(data.message || "Could not post tuition");

    toast.success("Tuition submitted! Waiting for admin approval.");
    router.push("/dashboard/tutor/my-tuitions");
  };

  return (
    <div>
      <PageHeader
        title="Post a Tuition"
        text={
          user.plan === "pro"
            ? "Pro plan: unlimited posts."
            : `Free plan: ${myTuitions.length}/2 posts used.`
        }
      />

      {limitReached ? (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-8 text-center text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
          <h3 className="text-lg font-bold">Free plan limit reached</h3>
          <p className="mt-1 text-sm">
            Upgrade to Pro for unlimited tuition posts.
          </p>
          <Link href="/pricing" className={`${buttonVariants()} mt-4`}>
            Upgrade to Pro
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border bg-card p-5 sm:p-8">
          <TuitionForm
            submitLabel="Submit for Approval"
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};
export default PostTuitionPage;
