import type { CSSProperties, ReactNode } from 'react';
import s from './Chip.module.css';

type Tone = 'skill' | 'green' | 'blue' | 'neutral' | 'yellow' | 'red' | 'dark' | 'white';

const TONES: Record<Tone, [string, string]> = {
  skill: ['oklch(0.93 0.05 145)', 'oklch(0.4 0.12 145)'],
  green: ['oklch(0.93 0.07 145)', 'oklch(0.4 0.12 145)'],
  blue: ['oklch(0.93 0.04 250)', 'oklch(0.42 0.12 250)'],
  neutral: ['oklch(0.94 0.01 260)', 'oklch(0.5 0.03 260)'],
  yellow: ['oklch(0.95 0.07 92)', 'oklch(0.42 0.08 75)'],
  red: ['oklch(0.94 0.05 30)', 'oklch(0.5 0.15 30)'],
  dark: ['oklch(0.3 0.04 260)', 'oklch(1 0 0)'],
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
