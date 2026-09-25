import type { ColorKey } from '@/styles/colors';

export type Area =
  | 'Taluppfattning och tals användning'
  | 'Algebra'
  | 'Geometri'
  | 'Sannolikhet och statistik'
  | 'Samband och förändring'
  | 'Problemlösning';

export type Board = 'frame' | 'pattern' | 'shapes' | 'line' | 'share' | 'chart';
export type Obstacle = 'wall' | 'river' | 'gate' | 'stones' | 'tree' | 'birds' | 'bakery' | 'troll';
export type PatColor = 'R' | 'B';
export type ShapeKind = 'tri' | 'quad' | 'circle';

interface StepBase {
  /** board shown for this step, when it differs from the level's board */
  board?: Board;
  title: string;
  text: string;
  help: string[];
  done: string;
}

export type Step =
  | (StepBase & { t: 'count' })
  | (StepBase & { t: 'fill'; to: number })
  | (StepBase & { t: 'remove'; k: number })
  | (StepBase & { t: 'pattern' })
  | (StepBase & { t: 'hop'; n: number; dir: 1 | -1 })
  | (StepBase & { t: 'share' })
  | (StepBase & { t: 'find'; kind: 'tri' | 'quad' })
  | (StepBase & { t: 'sort' })
  | (StepBase & { t: 'bar' })
  | (StepBase & { t: 'type'; eqL?: string; eqR?: string; ans: number });

export type StepType = Step['t'];

export interface MathWord {
  w: string;
  d: string;
  ex: string;
}

export interface Level {
  id: number;
  name: string;
  skill: string;
  area: Area;
  board: Board;
  ob: Obstacle;
  /** frame board: number of pre-filled cells */
  base?: number;
  baseC?: ColorKey;
  newC?: ColorKey;
  radius?: string;
  /** line board: start stone */
  start?: number;
  /** share board: number of baskets, items to hand out, and where they start */
  share?: { baskets: number; pile: number; pileLabel: string; /** one item, with article: 'ett äpple' */ item: string };
  riddle?: boolean;
  intro: string;
  word: MathWord;
  steps: Step[];
  finale: string;
  recap: string;
  again: string;
  /** ids in `CENTRALT_INNEHALL` (Lgr22, åk 1–3) that the level trains */
  centralt: string[];
  tip: string;
}

export type Slot = 'hat' | 'shirt' | 'shoes' | 'skin';
export type Skin = 'ljus' | 'mellan' | 'mork' | 'alien' | 'robot';
export type Hat = 'none' | 'cap' | 'helmet' | 'chef' | 'crown';
export type Shirt = 'green' | 'blue' | 'purple' | 'orange';
export type Shoes = 'sneakers' | 'rocket';

export interface Avatar {
  skin: Skin;
  hat: Hat;
  shirt: Shirt;
  shoes: Shoes;
}

export interface Item {
  id: string;
  name: string;
  /** level that unlocks the item */
  lv?: number;
}

export interface Shape {
  k: ShapeKind;
  w: number;
  h: number;
  clip?: string;
  rot?: number;
  c: ColorKey;
}

export interface Point {
  x: number;
  y: number;
}
