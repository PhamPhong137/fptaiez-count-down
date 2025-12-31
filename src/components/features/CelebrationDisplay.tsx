import React from 'react';

const CelebrationDisplay: React.FC = () => {
  return (
    <div className="animate-bounce-slow">
      <h1 className="text-6xl md:text-9xl font-extrabold tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
        HAPPY 2026
      </h1>
      <p className="text-2xl md:text-3xl font-light text-yellow-400 mb-8 uppercase tracking-[0.2em]">
        A new chapter begins today
      </p>
    </div>
  );
};

export default CelebrationDisplay;
