import { LuSearchX } from "react-icons/lu";
import { apiFetch } from "@/lib/api";
import TuitionCard from "@/components/tuition/TuitionCard";
import TuitionFilters from "@/components/tuition/TuitionFilters";
import Pagination from "@/components/tuition/Pagination";

export const metadata = { title: "Browse Tuitions | MentorLagbe" };

const TuitionsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const query = new URLSearchParams({ page: String(page), limit: "9" });

  ["search", "subject", "classLevel", "mode"].forEach((key) => {
    if (params[key]) query.set(key, params[key]);
  });

  const { data } = await apiFetch(`/tuitions?${query.toString()}`);
  const tuitions = data.tuitions || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Browse Tuitions
        </h1>
        <p className="mt-2 text-muted-foreground">
          {data.total ?? 0} approved tuition{data.total === 1 ? "" : "s"} found
        </p>
      </div>

      <TuitionFilters />

      {tuitions.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-2xl border border-dashed py-20 text-center">
          <LuSearchX className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-bold">No tuitions found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((tuition) => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </div>
      )}

      <Pagination
        page={data.page || 1}
        totalPages={data.totalPages || 1}
        params={params}
      />
    </div>
  );
};
export default TuitionsPage;
