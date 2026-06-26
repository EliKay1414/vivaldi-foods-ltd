interface PageBannerProps {
  title: string;
  subtitle: string;
}

export function PageBanner({ title, subtitle }: PageBannerProps) {
  return (
    <div
      className="relative pt-24 md:pt-28 pb-8 md:pb-10 flex items-center"
      style={{
        background: 'linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)',
      }}
    >
      <div className="absolute inset-0 honeycomb-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <p className="mt-8 text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-3 text-amber-100">
          <span className="w-8 h-0.5 bg-amber-400" />
          Vivaldi Foods Ltd
        </p>
        <h1 className="text-white text-3xl md:text-4xl font-display font-bold mb-2 tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-white/70 text-xs md:text-sm max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
