import React from 'react';
import { Globe, Volume2, VolumeX, Share2 } from 'lucide-react';
import type { TimeZone } from '@/types';
import { TIMEZONES } from '@/constants';

interface HeaderProps {
  selectedTimeZone: TimeZone;
  onTimeZoneChange: (tz: TimeZone) => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  onShare: () => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedTimeZone,
  onTimeZoneChange,
  isAudioOn,
  onToggleAudio,
  onShare,
}) => {
  return (
    <div className="absolute top-8 left-0 right-0 flex justify-between px-8 items-center z-20">
      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
        <Globe size={18} className="text-blue-400" />
        <select
          value={selectedTimeZone.label}
          onChange={(e) =>
            onTimeZoneChange(
              TIMEZONES.find((t) => t.label === e.target.value) || TIMEZONES[0]
            )
          }
          className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.label} value={tz.label} className="bg-slate-900">
              {tz.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onToggleAudio}
          className="p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-all text-white/80"
        >
          {isAudioOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        <button
          onClick={onShare}
          className="p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-all text-white/80"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
