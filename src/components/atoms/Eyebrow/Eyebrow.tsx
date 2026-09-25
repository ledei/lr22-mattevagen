import type { CSSProperties, ReactNode } from 'react';
import s from './Eyebrow.module.css';

/** Small uppercase label ("Vi gör det i små steg", "Nytt föremål" …). */
export function Eyebrow({ children, color, size = 13, spacing = '.06em', style }: { children: ReactNode; color?: string; size?: 12 | 13; spacing?: string; style?: CSSProperties }) {
  return (
    <div className={s.eyebrow} style={{ color, fontSize: size, letterSpacing: spacing, ...style }}>
      {children}
    </div>
  );
}
