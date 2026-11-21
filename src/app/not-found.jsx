import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Page Not Found | MentorLagbe" };

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">Page not found</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className={`${buttonVariants({ size: "lg" })} mt-8`}>
        Back to Home
      </Link>
    </div>
  );
}
