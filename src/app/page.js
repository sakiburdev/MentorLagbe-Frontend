import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/PricingSection";
import SubjectsStats from "@/components/home/SubjectsStats";

export default function Home() {
   return (
    <>
      <Hero />
      <SubjectsStats/>
      <FeaturedTuitions/>
      <HowItWorks/>
      <PricingSection/>
    </>
  );
}
