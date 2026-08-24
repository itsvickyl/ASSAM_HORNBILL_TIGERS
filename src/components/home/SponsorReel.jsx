import { partnerCategories } from '../../data/sponsors';

const SponsorReel = () => {
  return (
    <div id="sponsors" className="w-full py-6 md:py-8 bg-gradient-to-b from-transparent via-black/60 to-transparent backdrop-blur-sm relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
      {/* Subtle glowing gradient divider borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

      <div className="flex gap-10 md:gap-16 items-center animate-marquee hover:[animation-play-state:paused] whitespace-nowrap px-4 md:px-8">
        {/* Quadruple array for seamless infinite marquee loop */}
        {[...partnerCategories, ...partnerCategories, ...partnerCategories, ...partnerCategories].map((partner, index) => (
          <a 
            key={index} 
            href={partner.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-shrink-0 opacity-95 hover:opacity-100 transition-all duration-300 cursor-pointer group flex items-center gap-4 hover:scale-105 active:scale-95"
            title={`Visit ${partner.name} (${partner.category})`}
          >
            {/* Real Sponsor Logo Badge Container */}
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl p-2 shadow-md border flex items-center justify-center group-hover:scale-105 group-hover:border-accent transition-all duration-300 ${partner.bgClass || 'bg-white'}`}>
              <img 
                src={partner.logo} 
                alt={`${partner.name} Logo`} 
                className="w-full h-full object-contain" 
                loading="lazy"
              />
            </div>
            
            <div className="flex flex-col justify-center text-left">
              <span className="font-heading text-xs sm:text-sm md:text-base tracking-wider text-white group-hover:text-accent transition-colors leading-tight whitespace-pre-line">
                {partner.category}
              </span>
              <span className="font-body text-xs md:text-sm text-accent font-bold tracking-wide mt-0.5 flex items-center gap-1">
                <span>{partner.name}</span>
                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SponsorReel;


