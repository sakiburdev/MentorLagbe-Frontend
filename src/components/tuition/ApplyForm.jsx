"use client";
import { useState } from "react";
import Link from "next/link";
import { LuCircleCheck, LuInfo } from "react-icons/lu";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { apiFetch } from "@/lib/api";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

const ApplyForm = ({ tuitionId }) => {
  const { user, loading } = useAuth();

  const [form, setForm] = useState({
    studentPhone: "",
    preferredSchedule: "",
    studentNote: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.studentPhone.trim().length < 10)
      return toast.error("Enter a valid phone number");
    
    if (!form.preferredSchedule.trim())
      return toast.error("Preferred schedule is required");

    setSubmitting(true);

    const { ok, data } = await apiFetch("/applications", {
      method: "POST",
      body: JSON.stringify({ tuitionId, ...form }),
    });
    setSubmitting(false);

    if (!ok) return toast.error(data.message || "Could not submit application");

    toast.success("Application submitted successfully!");
    setApplied(true);
  };

  if (loading) return <Skeleton className="h-72 rounded-2xl" />;

  if (!user) {
    return (
      <div className="rounded-2xl border bg-card p-6 text-center">
        <LuInfo className="mx-auto h-8 w-8 text-primary" />
        <h3 className="mt-3 font-bold">Sign in to apply</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Only students can apply for tuitions.
        </p>
        <Link href="/sign-in" className={`${buttonVariants()} mt-4 w-full`}>
          Sign In
        </Link>
      </div>
    );
  }

  if (user.role !== "student") {
    return (
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 text-center text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
        <LuInfo className="mx-auto h-8 w-8" />
        <h3 className="mt-3 font-bold">Applications are for students only</h3>
        <p className="mt-1 text-sm">You are signed in as a {user.role}.</p>
        <Button disabled className="mt-4 w-full">
          Apply Now
        </Button>
      </div>
    );
  }

  if (applied) {
    return (
      <div className="rounded-2xl border bg-card p-6 text-center">
        <LuCircleCheck className="mx-auto h-10 w-10 text-primary" />
        <h3 className="mt-3 font-bold">Application sent!</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          The tutor will review it soon.
        </p>
        <Link
          href="/dashboard/student/my-applications"
          className={`${buttonVariants({ variant: "outline" })} mt-4 w-full`}
        >
          View My Applications
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border bg-card p-6"
    >
      <h3 className="text-lg font-bold">Apply for this Tuition</h3>

      <div className="space-y-2">
        <Label htmlFor="studentPhone">Phone</Label>
        <Input
          id="studentPhone"
          name="studentPhone"
          placeholder="01XXXXXXXXX"
          value={form.studentPhone}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferredSchedule">Preferred Schedule</Label>
        <Input
          id="preferredSchedule"
          name="preferredSchedule"
          placeholder="Sat, Mon, Wed - 6:00 PM"
          value={form.preferredSchedule}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="studentNote">Learning Note</Label>
        <Textarea
          id="studentNote"
          name="studentNote"
          rows={4}
          placeholder="Tell the tutor what you want to learn..."
          value={form.studentNote}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="h-11 w-full" disabled={submitting}>
        {submitting ? "Submitting..." : "Apply Now"}
      </Button>
    </form>
  );
};
export default ApplyForm;
