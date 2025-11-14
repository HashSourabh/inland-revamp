"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titleKey?: string;          // translation key
  descriptionKey?: string;    // translation key
  confirmKey?: string;        // translation key
  cancelKey?: string;         // translation key
  confirmButtonClassName?: string;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  titleKey = "favourites.removeTitle",
  descriptionKey = "favourites.removeDescription",
  confirmKey = "favourites.removeConfirm",
  cancelKey = "favourites.removeCancel", // fallback if added later
  confirmButtonClassName = "bg-red-600 hover:bg-red-700",
}: ConfirmDialogProps) {
  const t = useTranslations("Profile_account");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold">{t(titleKey)}</h3>
          <p className="text-sm text-gray-600 mt-1">{t(descriptionKey)}</p>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            {t(cancelKey)}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white rounded-md ${confirmButtonClassName}`}
          >
            {t(confirmKey)}
          </button>
        </div>
      </div>
    </div>
  );
}
