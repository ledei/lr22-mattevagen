import { Eyebrow, NumberCircle } from '@/components/atoms';
import s from './StepList.module.css';

/** "Vi gör det i små steg" – every step visible from the start. */
export function StepList({ titles }: { titles: string[] }) {
  return (
    <div className={s.box}>
      <Eyebrow>Vi gör det i små steg</Eyebrow>
      {titles.map((t, i) => (
        <div key={i} className={s.row}>
          <NumberCircle>{i + 1}</NumberCircle>
          <div className={s.title}>{t}</div>
        </div>
      ))}
    </div>
  );
}
