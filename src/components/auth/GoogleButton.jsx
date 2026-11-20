"use client";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

const GoogleButton = () => {
  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full"
      onClick={handleGoogle}
    >
      <FcGoogle className="mr-2 h-5 w-5" /> Continue with Google
    </Button>
  );
};
export default GoogleButton;
