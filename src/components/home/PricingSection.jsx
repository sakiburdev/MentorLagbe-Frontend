"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuCheck } from "react-icons/lu";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { apiFetch } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";

const plans = {
  student: {
    price: 10,
    free: [
      "Browse all approved tuitions",
      "Apply to tuitions",
      "Track application status",
    ],
    pro: [
      "Everything in Free",
      "Priority booking",
      "Pro badge on your profile",
    ],
  },
  tutor: {
    price: 15,
    free: ["Post up to 2 tuitions", "Manage applicants", "Basic tutor profile"],
    pro: ["Unlimited tuition posts", "Verified badge", "Everything in Free"],
  },
};

const PricingSection = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [audience, setAudience] = useState("student");
  const [paying, setPaying] = useState(false);

  const plan = plans[audience];

  const handleSubscribe = async () => {
    if (!user) {
      toast.error("Please sign in first");
      return router.push("/sign-in");
    }

    if (user.role !== audience) {
      return toast.error(
        `This plan is for ${audience}s. You are signed in as a ${user.role}.`,
      );
    }

    if (user.plan === "pro") return toast.info("You are already a Pro member");

    setPaying(true);
    const { ok, data } = await apiFetch("/payments/checkout", {
      method: "POST",
    });

    if (!ok) {
      setPaying(false);
      return toast.error(data.message || "Could not start payment");
    }
    window.location.href = data.url;
  };

  return (
    <section id="pricing" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          tag="Pricing"
          title="Simple Plans for Everyone"
          text="Start free. Upgrade to Pro anytime with a one-time Stripe payment."
        />

        <div className="mx-auto mb-10 flex w-fit rounded-full border bg-background p-1">
          {["student", "tutor"].map((item) => (
            <button
              key={item}
              onClick={() => setAudience(item)}
              className={`rounded-full px-6 py-2 text-sm font-semibold capitalize transition-colors ${
                audience === item
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              For {item}s
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn className="h-full">
            <div className="flex h-full flex-col rounded-3xl border bg-card p-8">
              <h3 className="text-xl font-bold">Free</h3>
              <p className="mt-3 text-4xl font-extrabold">
                $0{" "}
                <span className="text-sm font-medium text-muted-foreground">
                  forever
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.free.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <LuCheck className="h-4 w-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className={`${buttonVariants({ variant: "outline" })} mt-8 h-11`}
              >
                Get Started Free
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="h-full">
            <div className="relative flex h-full flex-col rounded-3xl border-2 border-primary bg-card p-8 shadow-xl">
              <Badge className="absolute -top-3 right-6 bg-amber-400 text-amber-950">
                Most Popular
              </Badge>
              <h3 className="text-xl font-bold">Pro</h3>
              <p className="mt-3 text-4xl font-extrabold text-primary">
                ${plan.price}{" "}
                <span className="text-sm font-medium text-muted-foreground">
                  one-time
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.pro.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <LuCheck className="h-4 w-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8 h-11"
                onClick={handleSubscribe}
                disabled={paying}
              >
                {paying ? "Redirecting..." : "Subscribe with Stripe"}
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
export default PricingSection;
