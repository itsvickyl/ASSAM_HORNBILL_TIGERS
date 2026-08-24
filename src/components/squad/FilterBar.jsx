const FilterBar = ({ activeFilter, setActiveFilter }) => {
  const filters = ['ALL', 'BATTERS', 'ALL-ROUNDERS', 'BOWLERS', 'WICKET KEEPERS'];

  return (
    <div className="flex gap-3 sm:gap-6 md:gap-8 border-b border-white/10 mb-8 md:mb-12 relative overflow-x-auto pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide" role="tablist" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {filters.map((filter) => (
        <button
          key={filter}
          role="tab"
          aria-selected={activeFilter === filter}
          onClick={() => setActiveFilter(filter)}
          className={`pb-3 md:pb-4 font-heading text-base md:text-lg tracking-wider transition-colors relative whitespace-nowrap ${
            activeFilter === filter ? 'text-accent' : 'text-gray-400 hover:text-white'
          }`}
        >
          {filter}
          {activeFilter === filter && (
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-accent"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
