import { BIRDS, COLS } from '@/data/levels';
import { pop } from '@/lib/motion';
import { currentStep, useGame } from '@/store/gameStore';
import { useShallow } from 'zustand/react/shallow';
import { C, STRONG } from '@/styles/colors';
import s from './boards.module.css';

const COLOR_NAMES = { R: 'röd', B: 'blå', yellow: 'gul' } as Record<string, string>;

/** Sort birds into a bar chart, then compare bars. */
export function ChartBoard() {
  const st = useGame(useShallow((s) => ({ locked: s.locked, lv: s.lv, phase: s.phase, si: s.si, sorted: s.sorted, tally: s.tally, tapBar: s.tapBar, tapBird: s.tapBird })));
  const t = currentStep(st).t;
  const barTap = t === 'bar' && st.phase === 'work' && !st.locked;

  return (
    <>
      {t === 'sort' && (
        <div className={s.birdRow}>
          {BIRDS.map((b, i) => {
            const so = st.sorted.includes(i);
            return (
              <button
                key={i}
                type="button"
                className={s.bird}
                aria-label={`${COLOR_NAMES[b]} fågel`}
                onClick={(e) => { pop(e.currentTarget); st.tapBird(i); }}
                style={{ background: C[b], opacity: so ? 0 : 1, transform: so ? 'translateY(20px) scale(0.5)' : 'none' }}
              >
                <div className={s.birdEye} />
                <div className={s.birdBeak} />
              </button>
            );
          })}
        </div>
      )}
      <div className={s.chart}>
        {COLS.map((c, j) => (
          <div
            key={c}
            role="button"
            tabIndex={barTap ? 0 : -1}
            aria-label={`${COLOR_NAMES[c]} stapel: ${st.tally[j]}`}
            className={s.barCol}
            style={{ cursor: barTap ? 'pointer' : 'default' }}
            onClick={(e) => { pop(e.currentTarget); st.tapBar(j); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); st.tapBar(j); } }}
          >
            <div className={s.bar} style={{ borderColor: barTap ? C.orange : (st.si > 1 || (t === 'bar' && st.locked)) && j === 0 ? C.green : 'var(--surface-muted)' }}>
              {Array.from({ length: 5 }, (_, k) => {
                const on = k < st.tally[j];
                return <div key={k} className={s.slot} style={{ background: on ? C[c] : 'transparent', border: on ? 'none' : '2px dashed oklch(0.88 0.01 260)' }} />;
              })}
            </div>
            <div className={s.barCount} style={{ background: STRONG[c] ?? C[c] }}>{st.tally[j]}</div>
          </div>
        ))}
      </div>
    </>
  );
}
