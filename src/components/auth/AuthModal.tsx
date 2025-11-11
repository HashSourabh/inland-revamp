"use client";

import React, { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "@/utils/api";
import { setToken } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { isAuthOpen, closeAuth, authMode, refresh, authData, openAuth } = useAuth();
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "reset">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [forgotEmailSent, setForgotEmailSent] = useState(false);
  const initializedRef = useRef(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    resetCode: "",
  });

  const showToast = (type: "success" | "error" | "info", message: string) => {
    const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
    const bg = type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#2563eb";
    toast.custom((t) => (
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: bg, color: '#fff', padding: '10px 14px', borderRadius: '10px',
        minWidth: '320px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{fontSize: '18px'}}>{icon}</div>
        <div style={{flex: 1, fontWeight: 500}}>{message}</div>
        <button onClick={() => toast.dismiss(t.id)} style={{opacity: 0.9}}>✕</button>
      </div>
    ), { duration: 4000 });
  };

  const validateField = (name: keyof typeof form, value: string, state: typeof form): string | null => {
    switch (name) {
      case "firstName":
        return value.trim() ? null : "First name is required";
      case "lastName":
        return value.trim() ? null : "Last name is required";
      case "username": {
        const ok = /^(?=(?:.*[A-Za-z]){3,})(?=.*\d)[A-Za-z\d]{4,50}$/.test(value);
        return ok ? null : "4-50 chars, min 3 letters and 1 number";
      }
      case "email": {
        const ok = /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-])+)*@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/.test(value);
        return ok ? null : "Enter a valid email";
      }
      case "password": {
        const ok = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        return ok ? null : "Min 8, upper/lower/number/special";
      }
      case "confirmPassword":
        return value === state.password ? null : "Passwords do not match";
      default:
        return null;
    }
  };

  // Initialize when modal opens, reset when it closes
  useEffect(() => {
    if (isAuthOpen && !initializedRef.current) {
      initializedRef.current = true;
      setMode(authMode);
      setError(null);
      setFieldErrors({});
      setForgotEmailSent(false);
      
      if (authData?.token) setResetToken(authData.token);
      if (authData?.email) {
        setForm(prev => ({ ...prev, email: authData.email || "" }));
      }
      if (authData?.resetCode) {
        setForm(prev => ({ ...prev, resetCode: authData.resetCode || "" }));
      }
    }
    
    if (!isAuthOpen && initializedRef.current) {
      initializedRef.current = false;
      setForm({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        resetCode: "",
      });
      setResetToken(null);
      setForgotEmailSent(false);
      setError(null);
      setFieldErrors({});
      setMode("login");
    }
  }, [isAuthOpen, authMode, authData]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});
    
    if (mode === "login") {
      const loginErrors: Record<string, string> = {};
      if (!form.email.trim()) {
        loginErrors.email = "Email or username is required";
      }
      if (!form.password.trim()) {
        loginErrors.password = "Password is required";
      }
      if (Object.keys(loginErrors).length) {
        setFieldErrors(loginErrors);
        setLoading(false);
        return;
      }
    }
    
    if (mode === "register") {
      const nextFieldErrors: Record<string, string> = {};
      if (!form.firstName.trim()) nextFieldErrors.firstName = "First name is required";
      if (!form.lastName.trim()) nextFieldErrors.lastName = "Last name is required";
      const usernameOk = /^(?=(?:.*[A-Za-z]){3,})(?=.*\d)[A-Za-z\d]{4,50}$/.test(form.username);
      if (!usernameOk) nextFieldErrors.username = "4-50 chars, min 3 letters and 1 number";
      const emailOk = /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-])+)*@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/.test(form.email);
      if (!emailOk) nextFieldErrors.email = "Enter a valid email";
      const pwOk = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.password);
      if (!pwOk) nextFieldErrors.password = "Min 8, upper/lower/number/special";
      if (form.password !== form.confirmPassword) nextFieldErrors.confirmPassword = "Passwords do not match";

      if (Object.keys(nextFieldErrors).length) {
        setFieldErrors(nextFieldErrors);
        setLoading(false);
        return;
      }
    }

    if (mode === "forgot") {
      const forgotErrors: Record<string, string> = {};
      const emailOk = /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-])+)*@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/.test(form.email);
      if (!emailOk) forgotErrors.email = "Enter a valid email";
      if (Object.keys(forgotErrors).length) {
        setFieldErrors(forgotErrors);
        setLoading(false);
        return;
      }
    }

    if (mode === "reset") {
      const resetErrors: Record<string, string> = {};
      if (!form.email.trim()) resetErrors.email = "Email is required";
      if (!resetToken && !form.resetCode.trim()) resetErrors.resetCode = "Reset code is required";
      const pwOk = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.password);
      if (!pwOk) resetErrors.password = "Min 8, upper/lower/number/special";
      if (form.password !== form.confirmPassword) resetErrors.confirmPassword = "Passwords do not match";
      if (Object.keys(resetErrors).length) {
        setFieldErrors(resetErrors);
        setLoading(false);
        return;
      }
    }

    try {
      const apiBase = API_BASE_URL;
      if (!apiBase) {
        throw new Error("API base URL is not configured");
      }

      let url = "";
      let payload: any = {};

      if (mode === "login") {
        url = `${apiBase}/auth/login`;
        payload = { email: form.email, password: form.password };
      } else if (mode === "register") {
        url = `${apiBase}/auth/register`;
        payload = {
          firstName: form.firstName,
          lastName: form.lastName,
          username: form.username,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        };
      } else if (mode === "forgot") {
        url = `${apiBase}/auth/forgot-password`;
        payload = { email: form.email };
      } else if (mode === "reset") {
        url = `${apiBase}/auth/reset-password`;
        payload = {
          email: form.email,
          token: resetToken || form.resetCode,
          password: form.password,
          confirmPassword: form.confirmPassword,
        };
      }

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const data = isJson ? await res.json() : await res.text();
      
      if (!res.ok) {
        if (isJson) {
          const serverMsg = (data as any)?.message || "Request failed";
          const serverFieldErrors: any[] = (data as any)?.details || [];
          const mapped: Record<string, string> = {};
          if (Array.isArray(serverFieldErrors)) {
            for (const d of serverFieldErrors) {
              if (d?.path) mapped[d.path] = d.msg || d.message || "Invalid";
            }
          }
          if (Object.keys(mapped).length) setFieldErrors(mapped);
          throw new Error(serverMsg);
        }
        throw new Error("Could not reach API. Set NEXT_PUBLIC_API_BASE to your backend (e.g. http://localhost:4000)");
      }
      
      if (mode === "forgot") {
        if (isJson && (data as any)?.token) {
          setResetToken((data as any).token);
          if ((data as any)?.resetCode) {
            setForm({ ...form, resetCode: (data as any).resetCode });
          }
        }
        setForgotEmailSent(true);
        showToast("success", (data as any)?.message || "Password reset link has been sent to your registered email address.");
        return;
      }
      
      if (mode === "reset") {
        showToast("success", (data as any)?.message || "Your password has been reset successfully.");
        closeAuth();
        setTimeout(() => openAuth("login"), 100);
        return;
      }

      if (isJson && (data as any)?.token) {
        setToken((data as any).token);
      }
      await refresh();
      closeAuth();
      showToast("success", (data as any)?.message || (mode === "login" ? "Login successfully." : "Account created successfully."));
    } catch (err: any) {
      let toastMessage = "";

      if (err?.message?.includes("fetch") || err?.message?.includes("network") || err?.name === "TypeError" || err?.message?.includes("Could not reach API")) {
        toastMessage = "Please check your connection and try again";
      } else if (mode === "login") {
        toastMessage = err?.message || "Invalid credentials or account not found";
      } else {
        toastMessage = err?.message || "Unable to create account. Please try again";
      }

      setError(err?.message || toastMessage);
      showToast("error", toastMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h2 className="text-lg font-semibold">
            {mode === "login" ? "Login" : mode === "register" ? "Create Account" : mode === "forgot" ? "Forgot Password" : "Reset Password"}
          </h2>
          <button 
            type="button" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closeAuth();
            }} 
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4 px-5 py-5 relative">
          {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-b-xl bg-white/70">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
            </div>
          )}
          
          {mode === "forgot" && (
            <>
              {forgotEmailSent ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-3">📧</div>
                  <h3 className="text-lg font-semibold mb-2">Check your email</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We've sent a password reset link to <strong>{form.email}</strong>
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input 
                      type="email" 
                      className={`w-full rounded-md border px-3 py-2 ${fieldErrors.email ? 'border-red-500' : ''}`} 
                      value={form.email} 
                      onChange={(e) => {
                        const v = e.target.value;
                        setForm({ ...form, email: v });
                        if (fieldErrors.email) {
                          const m = validateField('email', v, { ...form, email: v });
                          setFieldErrors((fe) => ({ ...fe, email: m || undefined } as any));
                        }
                      }} 
                      aria-invalid={!!fieldErrors.email}
                      disabled={loading}
                    />
                    {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
                  </div>
                </>
              )}
            </>
          )}

          {mode === "reset" && (
            <>
              <p className="text-sm text-gray-600 mb-4">
                {resetToken 
                  ? "Enter your new password below." 
                  : "Enter the reset code from your email and your new password."}
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input 
                    type="email" 
                    className={`w-full rounded-md border px-3 py-2 bg-gray-50 ${fieldErrors.email ? 'border-red-500' : ''}`} 
                    value={form.email} 
                    onChange={(e) => {
                      const v = e.target.value;
                      setForm({ ...form, email: v });
                      if (fieldErrors.email) {
                        const m = validateField('email', v, { ...form, email: v });
                        setFieldErrors((fe) => ({ ...fe, email: m || undefined } as any));
                      }
                    }} 
                    aria-invalid={!!fieldErrors.email}
                    disabled={loading}
                    readOnly={!!resetToken}
                  />
                  {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
                </div>
                
                {!resetToken && (
                  <div>
                    <label className="block text-sm mb-1">Reset Code</label>
                    <input 
                      type="text" 
                      className={`w-full rounded-md border px-3 py-2 ${fieldErrors.resetCode ? 'border-red-500' : ''}`} 
                      value={form.resetCode} 
                      onChange={(e) => setForm({ ...form, resetCode: e.target.value })} 
                      aria-invalid={!!fieldErrors.resetCode}
                      disabled={loading}
                    />
                    {fieldErrors.resetCode && <p className="text-xs text-red-600 mt-1">{fieldErrors.resetCode}</p>}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm mb-1">New Password</label>
                  <input 
                    type="password" 
                    className={`w-full rounded-md border px-3 py-2 ${fieldErrors.password ? 'border-red-500' : ''}`} 
                    value={form.password} 
                    onChange={(e) => {
                      const v = e.target.value;
                      const next = { ...form, password: v };
                      setForm(next);
                      if (fieldErrors.password) {
                        const m = validateField('password', v, next);
                        setFieldErrors((fe) => ({ ...fe, password: m || undefined } as any));
                      }
                      if (fieldErrors.confirmPassword) {
                        const m2 = validateField('confirmPassword', next.confirmPassword, next);
                        setFieldErrors((fe) => ({ ...fe, confirmPassword: m2 || undefined } as any));
                      }
                    }} 
                    aria-invalid={!!fieldErrors.password}
                    disabled={loading}
                  />
                  {fieldErrors.password && <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>}
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    className={`w-full rounded-md border px-3 py-2 ${fieldErrors.confirmPassword ? 'border-red-500' : ''}`} 
                    value={form.confirmPassword} 
                    onChange={(e) => {
                      const v = e.target.value;
                      const next = { ...form, confirmPassword: v };
                      setForm(next);
                      if (fieldErrors.confirmPassword) {
                        const m = validateField('confirmPassword', v, next);
                        setFieldErrors((fe) => ({ ...fe, confirmPassword: m || undefined } as any));
                      }
                    }} 
                    aria-invalid={!!fieldErrors.confirmPassword}
                    disabled={loading}
                  />
                  {fieldErrors.confirmPassword && <p className="text-xs text-red-600 mt-1">{fieldErrors.confirmPassword}</p>}
                </div>
              </div>
            </>
          )}

          {mode === "register" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">First name</label>
                  <input 
                    className={`w-full rounded-md border px-3 py-2 ${fieldErrors.firstName ? 'border-red-500' : ''}`} 
                    value={form.firstName} 
                    onChange={(e) => {
                      const v = e.target.value;
                      setForm({ ...form, firstName: v });
                      if (fieldErrors.firstName) {
                        const m = validateField('firstName', v, { ...form, firstName: v });
                        setFieldErrors((fe) => ({ ...fe, firstName: m || undefined } as any));
                      }
                    }} 
                    aria-invalid={!!fieldErrors.firstName}
                    disabled={loading}
                  />
                  {fieldErrors.firstName && <p className="text-xs text-red-600 mt-1">{fieldErrors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Last name</label>
                  <input 
                    className={`w-full rounded-md border px-3 py-2 ${fieldErrors.lastName ? 'border-red-500' : ''}`} 
                    value={form.lastName} 
                    onChange={(e) => {
                      const v = e.target.value;
                      setForm({ ...form, lastName: v });
                      if (fieldErrors.lastName) {
                        const m = validateField('lastName', v, { ...form, lastName: v });
                        setFieldErrors((fe) => ({ ...fe, lastName: m || undefined } as any));
                      }
                    }} 
                    aria-invalid={!!fieldErrors.lastName}
                    disabled={loading}
                  />
                  {fieldErrors.lastName && <p className="text-xs text-red-600 mt-1">{fieldErrors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Username</label>
                <input 
                  className={`w-full rounded-md border px-3 py-2 ${fieldErrors.username ? 'border-red-500' : ''}`} 
                  value={form.username} 
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm({ ...form, username: v });
                    if (fieldErrors.username) {
                      const m = validateField('username', v, { ...form, username: v });
                      setFieldErrors((fe) => ({ ...fe, username: m || undefined } as any));
                    }
                  }} 
                  aria-invalid={!!fieldErrors.username}
                  disabled={loading}
                />
                {fieldErrors.username && <p className="text-xs text-red-600 mt-1">{fieldErrors.username}</p>}
              </div>
            </>
          )}

          {(mode === "login" || mode === "register") && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">{mode === "login" ? "Email or Username" : "Email"}</label>
                <input 
                  type={mode === "login" ? "text" : "email"} 
                  className={`w-full rounded-md border px-3 py-2 ${fieldErrors.email ? 'border-red-500' : ''}`} 
                  value={form.email} 
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm({ ...form, email: v });
                    if (fieldErrors.email) {
                      const m = validateField('email', v, { ...form, email: v });
                      setFieldErrors((fe) => ({ ...fe, email: m || undefined } as any));
                    }
                  }} 
                  aria-invalid={!!fieldErrors.email}
                  disabled={loading}
                />
                {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input 
                  type="password" 
                  className={`w-full rounded-md border px-3 py-2 ${fieldErrors.password ? 'border-red-500' : ''}`} 
                  value={form.password} 
                  onChange={(e) => {
                    const v = e.target.value;
                    const next = { ...form, password: v };
                    setForm(next);
                    if (fieldErrors.password) {
                      const m = validateField('password', v, next);
                      setFieldErrors((fe) => ({ ...fe, password: m || undefined } as any));
                    }
                    if (fieldErrors.confirmPassword) {
                      const m2 = validateField('confirmPassword', next.confirmPassword, next);
                      setFieldErrors((fe) => ({ ...fe, confirmPassword: m2 || undefined } as any));
                    }
                  }} 
                  aria-invalid={!!fieldErrors.password}
                  disabled={loading}
                />
                {fieldErrors.password && <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>}
              </div>
              {mode === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot");
                      setError(null);
                      setFieldErrors({});
                    }}
                    className="text-xs text-primary-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              {mode === "register" && (
                <div>
                  <label className="block text-sm mb-1">Confirm Password</label>
                  <input 
                    type="password" 
                    className={`w-full rounded-md border px-3 py-2 ${fieldErrors.confirmPassword ? 'border-red-500' : ''}`} 
                    value={form.confirmPassword} 
                    onChange={(e) => {
                      const v = e.target.value;
                      const next = { ...form, confirmPassword: v };
                      setForm(next);
                      if (fieldErrors.confirmPassword) {
                        const m = validateField('confirmPassword', v, next);
                        setFieldErrors((fe) => ({ ...fe, confirmPassword: m || undefined } as any));
                      }
                    }} 
                    aria-invalid={!!fieldErrors.confirmPassword}
                    disabled={loading}
                  />
                  {fieldErrors.confirmPassword && <p className="text-xs text-red-600 mt-1">{fieldErrors.confirmPassword}</p>}
                </div>
              )}
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full rounded-md bg-primary-600 text-white py-2 hover:bg-primary-700 disabled:opacity-60">
            {mode === "login" ? "Login" : mode === "register" ? "Create account" : mode === "forgot" ? "Send Reset Link" : "Reset Password"}
          </button>

          <div className="text-center text-sm text-gray-600 pt-2">
            {mode === "login" && (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setError(null);
                    setFieldErrors({});
                  }}
                  className="text-primary-600 hover:underline"
                >
                  Register
                </button>
              </>
            )}
            {mode === "register" && (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError(null);
                    setFieldErrors({});
                  }}
                  className="text-primary-600 hover:underline"
                >
                  Login
                </button>
              </>
            )}
            {(mode === "forgot" || mode === "reset") && (
              <>
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeAuth();
                    setTimeout(() => openAuth("login"), 100);
                  }}
                  className="text-primary-600 hover:underline"
                >
                  Back to Login
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}