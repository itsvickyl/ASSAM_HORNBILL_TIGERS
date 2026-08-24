import MagicBento from '../components/shared/MagicBento';

const TheDen = () => {
  return (
    <div className="bg-[#120000] min-h-screen pb-24 text-white">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-[#220000] to-[#120000] pt-20 md:pt-24 pb-8 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-accent font-body text-xs uppercase tracking-[0.3em] font-semibold">Club Updates</span>
              <h1 className="font-heading text-4xl md:text-display text-white uppercase tracking-editorial mt-2">
                INSIDE THE DEN
              </h1>
            </div>
            <p className="font-body text-sm text-white/50 max-w-sm">
              Your VIP access to exclusive club updates, stadium insights, and match coverage.
            </p>
          </div>
          <div className="gold-divider-thick mt-6"></div>
        </div>
      </div>

      {/* Bento Grid Section */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 mt-12 md:mt-16">
        <MagicBento 
          textAutoHide={false} // Make it readable out of the box
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={350}
          particleCount={16}
          glowColor="201, 162, 39" // Team Gold Glow
        />
      </div>
    </div>
  );
};

export default TheDen;
