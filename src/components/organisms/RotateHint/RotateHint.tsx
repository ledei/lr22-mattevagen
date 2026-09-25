import { Figur } from '@/components/atoms';
import type { Avatar } from '@/data/types';
import s from './RotateHint.module.css';

/** Shown on a phone held sideways: the game is played in portrait. */
export function RotateHint({ avatar }: { avatar: Avatar }) {
  return (
    <div className={s.overlay} role="alertdialog" aria-labelledby="rotate-title" aria-describedby="rotate-text">
      <div className={s.row}>
        <Figur {...avatar} size={64} />
        <div className={s.phone} aria-hidden>
          <div className={s.notch} />
        </div>
      </div>
      <h1 id="rotate-title" className={s.title}>Vänd telefonen</h1>
      <p id="rotate-text" className={s.text}>Mattevägen spelas på höjden.</p>
    </div>
  );
}
