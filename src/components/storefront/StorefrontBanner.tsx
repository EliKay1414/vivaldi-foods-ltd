import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Sparkles } from 'lucide-react';

const messages = [
  { icon: Truck, text: 'Fast doorstep delivery available across Accra and nationwide' },
  { icon: ShieldCheck, text: '100% Real Pure Honey • No added sugar, syrup, or fake water' },
  { icon: Sparkles, text: 'Fresh harvest from Volta Region bees • Safe & FDA Certified' },
];

export const StorefrontBanner: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = messages[index];
  const Icon = current.icon;

  return (
    <div className="bg-[#2B1E17] text-white py-2 px-4 text-[11px] sm:text-xs font-semibold overflow-hidden border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 transition-all duration-300">
        <Icon size={14} className="text-amber-400 shrink-0 animate-pulse" />
        <span className="truncate tracking-wide text-center">
          {current.text}
        </span>
      </div>
    </div>
  );
};

export default StorefrontBanner;
