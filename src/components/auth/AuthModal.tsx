"use client";

import React, { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "@/utils/api";
import { setToken } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";

export default function AuthModal() {
  const t = useTranslations("auth");
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: bg,
          color: "#fff",
          padding: "10px 14px",
          borderRadius: "10px",
          minWidth: "320px",
          boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ fontSize: "18px" }}>{icon}</div>
        <div style={{ flex: 1, fontWeight: 500 }}>{message}</div>
        <button onClick={() => toast.dismiss(t.id)} style={{ opacity: 0.9 }}>
          ✕
        </button>
      </div>
    ), { duration: 4000 });
  };

  const validateField = (name: keyof typeof form, value: string, state: typeof form): string | null => {
    switch (name) {
      case "firstName":
        return value.trim() ? null : t("validation.firstNameRequired");
      case "lastName":
        return value.trim() ? null : t("validation.lastNameRequired");
      case "username": {
        const ok = /^(?=(?:.*[A-Za-z]){3,})(?=.*\d)[A-Za-z\d]{4,50}$/.test(value);
        return ok ? null : t("validation.usernameFormat");
      }
      case "email": {
        const ok = /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-])+)*@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/.test(value);
        return ok ? null : t("validation.email");
      }
      case "password": {
        const ok = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        return ok ? null : t("validation.password");
      }
      case "confirmPassword":
        return value === state.password ? null : t("validation.passwordsMismatch");
      default:
        return null;
    }
  };

  // Reset and initialize modal
  useEffect(() => {
    if (isAuthOpen && !initializedRef.current) {
      initializedRef.current = true;
      setMode(authMode);
      setError(null);
      setFieldErrors({});
      setForgotEmailSent(false);

      if (authData?.token) setResetToken(authData.token);
      if (authData?.email) {
        setForm((prev) => ({ ...prev, email: authData.email || "" }));
      }
      if (authData?.resetCode) {
        setForm((prev) => ({ ...prev, resetCode: authData.resetCode || "" }));
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

    try {
      const apiBase = API_BASE_URL;
      if (!apiBase) throw new Error(t("messages.apiNotConfigured"));

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
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || t("messages.networkError"));

      if (mode === "forgot") {
        setForgotEmailSent(true);
        showToast("success", data?.message || t("messages.resetLinkSent"));
        return;
      }

      if (mode === "reset") {
        showToast("success", data?.message || t("messages.passwordReset"));
        closeAuth();
        setTimeout(() => openAuth("login"), 100);
        return;
      }

      if (data?.token) setToken(data.token);
      await refresh();
      closeAuth();
      showToast("success", data?.message || (mode === "login" ? t("messages.loginSuccess") : t("messages.accountCreated")));
    } catch (err: any) {
      showToast("error", err?.message || t("messages.networkError"));
      setError(err?.message || t("messages.networkError"));
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
            {mode === "login"
              ? t("titles.login")
              : mode === "register"
              ? t("titles.register")
              : mode === "forgot"
              ? t("titles.forgot")
              : t("titles.reset")}
          </h2>
          <button onClick={closeAuth} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form onSubmit={submit} className="space-y-4 px-5 py-5 relative">
          {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-b-xl bg-white/70">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
            </div>
          )}

          {/* Forgot Password */}
          {mode === "forgot" && (
            forgotEmailSent ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">📧</div>
                <h3 className="text-lg font-semibold mb-2">{t("titles.checkEmail")}</h3>
                <p className="text-sm text-gray-600 mb-4">{t("messages.checkEmail", { email: form.email })}</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">{t("messages.enterEmailToReset")}</p>
                <label className="block text-sm mb-1">{t("fields.email")}</label>
                <input
                  type="email"
                  className={`w-full rounded-md border px-3 py-2 ${fieldErrors.email ? "border-red-500" : ""}`}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={loading}
                />
              </>
            )
          )}

          {/* Login/Register shared fields */}
          {(mode === "login" || mode === "register") && (
            <div className="space-y-3">
              {mode === "register" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">{t("fields.firstName")}</label>
                    <input className="w-full rounded-md border px-3 py-2" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">{t("fields.lastName")}</label>
                    <input className="w-full rounded-md border px-3 py-2" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm mb-1">
                  {mode === "login" ? t("fields.emailOrUsername") : t("fields.email")}
                </label>
                <input
                  type={mode === "login" ? "text" : "email"}
                  className="w-full rounded-md border px-3 py-2"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">{t("fields.password")}</label>
                <input
                  type="password"
                  className="w-full rounded-md border px-3 py-2"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              {mode === "register" && (
                <div>
                  <label className="block text-sm mb-1">{t("fields.confirmPassword")}</label>
                  <input
                    type="password"
                    className="w-full rounded-md border px-3 py-2"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  />
                </div>
              )}

              {mode === "login" && (
                <div className="text-right">
                  <button type="button" onClick={() => setMode("forgot")} className="text-xs text-primary-600 hover:underline">
                    {t("links.forgotPassword")}
                  </button>
                </div>
              )}
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full rounded-md bg-primary-600 text-white py-2 hover:bg-primary-700 disabled:opacity-60">
            {mode === "login"
              ? t("buttons.login")
              : mode === "register"
              ? t("buttons.register")
              : mode === "forgot"
              ? t("buttons.sendResetLink")
              : t("buttons.resetPassword")}
          </button>

          <div className="text-center text-sm text-gray-600 pt-2">
            {mode === "login" && (
              <>
                {t("links.noAccount")}{" "}
                <button onClick={() => setMode("register")} className="text-primary-600 hover:underline">
                  {t("buttons.register")}
                </button>
              </>
            )}
            {mode === "register" && (
              <>
                {t("links.haveAccount")}{" "}
                <button onClick={() => setMode("login")} className="text-primary-600 hover:underline">
                  {t("buttons.login")}
                </button>
              </>
            )}
            {(mode === "forgot" || mode === "reset") && (
              <>
                {t("links.rememberPassword")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    closeAuth();
                    setTimeout(() => openAuth("login"), 100);
                  }}
                  className="text-primary-600 hover:underline"
                >
                  {t("buttons.backToLogin")}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
