import StudentDashboardClient from "./StudentDashboardClient";

export const metadata = {
  title: "Student Overview | MentorLagbe",
  description: "Your applications, accepted tuitions and current plan at a glance.",
};

// Disable Instant Navigation validation for this route.
export const instant = false;

export default function StudentOverviewPage() {
  return <StudentDashboardClient />;
}
