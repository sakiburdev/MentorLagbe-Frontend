"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuUser,
  LuX,
} from "react-icons/lu";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Tuitions", href: "/tuitions" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
];

const roleColors = {
  student: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  tutor: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  admin: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
};

function UserLinks({ onNavigate, onLogout }) {
  const itemClass =
    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted";
  return (
    <>
      <Link href="/dashboard" onClick={onNavigate} className={itemClass}>
        <LuLayoutDashboard className="h-4 w-4" /> Dashboard
      </Link>

      <Link
        href="/dashboard/profile"
        onClick={onNavigate}
        className={itemClass}
      >
        <LuUser className="h-4 w-4" /> Update Profile
      </Link>

      <button onClick={onLogout} className={`${itemClass} text-destructive`}>
        <LuLogOut className="h-4 w-4" /> Sign Out
      </button>
    </>
  );
}
const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out successfully");
    closeMenus();
    router.push("/");
  };

  const avatar = user?.image ? (
    <Image
      src={user.image}
      alt={user.name}
      className="h-9 w-9 rounded-full object-cover"
    />
  ) : (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
      {user?.name?.charAt(0).toUpperCase()}
    </span>
  );

  const roleBadge = (
    <Badge
      className={`${roleColors[user?.role]} px-1.5 py-0 text-[10px] capitalize`}
    >
      {user?.role}
    </Badge>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="hidden items-center gap-2 lg:flex">
            {loading && <Skeleton className="h-9 w-40" />}

            {!loading && !user && (
              <>
                <Link
                  href="/sign-in"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Sign In
                </Link>
                <Link href="/sign-up" className={buttonVariants()}>
                  Sign Up
                </Link>
              </>
            )}

            {!loading && user && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 rounded-full border py-1 pl-1 pr-4 hover:bg-muted"
                >
                  {avatar}
                  <span className="text-left leading-tight">
                    <span className="block max-w-28 truncate text-sm font-semibold">
                      {user.name}
                    </span>
                    {roleBadge}
                  </span>
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0"
                      onClick={() => setUserMenuOpen(false)}
                    />

                    <div className="absolute right-0 mt-2 w-52 rounded-xl border bg-popover p-2 shadow-lg">
                      <UserLinks
                        onNavigate={closeMenus}
                        onLogout={handleLogout}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <LuX className="h-5 w-5" />
            ) : (
              <LuMenu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t bg-background px-4 py-4 lg:hidden">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenus}
                  className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t pt-4">
            {!loading && !user && (
              <div className="flex gap-2">
                <Link
                  href="/sign-in"
                  onClick={closeMenus}
                  className={`${buttonVariants({ variant: "outline" })} flex-1`}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={closeMenus}
                  className={`${buttonVariants()} flex-1`}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {!loading && user && (
              <div className="space-y-1">
                <div className="mb-2 flex items-center gap-3 px-3">
                  {avatar}
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                    {roleBadge}
                  </div>
                </div>
                <UserLinks onNavigate={closeMenus} onLogout={handleLogout} />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
