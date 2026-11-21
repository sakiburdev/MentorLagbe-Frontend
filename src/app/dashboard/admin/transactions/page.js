import TransactionsClient from "./TransactionsClient";

export const metadata = {
  title: "Transactions | MentorLagbe Admin",
  description: "All Pro plan payments made through Stripe.",
};

// Disable Instant Navigation validation for this route.
export const instant = false;

export default function ProfilePage() {
  return <TransactionsClient />;
}
