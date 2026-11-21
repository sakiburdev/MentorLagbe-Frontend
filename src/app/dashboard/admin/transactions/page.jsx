"use client";
import { useFetch } from "@/hooks/useFetch";
import { useRequireRole } from "@/hooks/useRequireRole";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/dashboard/PageHeader";
import PageSkeleton from "@/components/dashboard/PageSkeleton";

const TransactionsPage = () => {
  const ready = useRequireRole("admin");

  const { data: payments, loading } = useFetch(
    ready ? "/admin/transactions" : null,
  );

  if (!ready || loading || !payments) return <PageSkeleton />;

  return (
    <div>
      <PageHeader
        title="Transactions"
        text="All Pro plan payments made through Stripe."
      />

      {payments.length === 0 ? (
        <EmptyState title="No payments yet" />
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payments.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-3 font-semibold">
                    {item.userName}
                    <p className="text-xs font-normal text-muted-foreground">
                      {item.userEmail}
                    </p>
                  </td>
                  <td className="px-4 py-3 capitalize">{item.userRole}</td>
                  <td className="px-4 py-3">{item.planName}</td>
                  <td className="px-4 py-3 font-semibold uppercase">
                    {item.amount} {item.currency}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {item.transactionId}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(item.paidAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
