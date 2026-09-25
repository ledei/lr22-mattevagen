import { Chip, ChunkyButton, SpeakButton } from '@/components/atoms';
import { StepList } from '@/components/molecules';
import type { Level } from '@/data/types';
import s from './LevelPanels.module.css';

/** Phase 1: skill + word chips, title, intro and the named small steps. */
export function IntroPanel({ level, onBegin }: { level: Level; onBegin: () => void }) {
  return (
    <>
      <div className={s.chips}>
        <Chip tone="skill" size="md">{level.skill}</Chip>
        <Chip tone="blue" size="md">Dagens ord: {level.word.w}</Chip>
      </div>
      <div className={s.titleRow}>
        <h2 className={s.title}>{level.name}</h2>
        <SpeakButton
          speechKey={`intro-${level.id}`}
          text={`${level.name}. ${level.intro} Vi gör det i små steg. ${level.steps.map((x, i) => `${i + 1}: ${x.title}.`).join(' ')}`}
        />
      </div>
      <p className={s.intro}>{level.intro}</p>
      <StepList titles={level.steps.map((x) => x.title)} />
      <ChunkyButton style={{ marginTop: 'auto', flexShrink: 0 }} onClick={onBegin}>
        Kör!
      </ChunkyButton>
    </>
  );
}
