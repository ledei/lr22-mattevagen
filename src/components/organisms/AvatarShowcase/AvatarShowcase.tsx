import { Figur } from '@/components/atoms';
import type { Avatar } from '@/data/types';
import s from './AvatarShowcase.module.css';

/** Figur at 140 px on a round podium. */
export function AvatarShowcase({ avatar }: { avatar: Avatar }) {
  return (
    <div className={s.stage}>
      <div className={s.halo} />
      <div className={s.podium} />
      <div className={s.fig}>
        <Figur {...avatar} size={140} />
      </div>
    </div>
  );
}
