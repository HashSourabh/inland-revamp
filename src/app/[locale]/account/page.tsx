"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getToken } from "@/context/AuthContext";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/api";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

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

  useEffect(() => {
    setMounted(true);
  }, []);

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

        // Fetch categories
        const categoriesRes = await fetch(`${API_BASE_URL}/criterias`, { headers });
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

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = getToken();
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/buyers/me`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          firstName: profileForm.firstName,
          lastName: profileForm.lastName,
          contactNumber: profileForm.contactNumber,
          buyer_address: profileForm.buyer_address,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || data?.error || "Profile update failed");

      await refresh();
      // showToast("success", t('profile.updateSuccess'));
    } catch (err: any) {
      showToast("error", err.message || t('profile.updateError'));
    } finally {
      setSaving(false);
    }
  };
  // Add a ref to track ongoing save operations
  const savingRef = useRef(false);

  const handleCriteriaChange = (
    categoryKey: string,
    optionValue: string,
    checked: boolean
  ) => {
    setCriteriaLoading(true);
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

      const newBuyerCriteria = { ...prev, [categoryKey]: updatedCategory };

      // Save only the changed category (debounced)
      if (!savingRef.current) {
        savingRef.current = true;

        // Use setTimeout to avoid race conditions
        setTimeout(() => {
          handleSaveCriteria({ [categoryKey]: updatedCategory.map(item => item.value) });
        }, 0);
      }

      return newBuyerCriteria;
    });
  };

  // Handler to save criteria
  const handleSaveCriteria = async (criteriaToSave: Record<string, string[]>) => {
    // Prevent duplicate calls
    if (criteriaSaving) {
      console.log('⏭️ Skipping duplicate save call');
      return;
    }

    setCriteriaSaving(true);

    try {
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
      savingRef.current = false;
      setCriteriaLoading(false); // Reset the ref
    }
  };




  if (!mounted) {
    return <div className="max-w-5xl mx-auto px-4 py-10">{t('loading')}</div>;
  }

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-10">{t('loading')}</div>;
  if (!user) return <div className="max-w-5xl mx-auto px-4 py-10">{t('loginRequired')}</div>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">{t('title')}</h1>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white border rounded-lg shadow-sm">
              <nav className="p-2">
                <button
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors ${tab === "profile" ? "bg-primary-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  onClick={() => setTab("profile")}
                >
                  {t('tabs.profile')}
                </button>
                <button
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors mt-1 ${tab === "favourites" ? "bg-primary-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  onClick={() => setTab("favourites")}
                >
                  {t('tabs.favourites')}
                </button>
                <button
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors mt-1 ${tab === "reservations" ? "bg-primary-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  onClick={() => setTab("reservations")}
                >
                  {t('tabs.reservations')}
                </button>
                <button
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors mt-1 ${tab === "criterias" ? "bg-primary-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
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
                        className="w-full rounded-md border px-3 py-2"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                        required
                        minLength={2}
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t('profile.lastName')}</label>
                      <input
                        type="text"
                        className="w-full rounded-md border px-3 py-2"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                        required
                        minLength={2}
                        maxLength={100}
                      />
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
                    <label className="block text-sm font-medium mb-1">{t('profile.address')}</label>
                    <input
                      type="text"
                      className="w-full rounded-md border px-3 py-2"
                      value={profileForm.buyer_address}
                      onChange={(e) => setProfileForm({ ...profileForm, buyer_address: e.target.value })}
                      placeholder={t('profile.addressPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{t('profile.phone')}</label>
                    <input
                      type="tel"
                      className="w-full rounded-md border px-3 py-2"
                      value={profileForm.contactNumber}
                      onChange={(e) => setProfileForm({ ...profileForm, contactNumber: e.target.value })}
                      placeholder={t('profile.phonePlaceholder')}
                    />
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

                    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pwdForm.newPassword);
                    if (!strong) {
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
                  <div className="flex justify-center items-center py-10 text-gray-600">
                    <svg
                      className="animate-spin h-6 w-6 text-primary-600 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    {t('favourite.loading')}
                  </div>
                ) : favDetails.length === 0 ? (
                  <div className="text-gray-600">{t('favourite.noFavourites')}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm text-gray-700">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border p-2 text-left">{t('favourite.image')}</th>
                          <th className="border p-2 text-left">{t('favourite.propertyRef')}</th>
                          <th className="border p-2 text-left">{t('favourite.propertyAddress')}</th>
                          <th className="border p-2 text-left">{t('favourite.bedrooms')}</th>
                          <th className="border p-2 text-left">{t('favourite.bathrooms')}</th>
                          <th className="border p-2 text-left">{t('favourite.publicPrice')}</th>
                          <th className="border p-2 text-left">{t('favourite.dateAdded')}</th>
                          <th className="border p-2 text-left">{t('favourite.action')}</th>
                        </tr>
                      </thead>

                      <tbody>
                        {favDetails.map((f) => {
                          const ref = f.Property_Ref || f.Property_ID;
                          const img = ref
                            ? `https://www.inlandandalucia.com/images/photos/properties/${ref}/${ref}_1.jpg`
                            : "https://www.inlandandalucia.com/images/no-image-available.jpg";

                          return (
                            <tr key={ref} className="hover:bg-gray-50">
                              <td className="border p-2">
                                <img
                                  src={img}
                                  alt={`Property ${ref}`}
                                  className="w-20 h-20 min-w-20 object-cover rounded-md"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      "https://www.inlandandalucia.com/images/no-image-available.jpg";
                                  }}
                                />
                              </td>
                              <td className="border p-2 font-medium">{ref}</td>
                              <td className="border p-2">{f.Property_Address || "-"}</td>
                              <td className="border p-2">{f.Bedrooms || "-"}</td>
                              <td className="border p-2">{f.Bathrooms || "-"}</td>
                              <td className="border p-2">
                                €{f.Public_Price ? f.Public_Price.toLocaleString() : "-"}
                              </td>
                              <td className="border p-2">
                                {new Date(f.DateCreated).toLocaleDateString()}
                              </td>
                              <td className="border p-2 text-center">
                                <Link
                                  href={`/properties/${encodeURIComponent(f.Property_ID)}`}
                                  className="text-primary-700 hover:underline"
                                >
                                  {t('favourite.viewProperty')}
                                </Link>
                                <button
                                  onClick={() => { setPendingRemoveId(f.Property_ID); setConfirmOpen(true); }}
                                  className="ml-3 text-sm text-red-600 hover:underline"
                                >
                                  {t('favourite.remove')}
                                </button>
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
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent mb-4" />
                    <p className="text-gray-600">{t('loading')}</p>
                  </div>
                ) : reservations.length === 0 ? (
                  <div className="text-gray-600">{t('reservations.noReservations')}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm text-gray-700">
                      <thead className="bg-gray-100">
                        <tr>

                          <th className="border p-2 text-left">{t('reservations.image')}</th>
                          <th className="border p-2 text-left">{t('reservations.propertyRef')}</th>
                          <th className="border p-2 text-left">{t('reservations.propertyAddress')}</th>
                          <th className="border p-2 text-left">{t('reservations.bedrooms')}</th>
                          <th className="border p-2 text-left">{t('reservations.bathrooms')}</th>
                          <th className="border p-2 text-left">{t('reservations.reservedAmount')}</th>
                          <th className="border p-2 text-left">{t('reservations.reservationDate')}</th>
                          <th className="border p-2 text-left">{t('reservations.action')}</th>
                        </tr>
                      </thead>

                      <tbody>
                        {reservations.map((r) => {
                          const property = r.property;
                          const propertyId = property?.Property_ID || null;
                          const propertyRef = property?.Property_Ref || "N/A";

                          const featuredImage = propertyRef
                            ? `https://www.inlandandalucia.com/images/photos/properties/${propertyRef}/${propertyRef}_1.jpg`
                            : null;

                          return (
                            <tr key={r.PaypalTransactionId} className="hover:bg-gray-50">
                              <td className="border p-2">
                                {featuredImage ? (
                                  <img
                                    src={featuredImage}
                                    alt={`${propertyRef} ${t('reservations.imageAlt')}`}
                                    className="w-20 h-20 min-w-20 object-cover rounded-md"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        "https://www.inlandandalucia.com/images/no-image-available.jpg";
                                    }}
                                  />
                                ) : (
                                  <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                                    N/A
                                  </div>
                                )}
                              </td>

                              <td className="border p-2 font-medium">{propertyRef}</td>
                              <td className="border p-2">{property?.Property_Address || "-"}</td>
                              <td className="border p-2">{property?.Bedrooms || "-"}</td>
                              <td className="border p-2">{property?.Bathrooms || "-"}</td>
                              <td className="border p-2 font-medium">
                                {r.ReservedAmount?.toLocaleString() || "-"}
                              </td>
                              <td className="border p-2">
                                {new Date(r.ReservedDate).toLocaleDateString()}
                              </td>
                              <td className="border p-2 text-center">
                                <Link
                                  href={`/properties/${propertyId}`}
                                  className="text-primary-700 hover:underline"
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
                {criteriaLoading && (
                  <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-10">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
                  </div>
                )}

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Buyer Criterias</h2>
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
              </div>
            )}



          </div>
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


    </>
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

    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pwdForm.newPassword || '');
    if (pwdForm.newPassword && !strong) {
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
          >
            {show.current ? '🙈' : '👁️'}
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
          >
            {show.new ? '🙈' : '👁️'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">{t('password.passwordHint')}</p>
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
          >
            {show.confirm ? '🙈' : '👁️'}
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