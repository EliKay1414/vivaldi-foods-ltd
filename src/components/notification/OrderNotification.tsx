import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { useNotification } from '@/context/NotificationContext';
import { useCart } from '@/context/CartContext';
import {
  Notification,
  NotificationContent,
  NotificationTitle,
  NotificationDescription,
  NotificationAction,
} from '@/components/ui/notification';
import { Badge } from '@/components/ui/badge';

export const OrderNotification: React.FC = () => {
  const { activeNotification, dismissNotification } = useNotification();
  const { openCart } = useCart();

  if (!activeNotification) return null;

  const itemTotal = (activeNotification.product.price * activeNotification.quantity).toFixed(2);
  const isIncrement = activeNotification.action === 'increment';

  return (
    <div className="fixed top-4 left-3 right-3 sm:left-auto sm:top-6 sm:right-6 z-60 sm:w-full max-w-sm pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNotification.id}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="pointer-events-auto shadow-2xl"
        >
          <Notification
            variant="order"
            onClose={() => dismissNotification(activeNotification.id)}
            className="border-emerald-200/90 bg-white/98 shadow-xl shadow-emerald-950/10 p-3.5 sm:p-4"
          >
            {/* Product Thumbnail */}
            <div className="relative size-13 sm:size-14 rounded-xl bg-amber-50/50 p-1 border border-emerald-100/80 shrink-0 overflow-hidden shadow-2xs">
              <picture className="w-full h-full">
                <source srcSet={activeNotification.product.imageWebp} type="image/webp" />
                <img
                  src={activeNotification.product.image}
                  alt={activeNotification.product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </picture>
              <span className="absolute bottom-0 right-0 bg-emerald-700 text-white text-[9px] font-black px-1 rounded-tl-md">
                x{activeNotification.quantity}
              </span>
            </div>

            {/* Notification Text Body */}
            <NotificationContent className="pr-4">
              <div className="flex items-center gap-1.5 flex-wrap">
                <NotificationTitle className="text-emerald-950 font-extrabold text-xs sm:text-[13px]">
                  {isIncrement ? (
                    <TrendingUp size={13} className="text-emerald-600 shrink-0" />
                  ) : (
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  )}
                  <span>{activeNotification.title}</span>
                </NotificationTitle>

                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-bold px-1.5 py-0 h-4.5"
                >
                  Qty: {activeNotification.quantity}
                </Badge>
              </div>

              <NotificationDescription className="text-gray-600 font-medium line-clamp-1 text-[11px] sm:text-xs pt-0.5">
                {activeNotification.product.name} • <strong className="text-gray-900 font-bold">GH₵ {itemTotal}</strong>
              </NotificationDescription>

              <NotificationAction className="mt-2">
                <button
                  type="button"
                  onClick={() => {
                    dismissNotification(activeNotification.id);
                    openCart();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <ShoppingBag size={12} />
                  <span>View Cart</span>
                  <ArrowRight size={11} />
                </button>
              </NotificationAction>
            </NotificationContent>
          </Notification>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OrderNotification;
