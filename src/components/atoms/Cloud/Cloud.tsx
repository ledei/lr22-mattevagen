import type { CSSProperties } from 'react';

export interface CloudProps {
  top: number | string;
  width: number;
  height: number;
  opacity: number;
  duration: number;
  delay: number;
  style?: CSSProperties;
}

/** Drifting pill-shaped cloud (−180 → 620 px). */
export function Cloud({ top, width, height, opacity, duration, delay, style }: CloudProps) {
  return (
    <div
      style={{ position: 'absolute', left: 0, top, width, height, borderRadius: 999, background: `oklch(1 0 0 / ${opacity})`, animation: `mv-drift ${duration}s linear infinite`, animationDelay: `${delay}s`, pointerEvents: 'none', ...style }}
    />
  );
}
