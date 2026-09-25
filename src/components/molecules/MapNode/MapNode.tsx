import s from './MapNode.module.css';

export type NodeState = 'locked' | 'current' | 'done' | 'riddle';

const COLORS: Record<Exclude<NodeState, 'current'> | 'open', [string, string]> = {
  locked: ['var(--locked)', 'var(--locked-d)'],
  done: ['var(--green)', 'var(--green-d)'],
  riddle: ['var(--purple)', 'var(--purple-d)'],
  open: ['var(--orange)', 'var(--orange-d)'],
};

export interface MapNodeProps {
  id: number;
  x: number;
  y: number;
  riddle: boolean;
  locked: boolean;
  done: boolean;
  current: boolean;
  skill: string;
  name: string;
  onOpen: () => void;
}

/** A level on the map: 62px circle (riddle 74px), "3D" shadow, skill tag, pulsing halo when current. */
export function MapNode({ id, x, y, riddle, locked, done, current, skill, name, onOpen }: MapNodeProps) {
  const size = riddle ? 74 : 62;
  const [bg, shadow] = locked ? COLORS.locked : done ? COLORS.done : riddle ? COLORS.riddle : COLORS.open;
  return (
    <div className={s.wrap} style={{ left: x - size / 2, top: y - size / 2, width: size, height: size, animationDelay: `${id * 70}ms` }}>
      {current && (
        <>
          <div className={s.halo} />
          <div className={s.pulse} />
        </>
      )}
      <button
        type="button"
        className={s.node}
        onClick={onOpen}
        aria-label={`${name}${locked ? ' (låst)' : done ? ' (klar)' : ''}`}
        aria-disabled={locked}
        style={{ background: bg, boxShadow: `0 6px 0 ${shadow}`, color: locked ? 'var(--locked-ink)' : 'var(--white)', cursor: locked ? 'default' : 'pointer' }}
      >
        {done ? '✓' : riddle ? '?' : String(id)}
      </button>
      <div className={s.tag} style={{ opacity: locked ? 0.55 : 1 }}>
        {skill}
      </div>
    </div>
  );
}
