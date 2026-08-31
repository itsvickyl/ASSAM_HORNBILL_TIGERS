const PlayerCard = ({ player, onClick }) => {
  return (
    <div 
      onClick={() => onClick(player)}
      className="card cursor-pointer group relative overflow-hidden"
    >
      <div className="h-72 w-full overflow-hidden bg-gradient-to-b from-primary/5 to-primary/20 relative">
        <img 
          src={player.image} 
          alt={player.name} 
          className="w-full h-full object-cover object-top grayscale-hover"
          loading="lazy"
        />
      </div>
      
      {player.isCaptain && (
        <div className="absolute top-4 left-4 bg-accent text-black font-heading text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-md shadow-lg border border-white/20 z-10">
          ★ CAPTAIN
        </div>
      )}

      {player.isViceCaptain && (
        <div className="absolute top-4 left-4 bg-[#1a0000] text-accent font-heading text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-md shadow-lg border border-accent/40 z-10">
          ★ VICE CAPTAIN
        </div>
      )}
      
      <div className="absolute top-4 right-4 bg-primary text-accent font-heading text-2xl w-12 h-12 flex items-center justify-center rounded-full shadow-lg border border-accent/20">
        {player.number}
      </div>

      <div className="p-6 relative">
        <span className="text-primary font-body text-xs font-semibold uppercase tracking-widest block mb-1">
          {player.role}
        </span>
        <h3 className="font-heading text-3xl text-ink leading-none group-hover:text-primary transition-colors">
          {player.name}
        </h3>
        
        {/* Subtle accent line on hover */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent transition-all duration-300 group-hover:w-full"></div>
      </div>
    </div>
  );
};

export default PlayerCard;
