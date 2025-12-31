import { useState, useEffect, useCallback } from 'react';
import type { TimeLeft, TimeZone } from '@/types';

export function useCountdown(selectedTimeZone: TimeZone) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 1,
  });
  const [isFinished, setIsFinished] = useState(false);

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date();

    let targetTime: number;

    if (selectedTimeZone.label === 'Local Time') {
      // Midnight Jan 1, 2026 in local time
      targetTime = new Date(2026, 0, 1, 0, 0, 0).getTime();
    } else {
      // Midnight Jan 1, 2026 in the selected timezone
      // Convert: when it's midnight in that timezone, what UTC time is it?
      // UTC time = local midnight - offset
      const utcMidnight = Date.UTC(2026, 0, 1, 0, 0, 0);
      targetTime = utcMidnight - selectedTimeZone.offset * 60 * 60 * 1000;
    }

    const difference = targetTime - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      totalSeconds: Math.floor(difference / 1000),
    };
  }, [selectedTimeZone]);

  useEffect(() => {
    const timer = setInterval(() => {
      const calculated = calculateTimeLeft();
      setTimeLeft(calculated);
      if (calculated.totalSeconds <= 0) {
        setIsFinished(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return { timeLeft, isFinished };
}
