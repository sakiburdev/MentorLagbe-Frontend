const tones = {
  teal: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-200",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200",
};

export default function StatsCard({ Icon, label, value, tone = "teal" }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition-shadow hover:shadow-md">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="truncate text-2xl font-extrabold capitalize">{value}</p>
      </div>
    </div>
  );
}
