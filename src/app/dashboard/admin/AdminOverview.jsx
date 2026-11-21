"use client";
import {
  LuDollarSign,
  LuFileText,
  LuGraduationCap,
  LuUsers,
} from "react-icons/lu";
import { useFetch } from "@/hooks/useFetch";
import { useRequireRole } from "@/hooks/useRequireRole";
import PageHeader from "@/components/dashboard/PageHeader";
import PageSkeleton from "@/components/dashboard/PageSkeleton";
import StatsCard from "@/components/dashboard/StatsCard";

const AdminOverviewPage = () => {
  const ready = useRequireRole("admin");
  const { data: stats, loading } = useFetch(ready ? "/stats/admin" : null);

  if (!ready || loading || !stats) return <PageSkeleton />;

  return (
    <div>
      <PageHeader
        title="Admin Overview"
        text="Platform statistics in real time."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          Icon={LuUsers}
          label="Total Users"
          value={stats.totalUsers}
          tone="teal"
        />
        <StatsCard
          Icon={LuGraduationCap}
          label="Total Tutors"
          value={stats.totalTutors}
          tone="sky"
        />
        <StatsCard
          Icon={LuFileText}
          label="Pending / Approved"
          value={`${stats.pendingTuitions} / ${stats.approvedTuitions}`}
          tone="amber"
        />
        <StatsCard
          Icon={LuDollarSign}
          label="Stripe Revenue"
          value={`$${stats.totalRevenue}`}
          tone="rose"
        />
      </div>
    </div>
  );
};
export default AdminOverviewPage;
