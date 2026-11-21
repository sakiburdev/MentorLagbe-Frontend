import HowItWorks from "@/components/home/HowItWorks";

export const metadata = {
  title: "How It Works | MentorLagbe",
  description: "Learn how students find tutors and how tutors post tuition batches on MentorLagbe.",
};

// Disable Instant Navigation validation for this route.
export const instant = false;

export default function ProfilePage() {
  return <HowItWorks />;
}
