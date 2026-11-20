"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LuSearch } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { CLASS_LEVELS, MODES, SUBJECTS } from "@/lib/constants";

const selectClass =
  "h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary";

const TuitionFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateFilter = (key, value) => {
    const query = new URLSearchParams(searchParams.toString());
    if (value) query.set(key, value);
    else query.delete(key);
    query.delete("page");
    router.push(`/tuitions?${query.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilter("search", search.trim());
  };

  const handleReset = () => {
    setSearch("");
    router.push("/tuitions");
  };

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <LuSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or subject..."
            className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button type="submit" className="h-11">
          Search
        </Button>
      </form>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select
          className={selectClass}
          value={searchParams.get("subject") || ""}
          onChange={(e) => updateFilter("subject", e.target.value)}
        >
          <option value="">All Subjects</option>
          {SUBJECTS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={searchParams.get("classLevel") || ""}
          onChange={(e) => updateFilter("classLevel", e.target.value)}
        >
          <option value="">All Class Levels</option>
          {CLASS_LEVELS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={searchParams.get("mode") || ""}
          onChange={(e) => updateFilter("mode", e.target.value)}
        >
          <option value="">Online & Offline</option>
          {MODES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <Button
          type="button"
          variant="outline"
          className="h-11"
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
export default TuitionFilters;
