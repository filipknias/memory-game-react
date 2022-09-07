import { useState, useEffect } from 'react'

export interface Timer {
  minutes: number;
  seconds: number;
  resetTimer: () => void;
  stopTimer: () => void;
}

export const useTimer = (): Timer => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer|null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    setIntervalId(timer);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds >= 60) {
      setSeconds(0);
      setMinutes((prevMinutes) => prevMinutes + 1);
    } 
  }, [seconds]);

  const resetTimer = () => {
    setSeconds(0);
    setMinutes(0);
  };

  const stopTimer = () => {
    if (!intervalId) return;
    clearInterval(intervalId);
  };

  return { minutes, seconds, resetTimer, stopTimer };
};
