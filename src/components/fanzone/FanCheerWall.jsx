import { useState, useEffect } from 'react';

const STORAGE_CHEERS_KEY = 'ah_fan_cheers_list';

const DEFAULT_CHEERS = [
  { id: 1, name: 'Bikram Saikia', location: 'Guwahati', text: 'Aahoi Tigers! That Match 35 victory was pure passion! 🔥🏏', time: '10m ago', likes: 24 },
  { id: 2, name: 'Debajit Baruah', location: 'Dibrugarh', text: 'Captain Tushar Sobor 44*(25) is etched in ISCL history! Hornbill Roar forever! 🐯', time: '35m ago', likes: 41 },
  { id: 3, name: 'Priyanka Dutta', location: 'Silchar', text: 'Tipu Sultan bowling 2/1 in 1 over was unbelievable clutch bowling! Proud fan! ⚡', time: '1h ago', likes: 19 },
  { id: 4, name: 'Ankur Bora', location: 'Jorhat', text: 'Standing tall with Assam Hornbill Tigers in Season 2! Lets conquer the league! 🏆', time: '2h ago', likes: 33 }
];

const PRESET_TAGS = [
  'Aahoi Tigers! 🐯',
  'Hornbill Roar! 🔥',
  'Tushar Magic! ⚡',
  'Assam Jindabad! 🏏',
  'Clutch Tipu! 🎯'
];

const FanCheerWall = () => {
  const [cheers, setCheers] = useState(DEFAULT_CHEERS);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [likedMap, setLikedMap] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CHEERS_KEY);
      if (saved) {
        setCheers(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newCheer = {
      id: Date.now(),
      name: name.trim() || 'Anonymous Tiger',
      location: location.trim() || 'Assam',
      text: message.trim(),
      time: 'Just now',
      likes: 1
    };

    const updated = [newCheer, ...cheers];
    setCheers(updated);
    setMessage('');
    
    try {
      localStorage.setItem(STORAGE_CHEERS_KEY, JSON.stringify(updated.slice(0, 20)));
    } catch (e) {
      // ignore
    }
  };

  const handleLike = (id) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    setCheers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <div className="card-glass p-6 sm:p-8 border border-white/10 rounded-lg shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <span className="text-[10px] font-body uppercase tracking-[0.2em] text-accent font-semibold block">
            FAN CHATTER & ROARS
          </span>
          <h3 className="font-heading text-2xl text-white tracking-wider m-0">
            Live Tiger Cheer Wall
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-body text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Active Fan Community</span>
        </div>
      </div>

      {/* Cheer Input Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-black/40 p-4 sm:p-5 rounded-lg border border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="Your Name / Fan Handle"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            className="bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
          />
          <input
            type="text"
            placeholder="City / Region (e.g. Guwahati)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            maxLength={30}
            className="bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
          />
        </div>

        <textarea
          placeholder="Roar for Assam Hornbill Tigers! Post your match cheer..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          maxLength={180}
          className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent resize-none mb-3"
        />

        {/* Quick Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 mr-1">Quick:</span>
          {PRESET_TAGS.map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setMessage((prev) => (prev ? `${prev} ${tag}` : tag))}
              className="text-[11px] font-body bg-white/5 hover:bg-accent/20 hover:border-accent/40 border border-white/10 text-gray-300 hover:text-accent px-2.5 py-1 rounded transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!message.trim()}
            className="btn-gold py-2 px-6 text-xs uppercase tracking-wider font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
          >
            🐯 Post Roar
          </button>
        </div>
      </form>

      {/* Cheers Stream */}
      <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
        {cheers.map((cheer) => (
          <div
            key={cheer.id}
            className="bg-black/30 p-4 rounded-lg border border-white/5 hover:border-accent/20 transition-all flex flex-col justify-between gap-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 text-accent font-heading text-xs flex items-center justify-center font-bold">
                  {cheer.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-heading text-sm text-white tracking-wide">
                  {cheer.name}
                </span>
                <span className="text-[10px] font-body text-gray-500">
                  • {cheer.location}
                </span>
              </div>
              <span className="text-[10px] font-body text-gray-500">
                {cheer.time}
              </span>
            </div>

            <p className="font-body text-xs sm:text-sm text-gray-200 leading-relaxed m-0">
              {cheer.text}
            </p>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleLike(cheer.id)}
                className={`flex items-center gap-1.5 text-xs font-body transition-colors px-2 py-0.5 rounded ${
                  likedMap[cheer.id]
                    ? 'text-accent bg-accent/10 font-semibold'
                    : 'text-gray-400 hover:text-accent bg-white/5'
                }`}
              >
                <span>❤️</span>
                <span>{cheer.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FanCheerWall;
