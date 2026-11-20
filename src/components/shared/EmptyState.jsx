import { LuInbox } from "react-icons/lu";

export default function EmptyState({ title, text }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed py-16 text-center">
      <LuInbox className="h-10 w-10 text-muted-foreground" />
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      {text && <p className="mt-1 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
