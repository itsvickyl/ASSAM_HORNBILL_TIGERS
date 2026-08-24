const ProductCard = ({ product }) => {
  return (
    <div className="card-glass group relative overflow-hidden flex flex-col h-full border border-white/5">
      <div className="h-64 w-full bg-black/10 relative p-4 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
          loading="lazy"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <button className="btn-gold py-2 px-6 text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            Quick Add
          </button>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col justify-between bg-transparent border-t border-white/5">
        <div>
          <span className="text-gray-300 font-body text-xs uppercase tracking-widest block mb-2">
            {product.category}
          </span>
          <h3 className="font-heading text-2xl text-white leading-tight mb-4 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </div>
        <div className="font-body text-accent font-semibold text-lg">
          {product.price}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
