const CoachCard = ({ coach }) => {
  return (
    <div className="card-glass group overflow-hidden border border-white/5">
      <div className="h-52 sm:h-64 md:h-80 w-full overflow-hidden bg-black/20">
        <img 
          src={coach.image} 
          alt={coach.name} 
          className="w-full h-full object-cover object-top grayscale-hover opacity-80 group-hover:opacity-100 transition-all"
          loading="lazy"
        />
      </div>
      
      <div className="p-5 sm:p-6 md:p-8 relative">
        <span className="text-accent font-body text-xs md:text-sm font-semibold uppercase tracking-widest block mb-1 md:mb-2">
          {coach.title}
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white leading-none mb-4 md:mb-6">
          {coach.name}
        </h3>
        
        <blockquote className="font-body text-xs md:text-sm font-light italic text-gray-300 mb-4 md:mb-6 border-l-2 border-accent pl-3 md:pl-4">
          {coach.philosophy}
        </blockquote>
        
        <div className="border-t border-white/5 pt-4">
          <span className="text-gray-400 font-body text-[10px] uppercase tracking-widest block mb-1">Notable Experience</span>
          <p className="font-body text-sm text-gray-200">{coach.experience}</p>
        </div>
        
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent transition-all duration-300 group-hover:w-full"></div>
      </div>
    </div>
  );
};

export default CoachCard;
