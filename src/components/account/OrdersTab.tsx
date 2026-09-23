import React, { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { Package, Clock, ShoppingBag } from 'lucide-react';
import type { OrderPayload } from '@/services/products';

type OrderStatusFilter = 'all' | 'pending' | 'dispatched' | 'delivered';

interface OrdersTabProps {
  orders: OrderPayload[];
  onReorder: (productId: number) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ orders, onReorder }) => {
  const [filter, setFilter] = useState<OrderStatusFilter>('all');

  const filteredOrders = useMemo(() => {
    if (filter === 'all') return orders;
    if (filter === 'pending') {
      return orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed');
    }
    if (filter === 'dispatched') {
      return orders.filter((o) => o.status === 'Dispatched');
    }
    if (filter === 'delivered') {
      return orders.filter((o) => o.status === 'Delivered');
    }
    return orders;
  }, [orders, filter]);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            My Order
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            View order details and track delivery status.
          </p>
        </div>

        <span className="text-xs font-semibold text-gray-500 self-start sm:self-auto bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          Total Orders: <strong className="text-gray-900">{orders.length}</strong>
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3 overflow-x-auto no-scrollbar text-xs">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-green-700 text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          All ({orders.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('pending')}
          className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
            filter === 'pending'
              ? 'bg-green-700 text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Processing ({orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed').length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('dispatched')}
          className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
            filter === 'dispatched'
              ? 'bg-green-700 text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Dispatched ({orders.filter((o) => o.status === 'Dispatched').length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('delivered')}
          className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
            filter === 'delivered'
              ? 'bg-green-700 text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Delivered ({orders.filter((o) => o.status === 'Delivered').length})
        </button>
      </div>

      {/* Orders List or Empty State */}
      {filteredOrders.length === 0 ? (
        <div className="py-14 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
            <Package size={30} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">No orders found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {filter === 'all'
                ? 'You have not placed any orders yet.'
                : `No orders currently match the "${filter}" status.`}
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-full transition-all shadow-xs"
          >
            <ShoppingBag size={14} />
            <span>Start Shopping</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusStyles =
              {
                Pending: 'bg-amber-50 text-amber-800 border-amber-200/80',
                Confirmed: 'bg-blue-50 text-blue-800 border-blue-200/80',
                Dispatched: 'bg-purple-50 text-purple-800 border-purple-200/80',
                Delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
              }[order.status] || 'bg-gray-50 text-gray-800 border-gray-200';

            let formattedDate = 'Recently';
            try {
              const d = new Date(order.createdAt);
              if (!isNaN(d.getTime())) {
                formattedDate = d.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });
              }
            } catch {
              // fallback
            }

            return (
              <div
                key={order.orderId}
                className="border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-2xs transition-all bg-gray-50/30 space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 text-xs">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-bold text-gray-900">
                      Order ID: <span className="font-mono text-green-800 font-extrabold">{order.orderId}</span>
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock size={12} /> {formattedDate}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusStyles}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-gray-500 block">
                            Size: {item.product.size} &bull; Qty: {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-gray-900 block">
                          GH₵ {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          (GH₵ {item.product.price.toFixed(2)} each)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer & Actions */}
                <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-gray-500 leading-snug">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 block">
                      Delivery Address
                    </span>
                    <strong className="text-gray-800 font-semibold">
                      {order.customer.fullName} &bull; {order.customer.phone}
                    </strong>
                    <p className="text-gray-600 text-[11px]">
                      {order.customer.deliveryAddress}, {order.customer.city}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right mr-2">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 block">
                        Order Total
                      </span>
                      <span className="text-sm font-black text-green-800">
                        GH₵ {order.total.toFixed(2)}
                      </span>
                    </div>

                    {order.items[0] && (
                      <button
                        type="button"
                        onClick={() => onReorder(order.items[0].product.id)}
                        className="px-3.5 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold text-xs transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                      >
                        <ShoppingBag size={12} />
                        <span>Reorder</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
