import { Link, useOutletContext } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import LatestMatchCard from '../components/home/LatestMatchCard';
import SponsorReel from '../components/home/SponsorReel';
import { newsItems } from '../data/news';

const Home = () => {
  const { onOpenTickets } = useOutletContext() || {};
  const newsDispatches = newsItems.filter(item => item.type === 'news').slice(0, 3);

  return (
    <div className="bg-[#120000] min-h-screen text-white">
      {/* Hero & Top Bar Wrapper */}
      <div className="bg-gradient-to-b from-[#3D0000] via-[#5B0000] to-[#120000] relative pb-8 md:pb-16">
        <div className="relative">
          <HeroSection onOpenTickets={onOpenTickets} />
          <LatestMatchCard onOpenTickets={onOpenTickets} />
        </div>
        
        <div className="mt-8 md:mt-12">
          <SponsorReel />
        </div>
      </div>
      
      {/* News Preview Section */}
      <section className="py-12 md:py-20 container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
          <div className="flex items-center gap-4 md:gap-6 flex-1">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-display text-white uppercase tracking-editorial whitespace-nowrap">
              LATEST DISPATCHES
            </h2>
            <div className="h-px bg-accent flex-1 max-w-md hidden sm:block"></div>
          </div>
          <Link to="/den" className="text-accent font-heading text-base md:text-xl uppercase tracking-wider hover:text-white transition-colors flex items-center gap-2">
            View All Club News →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {newsDispatches.map((item) => (
            <Link key={item.id} to="/den" className="card-maroon p-6 md:p-8 flex flex-col justify-between min-h-[280px] md:min-h-[320px] group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/10 hover:border-accent">
              <div>
                <span className="text-accent font-body text-xs font-semibold uppercase tracking-widest mb-3 md:mb-4 block">{item.category}</span>
                <h3 className="font-heading text-2xl md:text-3xl text-white group-hover:text-accent transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-gray-300 mt-3 line-clamp-2">
                  {item.excerpt}
                </p>
              </div>
              <div className="flex justify-between items-end mt-6 md:mt-8 pt-4 border-t border-white/10">
                <span className="font-body text-xs text-gray-400">{item.date}</span>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-accent group-hover:bg-accent group-hover:text-ink transition-all shadow-lg">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Official ISCL Season 2 Registration Banner */}
      <section className="pb-16 md:pb-24 container mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3D0000] via-[#5B0000] to-[#250000] border border-accent/40 p-6 sm:p-8 md:p-10 shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent font-body text-xs font-bold uppercase tracking-[0.25em]">
                  Official League Announcement
                </span>
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-wider leading-tight">
                REGISTER FOR ISCL <span className="text-accent">SEASON 2</span>
              </h3>
              <p className="font-body text-xs sm:text-sm text-gray-300 mt-2 font-light leading-relaxed">
                Step up to the national stage. Register now for upcoming trials, player auctions, and franchise updates on the official Indian Softball Cricket League portal.
              </p>
            </div>
            <a
              href="https://isclcricket.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-ink font-heading text-base sm:text-lg md:text-xl uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold shadow-[0_0_25px_rgba(234,179,8,0.4)] hover:shadow-[0_0_35px_rgba(234,179,8,0.7)] hover:scale-105 active:scale-95 transition-all shrink-0 text-center"
            >
              <span>Visit isclcricket.in</span>
              <span className="text-base">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

