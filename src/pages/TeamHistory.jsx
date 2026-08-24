import { useState, useEffect, useRef, useCallback } from 'react';
import { history } from '../data/history';

/* ─────────────────────────────────────────────────────────
   TEAM HISTORY — STACKED SCROLL IMAGE REVEAL
   Full-viewport cinematic experience where each milestone
   image expands and reveals over the previous one as
   you scroll. Single continuous scroll journey.
   ───────────────────────────────────────────────────────── */

const SCROLL_PER_SECTION = 1.4; // viewport heights of scroll per milestone

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

const TeamHistory = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionProgresses, setSectionProgresses] = useState(
    () => history.map(() => 0)
  );
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const containerRef = useRef(null);
  const rafId = useRef(0);
  const currentProgresses = useRef(history.map(() => 0));
  const targetProgresses = useRef(history.map(() => 0));

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Smooth rAF interpolation loop ── */
  const animate = useCallback(() => {
    let needsUpdate = false;
    const curr = currentProgresses.current;
    const targ = targetProgresses.current;

    for (let i = 0; i < curr.length; i++) {
      const diff = targ[i] - curr[i];
      if (Math.abs(diff) > 0.001) {
        curr[i] += diff * 0.14;
        needsUpdate = true;
      } else {
        curr[i] = targ[i];
      }
    }

    if (needsUpdate) {
      setSectionProgresses([...curr]);
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  /* ── Scroll-driven progress calculation ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -rect.top;
      const total = history.length;

      let currentActive = 0;

      for (let i = 0; i < total; i++) {
        const sectionStart = i * vh * SCROLL_PER_SECTION;
        const sectionEnd = sectionStart + vh * SCROLL_PER_SECTION;
        const localProgress = clamp((scrolled - sectionStart) / (sectionEnd - sectionStart), 0, 1);
        targetProgresses.current[i] = localProgress;

        if (localProgress > 0.1) currentActive = i;
      }

      setActiveIndex(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index) => {
    if (!containerRef.current) return;
    const vh = window.innerHeight;
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const targetScroll = containerTop + index * vh * SCROLL_PER_SECTION + vh * 0.2;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const totalScrollHeight = history.length * SCROLL_PER_SECTION;
  const overallProgress = Math.round(
    (sectionProgresses.reduce((sum, p) => sum + p, 0) / history.length) * 100
  );

  return (
    <div className="bg-[#2a0000] text-white">

      {/* ═══════ INTRO HEADER ═══════ */}
      <header className="relative z-30 min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Atmospheric bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#5B0000]/40 via-[#3D0000] to-[#2a0000] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-accent/50" />
            <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-accent/70 font-semibold">
              STARTING GRID
            </span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-accent/50" />
          </div>

          {/* Team Headline */}
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-wider leading-none mb-3 text-center">
            ASSAM <span className="text-accent">HORNBILL TIGERS</span>
          </h1>

          <span className="font-heading text-lg sm:text-2xl text-accent/80 tracking-[0.3em] uppercase block">
            SEASON 1 ROADMAP
          </span>

          {/* Scroll cue */}
          <div className="mt-16 flex flex-col items-center gap-3 text-gray-500">
            <span className="font-body text-[10px] uppercase tracking-[0.3em]">SCROLL TO BEGIN THE JOURNEY</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-accent/60 to-transparent animate-pulse" />
          </div>
        </div>
      </header>

      {/* ═══════ FIXED HUD OVERLAY ═══════ */}
      <div className="fixed top-20 sm:top-24 right-2 sm:right-6 z-50 bg-[#3D0000]/90 backdrop-blur-xl border border-accent/15 px-2.5 sm:px-4 py-2.5 sm:py-3 shadow-2xl max-w-[160px] sm:max-w-none"
           style={{ borderRadius: '2px' }}>
        <div className="flex items-center justify-between mb-2 gap-4">
          <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
            S1 ROADMAP
          </span>
          <span className="font-heading text-xs sm:text-sm text-accent tracking-wider">
            {overallProgress}%
          </span>
        </div>
        <div className="h-[2px] w-full bg-white/8 mb-2.5 overflow-hidden" style={{ borderRadius: '1px' }}>
          <div className="h-full bg-accent transition-all duration-300" style={{ width: `${overallProgress}%` }} />
        </div>
        <div className="flex gap-1">
          {history.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(i)}
              className={`w-7 h-7 sm:w-8 sm:h-8 font-heading text-[10px] sm:text-xs transition-all duration-300 flex items-center justify-center tracking-wider ${
                activeIndex === i
                  ? 'bg-accent text-black shadow-[0_0_12px_rgba(201,162,39,0.5)]'
                  : sectionProgresses[i] > 0.5
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'bg-white/[0.03] text-gray-500 border border-white/8 hover:bg-white/[0.06]'
              }`}
              style={{ borderRadius: '2px' }}
            >
              {i === history.length - 1 ? (
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
                  <rect x="1" y="1" width="3.5" height="3.5" />
                  <rect x="4.5" y="4.5" width="3.5" height="3.5" />
                  <rect x="8" y="1" width="3.5" height="3.5" />
                  <rect x="11.5" y="4.5" width="3.5" height="3.5" />
                  <rect x="1" y="8" width="3.5" height="3.5" />
                  <rect x="4.5" y="11.5" width="3.5" height="3.5" />
                  <rect x="8" y="8" width="3.5" height="3.5" />
                  <rect x="11.5" y="11.5" width="3.5" height="3.5" />
                </svg>
              ) : `0${i + 1}`}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════ STACKED SCROLL REVEAL CONTAINER ═══════ */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${totalScrollHeight * 100}vh` }}
      >
        {/* Sticky viewport — all images stack inside this */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

          {history.map((milestone, index) => {
            const p = sectionProgresses[index];
            const isFinal = index === history.length - 1;

            // Expansion values driven by scroll progress
            const expand = smoothstep(0, 0.65, p);
            const startW = 50;
            const startH = 55;
            const w = startW + (100 - startW) * expand;
            const h = startH + (100 - startH) * expand;
            const insetX = Math.max(0, (100 - w) / 2);
            const insetY = Math.max(0, (100 - h) / 2);
            const radius = 16 * (1 - expand);
            const zoom = 1.25 - 0.25 * expand;

            // Content overlay appears after image expands
            const contentIn = smoothstep(0.55, 0.85, p);
            // Title above image fades out as it expands
            const titleOut = smoothstep(0.3, 0.7, p);
            // Image dims slightly when next section starts
            const nextP = index < history.length - 1 ? sectionProgresses[index + 1] : 0;
            const fadeOut = smoothstep(0, 0.4, nextP);

            return (
              <div
                key={milestone.id}
                className="absolute inset-0"
                style={{
                  zIndex: index + 1,
                  opacity: p > 0.01 ? 1 - fadeOut * 0.6 : 0,
                  transition: 'opacity 0.1s',
                }}
              >
                {/* ─ Expanding Image Frame ─ */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    clipPath: `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`,
                    willChange: 'clip-path',
                  }}
                >
                  <img
                    src={milestone.image}
                    alt={milestone.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      transform: `scale(${zoom})`,
                      willChange: 'transform',
                    }}
                    loading="lazy"
                    draggable={false}
                  />
                  {/* Dark scrim for readability */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(61,0,0,0.9) 0%, rgba(91,0,0,0.2) 40%, rgba(61,0,0,0.4) 100%)',
                      opacity: 0.3 + expand * 0.5,
                    }}
                  />
                </div>

                {/* ─ Floating Title (visible before expansion) ─ */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                  style={{
                    opacity: 1 - titleOut,
                    transform: `translate3d(0, ${-20 * titleOut}px, 0) scale(${1 + 0.05 * titleOut})`,
                  }}
                >
                  <div className="text-center px-6">
                    <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-accent/80 font-semibold block mb-2">
                      {isFinal ? 'FINISH LINE' : `STOP ${String(index + 1).padStart(2, '0')}`}
                    </span>
                    <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wider leading-none text-shadow-lg">
                      {milestone.feeling || milestone.title}
                    </h2>
                  </div>
                </div>

                {/* ─ Content Overlay (appears after full expand) ─ */}
                <div
                  className="absolute inset-0 flex items-end justify-center pb-12 sm:pb-16 md:pb-20 pointer-events-none z-10"
                  style={{
                    opacity: contentIn,
                    transform: `translate3d(0, ${20 * (1 - contentIn)}px, 0)`,
                  }}
                >
                  <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 text-center">
                    {/* Broadcast header bar */}
                    <div className="inline-flex items-center gap-3 bg-[#3D0000]/80 backdrop-blur-md border border-accent/20 px-4 py-2 mb-5"
                         style={{ borderRadius: '2px' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="font-heading text-xs sm:text-sm uppercase tracking-[0.2em] text-accent">
                        {milestone.year}
                      </span>
                      {milestone.feeling && (
                        <>
                          <div className="w-px h-3 bg-white/20" />
                          <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/50 font-semibold">
                            {milestone.feeling}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-wider leading-tight mb-3">
                      {milestone.title}
                    </h3>

                    <p className="font-body text-xs sm:text-sm font-light text-gray-300 leading-relaxed max-w-xl mx-auto mb-6">
                      {milestone.description}
                    </p>

                    {/* Stats row */}
                    {milestone.stats && (
                      <div className="inline-grid grid-cols-3 gap-2 sm:gap-3">
                        {milestone.stats.map((stat, si) => (
                          <div
                            key={si}
                            className="bg-[#3D0000]/60 backdrop-blur-md border border-accent/15 px-3 sm:px-5 py-2.5 text-center"
                            style={{ borderRadius: '2px' }}
                          >
                            <div className="font-heading text-sm sm:text-lg text-accent tracking-wider">
                              {stat.value}
                            </div>
                            <div className="font-body text-[8px] sm:text-[10px] uppercase tracking-[0.15em] text-gray-400 mt-0.5">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ─ Section counter in corner ─ */}
                <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10 pointer-events-none"
                     style={{ opacity: p > 0.05 ? 0.6 : 0 }}>
                  <span className="font-heading text-6xl sm:text-8xl text-white/10 tracking-wider leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamHistory;
