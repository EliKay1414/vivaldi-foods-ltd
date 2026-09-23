import React from 'react';

export type AccountTab = 'orders' | 'profile' | 'wishlist' | 'address' | 'reviews';

export interface AccountNavItem {
  id: AccountTab;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  count?: number;
}
