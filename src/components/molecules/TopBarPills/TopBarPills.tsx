import { BookIcon } from '@/components/atoms';
import s from './TopBarPills.module.css';

export function WorldPill({ children }: { children: string }) {
  return <h1 className={s.world}>{children}</h1>;
}

export function WordCountPill({ count }: { count: number }) {
  return (
    <div className={s.words}>
      <BookIcon />
      {count} ord
    </div>
  );
}
