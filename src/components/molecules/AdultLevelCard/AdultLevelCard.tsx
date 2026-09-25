import { Card, Chip } from '@/components/atoms';
import s from './AdultLevelCard.module.css';

/** help === null → not played. 0 → on their own. 1–2 → a little support. ≥ 3 → needs more support (+ tip). */
export interface CurriculumRef {
  area: string;
  /** verbatim Lgr22 centralt innehåll */
  text: string;
}

export function AdultLevelCard({ title, centralt, help, tip }: { title: string; centralt: CurriculumRef[]; help: number | null; tip: string }) {
  const [label, tone] =
    help === null ? ['Inte spelad', 'neutral'] as const
    : help === 0 ? ['Klarade själv', 'green'] as const
    : help <= 2 ? ['Lite stöd', 'yellow'] as const
    : ['Behöver mer stöd', 'red'] as const;
  return (
    <Card gap={6}>
      <div className={s.head}>
        <div className={s.title}>{title}</div>
        <div className={s.spacer} />
        <Chip tone={tone}>{label}</Chip>
      </div>
      <ul className={s.lgr}>
        {centralt.map((c) => (
          <li key={c.text}>
            <span className={s.area}>{c.area}:</span> ”{c.text}”
          </li>
        ))}
      </ul>
      {help !== null && help >= 3 && <div className={s.tip}>{tip}</div>}
    </Card>
  );
}
