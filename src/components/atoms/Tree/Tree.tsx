import type { CSSProperties } from 'react';
import s from './Tree.module.css';

export interface TreeProps {
  /** crown diameter in px (44 on the map) */
  size?: number;
  duration: number;
  delay: number;
  style?: CSSProperties;
}

/** Round swaying tree. All parts scale from the 44px map tree. */
export function Tree({ size = 44, duration, delay, style }: TreeProps) {
  const k = size / 44;
  return (
    <div className={s.tree} style={{ width: size, height: 56 * k, animationDuration: `${duration}s`, animationDelay: `${delay}s`, ...style }}>
      <div className={s.trunk} style={{ left: 18 * k, top: 34 * k, width: 8 * k, height: 20 * k }} />
      <div className={s.crown} style={{ width: size, height: size, boxShadow: `inset ${-6 * k}px ${-6 * k}px 0 var(--tree-shadow)` }} />
    </div>
  );
}
