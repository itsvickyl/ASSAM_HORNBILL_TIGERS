const PlayerPanel = ({ player, onClose }) => {
  if (!player) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      ></div>
      
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] max-w-full bg-primary z-50 animate-slide-in-right shadow-elevated flex flex-col tiger-stripe overflow-y-auto">
        <div className="p-5 sm:p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-primary-dark">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white tracking-wider">Player Profile</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center text-gray-300 hover:text-accent hover:border-accent transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-5 sm:p-6 md:p-8">
          <div className="flex items-end gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-accent shrink-0 bg-primary-dark">
              <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <span className="text-accent font-heading text-2xl md:text-3xl leading-none">#{player.number}</span>
              <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white leading-none mt-1">{player.name}</h3>
              <span className="text-gray-300 font-body text-xs uppercase tracking-widest block mt-2">{player.role}</span>
            </div>
          </div>

          <div className="mb-6 md:mb-10 text-gray-300 font-body text-xs md:text-sm font-light leading-relaxed">
            {player.bio}
          </div>

          <div className="space-y-6">
            <h4 className="font-heading text-2xl text-accent border-b border-white/10 pb-2">Technical</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest block mb-1">Batting Style</span>
                <span className="text-white font-body text-sm">{player.battingStyle}</span>
              </div>
              <div>
                <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest block mb-1">Bowling Style</span>
                <span className="text-white font-body text-sm">{player.bowlingStyle}</span>
              </div>
            </div>

            <h4 className="font-heading text-2xl text-accent border-b border-white/10 pb-2 pt-4">Career Stats</h4>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest block mb-1">Matches</span>
                <span className="text-white font-heading text-3xl md:text-4xl">{player.matches}</span>
              </div>
              <div>
                <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest block mb-1">Runs</span>
                <span className="text-white font-heading text-3xl md:text-4xl">{player.runs}</span>
              </div>
              <div>
                <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest block mb-1">Wickets</span>
                <span className="text-white font-heading text-3xl md:text-4xl">{player.wickets}</span>
              </div>
              <div>
                <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest block mb-1">Strike Rate</span>
                <span className="text-white font-heading text-3xl md:text-4xl">{player.strikeRate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerPanel;
