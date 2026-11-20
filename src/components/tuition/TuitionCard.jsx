import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

const TuitionCard = ({ tuition }) => {
  const image =
    tuition.bannerImage || "https://picsum.photos/seed/mentorlagbe/800/450";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={tuition.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3">{tuition.subject}</Badge>
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
            tuition.mode === "Online"
              ? "bg-sky-500 text-white"
              : "bg-amber-400 text-amber-950"
          }`}
        >
          {tuition.mode}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-[3.25rem] text-lg font-bold leading-snug">
          {tuition.title}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {tuition.classLevel}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
            {tuition.tutorName?.charAt(0)}
          </span>

          <span className="truncate text-muted-foreground">
            {tuition.tutorName}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t pt-4">
          <p className="text-xl font-extrabold text-primary">
            ৳{Number(tuition.monthlyFee).toLocaleString("en-US")}
            <span className="text-xs font-medium text-muted-foreground">
              {" "}
              /month
            </span>
          </p>

          <Link
            href={`/tuitions/${tuition._id}`}
            className={buttonVariants({ size: "sm" })}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TuitionCard;
