// "use client";
// import { usePathname } from "next/navigation";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

// const hiddenOn = ["/dashboard", "/sign-in", "/sign-up"];

// const SiteShell = ({ children }) => {
//   const pathname = usePathname();
//   const hide = hiddenOn.some((path) => pathname.startsWith(path));

//   if (hide) return <>{children}</>;

//   return (
//     <>
//       <Navbar />
//       <main className="flex-1">{children}</main>
//       <Footer />
//     </>
//   );
// };
// SiteShell;
// export default SiteShell;









"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const hiddenOn = ["/dashboard", "/sign-in", "/sign-up"];

const SiteShellContent = ({ children }) => {
  const pathname = usePathname();

  const hide = hiddenOn.some((path) => pathname.startsWith(path));

  if (hide) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
};

const SiteShell = ({ children }) => {
  return (
    <Suspense fallback={<main className="flex-1">{children}</main>}>
      <SiteShellContent>{children}</SiteShellContent>
    </Suspense>
  );
};

export default SiteShell;
