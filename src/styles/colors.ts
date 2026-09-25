/** Game palette (`C` in the prototype). oklch values are the source of truth. */
export const C = {
  ink: 'oklch(0.3 0.04 260)',
  orange: 'oklch(0.74 0.16 55)',
  orangeD: 'oklch(0.6 0.16 45)',
  green: 'oklch(0.72 0.16 145)',
  greenD: 'oklch(0.56 0.14 145)',
  purple: 'oklch(0.6 0.17 300)',
  purpleD: 'oklch(0.46 0.15 300)',
  gray: 'oklch(0.8 0.02 150)',
  grayD: 'oklch(0.66 0.03 150)',
  stone: 'oklch(0.64 0.02 260)',
  yellow: 'oklch(0.8 0.15 85)',
  apple: 'oklch(0.62 0.2 25)',
  gApple: 'oklch(0.7 0.17 135)',
  R: 'oklch(0.66 0.18 28)',
  B: 'oklch(0.62 0.14 250)',
  red: 'oklch(0.63 0.2 25)',
  white: 'oklch(1 0 0)',
} as const;

export type ColorKey = keyof typeof C;

/** Page background per screen (`BG` in the prototype). */
export const SCREEN_BG = {
  map: 'oklch(0.84 0.12 140)',
  level: 'oklch(0.98 0.01 90)',
  reward: 'oklch(0.86 0.07 230)',
  avatar: 'oklch(0.88 0.07 230)',
  words: 'oklch(0.97 0.01 90)',
} as const;
