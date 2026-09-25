import { BookIcon } from '@/components/atoms';
import s from './TopBarPills.module.css';

export function WorldPill({ children }: { children: string }) {
  return <div className={s.world}>{children}</div>;
}

export function WordCountPill({ count }: { count: number }) {
  return (
    <div className={s.words}>
      <BookIcon />
      {count} ord
    </div>
  );
}
