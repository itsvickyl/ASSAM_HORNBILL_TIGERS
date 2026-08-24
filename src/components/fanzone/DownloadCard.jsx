const DownloadCard = ({ title, type, image }) => {
  return (
    <div className="card-glass group overflow-hidden border border-white/5">
      <div className="h-48 w-full overflow-hidden bg-black/20 relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <button className="btn-gold py-2 px-6 text-sm flex items-center gap-2">
            ↓ Download
          </button>
        </div>
      </div>
      
      <div className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-white/5">
        <h4 className="font-heading text-lg md:text-xl text-white tracking-wider m-0">{title}</h4>
        <span className="text-[10px] md:text-xs font-body uppercase tracking-widest text-accent bg-white/10 px-2 py-1 rounded-sm whitespace-nowrap">
          {type}
        </span>
      </div>
    </div>
  );
};

export default DownloadCard;
