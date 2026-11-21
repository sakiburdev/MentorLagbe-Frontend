"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default function GlobalError({ error, reset }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-extrabold text-destructive">Oops!</p>
      <h1 className="mt-4 text-3xl font-extrabold">Something went wrong</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        {error?.message || "An unexpected error happened. Please try again."}
      </p>
      <div className="mt-8 flex gap-3">
        <Button size="lg" variant="outline" onClick={() => reset()}>
          Try Again
        </Button>
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
