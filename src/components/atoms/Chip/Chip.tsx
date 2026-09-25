import type { CSSProperties, ReactNode } from 'react';
import s from './Chip.module.css';

type Tone = 'skill' | 'green' | 'blue' | 'neutral' | 'yellow' | 'red' | 'dark' | 'white';

const TONES: Record<Tone, [string, string]> = {
  skill: ['var(--chip-green-bg)', 'var(--chip-green-fg)'],
  green: ['var(--success-bg)', 'var(--chip-green-fg)'],
  blue: ['var(--chip-blue-bg)', 'var(--chip-blue-fg)'],
  neutral: ['var(--surface-sunk)', 'var(--ink-soft)'],
  yellow: ['var(--hint-bg)', 'oklch(0.42 0.08 75)'],
  red: ['oklch(0.94 0.05 30)', 'oklch(0.5 0.15 30)'],
  dark: ['var(--ink)', 'var(--white)'],
  white: ['oklch(1 0 0 / 0.75)', 'inherit'],
};

export interface ChipProps {
  tone?: Tone;
  /** override background / text colour */
  bg?: string;
  color?: string;
  size?: 'sm' | 'md';
  children: ReactNode;
  style?: CSSProperties;
}

/** Rounded pill label: skill tags, status chips, "Dagens ord". */
export function Chip({ tone = 'neutral', bg, color, size = 'sm', children, style }: ChipProps) {
  const [tb, tc] = TONES[tone];
  return (
    <div className={`${s.chip} ${s[size]}`} style={{ background: bg ?? tb, color: color ?? tc, ...style }}>
      {children}
    </div>
  );
}
