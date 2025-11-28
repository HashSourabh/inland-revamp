"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getToken } from "@/context/AuthContext";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/api";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import AccountSectionLoader from "@/components/loader/AccountSectionLoader";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type Favourite = { Property_Ref: string; Created_At: string, Property_ID: number; };
type Reservation = {
  PaypalTransactionId: number;
  Buyer_Id: number;
  TransactionNumber: string;
  ReservedAmount: number;
  Currency: string;
  PropertyRef: string;
  ReservedDate: string;
  PaymentMethod: string;
  property: {
    Property_ID: number;
    Property_Ref: string;
    Bedrooms: number;
    Bathrooms: number;
    Num_Photos: number;
    Property_Type_ID: number;
    Property_Address: string;
    Public_Price: number;
    SQM_Built: number;
    SQM_Plot: number;
    Video_URL?: string;
    Property_Notes?: string;
  };
};
type CriteriaOption = {
  id: number;
  label: string;
  value: string;
};

type CriteriaCategory = {
  id: number;
  title: string;
  key: string;
  options: CriteriaOption[];
};
type BuyerCriteriaItem = { value: string; id: number | null };
type BuyerCriteria = {
  [key: string]: BuyerCriteriaItem[];
};

function compressImage(
  file: File,
  options: { maxWidth: number; maxHeight: number; quality: number }
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > options.maxWidth) {
            height = (height * options.maxWidth) / width;
            width = options.maxWidth;
          }
        } else {
          if (height > options.maxHeight) {
            width = (width * options.maxHeight) / height;
            height = options.maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', options.quality);
        resolve(compressedBase64);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export default function AccountPage() {
  const t = useTranslations('Profile_account');
  const locale = useLocale();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { user, loading, refresh } = useAuth();
  const [tab, setTab] = useState<"profile" | "favourites" | "reservations" | "criterias">("profile");
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [favDetails, setFavDetails] = useState<any[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingRemoveRef, setPendingRemoveRef] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [reservationsLoading, setReservationsLoading] = useState(false);
  const [isFavLoading, setIsFavLoading] = useState(false);
  const [pendingRemoveId, setPendingRemoveId] = useState<number | null>(null);

  const [criteriaCategories, setCriteriaCategories] = useState<CriteriaCategory[]>([]);
  const [buyerCriteria, setBuyerCriteria] = useState<BuyerCriteria>({});
  const [criteriaLoading, setCriteriaLoading] = useState(false);
  const [criteriaSaving, setCriteriaSaving] = useState(false);


  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    buyer_address: "",
  });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.replace(`/${locale}`);
    }
  }, [mounted, loading, user, router, locale]);

  const showToast = (type: "success" | "error" | "info", message: string) => {
    const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
    const bg = type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#2563eb";
    toast.custom((t) => (
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: bg, color: '#fff', padding: '10px 14px', borderRadius: '10px',
        minWidth: '320px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '18px' }}>{icon}</div>
        <div style={{ flex: 1, fontWeight: 500 }}>{message}</div>
        <button onClick={() => toast.dismiss(t.id)} style={{ opacity: 0.9 }}>✕</button>
      </div>
    ), { duration: 4000 });
  };

  const [saving, setSaving] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwdMsg, setPwdMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startUpload = () => fileInputRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('error', t('profile.invalidFileType'));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('error', t('profile.fileTooLarge'));
      return;
    }

    setUploading(true);
    console.log('📸 Original file size:', (file.size / 1024).toFixed(2), 'KB');

    try {
      const compressedBase64 = await compressImage(file, {
        maxWidth: 400,
        maxHeight: 400,
        quality: 0.8
      });

      console.log('📸 Compressed size:', (compressedBase64.length / 1024).toFixed(2), 'KB');
      setProfilePreview(compressedBase64);

      try {
        const token = getToken();
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${API_BASE_URL}/buyers/me/profile-image`, {
          method: 'PUT',
          credentials: 'include',
          headers,
          body: JSON.stringify({ imageBase64: compressedBase64 })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || data?.error || 'Upload failed');
        }

        console.log('✅ Upload successful:', data);
        await refresh();
        setProfilePreview(null);
        showToast('success', t('profile.uploadSuccess'));

      } catch (uploadError: any) {
        console.error('❌ Upload error:', uploadError);
        showToast('error', uploadError.message || t('profile.uploadError'));
        setProfilePreview(null);
      }

      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (compressionError: any) {
      console.error('❌ Compression error:', compressionError);
      showToast('error', t('profile.uploadError'));
      setUploading(false);
    }
  };

  useEffect(() => {
    console.log('User data changed:', user);
    if (user) {
      setProfileForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        contactNumber: user.Buyer_Telephone ? String(user.Buyer_Telephone) : "",
        buyer_address: user.Buyer_Address || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user || tab !== "favourites") return;

    const apiBase = API_BASE_URL;
    const token = getToken();

    const authHeaders: HeadersInit = {};
    if (token) authHeaders["Authorization"] = `Bearer ${token}`;

    setIsFavLoading(true);

    fetch(`${apiBase}/buyers/me/favourites`, { headers: authHeaders })
      .then((r) => r.json())
      .then((d) => {
        setFavDetails(d.favourites || []);
      })
      .catch((err) => {
        console.error("❌ Failed to load favourites:", err);
        setFavDetails([]);
      })
      .finally(() => {
        setIsFavLoading(false);
      });
  }, [tab, user]);



  useEffect(() => {
    if (tab !== "reservations") return;
    setReservationsLoading(true);

    const buyerId = localStorage.getItem("buyer_Id");
    console.log(buyerId, 'this is the buyer data from local storage');

    if (!buyerId) {
      console.warn("⚠️ No Buyer_ID found in localStorage.");
      setReservations([]);
      setReservationsLoading(false);
      return;
    }

    const apiBase = API_BASE_URL;
    const token = getToken();
    const authHeaders: HeadersInit = {};
    if (token) authHeaders["Authorization"] = `Bearer ${token}`;

    fetch(`${apiBase}/reservations?buyer_id=${buyerId}`, {
      headers: authHeaders,
    })
      .then((r) => r.json())
      .then((d) => setReservations(d.reservations || []))
      .catch(() => setReservations([]))
      .finally(() => setReservationsLoading(false));
  }, [tab, user]);
  useEffect(() => {
    if (tab !== "criterias") return;

    const fetchCriteria = async () => {
      setCriteriaLoading(true);
      try {
        const token = getToken();
        const headers: HeadersInit = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;
        const language_id = localStorage.getItem("LanguageId") || "1";

        // Fetch categories
        const categoriesRes = await fetch(`${API_BASE_URL}/criterias?language_id=${language_id}`, { headers });
        const categoriesData = await categoriesRes.json();
        setCriteriaCategories(categoriesData.categories || []);

        // Fetch buyer's saved criteria
        const buyerCriteriaRes = await fetch(`${API_BASE_URL}/criterias/buyer`, { headers });
        const buyerCriteriaData = await buyerCriteriaRes.json();

        const mappedBuyerCriteria: BuyerCriteria = {};
        Object.entries(buyerCriteriaData.criteria || {}).forEach(([key, items]: any) => {
          mappedBuyerCriteria[key] = (items as any[]).map(item => ({
            value: item.value,
            id: item.id || null
          }));
        });

        setBuyerCriteria(mappedBuyerCriteria);

      } catch (error) {
        console.error("Failed to load criteria:", error);
        showToast("error", "Failed to load criteria");
      } finally {
        setCriteriaLoading(false);
      }
    };

    fetchCriteria();
  }, [tab]);

  const clearProfileError = (field: keyof typeof profileForm | "firstName" | "lastName") => {
    setProfileErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateProfileForm = () => {
    const errors: Record<string, string> = {};
    const firstName = profileForm.firstName.trim();
    const lastName = profileForm.lastName.trim();
    const address = profileForm.buyer_address?.trim() || "";
    const phone = profileForm.contactNumber?.trim() || "";

    if (!firstName) errors.firstName = t("profile.firstNameRequired");
    else if (firstName.length < 2 || firstName.length > 100) errors.firstName = t("profile.firstNameLength");

    if (!lastName) errors.lastName = t("profile.lastNameRequired");
    else if (lastName.length < 2 || lastName.length > 100) errors.lastName = t("profile.lastNameLength");

    // Only validate address if it has a value
    if (address && address.length > 0) {
      if (address.length < 5 || address.length > 255) {
        errors.buyer_address = t("profile.addressLength");
      }
    }

    // Only validate phone if it has a value
    if (phone && phone.length > 0) {
      // Count only digits for validation (excluding formatting characters)
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length < 8 || phoneDigits.length > 20) {
        errors.contactNumber = t("profile.phoneLength");
      }
    }

    return errors;
  };

  const mapServerProfileErrors = (details: any): Record<string, string> => {
    if (!Array.isArray(details)) return {};
    const mapped: Record<string, string> = {};
    details.forEach((detail) => {
      const key = detail?.path || detail?.field;
      const msg = detail?.msg || detail?.message;
      if (key && msg) mapped[key] = msg;
    });
    return mapped;
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProfileForm();
    if (Object.keys(validationErrors).length) {
      setProfileErrors(validationErrors);
      return;
    }
    setProfileErrors({});
    setSaving(true);

    try {
      const token = getToken();
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      // Build payload - only include optional fields if they have values
      const payload: any = {
        firstName: profileForm.firstName.trim(),
        lastName: profileForm.lastName.trim(),
      };
      
      const trimmedPhone = profileForm.contactNumber?.trim() || "";
      const trimmedAddress = profileForm.buyer_address?.trim() || "";
      
      // Only include optional fields if they have values
      if (trimmedPhone) {
        payload.contactNumber = trimmedPhone;
      }
      if (trimmedAddress) {
        payload.buyer_address = trimmedAddress;
      }

      const res = await fetch(`${API_BASE_URL}/buyers/me`, {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        const serverErrors = mapServerProfileErrors(data?.details);
        if (Object.keys(serverErrors).length) setProfileErrors(serverErrors);
        throw new Error(data?.message || data?.error || "Profile update failed");
      }

      await refresh();
      showToast("success", data?.message || t('profile.updateSuccess'));
    } catch (err: any) {
      showToast("error", err.message || t('profile.updateError'));
    } finally {
      setSaving(false);
    }
  };
  // Add a ref to track ongoing save operations
  // Remove the auto-save logic from handleCriteriaChange
  const handleCriteriaChange = (
    categoryKey: string,
    optionValue: string,
    checked: boolean
  ) => {
    setBuyerCriteria(prev => {
      const categoryValues: BuyerCriteriaItem[] = prev[categoryKey] || [];
      let updatedCategory: BuyerCriteriaItem[];

      if (checked) {
        // Add option if not already present
        if (!categoryValues.some(item => item.value === optionValue)) {
          updatedCategory = [...categoryValues, { value: optionValue, id: null }];
        } else {
          updatedCategory = categoryValues;
        }
      } else {
        // Remove option
        updatedCategory = categoryValues.filter(item => item.value !== optionValue);
      }

      return { ...prev, [categoryKey]: updatedCategory };
    });
  };

  // Updated handler to save ALL criteria when Save button is clicked
  const handleSaveCriteria = async () => {
    // Prevent duplicate calls
    if (criteriaSaving) {
      console.log('⏭️ Skipping duplicate save call');
      return;
    }

    setCriteriaSaving(true);

    try {
      // Convert buyerCriteria to the format expected by the API
      const criteriaToSave: Record<string, string[]> = {};

      Object.entries(buyerCriteria).forEach(([key, items]) => {
        if (items && items.length > 0) {
          criteriaToSave[key] = items.map(item => item.value);
        }
      });

      // Only send request if there are criteria to save
      if (Object.keys(criteriaToSave).length === 0) {
        showToast("info", "No criteria selected");
        setCriteriaSaving(false);
        return;
      }

      const token = getToken();
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/criterias/update`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ criteria: criteriaToSave }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to save criteria");

      showToast("success", "Criteria saved successfully");
    } catch (error: any) {
      showToast("error", error.message || "Failed to save criteria");
    } finally {
      setCriteriaSaving(false);
    }
  };





  if (!mounted || loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <AccountSectionLoader message={t('loading')} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">{t('title')}</h1>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
            <div className="bg-white border rounded-lg shadow-sm">
              <nav className="p-2">
                <button
                className={`w-full text-left px-4 py-3 rounded-md transition-colors ${tab === "profile" ? "bg-primary-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setTab("profile")}
                >
                  {t('tabs.profile')}
                </button>
                <button
                className={`w-full text-left px-4 py-3 rounded-md transition-colors mt-1 ${tab === "favourites" ? "bg-primary-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setTab("favourites")}
                >
                  {t('tabs.favourites')}
                </button>
                <button
                className={`w-full text-left px-4 py-3 rounded-md transition-colors mt-1 ${tab === "reservations" ? "bg-primary-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setTab("reservations")}
                >
                  {t('tabs.reservations')}
                </button>
                <button
                className={`w-full text-left px-4 py-3 rounded-md transition-colors mt-1 ${tab === "criterias" ? "bg-primary-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setTab("criterias")}
                >
                  Criterias
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {tab === "profile" && (
              <div className="bg-white border rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {(profilePreview || user.profileImageUrl) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={(profilePreview || user.profileImageUrl) as string}
                        alt="Profile"
                        className="h-16 w-16 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-gray-200 grid place-items-center border">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <div className="text-xl font-semibold">{t('profile.title')}</div>
                      <div>
                        <button
                          type="button"
                          onClick={startUpload}
                          className="text-primary-600 hover:underline text-sm inline-flex items-center gap-1"
                          disabled={uploading}
                        >
                          <span>{uploading ? t('profile.uploading') : t('profile.uploadPhoto')}</span>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={onFileChange}
                          hidden
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPwdOpen(true);
                      setPwdMsg(null);
                      setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                    }}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    {t('profile.changePassword')}
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="max-w-xl space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{t('profile.firstName')}</label>
                      <input
                        type="text"
                        className={`w-full rounded-md border px-3 py-2 ${profileErrors.firstName ? 'border-red-500' : ''}`}
                        value={profileForm.firstName}
                        onChange={(e) => {
                          setProfileForm({ ...profileForm, firstName: e.target.value });
                          clearProfileError("firstName");
                        }}
                        aria-invalid={Boolean(profileErrors.firstName)}
                        aria-required="true"
                      />
                      {profileErrors.firstName && <p className="text-xs text-red-600 mt-1">{profileErrors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t('profile.lastName')}</label>
                      <input
                        type="text"
                        className={`w-full rounded-md border px-3 py-2 ${profileErrors.lastName ? 'border-red-500' : ''}`}
                        value={profileForm.lastName}
                        onChange={(e) => {
                          setProfileForm({ ...profileForm, lastName: e.target.value });
                          clearProfileError("lastName");
                        }}
                        aria-invalid={Boolean(profileErrors.lastName)}
                        aria-required="true"
                      />
                      {profileErrors.lastName && <p className="text-xs text-red-600 mt-1">{profileErrors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{t('profile.username')}</label>
                    <input
                      type="text"
                      className="w-full rounded-md border px-3 py-2 bg-gray-50 text-gray-600 cursor-not-allowed"
                      value={user.username || ""}
                      disabled
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{t('profile.email')}</label>
                    <input
                      type="email"
                      className="w-full rounded-md border px-3 py-2 bg-gray-50 text-gray-600 cursor-not-allowed"
                      value={user.email || ""}
                      disabled
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{t('profile.phone')}</label>
                    <PhoneInput
                      international
                      defaultCountry="ES"
                      value={profileForm.contactNumber || undefined}
                      onChange={(value) => {
                        setProfileForm({ ...profileForm, contactNumber: value || "" });
                        clearProfileError("contactNumber");
                      }}
                      className={`phone-input-wrapper ${profileErrors.contactNumber ? 'phone-input-error' : ''}`}
                      numberInputProps={{
                        className: `w-full rounded-md border px-3 py-2 ${profileErrors.contactNumber ? 'border-red-500' : 'border-gray-300'}`,
                        "aria-invalid": Boolean(profileErrors.contactNumber),
                      }}
                      placeholder={t('profile.phonePlaceholder')}
                    />
                    {profileErrors.contactNumber && <p className="text-xs text-red-600 mt-1">{profileErrors.contactNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{t('profile.address')}</label>
                    <input
                      type="text"
                      className={`w-full rounded-md border px-3 py-2 ${profileErrors.buyer_address ? 'border-red-500' : ''}`}
                      value={profileForm.buyer_address}
                      onChange={(e) => {
                        setProfileForm({ ...profileForm, buyer_address: e.target.value });
                        clearProfileError("buyer_address");
                      }}
                      placeholder={t('profile.addressPlaceholder')}
                      aria-invalid={Boolean(profileErrors.buyer_address)}
                    />
                    {profileErrors.buyer_address && <p className="text-xs text-red-600 mt-1">{profileErrors.buyer_address}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {saving ? t('profile.saving') : t('profile.saveChanges')}
                  </button>
                </form>

                <PasswordModal
                  open={pwdOpen}
                  onClose={() => setPwdOpen(false)}
                  onSubmit={async (e: React.FormEvent) => {
                    e.preventDefault();
                    setPwdMsg(null);
                    setPwdLoading(true);

                    if (!pwdForm.currentPassword.trim() || !pwdForm.newPassword.trim() || !pwdForm.confirmPassword.trim()) {
                      setPwdLoading(false);
                      return setPwdMsg({ type: 'error', text: t('password.allFieldsRequired') });
                    }

                    if (pwdForm.newPassword.length < 8) {
                      setPwdLoading(false);
                      return setPwdMsg({ type: 'error', text: t('password.weakPassword') });
                    }

                    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
                      setPwdLoading(false);
                      return setPwdMsg({ type: 'error', text: t('password.passwordMismatch') });
                    }

                    try {
                      const token = getToken();
                      const res = await fetch(`${API_BASE_URL}/buyers/me/password`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: token
                          ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
                          : { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          currentPassword: pwdForm.currentPassword,
                          newPassword: pwdForm.newPassword
                        })
                      });

                      const data = await res.json();
                      if (!res.ok) throw new Error(data?.message || data?.error || t('password.updateError'));

                      setPwdMsg({ type: 'success', text: data?.message || t('password.success') });
                      setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      setTimeout(() => setPwdOpen(false), 1200);
                    } catch (err: any) {
                      setPwdMsg({ type: 'error', text: err.message || t('password.updateError') });
                    } finally {
                      setPwdLoading(false);
                    }
                  }}
                  pwdForm={pwdForm}
                  setPwdForm={setPwdForm}
                  pwdMsg={pwdMsg}
                  setPwdMsg={setPwdMsg}
                  pwdLoading={pwdLoading}
                />
              </div>
            )}

            {tab === "favourites" && (
              <div className="bg-white border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">{t('favourite.title')}</h2>

                {/* 🔄 Loader while fetching */}
                {isFavLoading ? (
                  <AccountSectionLoader message={t('favourite.loading')} />
                ) : favDetails.length === 0 ? (
                  <div className="text-gray-600">{t('favourite.noFavourites')}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="p-4 text-left font-semibold text-gray-700">{t('favourite.photo')}</th>
                          <th className="p-4 text-left font-semibold text-gray-700">{t('favourite.propertyInfo')}</th>
                          <th className="p-4 text-left font-semibold text-gray-700">{t('favourite.addedOn')}</th>
                          <th className="p-4 text-left font-semibold text-gray-700">{t('favourite.price')}</th>
                          <th className="p-4 text-left font-semibold text-gray-700">{t('favourite.action')}</th>
                        </tr>
                      </thead>

                      <tbody>
                        {favDetails.map((f) => {
                          const ref = f.Property_Ref || f.Property_ID;
                          const propertyName = f.Property_Name || f.Property_Title || f.Property_Type_Name || f.Property_Type || "";
                          const displayName = propertyName ? `${propertyName} (${ref})` : ref;
                          const img = ref
                            ? `https://www.inlandandalucia.com/images/photos/properties/${ref}/${ref}_1.jpg`
                            : "https://www.inlandandalucia.com/images/no-image-available.jpg";
                          const description = f.Property_Description || f.Short_Description || f.Property_Short_Description || "";
                          const bedrooms = f.Bedrooms || f.Property_Bedrooms || 0;
                          const bathrooms = f.Bathrooms || f.Property_Bathrooms || 0;
                          const area = f.Build_Size || f.Property_Build_Size || f.Square_Meters || 0;

                          return (
                            <tr key={ref} className="border-b hover:bg-gray-50 transition-colors">
                              <td className="p-4">
                                <img
                                  src={img}
                                  alt={`Property ${ref}`}
                                  className="w-32 h-24 min-w-32 object-cover rounded-lg"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      "https://www.inlandandalucia.com/images/no-image-available.jpg";
                                  }}
                                />
                              </td>
                              <td className="p-4">
                                <div className="space-y-2">
                                  <h3 className="font-semibold text-gray-900 text-base">
                                    {displayName}
                                  </h3>
                                  {description && (
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                      {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                                    </p>
                                  )}
                                  {area > 0 && (
                                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                      </svg>
                                      <span>{area} {t('favourite.sqFt') || 'Sq Ft'}</span>
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="p-4 text-gray-600">
                                {new Date(f.DateCreated).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </td>
                              <td className="p-4">
                                <span className="font-semibold text-gray-900 text-base">
                                  {f.Public_Price ? `€${f.Public_Price.toLocaleString()}` : "-"}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Link
                                    href={`/properties/${encodeURIComponent(f.Property_ID)}`}
                                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {t('favourite.viewProperty')}
                                  </Link>
                                  <button
                                    onClick={() => { setPendingRemoveId(f.Property_ID); setConfirmOpen(true); }}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                                  >
                                    {t('favourite.remove')}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}



            {tab === "reservations" && (
              <div className="bg-white border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">{t('reservations.title')}</h2>

                {reservationsLoading ? (
                  <AccountSectionLoader message={t('loading')} />
                ) : reservations.length === 0 ? (
                  <div className="text-gray-600">{t('reservations.noReservations')}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="p-4 text-left font-semibold text-gray-700">{t('reservations.photo')}</th>
                          <th className="p-4 text-left font-semibold text-gray-700">{t('reservations.propertyInfo')}</th>
                          <th className="p-4 text-left font-semibold text-gray-700">{t('reservations.reservedDate')}</th>
                          <th className="p-4 text-left font-semibold text-gray-700">{t('reservations.reservedAmount')}</th>
                          <th className="p-4 text-left font-semibold text-gray-700">{t('reservations.action')}</th>
                        </tr>
                      </thead>

                      <tbody>
                        {reservations.map((r) => {
                          const property = (r.property || {}) as Record<string, any>;
                          const propertyId = property?.Property_ID || null;
                          const propertyRef = property?.Property_Ref || "N/A";
                          const propertyName = property?.Property_Name || property?.Property_Title || property?.Property_Type_Name || property?.Property_Type || "";
                          const displayName = propertyName ? `${propertyName} (${propertyRef})` : propertyRef;
                          const img =
                            propertyRef && propertyRef !== "N/A"
                              ? `https://www.inlandandalucia.com/images/photos/properties/${propertyRef}/${propertyRef}_1.jpg`
                              : "https://www.inlandandalucia.com/images/no-image-available.jpg";
                          const description = property?.Property_Description || property?.Short_Description || property?.Property_Short_Description || "";
                          const area = property?.SQM_Built || property?.Build_Size || property?.Property_Build_Size || property?.Square_Meters || 0;

                          return (
                            <tr key={r.PaypalTransactionId} className="border-b hover:bg-gray-50 transition-colors">
                              <td className="p-4">
                                <img
                                  src={img}
                                  alt={`Property ${propertyRef}`}
                                  className="w-32 h-24 min-w-32 object-cover rounded-lg"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      "https://www.inlandandalucia.com/images/no-image-available.jpg";
                                  }}
                                />
                              </td>
                              <td className="p-4">
                                <div className="space-y-2">
                                  <h3 className="font-semibold text-gray-900 text-base">
                                    {displayName}
                                  </h3>
                                  {description && (
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                      {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                                    </p>
                                  )}
                                  {area > 0 && (
                                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                      </svg>
                                      <span>{area} {t('reservations.sqFt') || 'Sq Ft'}</span>
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="p-4 text-gray-600">
                                {new Date(r.ReservedDate).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </td>
                              <td className="p-4">
                                <span className="font-semibold text-gray-900 text-base">
                                  {r.ReservedAmount ? `€${r.ReservedAmount.toLocaleString()}` : "-"}
                                </span>
                              </td>
                              <td className="p-4">
                                <Link
                                  href={`/properties/${propertyId}`}
                                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium inline-block"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {t('reservations.viewProperty')}
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === "criterias" && (
              <div className="relative bg-white border rounded-lg shadow-sm p-6">
                {/* Overlay loader */}
                {criteriaLoading && <AccountSectionLoader overlay message={t('loading')} />}

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Buyer Criterias</h2>
                  <button
                    onClick={handleSaveCriteria}
                    disabled={criteriaSaving || criteriaLoading}
                    className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {criteriaSaving ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>

                {criteriaCategories.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">No criteria available</div>
                ) : (
                  <div className="space-y-6">
                    {criteriaCategories.map((category) => (
                      <div key={category.id} className="border-b pb-6 last:border-b-0">
                        <h3 className="text-base font-semibold text-gray-800 mb-4 px-4 py-2 inline-block">
                          {category.title}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                          {category.options.map((option) => {
                            const isChecked = (buyerCriteria[category.key] || []).some(
                              (item) => item.value === option.value
                            );

                            return (
                              <label
                                key={option.id}
                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  disabled={criteriaLoading}
                                  onChange={(e) =>
                                    handleCriteriaChange(category.key, option.value, e.target.checked)
                                  }
                                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <span className="text-sm text-gray-700">{option.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-right justify-between mb-6">

                  <button
                    onClick={handleSaveCriteria}
                    disabled={criteriaSaving || criteriaLoading}
                    className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {criteriaSaving ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            )}



        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setPendingRemoveId(null);
        }}
        onConfirm={async () => {
          if (!pendingRemoveId) return;

          const apiBase = API_BASE_URL;
          const token = getToken();
          const buyerId = localStorage.getItem("buyer_Id");

          if (!buyerId || !token) return;

          try {
            const res = await fetch(
              `${apiBase}/buyers/${buyerId}/favourites/${pendingRemoveId}`, // Use Property_ID
              {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (res.ok) {
              // Remove by Property_ID
              setFavourites((prev) => prev.filter((x) => x.Property_ID !== pendingRemoveId));
              setFavDetails((prev) => prev.filter((x) => x.Property_ID !== pendingRemoveId));
              // showToast("success", t("favourites.removeSuccess"));
              toast.error('Favourite removed successfully.');

            } else {
              const errMsg = await res.text();
              console.error("❌ Failed to delete favourite:", errMsg);
            }
          } catch (err) {
            console.error("❌ Delete request failed:", err);
          } finally {
            setPendingRemoveId(null);
          }
        }}
        titleKey="favourites.removeTitle"
        descriptionKey="favourites.removeDescription"
        confirmKey="favourites.removeConfirm"
        cancelKey="favourites.removeCancel"
        confirmButtonClassName="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}

// Password Modal Component
function PasswordModal({ open, onClose, onSubmit, pwdForm, setPwdForm, pwdMsg, pwdLoading }: any) {
  const t = useTranslations('Profile_account');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl p-6 relative">
        {pwdLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/70">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
          </div>
        )}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{t('password.title')}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            ✕
          </button>
        </div>
        {pwdMsg && (
          <div className={`mb-3 p-3 rounded-md ${pwdMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
            {pwdMsg.text}
          </div>
        )}
        <FieldwisePasswordForm
          onSubmit={onSubmit}
          pwdForm={pwdForm}
          setPwdForm={setPwdForm}
          pwdLoading={pwdLoading}
        />
      </div>
    </div>
  );
}

// Password Form with Validation
function FieldwisePasswordForm({ onSubmit, pwdForm, setPwdForm, pwdLoading }: any) {
  const t = useTranslations('Profile_account');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [show, setShow] = React.useState<{ current: boolean; new: boolean; confirm: boolean }>({
    current: false,
    new: false,
    confirm: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!pwdForm.currentPassword?.trim()) {
      nextErrors.currentPassword = t('password.currentPasswordRequired');
    }
    if (!pwdForm.newPassword?.trim()) {
      nextErrors.newPassword = t('password.newPasswordRequired');
    }

    if (pwdForm.newPassword && pwdForm.newPassword.length < 8) {
      nextErrors.newPassword = t('password.passwordStrengthError');
    }

    if (!pwdForm.confirmPassword?.trim()) {
      nextErrors.confirmPassword = t('password.confirmPasswordRequired');
    }
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      nextErrors.confirmPassword = t('password.passwordMismatch');
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    await onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm mb-1">{t('password.currentPassword')}</label>
        <div className="relative">
          <input
            type={show.current ? 'text' : 'password'}
            className={`w-full rounded-md border px-3 py-2 pr-9 ${errors.currentPassword ? 'border-red-500' : ''}`}
            value={pwdForm.currentPassword}
            onChange={(e) => {
              setPwdForm({ ...pwdForm, currentPassword: e.target.value });
              if (errors.currentPassword) setErrors({ ...errors, currentPassword: '' });
            }}
            disabled={pwdLoading}
          />
          <button
            type="button"
            onClick={() => setShow({ ...show, current: !show.current })}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            disabled={pwdLoading}
            aria-label={show.current ? "Hide password" : "Show password"}
          >
            {show.current ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>
        {errors.currentPassword && <p className="text-xs text-red-600 mt-1">{errors.currentPassword}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1">{t('password.newPassword')}</label>
        <div className="relative">
          <input
            type={show.new ? 'text' : 'password'}
            className={`w-full rounded-md border px-3 py-2 pr-9 ${errors.newPassword ? 'border-red-500' : ''}`}
            value={pwdForm.newPassword}
            onChange={(e) => {
              setPwdForm({ ...pwdForm, newPassword: e.target.value });
              if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
            }}
            disabled={pwdLoading}
          />
          <button
            type="button"
            onClick={() => setShow({ ...show, new: !show.new })}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            disabled={pwdLoading}
            aria-label={show.new ? "Hide password" : "Show password"}
          >
            {show.new ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>
        {errors.newPassword && <p className="text-xs text-red-600 mt-1">{errors.newPassword}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1">{t('password.confirmPassword')}</label>
        <div className="relative">
          <input
            type={show.confirm ? 'text' : 'password'}
            className={`w-full rounded-md border px-3 py-2 pr-9 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            value={pwdForm.confirmPassword}
            onChange={(e) => {
              setPwdForm({ ...pwdForm, confirmPassword: e.target.value });
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
            }}
            disabled={pwdLoading}
          />
          <button
            type="button"
            onClick={() => setShow({ ...show, confirm: !show.confirm })}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            disabled={pwdLoading}
            aria-label={show.confirm ? "Hide password" : "Show password"}
          >
            {show.confirm ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
      </div>

      <button
        type="submit"
        disabled={pwdLoading}
        className="w-full rounded-md bg-primary-600 text-white py-2 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pwdLoading ? t('password.updating') : t('password.updatePassword')}
      </button>
    </form>
  );
}