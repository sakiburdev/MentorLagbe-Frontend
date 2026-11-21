import Link from "next/link";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Logo from "@/components/shared/Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Tuitions", href: "/tuitions" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

// Socials Icon
const socials = [
  { label: "X", href: "https://x.com", Icon: FaXTwitter },
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
];

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr_0.7fr] lg:gap-10">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Connecting students with verified tutors for <br /> online and home
            tuition, all in <br /> one smart platform.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Quick Links</h3>
          <ul className="space-y-2  text-sm text-muted-foreground">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <LuMail className="h-4 w-4 text-primary" />{" "}
              support@mentorlagbe.com
            </li>
            <li className="flex items-center gap-2">
              <LuPhone className="h-4 w-4 text-primary" /> +880 1XXX-XXXXXX
            </li>
            <li className="flex items-center gap-2">
              <LuMapPin className="h-4 w-4 text-primary" /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Follow Us</h3>
          <div className="flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t py-5 text-center text-sm text-muted-foreground">
        © 2026 MentorLagbe. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;
