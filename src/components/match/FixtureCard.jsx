const FixtureCard = ({ fixture, onPlayVideo }) => {
  const getBadgeClass = (status) => {
    switch(status) {
      case 'LIVE': return 'badge-live';
      case 'UPCOMING': return 'badge-upcoming';
      case 'COMPLETED': return 'badge-completed';
      default: return 'badge-completed';
    }
  };

  const isPlayable = fixture.status === 'COMPLETED' && fixture.video;

  return (
    <div 
      onClick={() => isPlayable && onPlayVideo && onPlayVideo(fixture)}
      className={`card-glass p-5 sm:p-6 md:p-7 border-l-4 border-l-transparent hover:border-l-accent group transition-all duration-300 relative overflow-hidden ${isPlayable ? 'cursor-pointer' : ''}`}
    >
      <div className="flex justify-between items-start mb-3 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-heading text-accent text-base md:text-xl tracking-wider">{fixture.date}</span>
          {fixture.matchNo && (
            <span className="bg-white/10 text-gray-300 font-body text-[10px] uppercase font-bold px-2 py-0.5 rounded">
              {fixture.matchNo}
            </span>
          )}
        </div>
        <span className={getBadgeClass(fixture.status)}>{fixture.status}</span>
      </div>
      
      <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-white mb-2 flex items-center gap-2 md:gap-3">
        vs {fixture.opponent}
        {fixture.status === 'COMPLETED' && (
          <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-8 h-8 rounded-full bg-accent text-ink ml-auto">
            ▶
          </span>
        )}
      </h3>
      
      <p className="font-body text-xs sm:text-sm text-gray-300 mb-3 flex items-center gap-2">
        📍 {fixture.venue}
      </p>

      {fixture.image && (
        <div className="relative w-full h-36 sm:h-44 rounded-xl overflow-hidden mb-3 border border-white/10 group-hover:border-accent/30 transition-colors">
          <img 
            src={fixture.image} 
            alt={`${fixture.matchNo} - vs ${fixture.opponent}`} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-heading text-xs text-white uppercase tracking-wider">Live Broadcast Capture</span>
          </div>
        </div>
      )}

      {fixture.toss && (
        <p className="font-body text-[11px] text-gray-400 italic mb-3">
          🪙 {fixture.toss}
        </p>
      )}

      {fixture.score && (
        <div className="bg-black/30 rounded-xl p-4 mt-3 border border-white/10">
          <p className="font-body text-xs sm:text-sm font-semibold text-white text-center tracking-wide">
            {fixture.score}
          </p>
          {fixture.result && (
            <p className="font-body text-xs text-accent font-bold text-center mt-1.5 uppercase tracking-wider">
              {fixture.result}
            </p>
          )}
          {fixture.manOfTheMatch && (
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-body">
              <span className="text-gray-400 font-medium">🏅 Player of the Match:</span>
              <span className="text-accent font-bold">{fixture.manOfTheMatch}</span>
            </div>
          )}
        </div>
      )}

      {fixture.summary && (
        <p className="font-body text-xs text-gray-300 mt-3.5 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
          {fixture.summary}
        </p>
      )}
    </div>
  );
};

export default FixtureCard;
