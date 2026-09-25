import { Cloud, Figur } from '@/components/atoms';
import type { Obstacle } from '@/data/types';
import { useLayout } from '@/hooks/useLayout';
import { currentLevel, useGame } from '@/store/gameStore';
import { useShallow } from 'zustand/react/shallow';
import { AppleTree, Birds, Gate, River, Stones, Troll, Wall } from './obstacles';
import s from './LevelScene.module.css';

const OBSTACLES: Record<Obstacle, typeof Wall> = { wall: Wall, river: River, stones: Stones, tree: AppleTree, troll: Troll, gate: Gate, birds: Birds };

/** The 390×226 scene: sky, sun, clouds, hills, ground, the level's obstacle and the walking figure. */
export function LevelScene() {
  const { sceneScale } = useLayout();
  const st = useGame(useShallow((s) => ({ added: s.added, avatar: s.avatar, charX: s.charX, found: s.found, gone: s.gone, lv: s.lv, pat: s.pat, phase: s.phase, pile: s.pile, si: s.si, sorted: s.sorted, walking: s.walking })));
  const L = currentLevel(st);
  const Ob = OBSTACLES[L.ob];

  return (
    <div className={s.scene} aria-hidden style={{ transform: `scale(${sceneScale})` }}>
      <div className={s.sunGlow} />
      <div className={s.sun} />
      <Cloud top={84} width={80} height={24} opacity={0.85} duration={34} delay={-14} />
      <Cloud top={44} width={56} height={18} opacity={0.6} duration={48} delay={-36} />
      <div className={s.hill} style={{ left: -80, top: 130, width: 280, height: 180, background: 'oklch(0.78 0.12 145)' }} />
      <div className={s.hill} style={{ left: 180, top: 116, width: 300, height: 200, background: 'oklch(0.74 0.12 145)' }} />
      <div className={s.ground} />

      <Ob base={L.base ?? 0} added={st.added} gone={st.gone} pat={st.pat} pile={st.pile} found={st.found} sorted={st.sorted} phase={st.phase} />

      <div className={s.char} style={{ left: `${st.charX}%` }}>
        <div style={{ animation: st.walking ? 'mv-walk .34s ease-in-out infinite' : 'mv-bob 2.2s ease-in-out infinite', transformOrigin: '50% 100%' }}>
          <Figur {...st.avatar} size={58} />
        </div>
      </div>
    </div>
  );
}
