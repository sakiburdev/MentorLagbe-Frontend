"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LuBadgeCheck, LuSearch, LuStar, LuUsers } from "react-icons/lu";

const popularSubjects = ["Math", "Physics", "Programming", "IELTS"];

const Hero = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/tuitions?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-semibold text-primary">
            <LuBadgeCheck className="h-4 w-4" /> Verified tutors across
            Bangladesh
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Find Your Ideal <span className="text-primary">Tutor</span> or{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Mentorship</span>
              <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-amber-300/70" />
            </span>{" "}
            Batch Today
          </h1>

          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Search by subject, class level and budget. Apply in one click and
            start learning online or at home.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-full border bg-background p-2 shadow-lg"
          >
            <LuSearch className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Math, Physics, IELTS..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Find Tutor
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">Popular:</span>
            {popularSubjects.map((subject) => (
              <Link
                key={subject}
                href={`/tuitions?subject=${subject}`}
                className="rounded-full border px-3 py-1 hover:border-primary hover:text-primary"
              >
                {subject}
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-3xl bg-gradient-to-br from-teal-500 to-teal-800 p-6 shadow-2xl">
            <div className="rounded-2xl bg-card p-5 text-card-foreground">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  S
                </span>

                <div>
                  <p className="font-bold">Sakibur Rahman</p>
                  <p className="text-sm text-muted-foreground">Math • HSC</p>
                </div>

                <span className="ml-auto flex items-center gap-1 text-sm font-semibold">
                  <LuStar className="h-4 w-4 fill-amber-400 text-amber-400" />{" "}
                  <span>4.9</span>
                </span>

              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-muted p-3">
                  <p className="text-muted-foreground">Mode</p>
                  <p className="font-semibold">Online</p>
                </div>
                
                <div className="rounded-xl bg-muted p-3">
                  <p className="text-muted-foreground">Fee</p>
                  <p className="font-semibold">৳3,000/mo</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground">
                Apply Now
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -right-2 -top-4 flex items-center gap-2 rounded-xl border bg-background px-3 py-2 text-sm font-semibold shadow-lg sm:-right-6"
          >
            <LuBadgeCheck className="h-4 w-4 text-primary" /> Verified Tutor
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
            className="absolute -bottom-4 -left-2 flex items-center gap-2 rounded-xl border bg-background px-3 py-2 text-sm font-semibold shadow-lg sm:-left-6"
          >
            <LuUsers className="h-4 w-4 text-amber-500" /> 1,200+ Students
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
