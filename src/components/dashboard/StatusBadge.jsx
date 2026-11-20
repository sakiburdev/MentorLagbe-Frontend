const styles = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  accepted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  active: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  closed: "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  pro: "bg-amber-400 text-amber-950",
  free: "bg-muted text-muted-foreground",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${styles[status] || styles.free}`}
    >
      {status}
    </span>
  );
}
