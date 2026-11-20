import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { apiFetch } from "@/lib/api";
import { buttonVariants } from "@/components/ui/button";
import FadeIn from "@/components/shared/FadeIn";
import SectionHeading from "@/components/shared/SectionHeading";
import TuitionCard from "@/components/tuition/TuitionCard";

const FeaturedTuitions = async () => {
  const { data } = await apiFetch("/tuitions/featured");
  const tuitions = Array.isArray(data) ? data : [];

  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          tag="Featured"
          title="Latest Tuition Batches"
          text="Freshly approved batches and 1-on-1 mentorship from top tutors."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((tuition, index) => (
            <FadeIn key={tuition._id} delay={index * 0.08} className="h-full">
              <TuitionCard tuition={tuition} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/tuitions" className={buttonVariants({ size: "lg" })}>
            Browse All Tuitions <LuArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
export default FeaturedTuitions;
