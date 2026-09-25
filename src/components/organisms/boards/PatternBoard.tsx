import { ChunkyButton } from '@/components/atoms';
import { PAT_LENGTH } from '@/data/levels';
import { pop } from '@/lib/motion';
import { currentStep, showNums, useGame } from '@/store/gameStore';
import { useShallow } from 'zustand/react/shallow';
import { C } from '@/styles/colors';
import s from './boards.module.css';

/** The bridge pattern R-B-B, grouped in three "del". */
export function PatternBoard() {
  const st = useGame(useShallow((s) => ({ locked: s.locked, lv: s.lv, pat: s.pat, pickColor: s.pickColor, si: s.si })));
  const t = currentStep(st).t;
  const nums = useGame(showNums);
  const showGroups = (st.si === 1 && nums) || st.si === 2 || (st.si === 1 && st.locked);

  const plank = (i: number) => {
    const c = st.pat[i];
    return {
      background: c ? C[c] : 'transparent',
      border: c ? 'none' : i === st.pat.length && t === 'pattern' ? `3px dashed ${C.white}` : '2px dashed oklch(1 0 0 / 0.6)',
      boxShadow: c ? 'inset -3px -3px 0 oklch(0 0 0 / 0.14)' : 'none',
    };
  };

  return (
    <>
      <div className={s.pattern} aria-label={`Bron: ${st.pat.length} av ${PAT_LENGTH} plankor`}>
        {[0, 1, 2].map((g) => (
          <div key={g} className={s.patGroup}>
            <div className={s.patPlanks}>
              {[0, 1, 2].map((k) => (
                <div key={k} className={s.patPlank} style={plank(g * 3 + k)} />
              ))}
            </div>
            <div className={s.patBracket} style={{ opacity: showGroups ? 1 : 0 }}>
              del {g + 1}
            </div>
          </div>
        ))}
      </div>
      {t === 'pattern' && (
        <div className={s.patPick}>
          <ChunkyButton tone="red" height={74} fontSize={22} radius={18} depth={5} onClick={(e) => { pop(e.currentTarget); st.pickColor('R'); }}>
            Röd
          </ChunkyButton>
          <ChunkyButton tone="blue" height={74} fontSize={22} radius={18} depth={5} onClick={(e) => { pop(e.currentTarget); st.pickColor('B'); }}>
            Blå
          </ChunkyButton>
        </div>
      )}
    </>
  );
}
