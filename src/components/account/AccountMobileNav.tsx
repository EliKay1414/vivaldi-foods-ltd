import React from 'react';
import type { AccountTab, AccountNavItem } from './types';

interface AccountMobileNavProps {
  items: AccountNavItem[];
  activeTab: AccountTab;
  onSelectTab: (tab: AccountTab) => void;
}

export const AccountMobileNav: React.FC<AccountMobileNavProps> = ({
  items,
  activeTab,
  onSelectTab,
}) => {
  return (
    <div className="lg:hidden bg-white rounded-2xl border border-gray-100 shadow-xs p-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              isActive
                ? 'bg-green-700 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Icon size={14} className={isActive ? 'text-white' : 'text-green-700'} />
            <span>{item.label}</span>
            {item.count !== undefined && item.count > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default AccountMobileNav;
