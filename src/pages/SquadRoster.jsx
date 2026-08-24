import { useState, useMemo, useCallback } from 'react';
import CircularGallery from '../components/shared/CircularGallery';
import PlayerCard from '../components/squad/PlayerCard';
import FilterBar from '../components/squad/FilterBar';
import PlayerModal from '../components/squad/PlayerModal';
import { players } from '../data/players';

const SquadRoster = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [hoveredPlayer, setHoveredPlayer] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState('grid'); // Default to grid for instant mobile friendliness & speed
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Filtered players list
  const filteredPlayers = useMemo(() => {
    if (activeFilter === 'ALL') return players;
    if (activeFilter === 'BATTERS') return players.filter(p => p.role === 'Batter');
    if (activeFilter === 'ALL-ROUNDERS') return players.filter(p => p.role === 'All-Rounder');
    if (activeFilter === 'BOWLERS') return players.filter(p => p.role === 'Bowler');
    if (activeFilter === 'WICKET KEEPERS') return players.filter(p => p.role === 'Wicket Keeper');
    return players;
  }, [activeFilter]);

  // Map players to CircularGallery items format
  const galleryItems = useMemo(() => {
    return players.map(player => ({
      image: player.image,
      text: `#${player.number} ${player.name}`
    }));
  }, []);

  const handleItemHover = useCallback((index, x, y) => {
    if (index >= 0 && index < players.length) {
      setHoveredPlayer(players[index]);
      setTooltipPos({ x, y });
    } else {
      setHoveredPlayer(null);
    }
  }, []);

  const handleItemClick = useCallback((index) => {
    if (index >= 0 && index < players.length) {
      setSelectedPlayer(players[index]);
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#3D0000] via-[#5B0000] to-[#120000] min-h-screen relative overflow-hidden text-white pb-24">
      {/* Page Header */}
      <div className="pt-24 md:pt-28 pb-4 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <span className="text-accent font-body text-xs uppercase tracking-[0.3em] font-semibold">Season 2026</span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-display text-white uppercase tracking-editorial mt-1">
                THE VANGUARD SQUAD
              </h1>
              <p className="font-body text-xs sm:text-sm text-gray-300 max-w-xl mt-2 font-light">
                Meet the warriors representing the Assam Hornbill Tigers. Click any player profile for complete statistics and bio.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-black/50 p-1.5 rounded-xl border border-white/15 self-start md:self-auto">
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-heading text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 ${
                  viewMode === 'grid' ? 'bg-accent text-black font-bold shadow-lg' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>Grid View</span>
              </button>
              <button 
                onClick={() => setViewMode('3d')}
                className={`px-4 py-2 rounded-lg font-heading text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 ${
                  viewMode === '3d' ? 'bg-accent text-black font-bold shadow-lg' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>3D Wheel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {viewMode === '3d' ? (
        /* Full-page CircularGallery */
        <div className="w-full relative" style={{ height: 'calc(100vh - 240px)', minHeight: '450px' }}>
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="#C9A227"
            borderRadius={0.05}
            scrollEase={0.03}
            font="bold 24px DM Serif Display"
            fontUrl="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap"
            onItemHover={handleItemHover}
            onItemClick={handleItemClick}
          />
        </div>
      ) : (
        /* Grid Roster View */
        <div className="container mx-auto px-4 sm:px-6 md:px-8 mt-8">
          <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-8">
            {filteredPlayers.map((player) => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                onClick={(p) => setSelectedPlayer(p)} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Hover Tooltip (3D Wheel mode) */}
      {viewMode === '3d' && hoveredPlayer && (
        <div 
          className="fixed z-40 pointer-events-none transition-opacity duration-200"
          style={{ 
            left: tooltipPos.x + 20, 
            top: tooltipPos.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="bg-black/90 backdrop-blur-md rounded-xl p-4 border border-accent/30 shadow-2xl min-w-[220px]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-accent font-heading text-2xl">#{hoveredPlayer.number}</span>
              <span className="text-white font-heading text-lg">{hoveredPlayer.name}</span>
            </div>
            <div className="flex gap-4 text-white/60 font-body text-xs uppercase tracking-wider">
              <span>{hoveredPlayer.role}</span>
              <span>•</span>
              <span>{hoveredPlayer.matches} matches</span>
            </div>
            <div className="flex gap-4 mt-2">
              <div>
                <span className="text-white font-heading text-xl">{hoveredPlayer.runs}</span>
                <span className="text-white/40 font-body text-[10px] uppercase ml-1">runs</span>
              </div>
              <div>
                <span className="text-white font-heading text-xl">{hoveredPlayer.wickets}</span>
                <span className="text-white/40 font-body text-[10px] uppercase ml-1">wkts</span>
              </div>
              <div>
                <span className="text-accent font-heading text-xl">{hoveredPlayer.strikeRate}</span>
                <span className="text-white/40 font-body text-[10px] uppercase ml-1">SR</span>
              </div>
            </div>
            <div className="mt-2 text-accent/60 font-body text-[10px] uppercase tracking-widest">
              Click for full profile →
            </div>
          </div>
        </div>
      )}

      {/* Full Player Modal */}
      <PlayerModal 
        player={selectedPlayer} 
        onClose={() => setSelectedPlayer(null)} 
      />
    </div>
  );
};

export default SquadRoster;

