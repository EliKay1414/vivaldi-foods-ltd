import React from 'react';
import { MapPin, Plus } from 'lucide-react';
import type { CustomerUser } from '@/context/AuthContext';

interface AddressTabProps {
  user: CustomerUser;
  onEditAddress: () => void;
}

export const AddressTab: React.FC<AddressTabProps> = ({ user, onEditAddress }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            Address Management
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your delivery address for fast checkout.
          </p>
        </div>

        <button
          type="button"
          onClick={onEditAddress}
          className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <Plus size={14} />
          <span>Update Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Default Address Card */}
        <div className="p-5 rounded-2xl border-2 border-green-600 bg-green-50/20 space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded bg-green-700 text-white text-[10px] font-black uppercase tracking-wider">
              Default Address
            </span>
            <MapPin size={16} className="text-green-700" />
          </div>

          <div className="space-y-1 text-xs">
            <p className="font-bold text-gray-900 text-sm">{user.fullName}</p>
            <p className="text-gray-600">{user.phone}</p>
            <p className="text-gray-800 font-medium pt-1">
              {user.deliveryAddress || 'No landmark specified yet'}
            </p>
            <p className="text-gray-500">{user.city || 'Accra'}, Ghana</p>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
            <button
              type="button"
              onClick={onEditAddress}
              className="text-xs font-bold text-green-700 hover:text-green-800 cursor-pointer"
            >
              Edit Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressTab;
