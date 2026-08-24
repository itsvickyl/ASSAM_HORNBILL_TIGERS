import { useEffect, useRef } from 'react';

const PlayerModal = ({ player, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!player) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    setTimeout(() => modalRef.current?.querySelector('button')?.focus(), 50);
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [player, onClose]);

  if (!player) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="player-modal-name"
      >
        <div 
          ref={modalRef}
          className="bg-primary rounded-2xl shadow-2xl w-full max-w-[800px] max-h-[90vh] overflow-y-auto pointer-events-auto relative animate-fade-in-up border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:text-accent hover:border-accent transition-all"
            aria-label="Close player profile"
          >
            ✕
          </button>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row">
            {/* Player Image */}
            <div className="w-full md:w-[300px] h-[300px] md:h-auto relative overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none shrink-0 bg-gradient-to-b from-primary-dark to-primary">
              <img 
                src={player.image} 
                alt={player.name} 
                className="w-full h-full object-cover object-top relative z-10"
                loading="lazy"
              />
              
              {/* Number overlay */}
              <div className="absolute bottom-4 left-4 md:bottom-auto md:top-4 md:left-4 z-20">
                <span className="font-heading text-7xl text-accent/30 leading-none">#{player.number}</span>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 p-6 md:p-8">
              {/* Header */}
              <div className="mb-6">
                <span className="text-accent font-body text-xs uppercase tracking-[0.3em] font-semibold">{player.role}</span>
                <h2 id="player-modal-name" className="font-heading text-4xl md:text-5xl text-white mt-1 leading-tight">{player.name}</h2>
              </div>

              {/* Bio */}
              <p className="font-body text-sm text-gray-300 font-light leading-relaxed mb-6 border-l-2 border-accent/40 pl-4">
                {player.bio}
              </p>

              {/* Honors & Accolades */}
              {player.honors && (
                <div className="mb-6 bg-accent/10 border border-accent/30 rounded-xl p-3.5 flex items-center gap-3">
                  <span className="text-2xl">🏅</span>
                  <div>
                    <span className="text-accent font-heading text-xs uppercase tracking-widest block font-bold">Featured Honor</span>
                    <span className="text-white font-body text-xs sm:text-sm font-medium">{player.honors}</span>
                  </div>
                </div>
              )}

              {/* Technical */}
              <div className="mb-6">
                <h4 className="font-heading text-lg text-accent uppercase tracking-wider mb-3">Technical</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/20 rounded-lg p-3">
                    <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest block mb-1">Batting</span>
                    <span className="text-white font-body text-sm">{player.battingStyle}</span>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest block mb-1">Bowling</span>
                    <span className="text-white font-body text-sm">{player.bowlingStyle || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div>
                <h4 className="font-heading text-lg text-accent uppercase tracking-wider mb-3">Career Stats</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-black/20 rounded-lg p-3 text-center">
                    <span className="text-white font-heading text-3xl block">{player.matches}</span>
                    <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest">Matches</span>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3 text-center">
                    <span className="text-white font-heading text-3xl block">{player.runs}</span>
                    <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest">Runs</span>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3 text-center">
                    <span className="text-white font-heading text-3xl block">{player.wickets}</span>
                    <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest">Wickets</span>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3 text-center">
                    <span className="text-accent font-heading text-3xl block">{player.strikeRate}</span>
                    <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest">Strike Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerModal;
