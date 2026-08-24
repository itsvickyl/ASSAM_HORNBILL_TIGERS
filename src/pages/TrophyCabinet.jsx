import { useState } from 'react';
import { trophies } from '../data/trophies';

const TrophyCabinet = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTrophy = () => {
    setActiveIndex((prev) => (prev + 1) % trophies.length);
  };

  const prevTrophy = () => {
    setActiveIndex((prev) => (prev === 0 ? trophies.length - 1 : prev - 1));
  };

  return (
    <div className="bg-ink min-h-screen md:h-[calc(100vh-80px)] flex flex-col relative overflow-hidden bg-gradient-to-b from-ink to-primary-dark">
      {/* Dynamic Background Glow based on active trophy */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-accent/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 flex-1 flex flex-col justify-center items-center relative z-10 pt-20 md:pt-12">
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevTrophy}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-ink transition-colors z-20"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button 
          onClick={nextTrophy}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-ink transition-colors z-20"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Carousel Content */}
        <div className="flex flex-col items-center max-w-4xl w-full">
          <div className="h-[350px] sm:h-[400px] md:h-[500px] w-full flex items-center justify-center mb-6 md:mb-12">
            {trophies.map((trophy, idx) => (
              <div 
                key={trophy.id}
                className={`absolute transition-all duration-1000 ease-in-out flex flex-col items-center ${
                  idx === activeIndex 
                    ? 'opacity-100 transform scale-100 translate-y-0 z-10' 
                    : 'opacity-0 transform scale-90 translate-y-12 z-0 pointer-events-none'
                }`}
              >
                <img 
                  src={trophy.image} 
                  alt={trophy.tournament} 
                  className="h-[180px] sm:h-[250px] md:h-[350px] object-contain drop-shadow-2xl mb-4 md:mb-8"
                  loading="lazy"
                  style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
                />
                
                <div className="text-center">
                  <span className="font-heading text-3xl sm:text-4xl md:text-6xl text-accent tracking-widest block mb-2 text-shadow-sm">
                    {trophy.year}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white tracking-wider mb-2 md:mb-4 uppercase">
                    {trophy.tournament}
                  </h2>
                  <p className="font-body text-gray-400 font-light max-w-lg mx-auto text-xs md:text-sm px-4">
                    {trophy.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Scrubber */}
      <div className="h-20 md:h-24 bg-black/40 border-t border-white/10 flex items-center justify-center relative z-20">
        <div className="container mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between overflow-x-auto">
          <div className="w-full h-px bg-white/20 relative">
            {trophies.map((trophy, idx) => (
              <button
                key={trophy.id}
                onClick={() => setActiveIndex(idx)}
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group"
                style={{ left: `${(idx / (trophies.length - 1 || 1)) * 100}%` }}
              >
                <div className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                  idx === activeIndex ? 'bg-accent border-accent' : 'bg-ink border-white/50 group-hover:border-accent'
                }`}></div>
                <span className={`mt-4 font-heading tracking-widest transition-colors duration-300 ${
                  idx === activeIndex ? 'text-accent text-xl' : 'text-gray-500 text-lg group-hover:text-white'
                }`}>
                  {trophy.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrophyCabinet;
