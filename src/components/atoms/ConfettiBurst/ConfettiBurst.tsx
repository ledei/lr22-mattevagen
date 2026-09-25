import { C } from '@/styles/colors';
import { prefersReducedMotion } from '@/lib/motion';
import type { CSSProperties } from 'react';

const COLORS = [C.orange, C.green, C.B, C.R, C.yellow, C.purple];

/** Radial confetti: 20 pieces for a step, 56 for a level or reward. */
export function ConfettiBurst({ big }: { big: boolean }) {
  if (prefersReducedMotion()) return null;
  const n = big ? 56 : 20;
  return (
    <div style={{ position: 'absolute', left: '50%', top: big ? '34%' : '58%', width: 0, height: 0 }}>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 + (i % 3) * 0.3;
        const d = (big ? 230 : 120) * (0.5 + ((i * 37) % 50) / 100);
        const style = {
          position: 'absolute', left: 0, top: 0,
          width: (i % 2 ? 8 : 11) + 'px', height: (i % 2 ? 14 : 11) + 'px',
          borderRadius: i % 3 === 0 ? '50%' : '2px',
          background: COLORS[i % COLORS.length],
          '--dx': Math.cos(a) * d + 'px',
          '--dy': Math.sin(a) * d + (big ? 140 : 70) + 'px',
          '--r': ((i * 47) % 360) + 180 + 'deg',
          animation: `mv-confetti ${big ? 1.5 : 0.95}s cubic-bezier(.2,.7,.3,1) forwards`,
        } as CSSProperties;
        return <span key={i} style={style} />;
      })}
    </div>
  );
}
