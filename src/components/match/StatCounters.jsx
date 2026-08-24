import { useEffect, useState, useRef } from 'react';

const CountUp = ({ end, duration = 1500, suffix = '' }) => {
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
    if (!isVisible) return;
    
    let startTime = null;
    const startValue = 0;
    
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

  return (
    <span ref={countRef}>
      {count}{suffix}
    </span>
  );
};

const StatCounters = () => {
  const stats = [
    { label: "ALL-TIME RUNS", value: 4520 },
    { label: "WICKETS TAKEN", value: 142 },
    { label: "STRIKE RATE", value: 145, suffix: ".6" },
    { label: "ECONOMY", value: 7, suffix: ".2" }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="card-glass p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center border border-white/5 hover:border-white/20 transition-all duration-300">
          <span className="font-heading text-3xl sm:text-4xl md:text-5xl text-accent mb-1 md:mb-2 tracking-wider">
            <CountUp end={stat.value} suffix={stat.suffix} />
          </span>
          <span className="font-body text-[10px] md:text-xs font-semibold text-gray-300 uppercase tracking-widest">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatCounters;
