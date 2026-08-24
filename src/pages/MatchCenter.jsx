import { useState, useEffect, useRef } from 'react';
import FixtureCard from '../components/match/FixtureCard';
import LiveDashboard from '../components/match/LiveDashboard';
import StatCounters from '../components/match/StatCounters';
import PointsTable from '../components/match/PointsTable';
import { fixtures } from '../data/fixtures';

const MatchCenter = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const videoModalRef = useRef(null);

  // Video modal: Escape key + focus trap + body scroll lock
  useEffect(() => {
    if (!activeVideo) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') setActiveVideo(null);
      if (e.key === 'Tab' && videoModalRef.current) {
        const focusable = videoModalRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    videoModalRef.current?.querySelector('button')?.focus();
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [activeVideo]);

  return (
    <div className="bg-gradient-to-b from-[#3D0000] via-[#5B0000] to-[#120000] min-h-screen pb-24 text-white">
      {/* Page Header */}
      <div className="bg-transparent pt-24 md:pt-28 pb-6 md:pb-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-accent font-body text-xs uppercase tracking-[0.3em] font-semibold">Match Hub</span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-display text-white uppercase tracking-editorial mt-1">
                MATCH CENTER & STANDINGS
              </h1>
            </div>
            {/* Filter Tabs */}
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 self-start md:self-auto" role="tablist">
              <button 
                role="tab"
                aria-selected={activeTab === 'all'}
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-heading text-sm uppercase tracking-wider transition-colors ${
                  activeTab === 'all' ? 'bg-accent text-black font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                All & Live
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'standings'}
                onClick={() => setActiveTab('standings')}
                className={`px-4 py-2 rounded-lg font-heading text-sm uppercase tracking-wider transition-colors ${
                  activeTab === 'standings' ? 'bg-accent text-black font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                Points Table
              </button>
            </div>
          </div>
          <div className="gold-divider-thick mt-6"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 mt-8 md:mt-12">
        
        {/* Points Table Section — only visible on standings tab */}
        {activeTab === 'standings' && <PointsTable />}

        {/* Fixtures & Live — only visible on all tab */}
        {activeTab === 'all' && (
          <div className="flex flex-col lg:flex-row gap-8 md:gap-16 mt-0">
            
            {/* Left Column - Fixtures (60%) */}
            <div className="lg:w-7/12">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-wider mb-6 md:mb-8 flex items-center gap-4">
                Season Fixtures & Results
                <span className="flex-1 h-px bg-white/10"></span>
              </h2>
              
              <div className="flex flex-col gap-6">
                {fixtures.map(fixture => (
                  <FixtureCard key={fixture.id} fixture={fixture} onPlayVideo={(videoFixture) => setActiveVideo(videoFixture)} />
                ))}
              </div>
            </div>

            {/* Right Column - Live Dashboard & Stats (40%) */}
            <div className="lg:w-5/12">
              <div className="sticky top-[120px]">
                <LiveDashboard />
                
                <h2 className="font-heading text-3xl text-white uppercase tracking-wider mb-6">
                  Season Statistics
                </h2>
                <StatCounters />
              </div>
            </div>
            
          </div>
        )}
      </div>

      {/* Video & Match Highlights Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          <div 
            ref={videoModalRef}
            className="relative bg-[#1c0202] w-full max-w-2xl rounded-2xl overflow-hidden border border-accent/40 shadow-2xl p-6 sm:p-8 my-8 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gold line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>

            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:text-accent hover:border-accent transition-all"
              aria-label="Close highlights modal"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-accent text-black font-body text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                {activeVideo.matchNo || "ISCL Season 1"}
              </span>
              <span className="font-body text-xs text-accent uppercase tracking-widest">{activeVideo.tournament || "Indian Softball Cricket League"}</span>
            </div>

            <h3 id="video-modal-title" className="font-heading text-2xl sm:text-3xl text-white uppercase tracking-wider mb-1">
              Hornbill Tigers vs {activeVideo.opponent}
            </h3>
            <p className="font-body text-xs text-gray-400 mb-5">
              📍 {activeVideo.venue} • {activeVideo.date}
            </p>

            {/* Score Banner */}
            <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-5 text-center">
              <div className="font-heading text-lg sm:text-xl text-white tracking-wide mb-1">
                {activeVideo.score}
              </div>
              <div className="font-body text-xs text-accent font-bold uppercase tracking-wider">
                {activeVideo.result}
              </div>
            </div>

            {/* Man of the Match Spotlight */}
            {activeVideo.manOfTheMatch && (
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-5 flex items-center gap-3">
                <span className="text-3xl">🏅</span>
                <div>
                  <span className="text-accent font-heading text-xs uppercase tracking-widest block font-bold">Player of the Match</span>
                  <span className="text-white font-heading text-lg sm:text-xl">{activeVideo.manOfTheMatch}</span>
                  {activeVideo.summary && (
                    <p className="text-gray-300 font-body text-xs mt-1 leading-relaxed">
                      {activeVideo.summary}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Match Video Highlights Timeline */}
            {activeVideo.timestamps && activeVideo.timestamps.length > 0 && (
              <div>
                <h4 className="font-heading text-sm text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>⏱️</span> Match Video Timestamps & Key Moments
                </h4>
                <div className="space-y-2.5 text-xs font-body max-h-56 overflow-y-auto pr-1">
                  {activeVideo.timestamps.map((item, idx) => (
                    <div key={idx} className="bg-black/30 p-2.5 rounded-lg border border-white/5 flex items-start gap-3">
                      <span className="text-accent font-bold font-mono shrink-0">{item.time}</span>
                      <span className="text-gray-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setActiveVideo(null)}
                className="btn-gold py-2 px-6 text-xs font-bold rounded-xl uppercase tracking-wider"
              >
                Close Highlights
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchCenter;

