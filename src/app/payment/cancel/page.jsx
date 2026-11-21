import Link from "next/link";
import { LuCircleX } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Payment Cancelled | MentorLagbe" };

const PaymentCancelPage = () => {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <LuCircleX className="h-16 w-16 text-amber-500" />
      <h1 className="mt-4 text-3xl font-extrabold">Payment Cancelled</h1>
      <p className="mt-2 text-muted-foreground">
        No money was charged. You can upgrade anytime.
      </p>
      <Link href="/pricing" className={`${buttonVariants()} mt-6`}>
        Back to Pricing
      </Link>
    </div>
  );
};
export default PaymentCancelPage;
