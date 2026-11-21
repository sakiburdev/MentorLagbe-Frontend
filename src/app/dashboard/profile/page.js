import ProfileClient from "./ProfileClient";

export const metadata = {
  title: "Update Profile | MentorLagbe",
  description: "Update your name, phone, bio and profile picture.",
};

// Disable Instant Navigation validation for this route.
export const instant = false;

export default function ProfilePage() {
  return <ProfileClient />;
}
