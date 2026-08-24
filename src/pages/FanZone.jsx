import PollCard from '../components/fanzone/PollCard';
import DownloadCard from '../components/fanzone/DownloadCard';
import ChantPlayer from '../components/fanzone/ChantPlayer';

const FanZone = () => {
  return (
    <div className="bg-gradient-to-b from-[#3D0000] via-[#5B0000] to-[#120000] min-h-screen pb-24 text-white">
      {/* Page Header */}
      <div className="bg-transparent pt-24 md:pt-28 pb-6 md:pb-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-display text-white uppercase tracking-editorial mb-4">
            TIGER NATION
          </h1>
          <div className="gold-divider-thick"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 mt-8 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* Left Column - Interaction */}
          <div className="lg:col-span-1 space-y-8 md:space-y-12">
            <div>
              <h2 className="font-heading text-3xl text-white uppercase tracking-wider mb-6">Fan Polls</h2>
              <PollCard />
            </div>
            
            <div>
              <h2 className="font-heading text-3xl text-white uppercase tracking-wider mb-6">Stadium Sounds</h2>
              <div className="space-y-4">
                <ChantPlayer title="The Hornbill Roar" length="0:45" />
                <ChantPlayer title="Assam Anthem (Crowd)" length="1:12" />
                <ChantPlayer title="Victory March" length="0:30" />
              </div>
            </div>
          </div>

          {/* Right Column - Downloads */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-3xl text-white uppercase tracking-wider mb-6">Digital Downloads</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <DownloadCard 
                title="Match 35 Live Chase in Action" 
                type="Desktop Wallpaper"
                image="/match35-broadcast-action.jpg"
              />
              <DownloadCard 
                title="Captain Tush Sobour Victory Knock" 
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

        </div>
      </div>
    </div>
  );
};

export default FanZone;

