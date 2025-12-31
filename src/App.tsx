import React, { useState, useRef, useEffect } from 'react';
import {
  BackgroundStars,
  Fireworks,
  Snowfall,
  CountdownDisplay,
  CelebrationDisplay,
  WishForm,
  Header,
  Footer,
} from '@/components';
import { useCountdown } from '@/hooks';
import { TIMEZONES } from '@/constants';
import type { TimeZone } from '@/types';

const App: React.FC = () => {
  const [selectedTimeZone, setSelectedTimeZone] = useState<TimeZone>(TIMEZONES[0]);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { timeLeft, isFinished } = useCountdown(selectedTimeZone);

  useEffect(() => {
    if (audioRef.current) {
      if (isAudioOn) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isAudioOn]);

  const handleShare = () => {
    const text = isFinished
      ? 'Happy New Year 2026!'
      : `Countdown to 2026: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;

    if (navigator.share) {
      navigator.share({
        title: '2026 Countdown',
        text: text,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Sharing: ' + text);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden select-none">
      <BackgroundStars />
      <Snowfall />
      {isFinished && <Fireworks />}

      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950 z-[-1]" />

      <Header
        selectedTimeZone={selectedTimeZone}
        onTimeZoneChange={setSelectedTimeZone}
        isAudioOn={isAudioOn}
        onToggleAudio={() => setIsAudioOn(!isAudioOn)}
        onShare={handleShare}
      />

      {/* Main Content */}
      <main className="z-10 text-center flex flex-col items-center w-full max-w-6xl">
        {!isFinished ? (
          <CountdownDisplay timeLeft={timeLeft} />
        ) : (
          <CelebrationDisplay />
        )}

        <div className="flex flex-col gap-6 mt-8 w-full px-4 items-center justify-center">
          <WishForm />
        </div>
      </main>

      <Footer />

      {/* Hidden Audio for ambiance */}
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        className="hidden"
      />
    </div>
  );
};

export default App;
