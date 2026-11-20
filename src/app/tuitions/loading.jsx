import { Skeleton } from "@/components/ui/skeleton";

const TuitionsLoading = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Skeleton className="mb-8 h-24 w-full rounded-2xl" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton key={item} className="h-96 rounded-2xl" />
        ))}
      </div>
    </div>
  );
};
export default TuitionsLoading;
