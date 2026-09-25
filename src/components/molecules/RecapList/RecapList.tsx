import { Card, Eyebrow, NumberCircle } from '@/components/atoms';
import s from './RecapList.module.css';

/** "Så här löste du det": every step with ✓, title and result. */
export function RecapList({ steps }: { steps: { title: string; done: string }[] }) {
  return (
    <Card padding="16px">
      <Eyebrow>Så här löste du det</Eyebrow>
      {steps.map((st, i) => (
        <div key={i} className={s.row}>
          <NumberCircle size={26} bg="var(--green)" fontSize={14} display={false}>✓</NumberCircle>
          <div className={s.title}>{st.title}</div>
          <div className={s.spacer} />
          <div className={s.done}>{st.done}</div>
        </div>
      ))}
    </Card>
  );
}
