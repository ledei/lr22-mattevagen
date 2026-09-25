import { FRIENDS } from '@/data/levels';
import { pop } from '@/lib/motion';
import { currentStep, showNums, useGame } from '@/store/gameStore';
import { useShallow } from 'zustand/react/shallow';
import { C } from '@/styles/colors';
import s from './boards.module.css';

/** Three baskets. Tap a basket to give 1 apple; − (or tapping an apple) puts one back. */
export function ShareBoard() {
  const st = useGame(useShallow((s) => ({ baskets: s.baskets, locked: s.locked, lv: s.lv, phase: s.phase, pile: s.pile, returnApple: s.returnApple, si: s.si, tapBasket: s.tapBasket })));
  const t = currentStep(st).t;
  const nums = useGame(showNums);
  const canReturn = t === 'share' && st.phase === 'work' && !st.locked;
  const shareTap = canReturn && st.pile > 0;

  return (
    <>
      <div className={s.share}>
        {st.baskets.map((n, i) => (
          <div key={i} className={s.basketCol}>
            <button
              type="button"
              className={s.basketBtn}
              aria-label={`Ge ett äpple till kompis ${i + 1}. Har ${n}.`}
              style={{ cursor: shareTap ? 'pointer' : 'default' }}
              onClick={(e) => { pop(e.currentTarget); st.tapBasket(i); }}
            >
              <div className={s.friendHead} style={{ background: FRIENDS[i].head }} />
              <div className={s.basket} style={{ borderColor: shareTap ? C.orange : 'oklch(0.68 0.09 60)' }}>
                {Array.from({ length: n }, (_, k) => (
                  // Pointer shortcut; the − button is the accessible way to take an apple back.
                  <span key={k} className={s.basketApple} onClick={(e) => { e.stopPropagation(); st.returnApple(i); }} />
                ))}
              </div>
            </button>
            {canReturn && n > 0 && (
              <button type="button" className={`${s.returnBtn} touch-44`} aria-label={`Ta tillbaka ett äpple från kompis ${i + 1}`} onClick={(e) => { pop(e.currentTarget); st.returnApple(i); }}>
                −
              </button>
            )}
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
