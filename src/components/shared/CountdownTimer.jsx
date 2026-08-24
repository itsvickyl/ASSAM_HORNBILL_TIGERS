import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate, dark = false }) => {
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
    return <span className="font-heading text-2xl text-accent animate-pulse tracking-widest">MATCH LIVE</span>;
  }

  const numberClass = `font-heading text-2xl sm:text-3xl md:text-4xl ${dark ? 'text-white' : 'text-ink'}`;
  const labelClass = `font-body text-[8px] sm:text-[10px] uppercase font-semibold tracking-wider ${dark ? 'text-white/50' : 'text-gray-500'}`;
  const colonClass = `font-heading text-xl sm:text-2xl md:text-3xl mt-1 ${dark ? 'text-white/20' : 'text-gray-300'}`;

  return (
    <div className="flex gap-3 sm:gap-4 md:gap-5">
      <div className="flex flex-col items-center">
        <span className={numberClass}>{formatNumber(timeLeft.days)}</span>
        <span className={labelClass}>Days</span>
      </div>
      <span className={colonClass}>:</span>
      <div className="flex flex-col items-center">
        <span className={numberClass}>{formatNumber(timeLeft.hours)}</span>
        <span className={labelClass}>Hrs</span>
      </div>
      <span className={colonClass}>:</span>
      <div className="flex flex-col items-center">
        <span className={numberClass}>{formatNumber(timeLeft.minutes)}</span>
        <span className={labelClass}>Min</span>
      </div>
      <span className={colonClass}>:</span>
      <div className="flex flex-col items-center">
        <span className="font-heading text-2xl sm:text-3xl md:text-4xl text-accent">{formatNumber(timeLeft.seconds)}</span>
        <span className="font-body text-[8px] sm:text-[10px] uppercase text-accent font-semibold tracking-wider">Sec</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
