import type { CSSProperties, ReactNode } from 'react';
import s from './Card.module.css';

/** White card with the soft paper shadow. */
export function Card({ children, gap = 10, padding = '14px 16px', style }: { children: ReactNode; gap?: number; padding?: string; style?: CSSProperties }) {
  return (
    <div className={s.card} style={{ gap, padding, ...style }}>
      {children}
    </div>
  );
}
