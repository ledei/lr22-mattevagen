import s from './PlayPill.module.css';

/** "{Name} Spela ▸" – 70 px above the current node. */
export function PlayPill({ name, x, y, onClick }: { name: string; x: number; y: number; onClick: () => void }) {
  return (
    <button type="button" className={`${s.pill} touch-44`} style={{ left: x, top: y - 70 }} onClick={onClick}>
      {name}
      <span className={s.play}>Spela ▸</span>
    </button>
  );
}
