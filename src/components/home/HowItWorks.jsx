import { LuRocket, LuSearch, LuSend, LuUserCheck } from "react-icons/lu";
import FadeIn from "@/components/shared/FadeIn";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  {
    Icon: LuSearch,
    title: "Search",
    text: "Filter tuitions by subject, class level and mode.",
  },
  {
    Icon: LuSend,
    title: "Apply",
    text: "Send your schedule and a short note to the tutor.",
  },
  {
    Icon: LuUserCheck,
    title: "Get Accepted",
    text: "The tutor reviews and accepts your request.",
  },
  {
    Icon: LuRocket,
    title: "Start Learning",
    text: "Begin your classes online or at home.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6"
    >
      <SectionHeading
        tag="How It Works"
        title="From Search to Classroom in 4 Steps"
        text="Simple for students, simple for tutors."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ Icon, title, text }, index) => (
          <FadeIn key={title} delay={index * 0.1} className="h-full">
            <div className="relative h-full rounded-2xl border bg-card p-6">
              <span className="absolute right-5 top-4 text-5xl font-extrabold text-primary/10">
                {index + 1}
              </span>
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-center text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
        <strong>Are you a tutor?</strong> Sign up, post your batch, wait for
        admin approval, then manage applicants from your dashboard.
      </div>
    </section>
  );
};
export default HowItWorks;
