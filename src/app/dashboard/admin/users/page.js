import UsersClient from "./UsersClient";

export const metadata = {
  title: "User Management | MentorLagbe Admin",
  description: "View all users and manage their roles.",
};

// Disable Instant Navigation validation for this route.
export const instant = false;

export default function ProfilePage() {
  return <UsersClient />;
}
