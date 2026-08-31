import { useEffect, useState, useRef } from 'react';

const CountUp = ({ end, duration = 1200, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || typeof end !== 'number') return;
    
    let startTime = null;
    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  }, [end, duration, isVisible]);

  if (typeof end !== 'number') {
    return <span ref={countRef}>{prefix}{end}{suffix}</span>;
  }

  return (
    <span ref={countRef}>
      {prefix}{count}{suffix}
    </span>
  );
};

const StatCounters = () => {
  const stats = [
    { 
      label: "SEASON 1 RUNS", 
      value: 188, 
      sublabel: "Across 3 ISCL Matches",
      highlight: "74 vs Delhi, 73 vs Jharkhand, 41 vs Punjab"
    },
    { 
      label: "WICKETS TAKEN", 
      value: 17, 
      sublabel: "Tigers Bowling Attack",
      highlight: "6 vs Delhi, 6 vs Jharkhand, 5 vs Punjab"
    },
    { 
      label: "HIGHEST SCORE", 
      value: 44, 
      suffix: "*", 
      sublabel: "Tushar Sobor (25b)",
      highlight: "Man of the Match vs Delhi (3x4, 2x6)"
    },
    { 
      label: "BEST BOWLING", 
      value: "2/1", 
      sublabel: "Tipu Sultan (1 ov)",
      highlight: "Sensational economy (vs Delhi)"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="card-glass p-4 sm:p-5 flex flex-col items-center justify-center text-center border border-white/10 hover:border-accent/40 transition-all duration-300 rounded-xl group relative overflow-hidden"
          >
            {/* Subtle glow on hover */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/15 transition-all"></div>
            
            <span className="font-heading text-3xl sm:text-4xl md:text-5xl text-accent mb-1 tracking-wider">
              <CountUp end={stat.value} suffix={stat.suffix || ''} prefix={stat.prefix || ''} />
            </span>
            
            <span className="font-body text-[10px] md:text-xs font-bold text-white uppercase tracking-wider mb-0.5">
              {stat.label}
            </span>

            {stat.sublabel && (
              <span className="font-body text-[9px] md:text-[10px] text-accent/80 font-medium">
                {stat.sublabel}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Season Summary Highlight Banner */}
      <div className="bg-black/50 border border-white/10 rounded-xl p-3.5 flex items-center justify-between text-xs font-body text-gray-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span className="font-heading text-white tracking-wider text-sm uppercase">Season 1 Campaign</span>
        </div>
        <span className="text-accent font-semibold text-[11px] uppercase tracking-wider">
          3 Matches • 1 Maiden ISCL Win
        </span>
      </div>
    </div>
  );
};

export default StatCounters;
