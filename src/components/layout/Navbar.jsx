import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onOpenTickets }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change & toggle body scroll lock
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Squad', path: '/squad' },
    { name: 'Matches', path: '/matches' },
    { name: 'Den', path: '/den' },
    { name: 'History', path: '/history' },
    { name: 'Fan Zone', path: '/fanzone' },
  ];

  return (
    <>
      {/* ====== UNSCROLLED FULL-WIDTH NAVBAR ====== */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          scrolled
            ? 'top-4 md:top-6 w-[96%] sm:w-[94%] max-w-[1100px] h-[60px] md:h-[68px] px-8 sm:px-10 opacity-100'
            : 'top-0 w-full h-[80px] md:h-[100px] px-4 sm:px-8 md:px-12 opacity-100'
        }`}
      >
        {/* ====== SCROLLED: Rounded Pill Background ====== */}
        {scrolled && (
          <div className="absolute inset-0 rounded-full bg-black/90 backdrop-blur-xl border border-accent/30 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(234,179,8,0.12)] z-0" />
        )}

        {/* ====== UNSCROLLED: Gradient Top Bar ====== */}
        {!scrolled && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-transparent backdrop-blur-md z-0" />
            {/* Angled gold accent strip at bottom */}
            <div className="absolute bottom-0 left-[5%] right-[5%] h-[2px] nav-accent-bar bg-gradient-to-r from-transparent via-accent/60 to-transparent z-10" />
          </>
        )}

        {/* ====== NAVBAR CONTENT (above bg shapes) ====== */}
        <div className="relative z-10 flex items-center justify-between w-full">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 md:gap-3.5 group">
            {/* Circular Logo Badge */}
            <div className="relative p-[1.5px] rounded-full bg-gradient-to-br from-accent via-amber-300 to-accent shadow-[0_0_15px_rgba(234,179,8,0.3)] group-hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] transition-all duration-500 group-hover:scale-110">
              <div className="rounded-full bg-black p-1 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Assam Hornbill Tigers Logo"
                  className={`rounded-full object-cover transition-all duration-500 ${scrolled ? 'w-7 h-7 md:w-8 md:h-8' : 'w-8 h-8 md:w-10 md:h-10'}`}
                />
              </div>
            </div>

            {/* Brand Name */}
            <div className="flex flex-col">
              <span className={`font-heading tracking-wider bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent group-hover:from-accent group-hover:to-amber-300 transition-all duration-500 whitespace-nowrap ${scrolled ? 'text-sm md:text-base' : 'text-base md:text-xl font-bold'}`}>
                Hornbill Tigers
              </span>
              {!scrolled && (
                <span className="text-[9px] font-body tracking-[0.25em] text-accent/80 uppercase hidden sm:block -mt-0.5 font-semibold">
                  Official Franchise
                </span>
              )}
            </div>
          </Link>

          {/* ====== Desktop Nav Links — Rounded Tabs ====== */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const isMatches = link.name === 'Matches';
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-body text-[11px] xl:text-[12px] font-bold uppercase tracking-wider transition-all duration-300 rounded-full py-2 px-4 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-ink shadow-[0_0_20px_rgba(234,179,8,0.5)] font-black'
                      : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-accent'
                  }`}
                >
                  {link.name}
                  {isMatches && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* ====== Desktop CTA — Rounded Button ====== */}
          <div className="hidden xl:block">
            <button
              onClick={onOpenTickets}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-ink font-body text-[11px] md:text-xs font-black uppercase tracking-widest py-2.5 px-7 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_35px_rgba(234,179,8,0.7)] whitespace-nowrap border border-amber-300/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 fill-current text-ink" viewBox="0 0 24 24">
                  <path d="M15.5 2.25a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 15.5 2.25Zm-7 0a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM3 7.5A2.25 2.25 0 0 1 5.25 5.25h13.5A2.25 2.25 0 0 1 21 7.5v2.25a2.25 2.25 0 0 0 0 4.5V16.5A2.25 2.25 0 0 1 18.75 18.75H5.25A2.25 2.25 0 0 1 3 16.5v-2.25a2.25 2.25 0 0 0 0-4.5V7.5Z"/>
                </svg>
                Buy Tickets
              </span>
              {/* Shimmer sweep */}
              <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 group-hover:left-[100%] transition-all duration-1000 ease-in-out" />
            </button>
          </div>

          {/* ====== Mobile Hamburger — Rounded Badge ====== */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 gap-[5px] relative z-60 hover:border-accent/40 hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-[2px] bg-accent transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-5 h-[2px] bg-accent transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* ====== MOBILE OVERLAY MENU ====== */}
      <div
        className={`fixed inset-0 bg-[#0d0101]/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center transition-all duration-500 xl:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-5 max-h-[85vh] overflow-y-auto w-full px-6 py-8">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-[1.5px] rounded-full bg-gradient-to-br from-accent via-amber-300 to-accent shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <div className="rounded-full bg-black p-1 flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full object-cover" />
              </div>
            </div>
            <span className="font-heading text-2xl text-white tracking-widest uppercase">Hornbill Tigers</span>
          </div>

          {/* Divider */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mb-2"></div>

          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`font-heading text-2xl uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? 'text-accent font-black scale-110 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]'
                    : 'text-white/80 hover:text-accent'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <button
            onClick={() => {
              setMenuOpen(false);
              if (onOpenTickets) onOpenTickets();
            }}
            className="rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-ink font-heading text-lg uppercase tracking-widest py-3.5 px-10 shadow-[0_0_25px_rgba(234,179,8,0.5)] mt-4 hover:scale-105 active:scale-95 transition-all font-bold"
          >
            Buy Tickets
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
