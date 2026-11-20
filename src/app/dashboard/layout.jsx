import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata = { title: "Dashboard | MentorLagbe" };

const DashboardLayout = ({ children }) => {
  return <DashboardShell>{children}</DashboardShell>;
};
export default DashboardLayout;
