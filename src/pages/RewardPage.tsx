import { ChunkyButton } from '@/components/atoms';
import { AgainNote, RewardItemCard, RewardWordCard } from '@/components/organisms';
import { ColumnTemplate } from '@/components/templates';
import { useLayout } from '@/hooks/useLayout';
import { currentLevel, useGame } from '@/store/gameStore';
import s from './RewardPage.module.css';

export function RewardPage() {
  const { wide, colPadX } = useLayout();
  const st = useGame();
  const L = currentLevel(st);
  const r = st.reward;

  return (
    <ColumnTemplate label="Belöning" background="var(--reward-bg)" padding={wide ? `50px ${colPadX}px 120px` : `60px ${Math.max(22, colPadX)}px 30px`} gap={14}>
      <div className={s.bgCircle} />
      <div className={s.ring} />
      <h1 className={s.title}>Snyggt jobbat!</h1>
      <RewardWordCard word={L.word} shown={st.cardIn} />
      {r?.isNew && <RewardItemCard name={r.name} preview={{ ...st.avatar, [r.slot]: r.item }} />}
      <AgainNote text={L.again} />
      <div className={s.actions}>
        {r?.isNew && (
          <ChunkyButton height={58} fontSize={22} onClick={st.equip}>
            Ta på direkt
          </ChunkyButton>
        )}
        <ChunkyButton tone="white" height={58} fontSize={22} onClick={st.toMap}>
          Till kartan
        </ChunkyButton>
      </div>
    </ColumnTemplate>
  );
}
