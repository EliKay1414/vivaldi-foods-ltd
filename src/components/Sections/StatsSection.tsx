import { useCountUp, useScrollReveal } from '@/hooks/useScrollReveal'

function CountStat({ value, suffix, label, desc }: { value: number; suffix?: string; label: string; desc: string }) {
  const numRef = useCountUp(value, 2200)
  return (
    <div className="text-center">
      <div className="font-display font-bold text-5xl md:text-6xl text-white mb-2 leading-none">
        <span ref={numRef}>0</span>
        <span>{suffix}</span>
      </div>
      <div className="text-label-sm text-amber-300 mb-2">{label}</div>
      <p className="text-body-sm text-white/60 leading-relaxed max-w-xs mx-auto">{desc}</p>
    </div>
  )
}

export default function StatsSection() {
  const ref = useScrollReveal()

  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden"
      ref={ref}
      style={{
        backgroundImage: 'linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 100%)',
      }}
    >
      <div className="absolute inset-0 honeycomb-bg opacity-20" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="reveal text-label mb-3 text-amber-100">
            <span className="w-8 h-0.5 bg-amber-400 inline-block mr-3" />
            Quality Benchmarks
            <span className="w-8 h-0.5 bg-amber-400 inline-block ml-3" />
          </p>
          <h2 className="reveal reveal-delay-1 text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Compliance Metrics
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {[
            { value: 100, suffix: '%', label: 'Zero Food Adulteration', desc: 'Ensuring Food Authenticity' },
            { value: 100, suffix: '%', label: 'Clean Packaging', desc: 'Handled and packed with care' },
            { value: 100, suffix: '%', label: 'Quality Checks', desc: 'Checked before supply' },
            { value: 100, suffix: '%', label: 'Hygiene Control Consistency', desc: 'Maintained across all batches' },
          ].map((s, i) => (
            <div key={s.label} className={`reveal reveal-delay-${i + 1}`}>
              <CountStat {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
