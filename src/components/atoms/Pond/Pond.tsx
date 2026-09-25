import type { CSSProperties, ReactNode } from 'react';

/** Oval pond with a shimmering highlight. */
export function Pond({ width, height, shadow = 7, style, children }: { width: number; height: number; shadow?: number; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div style={{ position: 'absolute', width, height, borderRadius: '50%', background: 'var(--pond)', boxShadow: `inset 0 -${shadow}px 0 var(--pond-shadow)`, ...style }}>
      {children ?? (
        <div style={{ position: 'absolute', left: '22%', top: '28%', width: '30%', height: 8, borderRadius: 999, background: 'oklch(1 0 0 / 0.8)', animation: 'mv-shimmer 2.8s ease-in-out infinite' }} />
      )}
    </div>
  );
}

export function Shimmer({ left, top, width, height, opacity, duration, delay = 0 }: { left: number; top: number; width: number; height: number; opacity: number; duration: number; delay?: number }) {
  return <div style={{ position: 'absolute', left, top, width, height, borderRadius: 999, background: `oklch(1 0 0 / ${opacity})`, animation: `mv-shimmer ${duration}s ease-in-out infinite`, animationDelay: `${delay}s` }} />;
}
