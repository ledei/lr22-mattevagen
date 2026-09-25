import { Chip } from '@/components/atoms';
import s from './CoverageRow.module.css';

/** Curriculum area → levels → "d/n". */
export function CoverageRow({ name, levels, done, total }: { name: string; levels: string; done: number; total: number }) {
  return (
    <div className={s.row}>
      <div className={s.text}>
        <div className={s.name}>{name}</div>
        <div className={s.levels}>{levels}</div>
      </div>
      {total === 0 ? (
        <Chip tone="neutral">Värld 2</Chip>
      ) : (
        <Chip tone={done === total ? 'green' : 'neutral'}>
          {done}/{total}
        </Chip>
      )}
    </div>
  );
}
