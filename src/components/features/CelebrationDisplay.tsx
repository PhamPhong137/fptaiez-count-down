import React from 'react';

const CelebrationDisplay: React.FC = () => {
  return (
    <div className="animate-bounce-slow">
      <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
        HAPPY NEW YEAR
      </h1>
      <h2 className="text-6xl md:text-9xl font-extrabold tracking-tight mb-4 text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]">
        2026
      </h2>
      <p className="text-xl md:text-2xl font-light text-white/80 mb-8 uppercase tracking-[0.2em]">
        A new chapter begins today
      </p>
    </div>
  );
};

export default CelebrationDisplay;
