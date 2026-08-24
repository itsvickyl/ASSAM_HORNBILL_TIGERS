const NewsBlock = ({ item }) => {
  return (
    <div className="card-maroon p-8 h-full min-h-[300px] flex flex-col justify-between group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-accent font-body text-xs font-semibold uppercase tracking-widest">{item.category}</span>
          <span className="text-gray-300 font-body text-xs tracking-wider">{item.date}</span>
        </div>
        <h3 className="font-heading text-3xl text-white group-hover:text-accent transition-colors leading-tight mb-4">
          {item.title}
        </h3>
        <p className="font-body text-sm font-light text-gray-300 line-clamp-3">
          {item.excerpt}
        </p>
      </div>
      
      <div className="flex justify-end mt-6">
        <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center text-white group-hover:border-accent group-hover:bg-accent group-hover:text-ink transition-all">
          →
        </div>
      </div>
    </div>
  );
};

export default NewsBlock;
