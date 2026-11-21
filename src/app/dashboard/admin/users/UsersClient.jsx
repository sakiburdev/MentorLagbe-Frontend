"use client";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { useFetch } from "@/hooks/useFetch";
import { useRequireRole } from "@/hooks/useRequireRole";
import PageHeader from "@/components/dashboard/PageHeader";
import PageSkeleton from "@/components/dashboard/PageSkeleton";
import StatusBadge from "@/components/dashboard/StatusBadge";

const AdminUsersPage = () => {
  const ready = useRequireRole("admin");
  const { user: me } = useAuth();

  const {
    data: users,
    loading,
    reload,
  } = useFetch(ready ? "/admin/users" : null);

  const changeRole = async (id, role) => {
    const { ok, data } = await apiFetch(`/admin/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });

    if (!ok) return toast.error(data.message || "Could not change role");

    toast.success("Role updated");
    reload();
  };

  if (!ready || loading || !users) return <PageSkeleton />;

  return (
    <div>
      <PageHeader
        title="User Management"
        text={`${users.length} registered users.`}
      />

      <div className="overflow-x-auto rounded-2xl border bg-card">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-3 font-semibold">{item.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {item.email}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={item.plan || "free"} />
                </td>
                <td className="px-4 py-3">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("en-GB")
                    : "-"}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={item.role}
                    disabled={item.email === me.email}
                    onChange={(e) => changeRole(item._id, e.target.value)}
                    className="h-9 rounded-lg border bg-background px-2 text-sm capitalize outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  >
                    <option value="student">student</option>
                    <option value="tutor">tutor</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminUsersPage;
