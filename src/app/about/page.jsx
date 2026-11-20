import { LuShieldCheck, LuTarget, LuUsers } from "react-icons/lu";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata = { title: "About | MentorLagbe" };

const values = [
  {
    Icon: LuTarget,
    title: "Our Mission",
    text: "Make finding the right tutor simple, fast and transparent for every family.",
  },
  {
    Icon: LuShieldCheck,
    title: "Quality First",
    text: "Every tuition post is reviewed by our admins before it goes live.",
  },
  {
    Icon: LuUsers,
    title: "For Everyone",
    text: "Students get guidance, tutors get a structured place to grow their batches.",
  },
];

const AboutPage = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading
        tag="About Us"
        title="Smart Tuition and Mentorship, in One Place"
        text="MentorLagbe connects students and parents with qualified tutors by subject, class level, mode and monthly budget."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {values.map(({ Icon, title, text }) => (
          <div key={title} className="h-full rounded-2xl border bg-card p-6">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default AboutPage;
