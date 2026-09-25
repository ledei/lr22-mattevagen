import type { ReactNode } from 'react';
import s from './NumberCircle.module.css';

/** Round numbered / ✓ badge used in step lists and recaps. */
export function NumberCircle({ children, size = 28, bg = 'var(--orange)', fontSize = 16, display = true }: { children: ReactNode; size?: number; bg?: string; fontSize?: number; display?: boolean }) {
  return (
    <div className={`${s.circle} ${display ? s.display : ''}`} style={{ width: size, height: size, background: bg, fontSize }}>
      {children}
    </div>
  );
}
