import ApplicantsClient from "./ApplicantsClient";

export const metadata = {
  title: "Applicants | MentorLagbe",
  description: "Review and manage students who applied to your tuitions.",
};

// Disable Instant Navigation validation for this route.
export const instant = false;

export default function ProfilePage() {
  return <ApplicantsClient />;
}
