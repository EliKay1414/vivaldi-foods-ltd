import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  User,
  PackageCheck,
  UserCog,
  Heart,
  MapPin,
  Star,
  LogOut,
  LogIn,
  UserPlus,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AccountBadgeProps {
  className?: string;
  onNavigate?: () => void;
}

export const AccountBadge: React.FC<AccountBadgeProps> = ({ className = '', onNavigate }) => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    if (dropdownOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dropdownOpen]);

  const handleActionClick = () => {
    setDropdownOpen(false);
    onNavigate?.();
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    onNavigate?.();
    navigate({ to: '/' });
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Trigger Button: User Icon */}
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`relative inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-green-800 hover:bg-gray-100 transition-all cursor-pointer active:scale-95 ${className}`}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        aria-label="Customer account menu"
      >
        <User size={20} className="text-gray-800" />
        {isAuthenticated && currentUser && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-green-600 ring-2 ring-white" />
        )}
      </button>

      {/* Account Dropdown Menu with Fitting Semantic Icons */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl bg-white shadow-2xl border border-gray-100 ring-1 ring-black/5 z-50 p-4 sm:p-5 overflow-hidden animate-scale-in">
          {/* Top Section */}
          {!isAuthenticated || !currentUser ? (
            <div className="space-y-3 pb-3 border-b border-gray-100">
              <Link
                to="/account/login"
                onClick={handleActionClick}
                className="flex items-center justify-between text-base font-bold text-gray-900 hover:text-green-700 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <LogIn size={18} className="text-green-700" />
                  <span>Sign in</span>
                </span>
                <span className="text-xs text-gray-400 font-normal">Welcome</span>
              </Link>

              <Link
                to="/account/register"
                onClick={handleActionClick}
                className="flex items-center justify-between w-full px-3.5 py-2.5 bg-green-50 hover:bg-green-100 border border-green-200/80 rounded-xl text-xs font-bold text-green-900 transition-colors shadow-2xs group"
              >
                <span className="flex items-center gap-2">
                  <UserPlus size={15} className="text-green-700" />
                  <span>Create Account</span>
                </span>
                <ArrowRight size={14} className="text-green-700 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="pb-3 border-b border-gray-100 space-y-1">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Signed In
              </p>
              <p className="text-sm sm:text-base font-bold text-gray-900 truncate">
                {currentUser.fullName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentUser.phone || currentUser.email}
              </p>
            </div>
          )}

          {/* Menu Items with Proper Icons */}
          <div className="pt-2 divide-y divide-gray-50 text-[13px] sm:text-sm font-medium text-gray-800">
            <Link
              to="/account"
              search={{ tab: 'orders' }}
              onClick={handleActionClick}
              className="flex items-center justify-between py-2.5 hover:text-green-700 transition-colors group"
            >
              <span className="flex items-center gap-2.5">
                <PackageCheck size={16} className="text-green-700 group-hover:scale-110 transition-transform" />
                <span>My Order</span>
              </span>
              <span className="text-gray-300 text-xs group-hover:text-green-700">&gt;</span>
            </Link>

            <Link
              to="/account"
              search={{ tab: 'profile' }}
              onClick={handleActionClick}
              className="flex items-center justify-between py-2.5 hover:text-green-700 transition-colors group"
            >
              <span className="flex items-center gap-2.5">
                <UserCog size={16} className="text-green-700 group-hover:scale-110 transition-transform" />
                <span>Personal Information</span>
              </span>
              <span className="text-gray-300 text-xs group-hover:text-green-700">&gt;</span>
            </Link>

            <Link
              to="/account"
              search={{ tab: 'wishlist' }}
              onClick={handleActionClick}
              className="flex items-center justify-between py-2.5 hover:text-green-700 transition-colors group"
            >
              <span className="flex items-center gap-2.5">
                <Heart size={16} className="text-rose-500 group-hover:scale-110 transition-transform" />
                <span>WishList</span>
              </span>
              <span className="text-gray-300 text-xs group-hover:text-green-700">&gt;</span>
            </Link>

            <Link
              to="/account"
              search={{ tab: 'address' }}
              onClick={handleActionClick}
              className="flex items-center justify-between py-2.5 hover:text-green-700 transition-colors group"
            >
              <span className="flex items-center gap-2.5">
                <MapPin size={16} className="text-green-700 group-hover:scale-110 transition-transform" />
                <span>Address Management</span>
              </span>
              <span className="text-gray-300 text-xs group-hover:text-green-700">&gt;</span>
            </Link>

            <Link
              to="/account"
              search={{ tab: 'reviews' }}
              onClick={handleActionClick}
              className="flex items-center justify-between py-2.5 hover:text-green-700 transition-colors group"
            >
              <span className="flex items-center gap-2.5">
                <Star size={16} className="text-amber-500 group-hover:scale-110 transition-transform" />
                <span>Product Reviews</span>
              </span>
              <span className="text-gray-300 text-xs group-hover:text-green-700">&gt;</span>
            </Link>

            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-between py-2.5 text-red-600 hover:text-red-700 transition-colors cursor-pointer mt-1 pt-2 border-t border-gray-100 group"
              >
                <span className="flex items-center gap-2.5">
                  <LogOut size={16} className="text-red-600 group-hover:translate-x-0.5 transition-transform" />
                  <span>Sign out</span>
                </span>
                <span className="text-gray-300 text-xs group-hover:text-red-600">&gt;</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountBadge;
