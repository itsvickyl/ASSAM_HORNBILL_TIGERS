import CountdownTimer from '../shared/CountdownTimer';
import { fixtures } from '../../data/fixtures';

const LatestMatchCard = ({ onOpenTickets }) => {
  const upcomingFixture = fixtures.find(f => f.status === 'UPCOMING') || fixtures[3];

  const getOpponentAbbr = (name) => {
    return name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
  };

  const getNextNovember25 = () => {
    const now = new Date();
    let target = new Date(now.getFullYear(), 10, 25, 19, 30, 0); // Month is 0-indexed: 10 = November
    if (now > target) {
      target = new Date(now.getFullYear() + 1, 10, 25, 19, 30, 0);
    }
    return target;
  };

  const targetDate = getNextNovember25();

  return (
    <div className="relative lg:absolute lg:bottom-12 lg:right-12 z-30 px-4 md:px-0 mt-6 lg:mt-0 max-w-md mx-auto">
      <div className="bg-black/70 backdrop-blur-xl p-6 sm:p-8 w-full lg:w-[420px] rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
        
        {/* Subtle accent glow top border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-70"></div>
        
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-white/10 pb-3 md:pb-4">
          <span className="font-body text-xs text-white/60 uppercase tracking-[0.2em] font-semibold">Next Fixture</span>
          <span className="font-body text-[10px] text-black uppercase tracking-widest bg-accent px-2 py-1 rounded-sm font-bold">ISCL Season 1</span>
        </div>
        
        {/* Teams Area */}
        <div className="flex items-center justify-between mb-6 md:mb-8 px-2 md:px-4">
          <div className="flex flex-col items-center gap-2 md:gap-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center text-white font-heading text-xl sm:text-2xl shadow-lg border-2 border-accent/40">AH</div>
            <span className="font-heading text-base sm:text-xl text-white tracking-wide">AH Tigers</span>
          </div>
          
          <div className="font-heading text-2xl sm:text-3xl text-accent/60 mx-2 md:mx-4 font-bold">VS</div>
          
          <div className="flex flex-col items-center gap-2 md:gap-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-950 rounded-full flex items-center justify-center text-white font-heading text-xl sm:text-2xl shadow-lg border-2 border-white/10">
              {getOpponentAbbr(upcomingFixture.opponent)}
            </div>
            <span className="font-heading text-base sm:text-xl text-white tracking-wide text-center">
              {upcomingFixture.opponent}
            </span>
          </div>
        </div>
        
        {/* Countdown */}
        <div className="mb-6 flex justify-center bg-black/40 py-3 rounded-xl border border-white/5">
          <CountdownTimer targetDate={targetDate} dark={true} />
        </div>
        
        {/* Bottom Details & CTA */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <p className="font-body text-xs sm:text-sm text-white/90 font-medium">{upcomingFixture.venue}</p>
            <p className="font-body text-[10px] sm:text-xs text-white/50 mt-1 uppercase tracking-wider">November 25th • 19:30 IST</p>
          </div>
          <button 
            onClick={onOpenTickets}
            className="w-full py-3 border border-accent text-accent font-body text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-black transition-all duration-300 rounded-xl shadow-lg active:scale-95"
          >
            Secure Your Seat
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default LatestMatchCard;
