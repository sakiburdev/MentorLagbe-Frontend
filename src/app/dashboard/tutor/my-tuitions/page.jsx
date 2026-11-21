"use client";
import { useState } from "react";
import Link from "next/link";
import { LuPencil, LuPower, LuTrash2, LuX } from "react-icons/lu";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import { useRequireRole } from "@/hooks/useRequireRole";
import { Button, buttonVariants } from "@/components/ui/button";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/dashboard/PageHeader";
import PageSkeleton from "@/components/dashboard/PageSkeleton";
import StatusBadge from "@/components/dashboard/StatusBadge";
import TuitionForm from "@/components/dashboard/TuitionForm";
import Image from "next/image";

const MyTuitionsPage = () => {
  const ready = useRequireRole("tutor");

  const {
    data: tuitions,
    loading,
    reload,
  } = useFetch(ready ? "/tutor/tuitions" : null);

  const [editing, setEditing] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tuition permanently?")) return;

    const { ok, data } = await apiFetch(`/tuitions/${id}`, {
      method: "DELETE",
    });

    if (!ok) return toast.error(data.message || "Could not delete");

    toast.success("Tuition deleted");
    reload();
  };

  const handleToggle = async (tuition) => {
    const { ok, data } = await apiFetch(`/tuitions/${tuition._id}/toggle`, {
      method: "PATCH",
      body: JSON.stringify({ isActive: !tuition.isActive }),
    });

    if (!ok) return toast.error(data.message || "Could not update");

    toast.success(tuition.isActive ? "Tuition closed" : "Tuition activated");
    reload();
  };

  const handleUpdate = async (form) => {
    const { ok, data } = await apiFetch(`/tuitions/${editing._id}`, {
      method: "PATCH",
      body: JSON.stringify(form),
    });

    if (!ok) return toast.error(data.message || "Could not update");

    toast.success("Tuition updated");
    setEditing(null);
    reload();
  };

  if (!ready || loading || !tuitions) return <PageSkeleton />;

  return (
    <div>
      <PageHeader title="My Tuitions" text="Manage every batch you created.">
        <Link href="/dashboard/tutor/post-tuition" className={buttonVariants()}>
          Post New
        </Link>
      </PageHeader>

      {tuitions.length === 0 ? (
        <EmptyState
          title="No tuitions yet"
          text="Post your first tuition to get started."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {tuitions.map((item) => (
            <div
              key={item._id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={item.bannerImage}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap gap-2">
                  <StatusBadge status={item.approvalStatus} />
                  <StatusBadge status={item.isActive ? "active" : "closed"} />
                </div>
                <h3 className="line-clamp-2 min-h-[3rem] font-bold">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.subject} • {item.mode} • ৳
                  {Number(item.monthlyFee).toLocaleString("en-US")}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 border-t pt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditing(item)}
                  >
                    <LuPencil className="mr-1 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggle(item)}
                  >
                    <LuPower className="mr-1 h-4 w-4" />{" "}
                    {item.isActive ? "Close" : "Open"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive"
                    onClick={() => handleDelete(item._id)}
                  >
                    <LuTrash2 className="mr-1 h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4">
          <div className="my-8 w-full max-w-3xl rounded-2xl bg-card p-5 sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit Tuition</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditing(null)}
                aria-label="Close"
              >
                <LuX className="h-5 w-5" />
              </Button>
            </div>
            <TuitionForm
              initial={{
                title: editing.title,
                subject: editing.subject,
                classLevel: editing.classLevel,
                mode: editing.mode,
                location: editing.location,
                monthlyFee: editing.monthlyFee,
                daysPerWeek: editing.daysPerWeek,
                bannerImage: editing.bannerImage,
                description: editing.description,
              }}
              submitLabel="Save Changes"
              onSubmit={handleUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default MyTuitionsPage;
