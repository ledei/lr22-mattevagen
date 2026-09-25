import type { CSSProperties, ReactNode } from 'react';

export interface ColumnTemplateProps {
  label: string;
  background: string;
  /** space kept free for the bottom menu */
  bottom?: number;
  padding: string;
  gap?: number;
  scroll?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

/** Full-screen flex column used by the Belöning, Figur and Ord screens. */
export function ColumnTemplate({ label, background, bottom = 0, padding, gap, scroll, children, style }: ColumnTemplateProps) {
  return (
    <div
      data-screen-label={label}
      style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom, background, display: 'flex', flexDirection: 'column', padding, gap, overflow: scroll ? 'auto' : 'hidden', ...style }}
    >
      {children}
    </div>
  );
}
