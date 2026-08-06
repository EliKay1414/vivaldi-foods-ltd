import { useCountUp, useScrollReveal } from '@/hooks/useScrollReveal';

function CountStat({ value, suffix, label, desc }: { value: number; suffix?: string; label: string; desc: string }) {
  const numRef = useCountUp(value, 2200);
  return (
    <div className="text-center flex flex-col items-center">
      {/* Dynamic Count-Up Header Array Layout */}
      <div className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 tracking-tight select-none">
        <span ref={numRef}>0</span>
        <span>{suffix}</span>
      </div>

      {/* Symmetrical Label Badges mapping your design guidelines */}
      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
        {label}
      </div>

      <p className="text-white/70 text-xs leading-relaxed max-w-50 mx-auto">
        {desc}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useScrollReveal();

  return (
    /* COMPACT SPACING INTEGRATION: Replaced inline linear vectors with a strict Tailwind native corporate mesh */
    <section
      className="py-12 md:py-16 relative overflow-hidden bg-linear-to-br from-green-950 via-green-900 to-emerald-950 border-t border-white/5"
      ref={ref}
    >
      {/* High-Contrast Blur Nodes Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[16px_16px] opacity-30" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-60 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* HEADER AREA: Symmetrical alignment matching global sections */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-2 flex flex-col items-center">
          <p className="reveal text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full inline-block">
            Quality Benchmarks
          </p>
          <h2 className="reveal reveal-delay-1 text-2xl md:text-3xl font-display font-bold text-white tracking-tight pt-1">
            Compliance Metrics
          </h2>
        </div>

        {/* Stats Grid Deck */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 max-w-5xl mx-auto">
          {[
            { value: 100, suffix: '%', label: 'Zero Food Adulteration', desc: 'Ensuring Food Authenticity' },
            { value: 100, suffix: '%', label: 'Clean Packaging', desc: 'Handled and packed with care' },
            { value: 100, suffix: '%', label: 'Quality Checks', desc: 'Checked before supply' },
            { value: 100, suffix: '%', label: 'Hygiene Controls', desc: 'Maintained across all batches' },
          ].map((s, i) => (
            <div key={s.label} className={`reveal reveal-delay-${i + 1} bg-white/5 border border-white/10 p-5 rounded-2xl shadow-xs backdrop-blur-xs`}>
              <CountStat {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
