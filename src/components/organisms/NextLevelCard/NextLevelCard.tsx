import { Chip, ChunkyButton, Eyebrow } from '@/components/atoms';
import { LEVEL_COUNT, LV } from '@/data/levels';
import { useGame } from '@/store/gameStore';
import s from './NextLevelCard.module.css';

/** Desktop: "Nästa bana" card right of the map. */
export function NextLevelCard({ left, top }: { left: number; top: number }) {
  const { unlocked, done, openLevel } = useGame();
  const nx = LV[Math.min(unlocked, LEVEL_COUNT) - 1];
  const doneCount = Object.keys(done).length;
  return (
    <div className={s.card} style={{ left, top }}>
      {unlocked <= LEVEL_COUNT ? (
        <>
          <div className={s.head}>
            <Eyebrow size={12}>Nästa bana</Eyebrow>
            <div className={s.progress}>{doneCount} / {LEVEL_COUNT} klara</div>
          </div>
          <div className={s.name}>{nx.name}</div>
          <div className={s.chips}>
            <Chip tone="skill">{nx.skill}</Chip>
            <Chip tone="blue">{nx.steps.length} steg</Chip>
          </div>
          <div className={s.intro}>{nx.intro}</div>
          <ChunkyButton tone="orange" height={50} fontSize={21} radius={16} depth={5} style={{ paddingTop: 3 }} onClick={() => openLevel(unlocked)}>
            Spela
          </ChunkyButton>
        </>
      ) : (
        <>
          <div className={s.name}>Värld 1 är klar!</div>
          <div className={s.intro}>Alla ord i Gröna dalen är dina. Öknen väntar vid slottet.</div>
        </>
      )}
    </div>
  );
}
