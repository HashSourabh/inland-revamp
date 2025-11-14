"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { API_BASE_URL } from "@/utils/api";
import toast from "react-hot-toast";
import GlobalLoader from "@/components/shared/GlobalLoader";
import { useRouter } from "next/navigation";

type Buyer = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  profileImageUrl?: string;
  role?: string;
  Buyer_Telephone?: number;
  Buyer_Address?: string;
};

// ✅ Added authData to pass token/email to modal
type AuthData = {
  token?: string;
  email?: string;
  resetCode?: string;
};

type AuthContextValue = {
  user: Buyer | null;
  loading: boolean;
  openAuth: (mode?: "login" | "register" | "forgot" | "reset", data?: AuthData) => void; // ✅ Updated
  closeAuth: () => void;
  isAuthOpen: boolean;
  authMode: "login" | "register" | "forgot" | "reset"; // ✅ Added forgot & reset
  authData?: AuthData; // ✅ Added authData
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try { return localStorage.getItem("ia_token"); } catch { return null; }
}

function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (token) localStorage.setItem("ia_token", token);
    else localStorage.removeItem("ia_token");
  } catch { }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<Buyer | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot" | "reset">("login"); // ✅ Updated
  const [authData, setAuthData] = useState<AuthData | undefined>(undefined); // ✅ Added

  const refresh = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem("buyer_Id", data.user.id);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: token ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` } : { "Content-Type": "application/json" },
      });

      const data = res.ok ? await res.json() : null;
      const message = data?.message || (res.ok ? "Logged out successfully." : "Logout failed. Please try again.");

      if (res.ok) {
        toast.custom((t) => (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: '#10b981', color: '#fff', padding: '10px 14px', borderRadius: '10px',
            minWidth: '320px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '18px' }}>✅</div>
            <div style={{ flex: 1, fontWeight: 500 }}>{message}</div>
            <button onClick={() => toast.dismiss(t.id)} style={{ opacity: 0.9, cursor: 'pointer', background: 'none', border: 'none', color: '#fff', fontSize: '16px' }}>✕</button>
          </div>
        ), { duration: 4000 });
      } else {
        toast.custom((t) => (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: '#ef4444', color: '#fff', padding: '10px 14px', borderRadius: '10px',
            minWidth: '320px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '18px' }}>❌</div>
            <div style={{ flex: 1, fontWeight: 500 }}>{message}</div>
            <button onClick={() => toast.dismiss(t.id)} style={{ opacity: 0.9, cursor: 'pointer', background: 'none', border: 'none', color: '#fff', fontSize: '16px' }}>✕</button>
          </div>
        ), { duration: 4000 });
      }
    } catch (error: any) {
      toast.custom((t) => (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: '#ef4444', color: '#fff', padding: '10px 14px', borderRadius: '10px',
          minWidth: '320px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '18px' }}>❌</div>
          <div style={{ flex: 1, fontWeight: 500 }}>Logout failed. Please try again.</div>
          <button onClick={() => toast.dismiss(t.id)} style={{ opacity: 0.9, cursor: 'pointer', background: 'none', border: 'none', color: '#fff', fontSize: '16px' }}>✕</button>
        </div>
      ), { duration: 4000 });
    } finally {
      setToken(null);
      setUser(null);
      router.push("/");
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Updated to accept mode and data
  const openAuth = (mode: "login" | "register" | "forgot" | "reset" = "login", data?: AuthData) => {
    setAuthMode(mode);
    setAuthData(data);
    setIsAuthOpen(true);
  };

  // ✅ Clear authData when closing
  const closeAuth = () => {
    setIsAuthOpen(false);
    setAuthData(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, loading, openAuth, closeAuth, isAuthOpen, authMode, authData, refresh, logout }}>
      {children}
      <GlobalLoader active={loading} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { setToken, getToken };