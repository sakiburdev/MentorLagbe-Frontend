import TuitionsClient from "./TuitionsClient";

export const metadata = {
  title: "Tuition Approval | MentorLagbe Admin",
  description: "Approve or reject tuition posts submitted by tutors.",
};

// Disable Instant Navigation validation for this route.
export const instant = false;

export default function ProfilePage() {
  return <TuitionsClient />;
}
