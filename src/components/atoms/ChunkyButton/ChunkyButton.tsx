import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import s from './ChunkyButton.module.css';

type Tone = 'orange' | 'green' | 'white' | 'red' | 'blue' | 'key' | 'keyMuted';

export interface ChunkyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: Tone;
  /** height in px */
  height?: number;
  fontSize?: number;
  radius?: number;
  /** "3D" shadow depth in px; press moves the button down by `press` px */
  depth?: number;
  press?: number;
  /** body font (Nunito) instead of Baloo 2 */
  bodyFont?: boolean;
}

/** Chunky button with a "3D" bottom shadow. On press it moves down and the shadow disappears. */
export function ChunkyButton({ tone = 'orange', height = 60, fontSize = 24, radius = 18, depth = 6, press = 4, bodyFont, className, style, ...rest }: ChunkyButtonProps) {
  const vars = { height, fontSize, borderRadius: radius, '--depth': `${depth}px`, '--press': `${press}px`, ...style } as CSSProperties;
  return <button type="button" className={[s.btn, s[tone], bodyFont ? s.body : '', className].filter(Boolean).join(' ')} style={vars} {...rest} />;
}
