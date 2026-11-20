import Link from "next/link";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const Pagination = ({ page, totalPages, params }) => {
  if (totalPages <= 1) return null;

  const makeHref = (pageNumber) => {
    const query = new URLSearchParams(params);
    query.set("page", pageNumber);
    return `/tuitions?${query.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const box =
    "flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium";

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link
          href={makeHref(page - 1)}
          className={`${box} hover:border-primary hover:text-primary`}
        >
          <LuChevronLeft className="h-4 w-4" /> Previous
        </Link>
      ) : (
        <span className={`${box} cursor-not-allowed opacity-40`}>
          <LuChevronLeft className="h-4 w-4" /> Previous
        </span>
      )}

      {pages.map((number) => (
        <Link
          key={number}
          href={makeHref(number)}
          className={`${box} ${number === page ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}
        >
          {number}
        </Link>
      ))}

      {page < totalPages ? (
        <Link
          href={makeHref(page + 1)}
          className={`${box} hover:border-primary hover:text-primary`}
        >
          Next <LuChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className={`${box} cursor-not-allowed opacity-40`}>
          Next <LuChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
};
export default Pagination;
