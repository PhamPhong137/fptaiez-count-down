import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-6 text-white/30 text-[10px] md:text-xs tracking-widest uppercase flex flex-col items-center gap-2">
      <span>EST. JAN 1ST 2026</span>
      <div className="w-12 h-[1px] bg-white/10" />
      <span className="flex items-center gap-1">
        Made by <span className="text-yellow-400 font-semibold">FPTAIEZ</span> team
      </span>
    </footer>
  );
};

export default Footer;
