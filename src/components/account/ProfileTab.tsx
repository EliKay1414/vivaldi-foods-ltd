import React, { useState } from 'react';
import { Check } from 'lucide-react';
import type { CustomerUser } from '@/context/AuthContext';
import { toast } from 'react-toastify';

interface ProfileTabProps {
  user: CustomerUser;
  onUpdateProfile: (data: Partial<CustomerUser>) => Promise<{ success: boolean; message: string }>;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.fullName || '');
  const [editPhone, setEditPhone] = useState(user.phone || '');
  const [editEmail, setEditEmail] = useState(user.email || '');
  const [editCity, setEditCity] = useState(user.city || 'Accra');
  const [editAddress, setEditAddress] = useState(user.deliveryAddress || '');

  const initials =
    user.fullName
      .split(' ')
      .map((n: string) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U';

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await onUpdateProfile({
      fullName: editName.trim(),
      phone: editPhone.trim(),
      email: editEmail.trim(),
      city: editCity.trim(),
      deliveryAddress: editAddress.trim(),
    });

    if (res.success) {
      toast.success(res.message || 'Profile updated successfully');
      setIsEditing(false);
    } else {
      toast.error(res.message || 'Failed to update profile');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            Personal Information
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your personal profile and contact details.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            Edit Information
          </button>
        )}
      </div>

      {/* User Header */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/60 border border-gray-100">
        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-700 to-green-900 text-white flex items-center justify-center font-black text-xl shadow-sm">
          {initials}
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900">{user.fullName}</h3>
          <p className="text-xs text-gray-500">{user.phone || user.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200/60">
              <Check size={11} /> Verified Account
            </span>
          </div>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4 max-w-2xl pt-2">
          <div className="space-y-1">
            <label htmlFor="edit-name" className="text-xs font-bold text-gray-700">
              Full Name
            </label>
            <input
              id="edit-name"
              type="text"
              required
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-green-700 bg-gray-50/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="edit-phone" className="text-xs font-bold text-gray-700">
                Phone Number
              </label>
              <input
                id="edit-phone"
                type="tel"
                required
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-green-700 bg-gray-50/50"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="edit-email" className="text-xs font-bold text-gray-700">
                Email Address
              </label>
              <input
                id="edit-email"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-green-700 bg-gray-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="edit-city" className="text-xs font-bold text-gray-700">
                City / Region
              </label>
              <select
                id="edit-city"
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-green-700 bg-white"
              >
                <option value="Accra">Accra</option>
                <option value="Tema">Tema</option>
                <option value="Spintex">Spintex</option>
                <option value="East Legon">East Legon</option>
                <option value="Madina">Madina</option>
                <option value="Kasoa">Kasoa</option>
                <option value="Kumasi">Kumasi</option>
                <option value="Ho">Ho</option>
                <option value="Other Town">Other Town (Ghana)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="edit-addr" className="text-xs font-bold text-gray-700">
                Delivery Landmark / Street
              </label>
              <input
                id="edit-addr"
                type="text"
                placeholder="e.g. Near Sakumono Junction"
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-green-700 bg-gray-50/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl text-xs pt-1">
          <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Full Name</span>
            <p className="font-bold text-gray-900 text-sm">{user.fullName}</p>
          </div>

          <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Phone Number</span>
            <p className="font-bold text-gray-900 text-sm">{user.phone}</p>
          </div>

          <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Email Address</span>
            <p className="font-bold text-gray-900 text-sm">
              {user.email || 'Not provided'}
            </p>
          </div>

          <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Default City</span>
            <p className="font-bold text-gray-900 text-sm">{user.city || 'Accra'}</p>
          </div>

          <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1 sm:col-span-2">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">
              Default Delivery Address
            </span>
            <p className="font-bold text-gray-900 text-sm">
              {user.deliveryAddress || 'No default address saved yet'}
            </p>
          </div>
        </div>
      )}

      {/* Account Security */}
      <div className="pt-6 border-t border-gray-100 space-y-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          Account Security
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-700 block">Password</span>
              <span className="text-xs text-gray-400 font-mono">••••••••••••</span>
            </div>
            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200/60">
              Protected
            </span>
          </div>

          <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-700 block">Google Authenticator</span>
              <span className="text-xs text-gray-400">Single Sign-On</span>
            </div>
            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200/60">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
