import { useState, useEffect } from "react";

interface ICountdownTimerProps {
  initialTime: number;
  onExpire: () => void;
  className?: string;
  storageKey: string;
  resetCountdown?: boolean;
}

const CountdownTimer = ({
  initialTime,
  onExpire,
  className = "text-red-500 font-semibold",
  storageKey,
  resetCountdown = false,
}: ICountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    // Chỉ chạy trên client
    const storedTime = localStorage.getItem(storageKey);
    setTimeLeft(
      storedTime ? Math.max(0, Number(storedTime)) : Math.max(0, initialTime)
    );
  }, [initialTime, storageKey]);

  useEffect(() => {
    if (resetCountdown) {
      localStorage.setItem(storageKey, String(initialTime));
      setTimeLeft(initialTime);
    }
  }, [resetCountdown, initialTime, storageKey]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      localStorage.removeItem(storageKey);
      return;
    }

    localStorage.setItem(storageKey, String(timeLeft));

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = Math.max(0, prevTime - 1);
        localStorage.setItem(storageKey, String(newTime));
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire, storageKey]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <span className={className} role="timer" aria-live="polite">
      {formatTime(timeLeft)}
    </span>
  );
};

export default CountdownTimer;
