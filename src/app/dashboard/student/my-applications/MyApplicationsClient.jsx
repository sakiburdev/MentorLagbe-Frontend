"use client";

import Link from "next/link";
import { LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import { useRequireRole } from "@/hooks/useRequireRole";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/dashboard/PageHeader";
import PageSkeleton from "@/components/dashboard/PageSkeleton";
import StatusBadge from "@/components/dashboard/StatusBadge";

export default function MyApplicationsClient() {
  const ready = useRequireRole("student");

  const {
    data: applications,
    loading,
    reload,
  } = useFetch(ready ? "/applications/my" : null);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this application?")) return;

    const { ok, data } = await apiFetch(`/applications/${id}`, {
      method: "DELETE",
    });

    if (!ok) return toast.error(data.message || "Could not cancel");

    toast.success("Application cancelled");
    reload();
  };

  if (!ready || loading || !applications) return <PageSkeleton />;

  return (
    <div>
      <PageHeader
        title="My Applications"
        text="Track the status of every tuition you applied for."
      />

      {applications.length === 0 ? (
        <EmptyState
          title="No applications yet"
          text="Find a tuition and apply to see it here."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Tuition</th>
                <th className="px-4 py-3">Tutor</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {applications.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-3 font-semibold">
                    <Link
                      href={`/tuitions/${item.tuitionId}`}
                      className="hover:text-primary"
                    >
                      {item.tuitionTitle}
                    </Link>

                    <p className="text-xs font-normal text-muted-foreground">
                      {item.subject}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    {item.tutorName}
                    <p className="text-xs text-muted-foreground">
                      {item.tutorEmail}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    ৳{Number(item.monthlyFee).toLocaleString("en-US")}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(item.appliedAt).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-4 py-3 text-right">
                    {item.status === "pending" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive"
                        onClick={() => handleCancel(item._id)}
                      >
                        <LuTrash2 className="mr-1 h-4 w-4" />
                        Cancel
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
