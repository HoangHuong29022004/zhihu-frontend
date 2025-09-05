"use client";
import React, { useEffect, useState } from "react";

interface ICountUpBaseProps {
  start: number;
  end: number;
  duration: number;
  isActive?: boolean; // Thêm prop này để kiểm soát khi nào animation chạy
  separator?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const CountUpBase = ({
  start,
  end,
  duration = 0.5,
  isActive = true,
  prefix = "",
  suffix = "",
  className = "",
}: ICountUpBaseProps) => {
  const [count, setCount] = useState(start);
  const frameRate = 60; // 60 FPS
  const totalFrames = Math.round((duration * 1000) / (1000 / frameRate));
  const increment = (end - start) / totalFrames;

  useEffect(() => {
    if (!isActive) {
      setCount(start); // Reset về giá trị start khi isActive = false
      return;
    }

    let currentCount = start;
    let frame = 0;

    const animate = () => {
      frame++;
      currentCount += increment;

      if (frame >= totalFrames) {
        currentCount = end;
        setCount(currentCount);
        return;
      }

      setCount(currentCount);
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, start, end, duration, increment, totalFrames]);

  // Hàm định dạng số với dấu phân cách hàng nghìn
  const formatNumber = (value: number) => {
    return value.toLocaleString(undefined, {
      useGrouping: true,
    });
  };

  return (
    <span className={className}>
      {prefix}
      {formatNumber(Math.floor(count))}
      {suffix}
    </span>
  );
};

export default CountUpBase;
