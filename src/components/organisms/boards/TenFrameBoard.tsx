import { currentLevel, currentStep, showNums, useGame } from '@/store/gameStore';
import { C } from '@/styles/colors';
import { pop } from '@/lib/motion';
import s from './boards.module.css';

/** Ten-frame: `count`, `fill` and `remove` steps (Muren, Trollets gåta). */
export function TenFrameBoard() {
  const st = useGame();
  const L = currentLevel(st);
  const step = currentStep(st);
  const nums = useGame(showNums);
  const t = step.t;
  const work = st.phase === 'work';
  const base = L.base ?? 0;
  const filled = base + st.added;

  return (
    <div className={s.frame}>
      {Array.from({ length: 10 }, (_, i) => {
        const have = i < base;
        const isNew = !have && i < filled;
        const isF = have || isNew;
        const gone = st.gone.includes(i);
        const tap = work && !st.locked && ((t === 'count' && have && !st.countOrder.includes(i)) || (step.t === 'fill' && !isF && filled < step.to) || (t === 'remove' && isF && !gone));
        const ci = st.countOrder.indexOf(i);
        const label = t === 'count' ? (ci >= 0 ? String(ci + 1) : '') : nums && isF && !gone ? String(i + 1) : '';
        return (
          <button
            key={i}
            type="button"
            className={s.cell}
            aria-label={`Ruta ${i + 1}`}
            onClick={(e) => { pop(e.currentTarget); st.tapCell(i); }}
            style={{ cursor: tap ? 'pointer' : 'default', borderColor: tap ? C.orange : 'oklch(0.88 0.03 80)' }}
          >
            <div
              className={s.cellInner}
              style={{
                borderRadius: L.radius ?? '9px',
                background: isF ? C[have ? L.baseC! : L.newC!] : 'transparent',
                opacity: gone ? 0.15 : 1,
                border: isF ? 'none' : '2px dashed oklch(0.85 0.03 80)',
                transform: gone ? 'scale(0.6)' : t === 'count' && ci >= 0 ? 'scale(1.08)' : 'none',
                boxShadow: isF ? 'inset -3px -3px 0 oklch(0 0 0 / 0.14)' : 'none',
              }}
            >
              {label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
