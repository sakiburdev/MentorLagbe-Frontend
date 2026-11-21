import DashboardRedirect from "./DashboardRedirect";

// Disable Instant Navigation validation for this route.
export const instant = false;

export default function ProfilePage() {
  return <DashboardRedirect />;
}
