import { ChunkyButton } from '@/components/atoms';
import { RecapList } from '@/components/molecules';
import type { Level } from '@/data/types';
import s from './LevelPanels.module.css';

/** Phase 3: finale, recap of every step and the summary equation. */
export function DonePanel({ level, onFinish }: { level: Level; onFinish: () => void }) {
  return (
    <>
      <h1 className={s.finale}>{level.finale}</h1>
      <RecapList steps={level.steps.map((x) => ({ title: x.title, done: x.done }))} />
      <div className={s.recap}>{level.recap}</div>
      <ChunkyButton style={{ marginTop: 'auto', flexShrink: 0 }} onClick={onFinish}>
        Vidare
      </ChunkyButton>
    </>
  );
}
