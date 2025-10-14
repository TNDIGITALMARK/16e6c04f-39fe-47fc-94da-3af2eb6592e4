'use client';

import { useEffect, useState } from 'react';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  label?: string;
  value?: string;
  className?: string;
}

export function ProgressRing({
  percentage,
  size = 140,
  strokeWidth = 10,
  color = 'hsl(var(--primary))',
  backgroundColor = 'hsl(var(--muted))',
  showPercentage = true,
  label,
  value,
  className = '',
}: ProgressRingProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(Math.min(Math.max(percentage, 0), 100));
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {value ? (
          <>
            <span className="text-2xl font-semibold text-foreground">{value}</span>
            {label && <span className="text-xs text-muted-foreground mt-1">{label}</span>}
          </>
        ) : showPercentage ? (
          <span className="text-2xl font-semibold text-foreground">{Math.round(animatedPercentage)}%</span>
        ) : null}
      </div>
    </div>
  );
}
