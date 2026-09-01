import { useState, useEffect, useRef } from 'react';

const ChantPlayer = ({ title, length, chantType = 'drum' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  // Parse length string (e.g. "0:45" -> 45s)
  const durationSec = (() => {
    const parts = length.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  })();

  // Synthesize rhythmic stadium drum/cheer cadence using Web Audio API
  const startAudioSynthesis = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      let step = 0;

      // Play a stadium cadence drum rhythm: DUM... DUM... DUM-DUM-DUM!
      const playDrumBeat = () => {
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Stadium bass drum tone
        const freq = step % 4 === 0 ? 110 : 85;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.18);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
        step++;
      };

      playDrumBeat();
      intervalRef.current = setInterval(playDrumBeat, 480);
    } catch (e) {
      // AudioContext fallback if blocked by browser policy
    }
  };

  const stopAudioSynthesis = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopAudioSynthesis();
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlaying(true);
      startAudioSynthesis();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            stopAudioSynthesis();
            return 0;
          }
          return prev + (100 / durationSec) * 0.2;
        });
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopAudioSynthesis();
    };
  }, [isPlaying, durationSec]);

  return (
    <div className="card-glass p-4 sm:p-5 border border-white/10 rounded-lg flex flex-col gap-3 hover:border-accent/30 transition-all duration-300 shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <button 
            onClick={togglePlay}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-lg ${
              isPlaying
                ? 'bg-accent text-black scale-105 shadow-[0_0_15px_rgba(201,162,39,0.7)]'
                : 'bg-white/10 text-white hover:bg-accent hover:text-black'
            }`}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <div className="min-w-0">
            <h4 className="font-heading text-base sm:text-lg text-white tracking-wider m-0 truncate">
              {title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-body text-[11px] text-gray-400">Stadium Atmosphere</span>
              <span className="text-white/20">•</span>
              <span className="font-body text-[11px] text-accent/80 font-medium">{length}</span>
            </div>
          </div>
        </div>
        
        {/* Dynamic Animated Equalizer Bars */}
        <div className="flex gap-1 items-end h-7 flex-shrink-0 px-2 py-1 bg-black/30 rounded border border-white/5">
          {[
            { h: 'h-2', anim: 'animate-[pulse_0.6s_ease-in-out_infinite]' },
            { h: 'h-4', anim: 'animate-[pulse_0.4s_ease-in-out_infinite_0.1s]' },
            { h: 'h-6', anim: 'animate-[pulse_0.8s_ease-in-out_infinite_0.2s]' },
            { h: 'h-3', anim: 'animate-[pulse_0.5s_ease-in-out_infinite_0.15s]' },
            { h: 'h-5', anim: 'animate-[pulse_0.7s_ease-in-out_infinite_0.05s]' }
          ].map((bar, i) => (
            <div 
              key={i} 
              className={`w-1 rounded-t-sm transition-all duration-200 ${
                isPlaying 
                  ? `bg-accent ${bar.anim}` 
                  : 'bg-white/20 h-1.5'
              }`}
              style={{
                height: isPlaying ? undefined : '5px'
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
        <div 
          className="bg-accent h-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ChantPlayer;
