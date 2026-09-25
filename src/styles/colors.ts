/**
 * Game palette for inline styles. Values point at the CSS tokens in `tokens.css`,
 * which is the single source of truth for colour.
 */
export const C = {
  ink: 'var(--ink)',
  orange: 'var(--orange)',
  orangeD: 'var(--orange-d)',
  orangeStrong: 'var(--orange-strong)',
  green: 'var(--green)',
  greenD: 'var(--green-d)',
  purple: 'var(--purple)',
  purpleD: 'var(--purple-d)',
  gray: 'var(--locked)',
  grayD: 'var(--locked-d)',
  stone: 'var(--stone)',
  yellow: 'var(--piece-yellow)',
  apple: 'var(--apple)',
  gApple: 'var(--green-apple)',
  bun: 'var(--bun)',
  bunIced: 'var(--bun-iced)',
  R: 'var(--pat-red)',
  B: 'var(--pat-blue)',
  red: 'var(--hop-back)',
  white: 'var(--white)',
} as const;

export type ColorKey = keyof typeof C;

/** Darker twins used behind small white numbers (bar counts, hop numbers). */
export const STRONG: Partial<Record<ColorKey, string>> = {
  R: 'var(--pat-red-strong)',
  B: 'var(--pat-blue-strong)',
  yellow: 'var(--yellow-strong)',
  green: 'var(--green-strong)',
  red: 'var(--hop-back-strong)',
};

/** Page background per screen. */
export const SCREEN_BG = {
  map: 'var(--grass)',
  level: 'var(--paper)',
  reward: 'var(--reward-bg)',
  avatar: 'var(--avatar-bg)',
  words: 'var(--words-bg)',
} as const;
