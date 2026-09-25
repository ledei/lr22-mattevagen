import { SHAPES } from '@/data/levels';
import { pop } from '@/lib/motion';
import { currentStep, showNums, useGame } from '@/store/gameStore';
import { C } from '@/styles/colors';
import s from './boards.module.css';

const NAMES = { tri: 'triangel', quad: 'fyrhörning', circle: 'cirkel' };

/** 3×3 grid of shapes. Corner counts show as badges with support. */
export function ShapesBoard() {
  const st = useGame();
  const small = currentStep(st).t === 'type';
  const nums = useGame(showNums);

  return (
    <div className={s.shapes}>
      {SHAPES.map((x, i) => {
        const f = st.found.includes(i);
        const tf = ((x.rot ? `rotate(${x.rot}deg) ` : '') + (small ? 'scale(0.62)' : '')).trim() || 'none';
        return (
          <button
            key={i}
            type="button"
            className={s.shapeCell}
            aria-label={f ? `${NAMES[x.k]}, hittad` : 'Form'}
            onClick={(e) => { pop(e.currentTarget); st.tapShape(i); }}
            style={{ height: small ? 54 : 76, borderColor: f ? C.green : 'oklch(0.9 0.01 260)', background: f ? 'oklch(0.95 0.05 145)' : C.white }}
          >
            <div style={{ width: x.w, height: x.h, background: C[x.c], clipPath: x.clip ?? 'none', borderRadius: x.k === 'circle' ? '50%' : '4px', transform: tf }} />
            <div className={s.shapeBadge} style={{ background: f ? C.green : C.orange, opacity: f || nums ? 1 : 0 }}>
              {f ? '✓' : x.k === 'tri' ? '3' : x.k === 'quad' ? '4' : '0'}
            </div>
          </button>
        );
      })}
    </div>
  );
}
