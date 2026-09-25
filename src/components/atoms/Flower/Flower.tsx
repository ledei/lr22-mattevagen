import type { CSSProperties } from 'react';

/** Three-dot flower cluster. */
export function Flower({ color, style }: { color: string; style?: CSSProperties }) {
  return <div style={{ position: 'absolute', width: 10, height: 10, borderRadius: '50%', background: color, boxShadow: `12px 4px 0 ${color}, 5px 12px 0 ${color}`, ...style }} />;
}
