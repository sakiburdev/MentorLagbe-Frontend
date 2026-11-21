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

const ApplicantsPage = () => {
  const ready = useRequireRole("tutor");
  const {
    data: applicants,
    loading,
    reload,
  } = useFetch(ready ? "/applications/tutor" : null);

  const updateStatus = async (id, status) => {
    const { ok, data } = await apiFetch(`/applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    if (!ok) return toast.error(data.message || "Could not update");

    toast.success(`Application ${status}`);
    reload();
  };

  if (!ready || loading || !applicants) return <PageSkeleton />;

  return (
    <div>
      <PageHeader
        title="Applicants"
        text="Students who applied to your tuitions."
      />

      {applicants.length === 0 ? (
        <EmptyState
          title="No applicants yet"
          text="Applications will appear here once students apply."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Schedule</th>
                <th className="px-4 py-3">Note</th>
                <th className="px-4 py-3">Tuition</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {applicants.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-3 font-semibold">
                    {item.studentName}
                    <p className="text-xs font-normal text-muted-foreground">
                      {item.studentEmail}
                    </p>
                  </td>
                  <td className="px-4 py-3">{item.studentPhone}</td>
                  <td className="px-4 py-3">{item.preferredSchedule}</td>
                  <td className="max-w-[220px] px-4 py-3 text-muted-foreground">
                    <p className="line-clamp-2">{item.studentNote || "-"}</p>
                  </td>
                  <td className="px-4 py-3">{item.tuitionTitle}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        disabled={item.status === "accepted"}
                        onClick={() => updateStatus(item._id, "accepted")}
                      >
                        <LuCheck className="mr-1 h-4 w-4" /> Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive"
                        disabled={item.status === "rejected"}
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
export default ApplicantsPage;
