"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuBookOpen, LuEye, LuEyeOff, LuGraduationCap } from "react-icons/lu";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthShell from "@/components/auth/AuthShell";
import GoogleButton from "@/components/auth/GoogleButton";

const roles = [
  {
    value: "student",
    label: "Student",
    text: "I want to find a tutor",
    Icon: LuBookOpen,
  },
  {
    value: "tutor",
    label: "Tutor",
    text: "I want to teach",
    Icon: LuGraduationCap,
  },
];

const SignUpPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [loading, user, router]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (form.name.trim().length < 2)
      return "Name must be at least 2 characters";

    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return "Enter a valid email address";

    if (form.password.length < 8)
      return "Password must be at least 8 characters";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = validate();
    if (message) return toast.error(message);

    setSubmitting(true);

    const { error } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email,
      password: form.password,
      role: form.role,
    });
    setSubmitting(false);

    if (error) return toast.error(error.message || "Sign up failed");

    toast.success("Account created! Welcome to MentorLagbe");
    router.push("/dashboard");
  };

  return (
    <AuthShell>
      <h1 className="text-3xl font-extrabold tracking-tight">
        Create your account
      </h1>

      <p className="mt-2 text-muted-foreground">
        Join MentorLagbe in less than a minute.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">

        <div className="grid grid-cols-2 gap-3">
          {roles.map(({ value, label, text, Icon }) => (

            <button
              key={value}
              type="button"
              onClick={() => setForm({ ...form, role: value })}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                form.role === value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Icon className="mb-2 h-5 w-5 text-primary" />
              <p className="font-semibold">{label}</p>
              <p className="text-xs text-muted-foreground">{text}</p>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              className="h-11 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label="Show or hide password"
            >

              {showPassword ? (
                <LuEyeOff className="h-4 w-4" />
              ) : (
                <LuEye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button type="submit" className="h-11 w-full" disabled={submitting}>
          {submitting ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">

        <span className="h-px flex-1 bg-border" /> OR{" "}
        <span className="h-px flex-1 bg-border" />

      </div>

      <GoogleButton />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </AuthShell>
  );
}
export default SignUpPage;
