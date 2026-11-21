import MyTuitionsClient from "./MyTuitionsClient";

export const metadata = {
  title: "My Tuitions | MentorLagbe",
  description: "Edit, close or delete the tuition batches you created.",
};

// Disable Instant Navigation validation for this route.
export const instant = false;

export default function ProfilePage() {
  return <MyTuitionsClient />;
}
