import React from 'react';
import { LogOut, ChevronRight, Check } from 'lucide-react';
import type { AccountTab, AccountNavItem } from './types';
import type { CustomerUser } from '@/context/AuthContext';

interface AccountSidebarProps {
  user: CustomerUser;
  items: AccountNavItem[];
  activeTab: AccountTab;
  onSelectTab: (tab: AccountTab) => void;
  onLogout: () => void;
}

export const AccountSidebar: React.FC<AccountSidebarProps> = ({
  user,
  items,
  activeTab,
  onSelectTab,
  onLogout,
}) => {
  const initials =
    user.fullName
      .split(' ')
      .map((n: string) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U';

  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-5 space-y-6 sticky top-36">
        {/* User Profile Card */}
        <div className="flex items-center gap-3.5 pb-5 border-b border-gray-100">
          <div className="w-13 h-13 rounded-2xl bg-linear-to-br from-green-700 to-green-900 text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-gray-900 truncate">
              {user.fullName}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {user.phone || user.email}
            </p>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200/60 mt-1">
              <Check size={10} /> Verified Customer
            </span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between py-3 px-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-green-50/80 text-green-800 font-bold border-l-4 border-green-700 shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={17}
                    className={
                      isActive
                        ? 'text-green-700'
                        : 'text-gray-400 group-hover:text-green-700 transition-colors'
                    }
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-green-700 text-white'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-800'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                  <ChevronRight
                    size={14}
                    className={
                      isActive
                        ? 'text-green-700 translate-x-0.5 transition-transform'
                        : 'text-gray-300 group-hover:text-gray-600 transition-colors'
                    }
                  />
                </div>
              </button>
            );
          })}

          {/* Sign Out Button */}
          <div className="pt-3 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <LogOut size={17} className="text-gray-400 group-hover:text-red-600 transition-colors" />
                <span>Sign Out</span>
              </div>
              <ChevronRight size={14} className="text-gray-300 group-hover:text-red-600 transition-colors" />
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AccountSidebar;
