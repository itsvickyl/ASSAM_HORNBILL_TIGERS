import { useState } from 'react';

const ChantPlayer = ({ title, length }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="card-maroon p-4 sm:p-5 md:p-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-accent text-ink flex items-center justify-center hover:bg-white transition-colors"
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          ) : (
            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
          )}
        </button>
        <div>
          <h4 className="font-heading text-xl text-white tracking-wider m-0">{title}</h4>
          <span className="font-body text-xs text-gray-400">Stadium Audio • {length}</span>
        </div>
      </div>
      
      {/* Visualizer bars */}
      <div className="flex gap-1 items-end h-8">
        {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
          <div 
            key={bar} 
            className="w-1.5 bg-accent rounded-t-sm"
            style={{ 
              height: isPlaying ? `${Math.max(20, Math.random() * 100)}%` : '20%',
              transition: 'height 0.2s ease'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ChantPlayer;
