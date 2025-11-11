"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ResetPasswordPage() {
  const search = useSearchParams();
  const router = useRouter();
  const token = search?.get("token") ?? null; // ✅ Safe null handling
  const email = search?.get("email") ?? null;

  const { openAuth, isAuthOpen, authMode } = useAuth();
  const hasOpenedRef = useRef(false); // ✅ Track if we've already opened the modal

  useEffect(() => {
    if (token && email && !hasOpenedRef.current) {
      console.log("ResetPasswordPage: Opening reset modal");
      hasOpenedRef.current = true;
      openAuth("reset", { token, email });
    }
  }, [token, email]); // ✅ Remove openAuth from dependencies

  // Clear URL when modal closes or mode changes away from reset
  useEffect(() => {
    if ((token || email) && (!isAuthOpen || authMode !== "reset")) {
      console.log("ResetPasswordPage: Clearing URL");
      router.replace(window.location.pathname);
      hasOpenedRef.current = false; // ✅ Reset flag when URL is cleared
    }
  }, [isAuthOpen, authMode, token, email, router]);

  return null;
}