import React from 'react';
import { Sparkles } from 'lucide-react';
import type { TimeLeft } from '@/types';
import { formatNumber } from '@/utils';

interface CountdownDisplayProps {
  timeLeft: TimeLeft;
}

const TIME_UNITS = [
  { key: 'days', label: 'DAYS' },
  { key: 'hours', label: 'HOURS' },
  { key: 'minutes', label: 'MINUTES' },
  { key: 'seconds', label: 'SECONDS' },
] as const;

const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ timeLeft }) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-4 animate-pulse">
        <Sparkles className="text-yellow-400 w-6 h-6" />
        <h2 className="text-xl md:text-2xl font-light tracking-[0.4em] uppercase text-white/80">
          2026 is coming
        </h2>
        <Sparkles className="text-yellow-400 w-6 h-6" />
      </div>

      <div className="flex gap-4 md:gap-8 mb-8 font-digital">
        {TIME_UNITS.map(({ key, label }) => (
          <div key={key} className="flex flex-col items-center">
            <span className="text-5xl md:text-8xl font-bold tracking-tighter transition-all duration-300">
              {formatNumber(timeLeft[key])}
            </span>
            <span className="text-[10px] md:text-xs font-light tracking-[0.3em] mt-2 text-white/40 uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>

      <p className="text-white/60 text-lg md:text-xl font-light italic mt-4 max-w-md mx-auto">
        "Every ending is a new beginning."
      </p>
    </>
  );
};

export default CountdownDisplay;
