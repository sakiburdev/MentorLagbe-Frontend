import { LuBadgeCheck } from "react-icons/lu";
import Logo from "@/components/shared/Logo";

const points = [
  "Find verified tutors by subject and budget",
  "Apply in one click and track your status",
  "Post batches and reach thousands of students",
];

const AuthShell = ({ children }) => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-600 to-teal-900 p-12 text-white lg:flex">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

        <div className="relative w-fit rounded-xl bg-white/95 px-3 py-2 text-slate-900">
          <Logo />
        </div>

        <div className="relative">
          <h2 className="text-4xl font-extrabold leading-tight">
            Learn better. <br /> Teach smarter.
          </h2>

          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-teal-50">
                <LuBadgeCheck className="h-5 w-5 shrink-0 text-amber-300" />{" "}
                {point}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-teal-100">© MentorLagbe</p>
      </div>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
