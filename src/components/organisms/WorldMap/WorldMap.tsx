import { Cloud, Figur, Shimmer, Tree, Pond } from '@/components/atoms';
import { MapNode, PlayPill } from '@/components/molecules';
import { LEVEL_COUNT, LV, NODES } from '@/data/levels';
import { catmullRom } from '@/lib/curve';
import { useGame } from '@/store/gameStore';
import s from './WorldMap.module.css';

const PATH = catmullRom(NODES);
const MAP_TREES: [number, number, number, number][] = [
  [14, 448, 3.4, 0], [332, 540, 3.9, -0.7], [22, 250, 4.4, -1.4], [336, 370, 4.9, -2.1], [40, 96, 5.4, -2.8],
];

/** The 390×696 world map: path, nodes, house, castle and the avatar. Zooms into a node when a level opens. */
export function WorldMap() {
  const { unlocked, done, zoom, avatarNode, avatar, mapWalk, openLevel } = useGame();
  const current = Math.min(unlocked, LEVEL_COUNT);
  const cp = NODES[current];
  const an = NODES[avatarNode];
  const zp = zoom ? NODES[zoom] : null;

  return (
    <div
      className={s.map}
      style={{
        transform: zp ? 'scale(2.6)' : 'scale(1)',
        transformOrigin: zp ? `${zp.x}px ${zp.y}px` : '50% 50%',
        opacity: zp ? 0 : 1,
      }}
    >
      <div className={s.hill} style={{ left: -60, top: 380, width: 260, height: 260 }} />
      <div className={s.hill} style={{ left: 220, top: 140, width: 240, height: 240 }} />
      <Pond width={100} height={54} shadow={6} style={{ left: 262, top: 612 }}>
        <Shimmer left={22} top={14} width={34} height={7} opacity={0.8} duration={2.6} />
        <Shimmer left={52} top={28} width={18} height={5} opacity={0.7} duration={3.1} delay={-1} />
      </Pond>
      {MAP_TREES.map(([x, y, d, dl]) => (
        <Tree key={`${x}-${y}`} duration={d} delay={dl} style={{ left: x, top: y }} />
      ))}
      <Cloud top={170} width={72} height={22} opacity={0.5} duration={40} delay={-8} />
      <Cloud top={440} width={96} height={26} opacity={0.4} duration={55} delay={-30} />

      <svg width="390" height="696" className={s.path} aria-hidden>
        <path d={PATH} fill="none" stroke="oklch(0.78 0.07 80)" strokeWidth="36" strokeLinecap="round" />
        <path d={PATH} fill="none" stroke="oklch(0.94 0.05 85)" strokeWidth="27" strokeLinecap="round" />
        <path d={catmullRom(NODES.slice(0, Math.min(unlocked, LEVEL_COUNT + 1) + 1))} fill="none" stroke="oklch(0.86 0.13 85)" strokeWidth="9" strokeLinecap="round" strokeDasharray="1 16" className={s.donePath} />
      </svg>

      {/* home */}
      <div className={s.roof} />
      <div className={s.house} />
      <div className={s.door} />

      {/* castle */}
      <div className={s.tower} style={{ left: 228 }} />
      <div className={s.tower} style={{ left: 300 }} />
      <div className={s.towerTop} style={{ left: 228 }} />
      <div className={s.towerTop} style={{ left: 300 }} />
      <div className={s.keep} />
      <div className={s.gate} />
      <div className={s.castleLabel}>{unlocked > LEVEL_COUNT ? 'Värld 2 · Öknen – öppen!' : 'Värld 2 · Öknen'}</div>

      {LV.map((L) => {
        const p = NODES[L.id];
        return (
          <MapNode
            key={L.id}
            id={L.id}
            x={p.x}
            y={p.y}
            name={L.name}
            riddle={!!L.riddle}
            locked={L.id > unlocked}
            done={!!done[L.id]}
            current={L.id === unlocked}
            skill={L.skill}
            onOpen={() => openLevel(L.id)}
          />
        );
      })}

      {unlocked <= LEVEL_COUNT && <PlayPill name={LV[current - 1].name} x={cp.x} y={cp.y} onClick={() => openLevel(unlocked)} />}

      <div className={s.avatar} style={{ left: an.x + (an.x < 195 ? 40 : -86), top: an.y - 36 }}>
        <div style={{ animation: mapWalk ? 'mv-walk .34s ease-in-out infinite' : 'mv-bob 2.2s ease-in-out infinite', transformOrigin: '50% 100%' }}>
          <Figur {...avatar} size={46} />
        </div>
      </div>
    </div>
  );
}
