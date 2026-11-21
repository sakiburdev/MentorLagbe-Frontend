"use client";
import Link from "next/link";
import { LuBookOpen, LuCircleCheck, LuCrown, LuUsers } from "react-icons/lu";
import { useFetch } from "@/hooks/useFetch";
import { useRequireRole } from "@/hooks/useRequireRole";
import { buttonVariants } from "@/components/ui/button";
import PageHeader from "@/components/dashboard/PageHeader";
import PageSkeleton from "@/components/dashboard/PageSkeleton";
import StatsCard from "@/components/dashboard/StatsCard";

const TutorOverviewPage = () => {
  const ready = useRequireRole("tutor");
  const { data: stats, loading } = useFetch(ready ? "/stats/tutor" : null);

  if (!ready || loading || !stats) return <PageSkeleton />;

  return (
    <div>
      <PageHeader
        title="Tutor Overview"
        text="Your batches and applicants at a glance."
      >
        <Link href="/dashboard/tutor/post-tuition" className={buttonVariants()}>
          Post a Tuition
        </Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          Icon={LuBookOpen}
          label="Tuitions Posted"
          value={stats.totalTuitions}
          tone="teal"
        />
        <StatsCard
          Icon={LuCircleCheck}
          label="Active / Approved"
          value={stats.approvedTuitions}
          tone="sky"
        />
        <StatsCard
          Icon={LuUsers}
          label="Total Applicants"
          value={stats.totalApplicants}
          tone="amber"
        />
        <StatsCard
          Icon={LuCrown}
          label="Current Plan"
          value={stats.plan}
          tone="rose"
        />
      </div>

      {stats.plan !== "pro" && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-800 p-6 text-white">
          <div>
            <h3 className="text-lg font-bold">
              Go Pro: unlimited posts and a verified badge
            </h3>
            <p className="text-sm text-teal-100">
              One-time payment of $15 with Stripe.
            </p>
          </div>
          <Link
            href="/pricing"
            className={`${buttonVariants()} bg-amber-400 text-amber-950 hover:bg-amber-300`}
          >
            See Pro Plan
          </Link>
        </div>
      )}
    </div>
  );
};
export default TutorOverviewPage;
