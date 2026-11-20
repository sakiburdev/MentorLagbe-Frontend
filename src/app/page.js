import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Hero from "@/components/home/Hero";
import SubjectsStats from "@/components/home/SubjectsStats";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import HowItWorks from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/PricingSection";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <SubjectsStats />
      <FeaturedTuitions />
      <HowItWorks />
      <PricingSection />
      <Testimonials />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-teal-600 to-teal-800 px-6 py-14 text-center text-white">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to start your journey?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-teal-100">
            Join MentorLagbe today and connect with the right tutor or the right
            students.
          </p>
          <Link
            href="/sign-up"
            className={`${buttonVariants({ size: "lg" })} mt-8 bg-amber-400 text-amber-950 hover:bg-amber-300`}
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </>
  );
}
