"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LuBookOpen,
  LuClipboardList,
  LuCreditCard,
  LuFileText,
  LuGraduationCap,
  LuHouse,
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuPanelLeft,
  LuPlus,
  LuUser,
  LuUsers,
  LuX,
} from "react-icons/lu";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Image from "next/image";

// Sidebar
const menus = {
  student: [
    { label: "Overview", href: "/dashboard/student", Icon: LuLayoutDashboard },
    {
      label: "My Applications",
      href: "/dashboard/student/my-applications",
      Icon: LuClipboardList,
    },
  ],
  tutor: [
    { label: "Overview", href: "/dashboard/tutor", Icon: LuLayoutDashboard },
    {
      label: "Post Tuition",
      href: "/dashboard/tutor/post-tuition",
      Icon: LuPlus,
    },
    {
      label: "My Tuitions",
      href: "/dashboard/tutor/my-tuitions",
      Icon: LuBookOpen,
    },
    { label: "Applicants", href: "/dashboard/tutor/applicants", Icon: LuUsers },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", Icon: LuLayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", Icon: LuUsers },
    { label: "Tuitions", href: "/dashboard/admin/tuitions", Icon: LuFileText },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      Icon: LuCreditCard,
    },
  ],
};

const DashboardShell = ({ children }) => {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/sign-in");
  }, [loading, user, router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  const links = [
    ...(menus[user.role] || []),
    { label: "Update Profile", href: "/dashboard/profile", Icon: LuUser },
  ];

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out successfully");
    router.push("/");
  };

  const avatar = user.image ? (
    <Image
      src={user.image}
      alt={user.name}
      className="h-10 w-10 shrink-0 rounded-full object-cover"
    />
  ) : (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
      {user.name?.charAt(0).toUpperCase()}
    </span>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-all duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LuGraduationCap className="h-5 w-5" />
            </span>
            {!collapsed && (
              <span className="text-xl font-extrabold tracking-tight">
                Mentor<span className="text-primary">Lagbe</span>
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <LuX className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {links.map(({ label, href, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={label}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                } ${collapsed ? "lg:justify-center" : ""}`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}

          {user.role !== "admin" && user.plan !== "pro" && (
            <Link
              href="/pricing"
              title="Upgrade to Pro"
              className={`mt-4 flex items-center gap-3 rounded-xl bg-amber-400 px-3 py-2.5 text-sm font-semibold text-amber-950 hover:bg-amber-300 ${collapsed ? "lg:justify-center" : ""}`}
            >
              <LuCreditCard className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Upgrade to Pro</span>}
            </Link>
          )}
        </nav>

        {/* User profile summary */}
        <div
          className={`flex items-center gap-3 border-t p-4 ${collapsed ? "lg:justify-center" : ""}`}
        >
          {avatar}
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-xs capitalize text-muted-foreground">
                  {user.role}
                </span>
                <StatusBadge status={user.plan || "free"} />
              </div>
            </div>
          )}
        </div>
      </aside>

      <div
        className={`transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-64"}`}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <LuMenu className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Collapse sidebar"
            >
              <LuPanelLeft className="h-5 w-5" />
            </Button>
            <p className="hidden text-sm text-muted-foreground sm:block">
              Welcome back,{" "}
              <span className="font-semibold text-foreground">{user.name}</span>
            </p>
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link href="/" title="Back to website">
              <Button variant="ghost" size="icon" aria-label="Home">
                <LuHouse className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Sign out"
            >
              <LuLogOut className="h-5 w-5 text-destructive" />
            </Button>
          </div>
        </header>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};
export default DashboardShell;
