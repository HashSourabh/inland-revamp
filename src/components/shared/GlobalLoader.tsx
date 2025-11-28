"use client";

import React from "react";

type Props = {
  active: boolean;
};

export default function GlobalLoader({ active }: Props) {
  if (!active) return null;
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="rounded-xl bg-white/90 px-5 py-4 shadow-xl">
        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
      </div>
    </div>
  );
}





