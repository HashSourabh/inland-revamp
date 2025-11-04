"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getToken } from "@/context/AuthContext";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/api";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

type Favourite = { Property_Ref: string; Created_At: string };
type Reservation = { Id: number; Property_Ref: string; Amount_Cents: number; Currency: string; Status: string; Created_At: string };

export default function AccountPage() {
  const { user, loading, refresh } = useAuth();
  const [tab, setTab] = useState<"profile" | "favourites" | "reservations">("profile");
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [favDetails, setFavDetails] = useState<any[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingRemoveRef, setPendingRemoveRef] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
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
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        // Show instant preview
        setProfilePreview(base64);
        try {
          const res = await fetch(`${API_BASE_URL}/api/v1/buyers/me/profile-image`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64 })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data?.error || 'Upload failed');
          await refresh();
          // Clear preview if backend returns a different optimized URL via refresh
          setProfilePreview(null);
        } catch (err) { /* noop */ }
        setUploading(false);
        // allow selecting the same file again
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: (user as any).username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const apiBase = API_BASE_URL;

    if (tab === "favourites") {
      fetch(`${apiBase}/buyers/me/favourites`, { credentials: "include" })
        .then(r => r.json()).then(async (d) => {
          const favs = d.favourites || [];
          setFavourites(favs);
          // fetch property details for display
          const items = await Promise.all(
            favs.map(async (f: any) => {
              try {
                const resp = await fetch(`${apiBase}/properties/ref/${encodeURIComponent(f.Property_Ref)}`);
                const pd = await resp.json();
                const data = pd && pd.data ? pd.data : pd;
                return { ref: f.Property_Ref, createdAt: f.Created_At, data: data || {} };
              } catch { return { ref: f.Property_Ref, createdAt: f.Created_At, data: null }; }
            })
          );
          setFavDetails(items);
        }).catch(() => { setFavourites([]); setFavDetails([]); });
    }
    if (tab === "reservations") {
      fetch(`${apiBase}/reservations`, { credentials: "include" })
        .then(r => r.json()).then(d => setReservations(d.reservations || [])).catch(() => setReservations([]));
    }
  }, [tab, user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/buyers/update`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update profile");

      setSaveMessage({ type: "success", text: "Profile updated successfully!" });
      await refresh();
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) {
      setSaveMessage({ type: "error", text: err.message || "Failed to update profile" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-10">Loading...</div>;
  if (!user) return <div className="max-w-5xl mx-auto px-4 py-10">Please login to view your account.</div>;

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">My Account</h1>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white border rounded-lg shadow-sm">
            <nav className="p-2">
              <button
                className={`w-full text-left px-4 py-3 rounded-md transition-colors ${tab === "profile"
                    ? "bg-primary-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setTab("profile")}
              >
                My Profile
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-md transition-colors mt-1 ${tab === "favourites"
                    ? "bg-primary-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setTab("favourites")}
              >
                Favourites
              </button>
              <button
                className={`w-full text-left px-4 py-3 rounded-md transition-colors mt-1 ${tab === "reservations"
                    ? "bg-primary-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setTab("reservations")}
              >
                Reservations
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
                  {/* Avatar */}
                  {(profilePreview || user.profileImageUrl) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={(profilePreview || user.profileImageUrl) as string} alt="Profile" className="h-16 w-16 rounded-full object-cover border" />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200 grid place-items-center border">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </div>
                  )}
                  <div>
                    <div className="text-xl font-semibold">My Profile</div>
                    <div>
                      <button type="button" onClick={startUpload} className="text-primary-600 hover:underline text-sm inline-flex items-center gap-1">
                        <span>Upload</span>
                      </button>
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} hidden />
                      {uploading && <span className="ml-2 text-xs text-gray-500">Uploading...</span>}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { setPwdOpen(true); setPwdMsg(null); setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" }); }}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Change Password
                </button>
              </div>

              {saveMessage && (
                <div className={`mb-4 p-3 rounded-md ${saveMessage.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}>
                  {saveMessage.text}
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="max-w-xl space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full rounded-md border px-3 py-2"
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full rounded-md border px-3 py-2"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    className="w-full rounded-md border px-3 py-2"
                    value={profileForm.username}
                    onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                    required
                    pattern="[a-zA-Z0-9_-]{3,50}"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-md border px-3 py-2"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    required
                    disabled
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                {/* Upload controlled by Edit button in header */}
              </form>
              <PasswordModal
                open={pwdOpen}
                onClose={() => setPwdOpen(false)}
                onSubmit={async (e: React.FormEvent) => {
                  e.preventDefault();
                  setPwdMsg(null);
                  // Frontend validations (no HTML required attributes)
                  if (!pwdForm.currentPassword.trim() || !pwdForm.newPassword.trim() || !pwdForm.confirmPassword.trim()) {
                    return setPwdMsg({ type: 'error', text: 'All password fields are required' });
                  }
                  const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pwdForm.newPassword);
                  if (!strong) {
                    return setPwdMsg({ type: 'error', text: 'New password must have upper, lower, number and special, min 8 chars' });
                  }
                  if (pwdForm.newPassword !== pwdForm.confirmPassword) {
                    return setPwdMsg({ type: 'error', text: 'Passwords do not match' });
                  }
                  try {
                    const token = getToken();
                    const res = await fetch(`${API_BASE_URL}/buyers/me/password`, {
                      method: 'PUT',
                      credentials: 'include',
                      headers: token ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } : { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ currentPassword: pwdForm.currentPassword, newPassword: pwdForm.newPassword })
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data?.message || data?.error || 'Failed to update password');
                    setPwdMsg({ type: 'success', text: (data?.message || 'Password changed successfully') });
                    setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setTimeout(() => setPwdOpen(false), 1200);
                  } catch (err: any) {
                    setPwdMsg({ type: 'error', text: err.message || 'Failed to update password' });
                  }
                }}
                pwdForm={pwdForm}
                setPwdForm={setPwdForm}
                pwdMsg={pwdMsg}
                setPwdMsg={setPwdMsg}
              />
            </div>
          )}

          {tab === "favourites" && (
            <div className="bg-white border rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Favourites</h2>
              <div className="grid gap-3">
          {favourites.length === 0 && <div className="text-gray-600">No favourites yet.</div>}
          {favDetails.map((item) => (
            <div key={item.ref} className="rounded-md border p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.data?.imageUrl || '/images/map-preview.jpg'}
                  alt={item.data?.title || 'Property'}
                  className="h-16 w-24 rounded object-cover border"
                />
                {/* Textual Info */}
                <div>
                  <div className="text-sm text-gray-500">{item.data?.title || `Ref ${item.ref}`}</div>
                  <div className="font-medium">
                    {item.data?.Property_Address || `${item.data?.town || ''}${item.data?.province ? ', ' + item.data.province : ''}`}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {(item.data?.Bedrooms !== undefined) && <span>{item.data.Bedrooms} beds</span>} {" "}
                    {(item.data?.Bathrooms !== undefined) && <span>{item.data.Bathrooms} baths</span>} {" "}
                    {(item.data?.Public_Price !== undefined) && <span>• €{Number(item.data.Public_Price).toLocaleString()}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`/properties/${encodeURIComponent(item.data?.Property_ID || item.ref)}`} className="text-primary-700 hover:underline">View</Link>
                <button
                  onClick={() => { setPendingRemoveRef(item.ref); setConfirmOpen(true); }}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
              </div>
            </div>
          )}

          {tab === "reservations" && (
            <div className="bg-white border rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">My Reservation</h2>
              <div className="grid gap-3">
                {reservations.length === 0 && <div className="text-gray-600">No reservations yet.</div>}
                {reservations.map((r) => (
                  <div key={r.Id} className="rounded-md border p-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Property Ref</div>
                      <div className="font-medium">{r.Property_Ref}</div>
                      <div className="text-sm text-gray-500">Status: <span className="font-medium capitalize">{r.Status}</span></div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{(r.Amount_Cents / 100).toFixed(2)} {r.Currency.toUpperCase()}</div>
                      <Link href={`/properties?keywords=${encodeURIComponent(r.Property_Ref)}`} className="text-primary-700 hover:underline text-sm">Open</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <ConfirmDialog
      open={confirmOpen}
      onClose={() => {
        setConfirmOpen(false);
        setPendingRemoveRef(null);
      }}
      onConfirm={async () => {
        if (!pendingRemoveRef) return;
        try {
          const res = await fetch(`${API_BASE_URL}/api/v1/buyers/me/favourites/${encodeURIComponent(pendingRemoveRef)}`, {
            method: 'DELETE',
            credentials: 'include'
          });
          if (res.ok) {
            setFavourites((prev) => prev.filter((x) => x.Property_Ref !== pendingRemoveRef));
            setFavDetails((prev) => prev.filter((x) => x.ref !== pendingRemoveRef));
          }
        } catch {}
        setPendingRemoveRef(null);
      }}
      title="Remove favourite"
      description={`Are you sure you want to remove this favourite?`}
      confirmText="Remove"
      confirmButtonClassName="bg-red-600 hover:bg-red-700"
    />
    </>
  );
}

// Password Modal
function PasswordModal({ open, onClose, onSubmit, pwdForm, setPwdForm, pwdMsg, setPwdMsg }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Change Password</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        {pwdMsg && (
          <div className={`mb-3 p-3 rounded-md ${pwdMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{pwdMsg.text}</div>
        )}
        <FieldwisePasswordForm {...{ onSubmit, pwdForm, setPwdForm }} />
      </div>
    </div>
  );
}

function FieldwisePasswordForm({ onSubmit, pwdForm, setPwdForm }: any) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [show, setShow] = React.useState<{ current: boolean; new: boolean; confirm: boolean }>({ current: false, new: false, confirm: false });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!pwdForm.currentPassword?.trim()) nextErrors.currentPassword = 'Current password is required';
    if (!pwdForm.newPassword?.trim()) nextErrors.newPassword = 'New password is required';
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pwdForm.newPassword || '');
    if (pwdForm.newPassword && !strong) nextErrors.newPassword = 'Min 8 chars with upper, lower, number and special';
    if (!pwdForm.confirmPassword?.trim()) nextErrors.confirmPassword = 'Confirm password is required';
    if (pwdForm.newPassword !== pwdForm.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    await onSubmit(e);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Current Password</label>
        <div className="relative">
          <input
            type={show.current ? 'text' : 'password'}
            className={`w-full rounded-md border px-3 py-2 pr-9 ${errors.currentPassword ? 'border-red-500' : ''}`}
            value={pwdForm.currentPassword}
            onChange={(e) => { setPwdForm({ ...pwdForm, currentPassword: e.target.value }); if (errors.currentPassword) setErrors({ ...errors, currentPassword: '' }); }}
          />
          <button type="button" onClick={() => setShow({ ...show, current: !show.current })} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
            {show.current ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.currentPassword && <p className="text-xs text-red-600 mt-1">{errors.currentPassword}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">New Password</label>
        <div className="relative">
          <input
            type={show.new ? 'text' : 'password'}
            className={`w-full rounded-md border px-3 py-2 pr-9 ${errors.newPassword ? 'border-red-500' : ''}`}
            value={pwdForm.newPassword}
            onChange={(e) => { setPwdForm({ ...pwdForm, newPassword: e.target.value }); if (errors.newPassword) setErrors({ ...errors, newPassword: '' }); }}
          />
          <button type="button" onClick={() => setShow({ ...show, new: !show.new })} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
            {show.new ? '🙈' : '👁️'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Min 8 chars with upper, lower, number and special.</p>
        {errors.newPassword && <p className="text-xs text-red-600 mt-1">{errors.newPassword}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Confirm New Password</label>
        <div className="relative">
          <input
            type={show.confirm ? 'text' : 'password'}
            className={`w-full rounded-md border px-3 py-2 pr-9 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            value={pwdForm.confirmPassword}
            onChange={(e) => { setPwdForm({ ...pwdForm, confirmPassword: e.target.value }); if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' }); }}
          />
          <button type="button" onClick={() => setShow({ ...show, confirm: !show.confirm })} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
            {show.confirm ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
      </div>
      <button type="submit" className="w-full rounded-md bg-primary-600 text-white py-2 hover:bg-primary-700">Update Password</button>
    </form>
  );
}
