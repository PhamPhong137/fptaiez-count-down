import { useState, useEffect, useCallback } from 'react';
import type { TimeLeft, TimeZone } from '@/types';
import { TARGET_DATE } from '@/constants';

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

    let target = new Date(TARGET_DATE);
    if (selectedTimeZone.label !== 'Local Time') {
      const gmtTarget = new Date(
        TARGET_DATE.getTime() - selectedTimeZone.offset * 60 * 60 * 1000
      );
      target = gmtTarget;
    }

    const difference = target.getTime() - now.getTime();

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
