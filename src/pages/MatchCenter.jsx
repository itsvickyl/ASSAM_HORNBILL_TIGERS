import { useState, useEffect, useRef } from 'react';
import FixtureCard from '../components/match/FixtureCard';
import LiveDashboard from '../components/match/LiveDashboard';
import StatCounters from '../components/match/StatCounters';
import PointsTable from '../components/match/PointsTable';
import { fixtures } from '../data/fixtures';

const MatchCenter = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [videoStartSeconds, setVideoStartSeconds] = useState(0);
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

  const handleOpenVideo = (fixture) => {
    setActiveVideo(fixture);
    setVideoStartSeconds(0);
  };

  const handleSeek = (seconds) => {
    setVideoStartSeconds(seconds || 0);
  };

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
                Standings Table
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {activeTab === 'standings' ? (
          <div className="py-6 max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-wider mb-6 flex items-center gap-3">
              <span>🏆</span> ISCL Official Standings
            </h2>
            <PointsTable />
          </div>
        ) : (
          <div className="space-y-12">
            {/* Live Dashboard Section */}
            <div>
              <LiveDashboard />
            </div>

            {/* Fixtures & Results List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h2 className="font-heading text-2xl sm:text-3xl text-white uppercase tracking-wider">
                    Season 1 Schedule & Results
                  </h2>
                  <span className="font-body text-xs text-accent font-medium">
                    {fixtures.length} Fixtures Recorded
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {fixtures.map((fixture) => (
                    <FixtureCard key={fixture.id} fixture={fixture} onPlayVideo={handleOpenVideo} />
                  ))}
                </div>
              </div>

              {/* Sidebar: Points Table Preview & Season Stats */}
              <div className="space-y-8">
                <PointsTable />
                
                <h2 className="font-heading text-3xl text-white uppercase tracking-wider mb-6">
                  Season Statistics
                </h2>
                <StatCounters />
              </div>
            </div>
            
          </div>
        )}
      </div>

      {/* Video & Match Highlights Modal with YouTube Embed */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          <div 
            ref={videoModalRef}
            className="relative bg-[#180202] w-full max-w-3xl rounded-2xl overflow-hidden border border-accent/40 shadow-2xl p-5 sm:p-7 my-6 text-white max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gold gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>

            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:text-accent hover:border-accent transition-all"
              aria-label="Close highlights modal"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2 pr-10">
              <span className="bg-accent text-black font-body text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                {activeVideo.matchNo || "ISCL Season 1"}
              </span>
              <span className="font-body text-xs text-accent uppercase tracking-widest">{activeVideo.tournament || "Indian Softball Cricket League"}</span>
            </div>

            <h3 id="video-modal-title" className="font-heading text-2xl sm:text-3xl text-white uppercase tracking-wider mb-1 pr-8">
              Hornbill Tigers vs {activeVideo.opponent}
            </h3>
            <p className="font-body text-xs text-gray-400 mb-4">
              📍 {activeVideo.venue} • {activeVideo.date}
            </p>

            {/* Embedded YouTube Player */}
            {(activeVideo.youtubeId || activeVideo.youtubeUrl) ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 border border-accent/30 bg-black shadow-xl">
                <iframe
                  key={videoStartSeconds}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId || 'P_RFlJYZpXs'}?start=${videoStartSeconds}&autoplay=1&rel=0`}
                  title={activeVideo.streamTitle || `ISCL Match ${activeVideo.matchNo}`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ) : null}

            {/* Score Banner */}
            <div className="bg-black/60 p-3.5 rounded-xl border border-white/10 mb-4 text-center">
              <div className="font-heading text-base sm:text-xl text-white tracking-wide mb-0.5">
                {activeVideo.score}
              </div>
              <div className="font-body text-xs text-accent font-bold uppercase tracking-wider">
                {activeVideo.result}
              </div>
            </div>

            {/* Man of the Match Spotlight */}
            {activeVideo.manOfTheMatch && (
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-3.5 mb-4 flex items-start gap-3">
                <span className="text-2xl sm:text-3xl">🏅</span>
                <div>
                  <span className="text-accent font-heading text-xs uppercase tracking-widest block font-bold">Player of the Match</span>
                  <span className="text-white font-heading text-base sm:text-lg">{activeVideo.manOfTheMatch}</span>
                  {activeVideo.summary && (
                    <p className="text-gray-300 font-body text-xs mt-1 leading-relaxed">
                      {activeVideo.summary}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Match Video Highlights Timeline / Click-to-Play Moments */}
            {activeVideo.timestamps && activeVideo.timestamps.length > 0 && (
              <div className="mb-4">
                <h4 className="font-heading text-sm text-accent uppercase tracking-widest mb-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">⏱️ Click Key Moment to Jump in Video:</span>
                  <span className="text-[10px] text-gray-400 font-body lowercase">interactive</span>
                </h4>
                <div className="space-y-2 text-xs font-body max-h-52 overflow-y-auto pr-1">
                  {activeVideo.timestamps.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSeek(item.seconds)}
                      className="w-full text-left bg-black/40 hover:bg-accent/15 p-2.5 rounded-lg border border-white/5 hover:border-accent/40 flex items-start gap-3 transition-all duration-200 group"
                    >
                      <span className="text-accent font-bold font-mono shrink-0 bg-black/60 px-1.5 py-0.5 rounded border border-accent/20 group-hover:bg-accent group-hover:text-black transition-colors">
                        ▶ {item.time}
                      </span>
                      <span className="text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
              {activeVideo.youtubeUrl && (
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs text-accent hover:text-white flex items-center gap-1 font-semibold transition-colors"
                >
                  <span>Watch on YouTube</span>
                  <span>↗</span>
                </a>
              )}
              <button 
                onClick={() => setActiveVideo(null)}
                className="btn-gold py-2 px-5 text-xs font-bold rounded-xl uppercase tracking-wider ml-auto"
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
