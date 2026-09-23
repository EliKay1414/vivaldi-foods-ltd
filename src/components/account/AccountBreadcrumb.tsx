import React from 'react';
import { Link } from '@tanstack/react-router';

interface AccountBreadcrumbProps {
  currentLabel: string;
}

export const AccountBreadcrumb: React.FC<AccountBreadcrumbProps> = ({ currentLabel }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 font-medium">
      <Link to="/" className="hover:text-green-700 transition-colors">
        Home
      </Link>
      <span className="text-gray-300">/</span>
      <span className="text-gray-400">User Center</span>
      <span className="text-gray-300">/</span>
      <span className="text-gray-900 font-semibold">{currentLabel}</span>
    </nav>
  );
};

export default AccountBreadcrumb;
