import PostTuitionClient from "./PostTuitionClient";

export const metadata = {
  title: "Post Tuition | MentorLagbe",
  description: "Create a new tuition batch and submit it for admin approval.",
};

// Disable Instant Navigation validation for this route.
export const instant = false;

export default function ProfilePage() {
  return <PostTuitionClient />;
}
