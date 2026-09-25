import type { MathWord } from '@/data/types';
import s from './WordCard.module.css';

/** Card in "Min ordbok". Locked cards show "? ? ?" with a dashed border. */
export function WordCard({ word, open, from, delay }: { word: MathWord; open: boolean; from: string; delay: number }) {
  return (
    <div className={`${s.card} ${open ? s.open : s.locked}`} style={{ animationDelay: `${delay}ms` }}>
      <div className={s.head}>
        <div className={s.word}>{open ? word.w : '? ? ?'}</div>
        <div className={s.from}>{from}</div>
      </div>
      {open && (
        <>
          <div className={s.def}>{word.d}</div>
          <div className={s.ex}>{word.ex}</div>
        </>
      )}
    </div>
  );
}
