import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ah_fanzone_motm_vote';

const INITIAL_OPTIONS = [
  { id: 'tushar', name: "Tushar Sobor (Captain)", role: "44*(25) • Match-Winning Chase", percent: 62, votes: 8940 },
  { id: 'tipu', name: "Tipu Sultan (Vice-Captain)", role: "2/1 (1 ov) • Sensational Spell", percent: 22, votes: 3170 },
  { id: 'kamal', name: "Kamal Gogoi", role: "2/22 (2 ov) • Key Breakthroughs", percent: 11, votes: 1585 },
  { id: 'anand', name: "Anand Chetry", role: "1/13 (2 ov) • Powerplay Lock", percent: 5, votes: 720 }
];

const PollCard = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [options, setOptions] = useState(INITIAL_OPTIONS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSelectedId(saved);
        setHasVoted(true);
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  const handleVote = (id) => {
    if (hasVoted) return;

    setSelectedId(id);
    setHasVoted(true);

    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (e) {
      // ignore
    }

    setOptions((prev) => {
      const updated = prev.map((opt) =>
        opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
      );
      const total = updated.reduce((sum, opt) => sum + opt.votes, 0);
      return updated.map((opt) => ({
        ...opt,
        percent: Math.round((opt.votes / total) * 100)
      }));
    });
  };

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="card-glass p-6 sm:p-8 border border-white/10 rounded-lg shadow-xl relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-ink font-heading text-lg font-bold shadow-[0_0_12px_rgba(201,162,39,0.5)]">
            ★
          </div>
          <div>
            <span className="text-[10px] font-body uppercase tracking-[0.2em] text-accent font-semibold block">
              OFFICIAL FAN POLL
            </span>
            <h3 className="font-heading text-xl sm:text-2xl text-white tracking-wider m-0">
              Player of the Match
            </h3>
          </div>
        </div>
        <span className="text-[10px] font-body uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
          LIVE
        </span>
      </div>

      <p className="font-body text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
        Who was your standout performer in Assam's historic <span className="text-white font-semibold">Match 35 triumph</span> against Delhi Dare Strikers?
      </p>

      {/* Options List */}
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          return (
            <div
              key={option.id}
              onClick={() => handleVote(option.id)}
              className={`relative rounded-lg overflow-hidden border transition-all duration-300 ${
                hasVoted
                  ? isSelected
                    ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(201,162,39,0.2)]'
                    : 'border-white/5 bg-black/20'
                  : 'border-white/10 hover:border-accent/60 bg-black/30 hover:bg-white/[0.03] cursor-pointer active:scale-[0.99]'
              }`}
            >
              {/* Animated fill bar when voted */}
              {hasVoted && (
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-1000 ${
                    isSelected
                      ? 'bg-gradient-to-r from-accent/30 to-accent/15'
                      : 'bg-white/[0.04]'
                  }`}
                  style={{ width: `${option.percent}%` }}
                />
              )}

              <div className="relative p-3.5 sm:p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-accent bg-accent text-black' : 'border-white/30'
                  }`}>
                    {isSelected && (
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className={`font-heading text-sm sm:text-base tracking-wide truncate ${
                      isSelected ? 'text-accent font-semibold' : 'text-white'
                    }`}>
                      {option.name}
                    </div>
                    <div className="font-body text-[11px] text-gray-400 truncate">
                      {option.role}
                    </div>
                  </div>
                </div>

                {hasVoted && (
                  <div className="text-right flex-shrink-0">
                    <span className={`font-heading text-base sm:text-lg tracking-wider ${
                      isSelected ? 'text-accent font-bold' : 'text-gray-300'
                    }`}>
                      {option.percent}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/10 text-[11px] font-body text-gray-400">
        <span>{totalVotes.toLocaleString()} fan votes</span>
        {hasVoted ? (
          <span className="text-accent flex items-center gap-1 font-medium">
            ✓ Your vote is locked in
          </span>
        ) : (
          <span className="text-gray-400">Click any player to vote</span>
        )}
      </div>
    </div>
  );
};

export default PollCard;
