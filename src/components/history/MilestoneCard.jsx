import { useEffect, useRef, useState } from 'react';
import ScrollExpand from '../shared/ScrollExpand';

/* ───────────────────────────────────────────────
   Premium Milestone Checkpoint Card
   Sports-broadcast panel with ScrollExpand
   cinematic image reveal on each checkpoint.
   ─────────────────────────────────────────────── */
const MilestoneCard = ({ milestone, index, total, isLeft, activeIndex }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const isReached = activeIndex >= index;
  const isCurrent = activeIndex === index;
  const isFinal = index === total - 1;

  return (
    <div
      id={`checkpoint-${index}`}
      ref={cardRef}
      className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group w-full mb-20 md:mb-32 scroll-mt-32"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        filter: isVisible ? 'blur(0px)' : 'blur(6px)',
        transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: '0.1s',
      }}
    >
      {/* ── Checkpoint Node on the Highway ── */}
      <div className="absolute left-5 sm:left-10 md:left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        {isCurrent && (
          <>
            <div className="absolute w-14 h-14 md:w-20 md:h-20 rounded-full border border-accent/40 animate-ping pointer-events-none" />
            <div className="absolute w-10 h-10 md:w-14 md:h-14 rounded-full bg-accent/10 animate-pulse pointer-events-none" />
          </>
        )}

        <div
          className={`relative w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-700 ${
            isReached
              ? 'bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border-2 border-accent shadow-[0_0_30px_rgba(201,162,39,0.7)]'
              : 'bg-[#1a1a1a] border-2 border-white/15 opacity-50'
          }`}
        >
          {isFinal ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-7 md:h-7" fill="none">
              <rect x="3" y="3" width="4.5" height="4.5" fill={isReached ? '#C9A227' : '#666'} />
              <rect x="7.5" y="7.5" width="4.5" height="4.5" fill={isReached ? '#C9A227' : '#666'} />
              <rect x="12" y="3" width="4.5" height="4.5" fill={isReached ? '#C9A227' : '#666'} />
              <rect x="16.5" y="7.5" width="4.5" height="4.5" fill={isReached ? '#C9A227' : '#666'} />
              <rect x="3" y="12" width="4.5" height="4.5" fill={isReached ? '#C9A227' : '#666'} />
              <rect x="7.5" y="16.5" width="4.5" height="4.5" fill={isReached ? '#C9A227' : '#666'} />
              <rect x="12" y="12" width="4.5" height="4.5" fill={isReached ? '#C9A227' : '#666'} />
              <rect x="16.5" y="16.5" width="4.5" height="4.5" fill={isReached ? '#C9A227' : '#666'} />
            </svg>
          ) : (
            <span className={`font-heading text-sm md:text-lg tracking-wider transition-colors duration-500 ${
              isReached ? 'text-accent' : 'text-gray-500'
            }`}>
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
        </div>

        <div className={`mt-2 px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] font-body font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-500 ${
          isReached
            ? 'bg-accent text-black shadow-[0_2px_12px_rgba(201,162,39,0.4)]'
            : 'bg-[#1a1a1a] text-gray-500 border border-white/10'
        }`}>
          {isFinal ? 'FINISH' : `STOP ${String(index + 1).padStart(2, '0')}`}
        </div>
      </div>

      {/* ── Desktop spacer ── */}
      <div className="hidden md:block w-5/12" />

      {/* ── Milestone Card Panel ── */}
      <div className="w-full md:w-5/12 ml-16 sm:ml-24 md:ml-0">
        <div
          className={`relative overflow-hidden transition-all duration-700 border ${
            isReached
              ? 'bg-[#0f0f0f] border-accent/30 shadow-[0_8px_40px_rgba(0,0,0,0.9),0_0_60px_rgba(201,162,39,0.08)]'
              : 'bg-[#0a0a0a]/70 border-white/5 opacity-40'
          }`}
          style={{ borderRadius: '2px' }}
        >
          {/* ─ Broadcast-style top header bar ─ */}
          <div className="relative bg-[#111] px-4 sm:px-5 py-2.5 border-b border-white/8 flex items-center justify-between">
            <div className={`absolute top-0 left-0 h-[2px] transition-all duration-700 ${
              isReached ? 'w-full bg-accent' : 'w-0 bg-transparent'
            }`} />

            <div className="flex items-center gap-2.5">
              <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                isCurrent ? 'bg-accent animate-pulse' : isReached ? 'bg-accent/60' : 'bg-gray-600'
              }`} />
              <span className="font-heading text-xs sm:text-sm uppercase tracking-[0.2em] text-accent font-normal">
                {milestone.year}
              </span>
            </div>

            {milestone.feeling && (
              <span className={`font-body text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-500 ${
                isReached ? 'text-white/50' : 'text-white/20'
              }`}>
                {milestone.feeling}
              </span>
            )}
          </div>

          {/* ─ ScrollExpand Image Section ─ */}
          <div style={{ height: '320px' }} className="relative">
            <ScrollExpand
              src={milestone.image}
              alt={milestone.title}
              title={milestone.feeling || ''}
              startWidth={60}
              startHeight={70}
              startRadius={8}
              endRadius={0}
              mediaZoom={1.2}
              scrollDistance={0.6}
              holdDistance={0.15}
              smoothing={0.08}
              overlayScrim={0.5}
              useWindowScroll
            >
              {/* Overlay content revealed on full expand */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-5 w-[3px] bg-accent" />
                <span className="font-heading text-lg sm:text-xl uppercase tracking-[0.2em] text-white">
                  {milestone.title}
                </span>
                <span className="font-body text-[10px] uppercase tracking-[0.3em] text-accent/80">
                  {isFinal ? 'Match 35 — Victory' : `Season 1 — Phase ${String(index + 1).padStart(2, '0')}`}
                </span>
              </div>
            </ScrollExpand>
          </div>

          {/* ─ Card body ─ */}
          <div className="p-5 sm:p-6">
            <h3 className={`font-heading text-xl sm:text-2xl md:text-[28px] uppercase tracking-wider leading-tight mb-3 transition-colors duration-500 ${
              isReached ? 'text-white' : 'text-gray-500'
            }`}>
              {milestone.title}
            </h3>

            <p className={`font-body text-xs sm:text-[13px] font-light leading-relaxed mb-5 transition-colors duration-500 ${
              isReached ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {milestone.description}
            </p>

            {/* ─ Stats row ─ */}
            {milestone.stats && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {milestone.stats.map((stat, i) => (
                  <div key={i} className={`text-center py-2.5 border transition-all duration-500 ${
                    isReached
                      ? 'border-white/10 bg-white/[0.03]'
                      : 'border-white/5 bg-transparent'
                  }`} style={{ borderRadius: '2px' }}>
                    <div className={`font-heading text-sm sm:text-base tracking-wider transition-colors duration-500 ${
                      isReached ? 'text-accent' : 'text-gray-600'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="font-body text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-gray-500 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─ Bottom status bar ─ */}
            <div className="flex items-center justify-between pt-3 border-t border-white/8">
              <span className={`font-body text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-medium transition-colors duration-500 ${
                isReached ? 'text-accent/80' : 'text-gray-600'
              }`}>
                {isFinal ? '★ DESTINATION ACHIEVED' : isReached ? '✓ CHECKPOINT CLEARED' : '○ CHECKPOINT AHEAD'}
              </span>
              <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-600">
                ISCL S1
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneCard;
