import { WordCard } from '@/components/molecules';
import { LV } from '@/data/levels';
import { useGame } from '@/store/gameStore';
import s from './WordBook.module.css';

/** "Mina ord": 7 cards, locked ones show "? ? ?". */
export function WordBook() {
  const done = useGame((st) => st.done);
  return (
    <>
      <p className={s.lead}>Orden du har lärt dig. Använd dem när du pratar matte!</p>
      {LV.map((x, i) => {
        const open = !!done[x.id];
        return <WordCard key={x.id} word={x.word} open={open} delay={i * 70} from={open ? x.name : `Klara ${x.riddle ? 'gåtan' : 'bana ' + x.id}`} />;
      })}
    </>
  );
}
