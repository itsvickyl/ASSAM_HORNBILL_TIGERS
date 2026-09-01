import { motion } from 'motion/react';
import CountdownTimer from '../shared/CountdownTimer';
import { fixtures } from '../../data/fixtures';

const LatestMatchCard = ({ onOpenTickets }) => {
  const upcomingFixture = fixtures.find(f => f.status === 'UPCOMING') || {
    matchNo: 'Match 42',
    tournament: 'ISCL Season 2',
    venue: 'Acharya Stadium, Bangalore',
    date: 'Nov 25, 2026'
  };

  const getNextNovember25 = () => {
    const now = new Date();
    let target = new Date(now.getFullYear(), 10, 25, 19, 30, 0); // Month 10 = November
    if (now > target) {
      target = new Date(now.getFullYear() + 1, 10, 25, 19, 30, 0);
    }
    return target;
  };

  const targetDate = getNextNovember25();

  return (
    <div className="relative lg:absolute lg:bottom-12 lg:right-12 z-30 px-4 md:px-0 mt-6 lg:mt-0 max-w-md mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-black/75 backdrop-blur-2xl p-6 sm:p-7 w-full lg:w-[420px] rounded-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden group hover:border-accent/40 transition-all duration-500"
      >
        {/* Subtle Ambient Gold Glow Effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/30 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Top Accent Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-80"></div>
        
        {/* Header Ribbon */}
        <div className="flex justify-between items-center mb-5 border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-body text-[11px] text-white/70 uppercase tracking-[0.2em] font-semibold">
              Next Fixture
            </span>
          </div>
          <span className="font-body text-[10px] text-black uppercase tracking-widest bg-accent px-2.5 py-0.5 rounded font-bold shadow-sm">
            ISCL Season 2
          </span>
        </div>
        
        {/* Team Showcase (Assam Hornbill Tigers) */}
        <div className="flex flex-col items-center justify-center text-center mb-5 pt-1">
          <div className="relative mb-3 group-hover:scale-105 transition-transform duration-500">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-accent/40 via-primary to-accent/40 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/90 p-1.5 border border-accent/60 shadow-xl flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Assam Hornbill Tigers" 
                className="w-full h-full object-cover rounded-full"
                loading="eager"
              />
            </div>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wider leading-tight">
            Assam Hornbill Tigers
          </h3>
          <p className="font-body text-[11px] text-accent/90 uppercase tracking-[0.18em] font-medium mt-0.5">
            Official ISCL Season 2 Match
          </p>
        </div>
        
        {/* Modular Countdown Grid */}
        <div className="mb-5 flex justify-center bg-white/[0.03] p-2.5 rounded-xl border border-white/10">
          <CountdownTimer targetDate={targetDate} dark={true} />
        </div>
        
        {/* Match Details & Venue */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-white/95">
              <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <p className="font-body text-xs sm:text-sm font-semibold tracking-wide text-white">
                Acharya Stadium, Bangalore
              </p>
            </div>
            <p className="font-body text-[10px] sm:text-[11px] text-white/50 mt-1 uppercase tracking-widest font-medium">
              November 25th • 19:30 IST
            </p>
          </div>

          {/* Action CTA Button */}
          <button 
            onClick={onOpenTickets}
            className="w-full py-3 px-4 bg-gradient-to-r from-accent via-[#E0C050] to-accent text-black font-body text-xs sm:text-sm font-bold uppercase tracking-widest hover:brightness-110 hover:shadow-[0_0_25px_rgba(201,162,39,0.4)] transition-all duration-300 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M4 4c-1.1 0-2 .9-2 2v3c1.1 0 2 .9 2 2s-.9 2-2 2v3c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-3c-1.1 0-2-.9-2-2s.9-2 2-2V6c0-1.1-.9-2-2-2H4zm14 7v2h-2v-2h2zm-4 0v2h-2v-2h2zm-4 0v2H8v-2h2z"/>
            </svg>
            <span>Secure Your Seat</span>
          </button>
        </div>
        
      </motion.div>
    </div>
  );
};

export default LatestMatchCard;
