import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Loader2,
  Phone,
  MapPin,
  User,
  FileText,
  CreditCard,
  Truck,
  ShoppingCart,
  PackageCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useCreateOrderMutation, type CustomerDetails, type OrderPayload } from '@/services/products';
import { Link, useNavigate } from '@tanstack/react-router';

export const OrderModal: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const {
    items,
    subtotal,
    deliveryFee,
    total,
    isCheckoutOpen,
    closeCheckout,
    clearCart,
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Accra');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'MoMo' | 'Telecel Cash' | 'Cash on Delivery'>('MoMo');
  const [notes, setNotes] = useState('');
  const [completedOrder, setCompletedOrder] = useState<OrderPayload | null>(null);

  const createOrderMutation = useCreateOrderMutation();

  // Close modal safely and reset completed order so next checkout is always clean
  const handleCloseModal = useCallback(() => {
    setCompletedOrder(null);
    closeCheckout();
  }, [closeCheckout]);

  // Reset completed order whenever checkout modal closes
  useEffect(() => {
    if (!isCheckoutOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompletedOrder(null);
    }
  }, [isCheckoutOpen]);

  // Auto pre-fill checkout fields when logged-in customer opens the modal
  useEffect(() => {
    if (isCheckoutOpen && currentUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFullName((prev) => prev || currentUser.fullName || '');
      setPhone((prev) => prev || currentUser.phone || '');
      if (currentUser.city) {
        setCity((prev) => (prev === 'Accra' && currentUser.city ? currentUser.city : prev));
      }
      if (currentUser.deliveryAddress) {
        setDeliveryAddress((prev) => prev || currentUser.deliveryAddress || '');
      }
    }
  }, [isCheckoutOpen, currentUser]);

  // Prevent background scroll and listen for Escape key when checkout is open
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleCloseModal();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isCheckoutOpen, handleCloseModal]);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Your cart is empty. Please choose at least one bottle before checking out.');
      handleCloseModal();
      return;
    }

    if (!fullName.trim() || !phone.trim() || !deliveryAddress.trim()) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    // Validate phone number format (at least 9 digits for Ghana)
    const digitsOnly = phone.trim().replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      alert('Please enter a valid Ghana phone number (e.g. 024 123 4567).');
      return;
    }

    const orderId = `VF-${Date.now().toString().slice(-6)}`;
    const customer: CustomerDetails = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: currentUser?.email || undefined,
      region: 'Greater Accra',
      city: city.trim(),
      deliveryAddress: deliveryAddress.trim(),
      paymentMethod,
      notes: notes.trim() || undefined,
    };

    const orderPayload: OrderPayload = {
      orderId,
      createdAt: new Date().toISOString(),
      customer,
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      status: 'Pending',
    };

    try {
      const result = await createOrderMutation.mutateAsync(orderPayload);
      setCompletedOrder(result.order);
      setNotes(''); // Clear notes for future orders
      clearCart();
    } catch (err) {
      console.error('Order submission error', err);
      alert('Sorry, there was a problem sending your order. Please call us or try again shortly.');
    }
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10 my-8"
            role="dialog"
            aria-modal="true"
            aria-label="Checkout & Place Order"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 bg-brand-cream border-b border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-50 px-2.5 py-0.5 rounded-md inline-block mb-1">
                  Safe Checkout
                </span>
                <h2 className="text-lg sm:text-xl font-display font-bold text-gray-900 tracking-tight">
                  {completedOrder ? 'Order Confirmed!' : 'Where Should We Deliver?'}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close checkout"
              >
                <X size={18} />
              </button>
            </div>

            {completedOrder ? (
              /* Success Confirmation Screen */
              <div className="p-6 sm:p-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-700 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    Thank You, {completedOrder.customer.fullName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    We have saved your order. Our customer care team will call or WhatsApp your number (<strong>{completedOrder.customer.phone}</strong>) shortly to confirm delivery time.
                  </p>
                </div>

                {/* Order Summary Box */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500 font-medium">Order Number:</span>
                    <strong className="text-green-800 font-mono text-sm">{completedOrder.orderId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery To:</span>
                    <span className="text-gray-900 font-medium">{completedOrder.customer.deliveryAddress}, {completedOrder.customer.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment:</span>
                    <span className="text-gray-900 font-medium">{completedOrder.customer.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal:</span>
                    <span className="text-gray-900 font-medium">GH₵ {completedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery Fee:</span>
                    <span className="text-gray-900 font-medium">
                      GH₵ {completedOrder.deliveryFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-sm">
                    <span>Total to Pay:</span>
                    <span className="text-green-800 font-black">GH₵ {completedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full bg-green-800 hover:bg-green-900 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    Done Shopping
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              /* Empty Cart Guard */
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
                  <ShoppingCart size={32} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-900">Your shopping cart is empty</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Please choose at least one honey bottle to proceed with checkout.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleCloseModal();
                    navigate({ to: '/products' });
                  }}
                  className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Browse Honey Bottles
                </button>
              </div>
            ) : (
              /* Order Details Form */
              <form onSubmit={handleSubmitOrder} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                {/* Fast Checkout status if logged in, or sign-in prompt if guest */}
                {isAuthenticated && currentUser ? (
                  <div className="bg-green-50/80 border border-green-200/80 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                        {currentUser.fullName.split(' ').map((n) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-green-900 leading-tight">
                          Fast Checkout Active
                        </p>
                        <p className="text-[11px] text-green-700">
                          Auto-filled for {currentUser.fullName}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-green-800 bg-white border border-green-300/80 px-2 py-0.5 rounded-md">
                      Verified Customer
                    </span>
                  </div>
                ) : (
                  <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-amber-900">Have a Vivaldi account?</p>
                      <p className="text-[11px] text-amber-700">Sign in to auto-fill your saved address</p>
                    </div>
                    <Link
                      to="/account/login"
                      onClick={handleCloseModal}
                      className="px-3 py-1.5 bg-white border border-amber-300 text-amber-900 font-bold text-xs rounded-lg hover:bg-amber-100 transition-colors shadow-2xs"
                    >
                      Sign In
                    </Link>
                  </div>
                )}

                {/* Cart summary bar */}
                <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100 flex items-center justify-between text-xs">
                  <span className="text-gray-700 font-medium">
                    Order items ({items.reduce((s, i) => s + (Number(i.quantity) || 0), 0)} items)
                  </span>
                  <strong className="text-green-800 text-sm font-black">
                    GH₵ {subtotal.toFixed(2)}
                  </strong>
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="name-input" className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <User size={13} className="text-green-700" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    placeholder="e.g. Kwame Mensah"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-green-700 transition-colors bg-gray-50/50"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label htmlFor="phone-input" className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <Phone size={13} className="text-green-700" />
                    <span>Phone Number (Calls & WhatsApp) *</span>
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    required
                    placeholder="e.g. 024 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-green-700 transition-colors bg-gray-50/50"
                  />
                </div>

                {/* City & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="city-select" className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <MapPin size={13} className="text-green-700" />
                      <span>City / Town *</span>
                    </label>
                    <select
                      id="city-select"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-green-700 bg-white"
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
                    <label htmlFor="address-input" className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <MapPin size={13} className="text-green-700" />
                      <span>Delivery Address / Landmark *</span>
                    </label>
                    <input
                      id="address-input"
                      type="text"
                      required
                      placeholder="Street name or landmark"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-green-700 transition-colors bg-gray-50/50"
                    />
                  </div>
                </div>

                {/* Payment Option */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <CreditCard size={13} className="text-green-700" />
                    <span>How Do You Want to Pay?</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'MoMo', label: 'MTN MoMo' },
                      { id: 'Telecel Cash', label: 'Telecel Cash' },
                      { id: 'Cash on Delivery', label: 'Cash on Delivery' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPaymentMethod(opt.id as typeof paymentMethod)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none text-center ${
                          paymentMethod === opt.id
                            ? 'bg-green-50 border-green-700 text-green-800 shadow-xs'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label htmlFor="notes-input" className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <FileText size={13} className="text-green-700" />
                    <span>Order Note (Optional)</span>
                  </label>
                  <input
                    id="notes-input"
                    type="text"
                    placeholder="e.g. Please deliver after 2pm"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-green-700 bg-gray-50/50"
                  />
                </div>

                {/* Delivery & Total Cost Breakdown Card */}
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200/80 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Items Subtotal ({items.reduce((s, i) => s + (Number(i.quantity) || 0), 0)} items):</span>
                    <span className="font-bold text-gray-900">GH₵ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 items-center">
                    <span className="flex items-center gap-1">
                      <Truck size={13} className="text-green-700" />
                      <span>Doorstep Delivery ({city}):</span>
                    </span>
                    <span className="font-bold text-gray-900">GH₵ {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-black text-gray-900">
                    <span>Total Amount to Pay:</span>
                    <span className="text-base text-green-800">
                      GH₵ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={createOrderMutation.isPending}
                    className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
                  >
                    {createOrderMutation.isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Submitting Your Order...</span>
                      </>
                    ) : (
                      <>
                        <PackageCheck size={17} />
                        <span>Submit Order • GH₵ {total.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
