const GalleryItem = ({ item }) => {
  return (
    <div className={`img-zoom card shadow-md ${item.aspectRatio} relative`}>
      <img src={item.image} alt="Gallery" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default GalleryItem;
