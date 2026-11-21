import MyApplicationsClient from "./MyApplicationsClient";

export const metadata = {
  title: "My Applications | MentorLagbe",
  description: "Track the status of every tuition you applied for.",
};

// Disable Instant Navigation validation for this route.
export const instant = false;

export default function MyApplicationsPage() {
  return <MyApplicationsClient />;
}
