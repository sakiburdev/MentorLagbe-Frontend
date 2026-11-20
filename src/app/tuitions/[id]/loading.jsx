import { Skeleton } from "@/components/ui/skeleton";

const TuitionDetailsLoading = () => {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3">
      <Skeleton className="h-[500px] rounded-2xl lg:col-span-2" />
      <Skeleton className="h-96 rounded-2xl" />
    </div>
  );
};
export default TuitionDetailsLoading;
