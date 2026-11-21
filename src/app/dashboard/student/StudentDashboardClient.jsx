
"use client";

import Link from "next/link";
import { LuCheck, LuClipboardList, LuClock, LuCrown } from "react-icons/lu";
import { useFetch } from "@/hooks/useFetch";
import { useRequireRole } from "@/hooks/useRequireRole";
import { buttonVariants } from "@/components/ui/button";
import PageHeader from "@/components/dashboard/PageHeader";
import PageSkeleton from "@/components/dashboard/PageSkeleton";
import StatsCard from "@/components/dashboard/StatsCard";

const StudentDashboardClient = () => {
  const ready = useRequireRole("student");

  const { data: stats, loading } = useFetch(
    ready ? "/stats/student" : null,
  );

  if (!ready || loading || !stats) return <PageSkeleton />;

  return (
    <div>
      <PageHeader
        title="Student Overview"
        text="Your learning journey at a glance."
      >
        <Link href="/tuitions" className={buttonVariants()}>
          Browse Tuitions
        </Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          Icon={LuClipboardList}
          label="Total Applied"
          value={stats.total}
          tone="teal"
        />

        <StatsCard
          Icon={LuCheck}
          label="Accepted"
          value={stats.accepted}
          tone="sky"
        />

        <StatsCard
          Icon={LuClock}
          label="Pending"
          value={stats.pending}
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
              Upgrade to Pro for priority booking
            </h3>

            <p className="text-sm text-teal-100">
              One-time payment of $10 with Stripe.
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

export default StudentDashboardClient;
