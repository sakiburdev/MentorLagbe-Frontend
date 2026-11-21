"use client";
import { LuCheck, LuX } from "react-icons/lu";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import { useRequireRole } from "@/hooks/useRequireRole";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/dashboard/PageHeader";
import PageSkeleton from "@/components/dashboard/PageSkeleton";
import StatusBadge from "@/components/dashboard/StatusBadge";

const AdminTuitionsPage = () => {
  const ready = useRequireRole("admin");

  const {
    data: tuitions,
    loading,
    reload,
  } = useFetch(ready ? "/admin/tuitions" : null);

  const updateStatus = async (id, approvalStatus) => {
    const { ok, data } = await apiFetch(`/admin/tuitions/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ approvalStatus }),
    });

    if (!ok) return toast.error(data.message || "Could not update");

    toast.success(`Tuition ${approvalStatus}`);
    reload();
  };

  if (!ready || loading || !tuitions) return <PageSkeleton />;

  return (
    <div>
      <PageHeader
        title="Tuition Approval"
        text="Review posts submitted by tutors."
      />

      {tuitions.length === 0 ? (
        <EmptyState title="No tuitions submitted" />
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Tuition</th>
                <th className="px-4 py-3">Tutor</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Posted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {tuitions.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-3 font-semibold">
                    {item.title}
                    <p className="text-xs font-normal text-muted-foreground">
                      {item.subject} • {item.mode}
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
                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.approvalStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        disabled={item.approvalStatus === "approved"}
                        onClick={() => updateStatus(item._id, "approved")}
                      >
                        <LuCheck className="mr-1 h-4 w-4" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive"
                        disabled={item.approvalStatus === "rejected"}
                        onClick={() => updateStatus(item._id, "rejected")}
                      >
                        <LuX className="mr-1 h-4 w-4" /> Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default AdminTuitionsPage;
