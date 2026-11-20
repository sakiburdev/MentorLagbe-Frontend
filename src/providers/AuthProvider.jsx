"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, isPending, refetch } = authClient.useSession();

  const [cookieEmail, setCookieEmail] = useState(null);

  const user = session?.user || null;

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCookieEmail(null);
      return;
    }
    if (cookieEmail === user.email) return;

    apiFetch("/jwt", { method: "POST" }).then(() => setCookieEmail(user.email));
  }, [isPending, user?.email]);

  const loading = isPending || (user !== null && cookieEmail !== user.email);

  const logout = async () => {
    await apiFetch("/logout", { method: "POST" });
    await authClient.signOut();
    setCookieEmail(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refresh: refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
