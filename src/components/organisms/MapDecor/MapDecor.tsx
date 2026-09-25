import type { CSSProperties } from 'react';
import { Cloud, Flower, Pond, Tree } from '@/components/atoms';
import s from './MapDecor.module.css';

type TreeSpec = { side: 'left' | 'right'; x: string; y: string; size: number; d: number; dl: number };

const TREES: TreeSpec[] = [
  { side: 'left', x: '9%', y: '16%', size: 57.2, d: 4, dl: -0.4 },
  { side: 'left', x: '4%', y: '58%', size: 48.4, d: 4.8, dl: -1.2 },
  { side: 'left', x: '14%', y: '76%', size: 61.6, d: 5.6, dl: -2 },
  { side: 'left', x: '19%', y: '46%', size: 35.2, d: 4.6, dl: -1 },
  { side: 'left', x: '24%', y: '22%', size: 39.6, d: 5.4, dl: -1.8 },
  { side: 'right', x: '8%', y: '36%', size: 57.2, d: 4.4, dl: -0.8 },
  { side: 'right', x: '3%', y: '54%', size: 48.4, d: 5.2, dl: -1.6 },
  { side: 'right', x: '13%', y: '80%', size: 61.6, d: 6, dl: -2.4 },
  { side: 'right', x: '15%', y: '12%', size: 39.6, d: 3.8, dl: -0.2 },
  { side: 'right', x: '22%', y: '66%', size: 35.2, d: 5, dl: -1.4 },
];

const FLOWERS: { side: 'left' | 'right'; x: string; y: string; c: string }[] = [
  { side: 'left', x: '12%', y: '34%', c: 'oklch(0.95 0.08 90)' },
  { side: 'left', x: '20%', y: '66%', c: 'oklch(0.9 0.08 20)' },
  { side: 'right', x: '18%', y: '46%', c: 'oklch(0.95 0.08 90)' },
  { side: 'right', x: '6%', y: '24%', c: 'oklch(0.9 0.08 320)' },
  { side: 'left', x: '5%', y: '86%', c: 'oklch(0.9 0.08 320)' },
  { side: 'right', x: '26%', y: '88%', c: 'oklch(0.95 0.08 90)' },
];

const pos = (side: 'left' | 'right', x: string, y: string): CSSProperties => ({ [side]: x, top: y });

/** Desktop-only decoration layer across the full width, with pointer parallax. */
export function MapDecor({ px, py }: { px: number; py: number }) {
  return (
    <>
      <div className={s.layer} style={{ transform: `translate(${px * -26}px,${py * -16}px)` }}>
        <div className={s.hill} style={{ left: -180, top: '52%', width: 520, height: 520 }} />
        <div className={s.hill} style={{ right: -160, top: '-14%', width: 480, height: 480 }} />
        <div className={s.hill} style={{ right: -100, top: '68%', width: 360, height: 360 }} />
        <div className={s.hill} style={{ left: '6%', top: '-8%', width: 260, height: 260 }} />
        <Pond width={140} height={70} style={{ left: '7%', top: '40%' }} />
        <Pond width={110} height={55} style={{ right: '9%', top: '60%' }} />
        {TREES.map((t, i) => (
          <Tree key={i} size={t.size} duration={t.d} delay={t.dl} style={pos(t.side, t.x, t.y)} />
        ))}
        {FLOWERS.map((f, i) => (
          <Flower key={i} color={f.c} style={pos(f.side, f.x, f.y)} />
        ))}
      </div>
      <Cloud top="14%" width={120} height={32} opacity={0.45} duration={60} delay={-12} />
      <Cloud top="72%" width={90} height={26} opacity={0.35} duration={75} delay={-50} />
    </>
  );
}
