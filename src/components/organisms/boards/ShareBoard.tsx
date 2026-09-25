import { FRIENDS } from '@/data/levels';
import { pop } from '@/lib/motion';
import { currentStep, showNums, useGame } from '@/store/gameStore';
import { C } from '@/styles/colors';
import s from './boards.module.css';

/** Three baskets. Tap a basket to give 1 apple; tap an apple to put it back. */
export function ShareBoard() {
  const st = useGame();
  const t = currentStep(st).t;
  const nums = useGame(showNums);
  const shareTap = t === 'share' && st.phase === 'work' && !st.locked && st.pile > 0;

  return (
    <>
      <div className={s.share}>
        {st.baskets.map((n, i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            aria-label={`Korg ${i + 1}: ${n} äpplen`}
            className={s.basketCol}
            style={{ cursor: shareTap ? 'pointer' : 'default' }}
            onClick={(e) => { pop(e.currentTarget); st.tapBasket(i); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); st.tapBasket(i); } }}
          >
            <div className={s.friendHead} style={{ background: FRIENDS[i].head }} />
            <div className={s.basket} style={{ borderColor: shareTap ? C.orange : 'oklch(0.68 0.09 60)' }}>
              {Array.from({ length: n }, (_, k) => (
                <div key={k} className={s.basketApple} onClick={(e) => { e.stopPropagation(); st.returnApple(i); }} />
              ))}
            </div>
            <div className={s.basketCount} style={{ opacity: nums || t === 'share' || st.locked ? 1 : 0 }}>
              {n}
            </div>
          </div>
        ))}
      </div>
      {t === 'share' && (
        <div className={s.pile}>
          <div className={s.pileLabel}>I trädet:</div>
          <div className={s.pileDots}>
            {Array.from({ length: st.pile }, (_, k) => (
              <div key={k} className={s.pileDot} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
