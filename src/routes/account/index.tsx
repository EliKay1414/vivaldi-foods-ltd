/* eslint-disable react-refresh/only-export-components */
import { useState, useMemo } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  User,
  PackageCheck,
  UserCog,
  MapPin,
  ArrowRight,
  Heart,
  Star,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/context/CartContext';
import { productCatalog, type CatalogProduct } from '@/config/commerce';
import Seo from '@/components/ui/Seo';
import { toast } from 'react-toastify';
import {
  type AccountTab,
  type AccountNavItem,
  AccountBreadcrumb,
  AccountMobileNav,
  AccountSidebar,
  OrdersTab,
  ProfileTab,
  WishlistTab,
  AddressTab,
  ReviewsTab,
} from '@/components/account';

export type { AccountTab };

export interface AccountDashboardSearch {
  tab?: AccountTab;
}

export const Route = createFileRoute('/account/')({
  validateSearch: (search: Record<string, unknown>): AccountDashboardSearch => ({
    tab: ['orders', 'profile', 'wishlist', 'address', 'reviews'].includes(search.tab as string)
      ? (search.tab as AccountTab)
      : undefined,
  }),
  component: AccountDashboardPage,
});

function AccountDashboardPage() {
  const { currentUser, isAuthenticated, logout, updateProfile } = useAuth();
  const { orders } = useOrders();
  const { addItem, openCart } = useCart();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const [localTab, setLocalTab] = useState<AccountTab>('orders');
  const activeTab: AccountTab = search.tab || localTab;

  const switchTab = (tab: AccountTab) => {
    setLocalTab(tab);
    void navigate({ to: '/account', search: { tab } });
  };

  // Filter orders matching currently logged in customer
  const customerOrders = useMemo(() => {
    if (!currentUser) return [];
    const normalizedUserPhone = currentUser.phone.replace(/\D/g, '');
    const userEmail = (currentUser.email || '').toLowerCase().trim();
    const userName = currentUser.fullName.toLowerCase().trim();

    return orders.filter((order) => {
      const orderPhone = (order.customer?.phone || '').replace(/\D/g, '');
      const orderEmail = (order.customer?.email || '').toLowerCase().trim();
      const orderName = (order.customer?.fullName || '').toLowerCase().trim();

      if (normalizedUserPhone && orderPhone) {
        if (
          normalizedUserPhone.endsWith(orderPhone) ||
          orderPhone.endsWith(normalizedUserPhone)
        ) {
          return true;
        }
      }
      if (userEmail && orderEmail && userEmail === orderEmail) return true;
      if (userName && orderName && userName === orderName) return true;
      return false;
    });
  }, [orders, currentUser]);

  // WishList state synchronized across the whole application
  const { wishlistIds, toggleWishlist } = useWishlist();

  const handleAddToCart = (product: CatalogProduct) => {
    addItem(product, 1);
    openCart();
    toast.success(`${product.name} added to cart!`);
  };

  const handleReorder = (productId: number) => {
    const product = productCatalog.find((p) => p.id === productId) || productCatalog[0];
    handleAddToCart(product);
  };

  const handleLogout = () => {
    logout();
    toast.info('You have been signed out.');
    void navigate({ to: '/' });
  };

  const wishlistProducts = productCatalog.filter((p) => wishlistIds.includes(p.id));

  // If not authenticated, prompt to sign in
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-brand-cream pt-32 pb-20 flex items-center justify-center px-4 selection:bg-amber-100 selection:text-amber-900">
        <Seo
          title="Sign In | Vivaldi Foods Ltd"
          description="Sign in to your customer account to view past orders and manage delivery details."
        />
        <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 shadow-xl p-8 text-center space-y-4 text-sm leading-normal">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
            <User size={32} />
          </div>
          <h2 className="text-xl font-display font-bold text-gray-900">
            Sign In to Your Account
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Please log in with your phone number or email to view your orders, saved addresses, and profile.
          </p>
          <div className="pt-2 space-y-2">
            <Link
              to="/account/login"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <span>Sign In</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/account/register"
              className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all border border-gray-200"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Sidebar navigation menu items
  const sidebarItems: AccountNavItem[] = [
    {
      id: 'orders',
      label: 'My Order',
      icon: PackageCheck,
      count: customerOrders.length,
    },
    {
      id: 'profile',
      label: 'Personal Information',
      icon: UserCog,
    },
    {
      id: 'wishlist',
      label: 'WishList',
      icon: Heart,
      count: wishlistProducts.length,
    },
    {
      id: 'address',
      label: 'Address Management',
      icon: MapPin,
    },
    {
      id: 'reviews',
      label: 'Product Reviews',
      icon: Star,
    },
  ];

  const currentTabItem = sidebarItems.find((i) => i.id === activeTab) || sidebarItems[0];

  return (
    <div className="min-h-screen bg-brand-cream pt-28 sm:pt-32 lg:pt-36 pb-20 selection:bg-amber-100 selection:text-amber-900">
      <Seo
        title={`${currentUser.fullName}'s Account | Vivaldi Foods Ltd`}
        description="View your order history, delivery addresses, and customer profile at Vivaldi Foods Ltd."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        {/* Breadcrumb Navigation */}
        <AccountBreadcrumb currentLabel={currentTabItem.label} />

        {/* Mobile Navigation Pills */}
        <AccountMobileNav
          items={sidebarItems}
          activeTab={activeTab}
          onSelectTab={switchTab}
        />

        {/* 2-Column User Center Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Sidebar */}
          <AccountSidebar
            user={currentUser}
            items={sidebarItems}
            activeTab={activeTab}
            onSelectTab={switchTab}
            onLogout={handleLogout}
          />

          {/* Right Main Content */}
          <main className="lg:col-span-9 min-h-135">
            {activeTab === 'orders' && (
              <OrdersTab orders={customerOrders} onReorder={handleReorder} />
            )}

            {activeTab === 'profile' && (
              <ProfileTab user={currentUser} onUpdateProfile={updateProfile} />
            )}

            {activeTab === 'wishlist' && (
              <WishlistTab
                products={wishlistProducts}
                onToggleWishlist={toggleWishlist}
                onAddToCart={handleAddToCart}
              />
            )}

            {activeTab === 'address' && (
              <AddressTab user={currentUser} onEditAddress={() => switchTab('profile')} />
            )}

            {activeTab === 'reviews' && <ReviewsTab />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboardPage;
