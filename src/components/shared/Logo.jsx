import Link from "next/link";
import { LuGraduationCap } from "react-icons/lu";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <LuGraduationCap className="h-5 w-5" />
      </span>

      <span className="text-xl font-extrabold tracking-tight">
        Mentor<span className="text-primary">Lagbe</span>
      </span>
    </Link>
  );
};

export default Logo;
