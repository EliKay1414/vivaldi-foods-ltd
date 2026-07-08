interface PageBannerProps {
  title: string;
  subtitle: string;
}

export function PageBanner({ title, subtitle }: PageBannerProps) {
  return (
    <div
      // mt-[135px] explicitly stops the banner from hiding under your fixed navbar
      // py-12 creates perfectly symmetrical space above the label and below the subtitle
      className="relative mt-[135px] py-12 flex items-center"
      style={{ background: 'linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)' }}
    >
      <div className="absolute inset-0 honeycomb-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 w-full flex flex-col justify-center">

        {/* Company Label - Now clears the navbar completely and sits close to the title */}
        <p className="text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-2 text-amber-100">
          <span className="w-8 h-0.5 bg-amber-300" /> Vivaldi Foods Ltd
        </p>

        {/* Main Title */}
        <h1 className="text-white text-3xl md:text-4xl font-display font-bold mb-2 tracking-tight leading-tight">
          {title}
        </h1>

        {/* Subtitle - Kept tight to the title; symmetry is maintained by the outer container padding */}
        <p className="text-white/70 text-xs md:text-sm max-w-xl leading-relaxed">
          {subtitle}
        </p>

      </div>
    </div>
  );
}
