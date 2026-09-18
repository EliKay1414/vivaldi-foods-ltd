import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Loader2, Phone, MapPin, User, FileText, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCreateOrderMutation, type CustomerDetails, type OrderPayload } from '@/services/products';

export const OrderModal: React.FC = () => {
  const {
    items,
    subtotal,
    isCheckoutOpen,
    closeCheckout,
    clearCart,
    isFreeShipping,
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Accra');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'MoMo' | 'Telecel Cash' | 'Cash on Delivery'>('MoMo');
  const [notes, setNotes] = useState('');
  const [completedOrder, setCompletedOrder] = useState<OrderPayload | null>(null);

  const deliveryFee = isFreeShipping ? 0 : 25;
  const grandTotal = subtotal + deliveryFee;

  const createOrderMutation = useCreateOrderMutation();

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !deliveryAddress.trim()) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    const orderId = `VF-${Date.now().toString().slice(-6)}`;
    const customer: CustomerDetails = {
      fullName: fullName.trim(),
      phone: phone.trim(),
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
      total: grandTotal,
      status: 'Pending',
    };

    try {
      const result = await createOrderMutation.mutateAsync(orderPayload);
      setCompletedOrder(result.order);
      clearCart();
    } catch (err) {
      console.error('Order submission error', err);
      alert('Sorry, there was a problem sending your order. Please call us or try again shortly.');
    }
  };

  const handleFinish = () => {
    setCompletedOrder(null);
    closeCheckout();
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
            onClick={closeCheckout}
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
                onClick={closeCheckout}
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
                      {completedOrder.deliveryFee === 0 ? 'FREE' : `GH₵ ${completedOrder.deliveryFee.toFixed(2)}`}
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
                    onClick={handleFinish}
                    className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    Done & Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              /* Order Details Form */
              <form onSubmit={handleSubmitOrder} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                {/* Cart summary bar */}
                <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100 flex items-center justify-between text-xs">
                  <span className="text-gray-700 font-medium">
                    Order items ({items.reduce((s, i) => s + i.quantity, 0)} items)
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
                    <span>Items Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items):</span>
                    <span className="font-bold text-gray-900">GH₵ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 items-center">
                    <span className="flex items-center gap-1">
                      <Truck size={13} className="text-green-700" />
                      <span>Doorstep Delivery ({city}):</span>
                    </span>
                    {isFreeShipping ? (
                      <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                        FREE Delivery
                      </span>
                    ) : (
                      <span className="font-bold text-gray-900">GH₵ 25.00</span>
                    )}
                  </div>
                  {isFreeShipping ? (
                    <p className="text-[11px] text-emerald-700 font-medium pt-0.5">
                      🎉 Great news! Your order qualifies for free delivery in Accra.
                    </p>
                  ) : (
                    <p className="text-[11px] text-gray-500 pt-0.5">
                      💡 Tip: Orders GH₵ 350 and above enjoy free delivery.
                    </p>
                  )}
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-black text-gray-900">
                    <span>Total Amount to Pay:</span>
                    <span className="text-base text-green-800">
                      GH₵ {grandTotal.toFixed(2)}
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
                        <span>Sending Your Order...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Order • GH₵ {grandTotal.toFixed(2)}</span>
                        <ArrowRight size={14} />
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
