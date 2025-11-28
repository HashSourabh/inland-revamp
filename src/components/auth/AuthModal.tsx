"use client";

import React, { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "@/utils/api";
import { setToken } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function AuthModal() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const { isAuthOpen, closeAuth, authMode, refresh, authData, openAuth } = useAuth();
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "reset">("login");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [forgotEmailSent, setForgotEmailSent] = useState(false);
  const initializedRef = useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    resetCode: "",
  });

  const handleInputChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const getInputClassName = (field: keyof typeof form) =>
    `w-full rounded-md border px-3 py-3 focus:ring-1 focus:outline-none ${
      fieldErrors[field] ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200"
    }`;

  const runClientValidation = () => {
    const nextErrors: Record<string, string> = {};
    const validateFields = (fields: (keyof typeof form)[]) => {
      fields.forEach((field) => {
        const message = validateField(field, form[field], form);
        if (message) nextErrors[field] = message;
      });
    };

    if (mode === "register") {
      validateFields(["firstName", "lastName", "username", "email", "password", "confirmPassword"]);
    } else if (mode === "login") {
      if (!form.email.trim()) {
        nextErrors.email = t("validation.emailRequired");
      }
      if (!form.password.trim()) {
        nextErrors.password = t("validation.passwordRequired");
      }
    } else if (mode === "forgot") {
      validateFields(["email"]);
    } else if (mode === "reset") {
      validateFields(["email", "password", "confirmPassword"]);
    }

    return nextErrors;
  };

  const applyServerValidationErrors = (details: any, fallbackMessage: string) => {
    if (!Array.isArray(details) || !details.length) return false;
    const parsed: Record<string, string> = {};

    details.forEach((detail) => {
      const key = detail?.field || detail?.path || detail?.param;
      const message = detail?.message || detail?.msg;
      if (key && message) parsed[key] = message;
    });

    if (Object.keys(parsed).length) {
      setFieldErrors(parsed);
      return true;
    }
    return false;
  };

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
        if (!value.trim()) return t("validation.usernameRequired");
        const ok = /^(?=(?:.*[A-Za-z]){3,})(?=.*\d)[A-Za-z\d]{4,50}$/.test(value);
        return ok ? null : t("validation.usernameFormat");
      }
      case "email": {
        if (!value.trim()) return t("validation.emailRequired");
        const ok = /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-])+)*@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/.test(value);
        return ok ? null : t("validation.email");
      }
      case "password": {
        if (!value.trim()) return t("validation.passwordRequired");
        return value.length >= 8 ? null : t("validation.password");
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
      setFieldErrors({});
      setForgotEmailSent(false);
      setShowPassword(false);
      setShowConfirmPassword(false);

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
      setFieldErrors({});
      setMode("login");
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isAuthOpen, authMode, authData]);

  useEffect(() => {
    setFieldErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [mode]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientErrors = runClientValidation();
    if (Object.keys(clientErrors).length) {
      setFieldErrors(clientErrors);
      return;
    }

    setFieldErrors({});
    // setLoading(true);

    try {
      const apiBase = API_BASE_URL;
      if (!apiBase) throw new Error(t("messages.apiNotConfigured"));

      let url = "";
      let payload: any = {};

      const identifierRaw = form.email.trim();
      const emailValue = identifierRaw.includes("@") ? identifierRaw.toLowerCase() : identifierRaw;
      const trimmedFirstName = form.firstName.trim();
      const trimmedLastName = form.lastName.trim();
      const trimmedUsername = form.username.trim();

      if (mode === "login") {
        url = `${apiBase}/auth/login`;
        payload = { email: emailValue, password: form.password };
      } else if (mode === "register") {
        url = `${apiBase}/auth/register`;
        payload = {
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          username: trimmedUsername,
          email: emailValue,
          password: form.password,
          confirmPassword: form.confirmPassword,
        };
      } else if (mode === "forgot") {
        url = `${apiBase}/auth/forgot-password`;
        payload = { email: emailValue };
      } else if (mode === "reset") {
        url = `${apiBase}/auth/reset-password`;
        payload = {
          email: emailValue,
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

      if (!res.ok) {
        const fallbackMessage = data?.message || data?.error || t("messages.fixErrors");
        const handled = applyServerValidationErrors(data?.details, fallbackMessage);
        if (handled) return;
        throw new Error(data?.message || data?.error || t("messages.genericError"));
      }

      if (mode === "forgot") {
        setForgotEmailSent(true);
        showToast("success", data?.message || t("messages.resetLinkSent"));
        return;
      }

      if (mode === "reset") {
        const redirectAfterReset = authData?.redirectTo;
        showToast("success", data?.message || t("messages.passwordReset"));
        closeAuth();
        setTimeout(() => openAuth("login", redirectAfterReset ? { redirectTo: redirectAfterReset } : undefined), 100);
        return;
      }

      if (data?.token) setToken(data.token);
      await refresh();
      if (mode === "login" || mode === "register") {
        const successMessage = data?.message || (mode === "login" ? t("messages.loginSuccess") : t("messages.accountCreated"));
        showToast("success", successMessage);
        closeAuth();
        const redirectPath = authData?.redirectTo || `/${locale}/account`;
        router.push(redirectPath);
        return;
      }
      closeAuth();
      console.log("data", data);
      showToast("success", data?.message || (mode === "login" ? t("messages.loginSuccess") : t("messages.accountCreated")));
    } catch (err: any) {
      showToast("error", err?.message || t("messages.genericError"));
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[550px] rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between  px-8 pt-8 pb-3">
          <h2 className="text-2xl font-heading  text-center mx-auto font-bold">
            {mode === "login"
              ? t("titles.login")
              : mode === "register"
                ? t("titles.register")
                : mode === "forgot"
                  ? t("titles.forgot")
                  : t("titles.reset")}
          </h2>
          {mode === "register" && (
            <p></p>
          )}
          <button onClick={closeAuth} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form onSubmit={submit} className="space-y-4 px-8 pt-5 pb-10 relative">
          {loading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-b-xl bg-white/70">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
              <p className="text-sm font-medium text-gray-600">
                {mode === "login"
                  ? t("buttons.processingLogin")
                  : mode === "register"
                  ? t("buttons.processingRegister")
                  : mode === "forgot"
                  ? t("buttons.processingSend")
                  : t("buttons.processingReset")}
              </p>
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
                <p className="text-base text-gray-600 mb-4">{t("messages.enterEmailToReset")}</p>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">{t("fields.email")}</label>
                  <input
                    type="email"
                    className={getInputClassName("email")}
                    value={form.email}
                    onChange={handleInputChange("email")}
                    disabled={loading}
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                  {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
                </div>
              </>
            )
          )}

          {/* Login/Register shared fields */}
          {(mode === "login" || mode === "register") && (
            <div className="space-y-4">
              {mode === "register" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">{t("fields.firstName")}</label>
                    <input
                      className={getInputClassName("firstName")}
                      value={form.firstName}
                      onChange={handleInputChange("firstName")}
                      aria-invalid={Boolean(fieldErrors.firstName)}
                    />
                    {fieldErrors.firstName && <p className="mt-1 text-xs text-red-600">{fieldErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">{t("fields.lastName")}</label>
                    <input
                      className={getInputClassName("lastName")}
                      value={form.lastName}
                      onChange={handleInputChange("lastName")}
                      aria-invalid={Boolean(fieldErrors.lastName)}
                    />
                    {fieldErrors.lastName && <p className="mt-1 text-xs text-red-600">{fieldErrors.lastName}</p>}
                  </div>
                </div>
              )}

              {mode === "register" && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">{t("fields.username")}</label>
                  <input
                    className={getInputClassName("username")}
                    value={form.username}
                    onChange={handleInputChange("username")}
                    aria-invalid={Boolean(fieldErrors.username)}
                  />
                  {fieldErrors.username && <p className="mt-1 text-xs text-red-600">{fieldErrors.username}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {mode === "login" ? t("fields.emailOrUsername") : t("fields.email")}
                </label>
                <input
                  type={mode === "login" ? "text" : "email"}
                  className={getInputClassName("email")}
                  value={form.email}
                  onChange={handleInputChange("email")}
                  aria-invalid={Boolean(fieldErrors.email)}
                />
                {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">{t("fields.password")}</label>
                <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    className={`${getInputClassName("password")} pr-10`}
                  value={form.password}
                    onChange={handleInputChange("password")}
                    aria-invalid={Boolean(fieldErrors.password)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    disabled={loading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
                {fieldErrors.password && <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>}
              </div>

              {mode === "register" && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">{t("fields.confirmPassword")}</label>
                  <div className="relative">
                  <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`${getInputClassName("confirmPassword")} pr-10`}
                    value={form.confirmPassword}
                      onChange={handleInputChange("confirmPassword")}
                      aria-invalid={Boolean(fieldErrors.confirmPassword)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      disabled={loading}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && <p className="mt-1 text-xs text-red-600">{fieldErrors.confirmPassword}</p>}
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

          {/* Reset Password */}
          {mode === "reset" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">{t("fields.email")}</label>
                <input
                  type="email"
                  className={`${getInputClassName("email")} bg-gray-100`}
                  value={form.email}
                  onChange={handleInputChange("email")}
                  disabled
                  readOnly
                  aria-invalid={Boolean(fieldErrors.email)}
                />
                {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">{t("fields.password")}</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`${getInputClassName("password")} pr-10`}
                    value={form.password}
                    onChange={handleInputChange("password")}
                    aria-invalid={Boolean(fieldErrors.password)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    disabled={loading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
                {fieldErrors.password && <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">{t("fields.confirmPassword")}</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`${getInputClassName("confirmPassword")} pr-10`}
                    value={form.confirmPassword}
                    onChange={handleInputChange("confirmPassword")}
                    aria-invalid={Boolean(fieldErrors.confirmPassword)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    disabled={loading}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && <p className="mt-1 text-xs text-red-600">{fieldErrors.confirmPassword}</p>}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md min-h-[50px] bg-primary-600 text-white py-3 hover:bg-primary-700 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>
                  {mode === "login"
                    ? t("buttons.processingLogin")
                    : mode === "register"
                    ? t("buttons.processingRegister")
                    : mode === "forgot"
                    ? t("buttons.processingSend")
                    : t("buttons.processingReset")}
                </span>
              </>
            ) : (
              <span>
                {mode === "login"
                  ? t("buttons.login")
                  : mode === "register"
                  ? t("buttons.register")
                  : mode === "forgot"
                  ? t("buttons.sendResetLink")
                  : t("buttons.resetPassword")}
              </span>
            )}
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
