import { notFound } from "next/navigation";
import {
  LuBanknote,
  LuCalendarDays,
  LuGraduationCap,
  LuMapPin,
} from "react-icons/lu";
import { apiFetch } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import ApplyForm from "@/components/tuition/ApplyForm";
import Image from "next/image";

const TuitionDetailsPage = async ({ params }) => {
  const { id } = await params;
  const { ok, data: tuition } = await apiFetch(`/tuitions/${id}`);

  if (!ok || tuition.approvalStatus !== "approved") notFound();

  const infoItems = [
    { Icon: LuGraduationCap, label: "Class Level", value: tuition.classLevel },
    {
      Icon: LuCalendarDays,
      label: "Schedule",
      value: `${tuition.daysPerWeek} days / week`,
    },
    {
      Icon: LuMapPin,
      label: "Mode & Location",
      value: `${tuition.mode} • ${tuition.location}`,
    },
    {
      Icon: LuBanknote,
      label: "Monthly Fee",
      value: `৳${Number(tuition.monthlyFee).toLocaleString("en-US")}`,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="aspect-video overflow-hidden rounded-2xl">
            <Image
              src={
                tuition.bannerImage ||
                "https://picsum.photos/seed/mentorlagbe/800/450"
              }
              alt={tuition.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>{tuition.subject}</Badge>
            <Badge variant="outline">{tuition.mode}</Badge>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {tuition.title}
          </h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {infoItems.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border bg-card p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-bold">About this Tuition</h2>
          <p className="mt-2 whitespace-pre-line text-muted-foreground">
            {tuition.description}
          </p>

          <h2 className="mt-8 text-xl font-bold">Your Tutor</h2>
          <div className="mt-3 flex items-center gap-4 rounded-xl border bg-card p-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              {tuition.tutorName?.charAt(0)}
            </span>
            <div>
              <p className="font-bold">{tuition.tutorName}</p>
              <p className="text-sm text-muted-foreground">
                {tuition.tutorEmail}
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-4 self-start lg:sticky lg:top-24">
          <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 p-6 text-white">
            <p className="text-sm text-teal-100">Monthly Fee</p>
            <p className="text-4xl font-extrabold">
              ৳{Number(tuition.monthlyFee).toLocaleString("en-US")}
            </p>
          </div>
          <ApplyForm tuitionId={tuition._id} />
        </aside>
      </div>
    </div>
  );
};
export default TuitionDetailsPage;
