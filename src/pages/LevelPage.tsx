import { LevelHud } from '@/components/molecules';
import { DonePanel, IntroPanel, LevelScene, WorkPanel } from '@/components/organisms';
import { LevelTemplate } from '@/components/templates';
import { currentLevel, isSupportActive, useGame } from '@/store/gameStore';

export function LevelPage() {
  const st = useGame();
  const L = currentLevel(st);

  return (
    <LevelTemplate
      sky={L.riddle ? 'var(--sky-riddle)' : 'var(--sky)'}
      scene={<LevelScene />}
      hud={<LevelHud title={L.riddle ? 'Gåta · Trollet' : `Bana ${L.id} · ${L.name}`} support={isSupportActive(st)} onExit={st.exitLevel} />}
      stepKey={`${st.phase}:${st.si}`}
    >
      {st.phase === 'intro' && <IntroPanel level={L} onBegin={st.begin} />}
      {st.phase === 'work' && <WorkPanel />}
      {st.phase === 'done' && <DonePanel level={L} onFinish={st.finish} />}
    </LevelTemplate>
  );
}
