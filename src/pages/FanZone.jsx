import PollCard from '../components/fanzone/PollCard';
import DownloadCard from '../components/fanzone/DownloadCard';
import ChantPlayer from '../components/fanzone/ChantPlayer';
import FanCheerWall from '../components/fanzone/FanCheerWall';

const FanZone = () => {
  return (
    <div className="bg-gradient-to-b from-[#2a0000] via-[#3D0000] to-[#1a0000] min-h-screen pb-24 text-white">
      {/* Page Header Hero */}
      <section className="relative pt-24 md:pt-32 pb-8 md:pb-12 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-xs uppercase tracking-[0.3em] text-accent font-semibold">
              OFFICIAL SUPPORTER CLUB
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wider mb-4">
            TIGER <span className="text-accent">NATION</span>
          </h1>
          <p className="font-body text-sm sm:text-base text-gray-300 max-w-2xl font-light">
            Welcome to the home of Assam Hornbill Tigers fans. Vote in match polls, stream stadium chants, download exclusive 4K wallpapers, and roar on the live cheer wall.
          </p>
          <div className="gold-divider-thick mt-6"></div>
        </div>
      </section>

      {/* Main Fan Content Grid */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 mt-10 md:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          
          {/* Left Column - Interactive Fan Actions */}
          <div className="lg:col-span-1 space-y-8 md:space-y-10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-2xl text-white uppercase tracking-wider m-0">
                  Match Poll
                </h2>
              </div>
              <PollCard />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-2xl text-white uppercase tracking-wider m-0">
                  Stadium Sounds
                </h2>
                <span className="text-[10px] uppercase tracking-wider text-accent font-body">
                  AUDIO CLIPS
                </span>
              </div>
              <div className="space-y-3.5">
                <ChantPlayer title="The Hornbill Roar" length="0:45" />
                <ChantPlayer title="Assam Anthem (Crowd)" length="1:12" />
                <ChantPlayer title="Victory March" length="0:30" />
              </div>
            </div>
          </div>

          {/* Right Column - Wallpapers & Cheer Wall */}
          <div className="lg:col-span-2 space-y-10">
            {/* Wallpapers Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading text-2xl text-white uppercase tracking-wider m-0">
                    Digital Wallpapers
                  </h2>
                  <span className="text-xs font-body text-gray-400">
                    Free high-resolution match & stadium desktop backgrounds
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded font-body">
                  4 ASSETS
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                <DownloadCard 
                  title="Match 35 Live Chase in Action" 
                  type="Desktop Wallpaper"
                  image="/match35-broadcast-action.jpg"
                />
                <DownloadCard 
                  title="Captain Tushar Victory Knock" 
                  type="Desktop Wallpaper"
                  image="/tush-celebration.jpg"
                />
                <DownloadCard 
                  title="Kini Sports Arena Stadium Night" 
                  type="Desktop Wallpaper"
                  image="/kini-sports-arena.jpg"
                />
                <DownloadCard 
                  title="Match 35 Partnership in the Middle" 
                  type="Desktop Wallpaper"
                  image="/batting-partnership-match35.png"
                />
              </div>
            </div>

            {/* Live Cheer Wall */}
            <div>
              <FanCheerWall />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FanZone;
