import { Figur } from '@/components/atoms';
import type { Avatar } from '@/data/types';
import s from './ItemTile.module.css';

export interface ItemTileProps {
  name: string;
  preview: Avatar;
  selected: boolean;
  locked: boolean;
  lockText: string;
  onPick: () => void;
}

/** Tile in the Figur grid: preview of the figure wearing the item. */
export function ItemTile({ name, preview, selected, locked, lockText, onPick }: ItemTileProps) {
  return (
    <button
      type="button"
      className={s.tile}
      onClick={onPick}
      aria-pressed={selected}
      aria-disabled={locked}
      style={{ borderColor: selected ? 'var(--orange)' : 'oklch(0.92 0.01 260)', background: selected ? 'oklch(0.97 0.04 70)' : 'var(--white)' }}
    >
      <div style={{ opacity: locked ? 0.35 : 1 }}>
        <Figur {...preview} size={52} />
      </div>
      <div className={s.name}>{name}</div>
      {locked && <div className={s.lock}>{lockText}</div>}
    </button>
  );
}
