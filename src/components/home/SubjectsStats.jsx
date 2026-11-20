import Link from "next/link";
import {
  LuAtom,
  LuBookOpen,
  LuCalculator,
  LuCode,
  LuDna,
  LuFlaskConical,
  LuLanguages,
} from "react-icons/lu";
import { apiFetch } from "@/lib/api";
import FadeIn from "@/components/shared/FadeIn";
import SectionHeading from "@/components/shared/SectionHeading";

const subjects = [
  { name: "Math", Icon: LuCalculator },
  { name: "Physics", Icon: LuAtom },
  { name: "Chemistry", Icon: LuFlaskConical },
  { name: "Biology", Icon: LuDna },
  { name: "Programming", Icon: LuCode },
  { name: "IELTS", Icon: LuLanguages },
  { name: "English", Icon: LuBookOpen },
];

const SubjectsStats = async () => {
  const { data } = await apiFetch("/stats/public");

  const stats = [
    { label: "Verified Tutors", value: `${data.tutors ?? 0}+` },
    { label: "Active Students", value: `${data.students ?? 0}+` },
    { label: "Approved Tuitions", value: `${data.tuitions ?? 0}+` },
    { label: "Average Rating", value: "4.9/5" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading
        tag="Top Subjects"
        title="Explore Popular Subjects"
        text="Pick a subject and find tutors who match your level and budget."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {subjects.map(({ name, Icon }, index) => (
          <FadeIn key={name} delay={index * 0.05} className="h-full">
            <Link
              href={`/tuitions?subject=${name}`}
              className="flex h-full flex-col items-center gap-3 rounded-2xl border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold">{name}</span>
            </Link>
          </FadeIn>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-2 gap-6 rounded-3xl bg-gradient-to-r from-teal-600 to-teal-800 p-8 text-center text-white lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-extrabold sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-teal-100">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default SubjectsStats;
