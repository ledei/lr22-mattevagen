import s from './StepProgress.module.css';

export type DotState = 'done' | 'current' | 'future';

const BG: Record<DotState, string> = { done: 'var(--green)', current: 'var(--orange)', future: 'oklch(0.92 0.01 260)' };

/** Step dots (number / ✓) and the "Hjälp mig" button. */
export function StepProgress({ dots, onHelp }: { dots: DotState[]; onHelp: () => void }) {
  return (
    <div className={s.row}>
      {dots.map((d, i) => (
        <div key={i} className={s.dot} style={{ background: BG[d], color: d === 'future' ? 'oklch(0.55 0.03 260)' : 'var(--white)' }}>
          {d === 'done' ? '✓' : i + 1}
        </div>
      ))}
      <div className={s.spacer} />
      <button type="button" className={s.help} onClick={onHelp}>
        Hjälp mig
      </button>
    </div>
  );
}
