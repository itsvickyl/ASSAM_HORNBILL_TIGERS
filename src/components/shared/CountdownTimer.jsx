import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate, dark = true }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  if (Object.keys(timeLeft).length === 0) {
    return (
      <div className="flex items-center gap-2 py-2 px-4 rounded-xl bg-accent/10 border border-accent/30">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
        <span className="font-heading text-xl md:text-2xl text-accent tracking-widest uppercase">MATCH IN PROGRESS</span>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: formatNumber(timeLeft.days), isSec: false },
    { label: 'Hrs', value: formatNumber(timeLeft.hours), isSec: false },
    { label: 'Min', value: formatNumber(timeLeft.minutes), isSec: false },
    { label: 'Sec', value: formatNumber(timeLeft.seconds), isSec: true },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-2.5 w-full">
      {timeUnits.map((unit, idx) => (
        <div key={unit.label} className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex flex-col items-center justify-center bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 min-w-[58px] sm:min-w-[68px] shadow-inner group-hover:border-accent/30 transition-colors">
            <span className={`font-heading text-2xl sm:text-3xl md:text-4xl tracking-wider tabular-nums leading-none ${unit.isSec ? 'text-accent' : 'text-white'}`}>
              {unit.value}
            </span>
            <span className={`font-body text-[8px] sm:text-[9px] uppercase font-semibold tracking-widest mt-1 ${unit.isSec ? 'text-accent/80' : 'text-white/50'}`}>
              {unit.label}
            </span>
          </div>
          {idx < timeUnits.length - 1 && (
            <span className="font-heading text-xl sm:text-2xl text-accent/40 select-none -mt-3">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
