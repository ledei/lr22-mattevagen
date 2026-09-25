import { Figur } from '@/components/atoms';
import { pop } from '@/lib/motion';
import { currentLevel, currentStep, useGame } from '@/store/gameStore';
import { C } from '@/styles/colors';
import s from './boards.module.css';

const GAP = 32;

/** Number line 0–10 with hop arcs (green forward, red back) and a hop counter. */
export function NumberLineBoard() {
  const st = useGame();
  const L = currentLevel(st);
  const step = currentStep(st);
  const work = st.phase === 'work';
  const target = step.t === 'hop' ? st.pos + step.dir : -99;

  return (
    <>
      <div className={s.line}>
        <div className={s.lineTrack} />
        {st.hops.map((h, i) => {
          const color = h.dir > 0 ? C.green : C.red;
          return (
            <div key={i} className={s.arc} style={{ left: Math.min(h.from, h.to) * GAP + 15, borderColor: color }}>
              <div className={s.arcNum} style={{ background: color }}>{h.k}</div>
            </div>
          );
        })}
        {Array.from({ length: 11 }, (_, n) => {
          const tg = work && !st.locked && n === target;
          const here = n === st.pos;
          return (
            <button
              key={n}
              type="button"
              className={s.stone}
              aria-label={`Sten ${n}`}
              onClick={(e) => { pop(e.currentTarget); st.tapStone(n); }}
              style={{
                left: n * GAP,
                borderColor: tg ? C.orange : 'oklch(0.85 0.02 250)',
                background: here ? C.orange : n === (L.start ?? -1) ? 'oklch(0.9 0.03 250)' : C.white,
                color: here ? C.white : C.ink,
                cursor: tg ? 'pointer' : 'default',
              }}
            >
              {n}
            </button>
          );
        })}
        <div className={s.token} style={{ left: st.pos * GAP }}>
          <Figur {...st.avatar} size={30} />
        </div>
      </div>
      {step.t === 'hop' && (
        <div className={s.hopDots} aria-label={`${st.stepHops} av ${step.n} hopp`}>
          {Array.from({ length: step.n }, (_, i) => {
            const c = step.dir > 0 ? C.green : C.red;
            return <div key={i} className={s.hopDot} style={{ background: i < st.stepHops ? c : 'transparent', borderColor: c }} />;
          })}
        </div>
      )}
    </>
  );
}
