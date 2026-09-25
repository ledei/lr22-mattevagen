import s from './StepProgress.module.css';

export type DotState = 'done' | 'current' | 'future';

const BG: Record<DotState, string> = { done: 'var(--green)', current: 'var(--orange-strong)', future: 'var(--surface-muted)' };

/** Step dots (number / ✓) and the "Hjälp mig" button. */
export function StepProgress({ dots, onHelp }: { dots: DotState[]; onHelp: () => void }) {
  return (
    <div className={s.row}>
      <span className="sr-only">
        Steg {Math.max(0, dots.indexOf('current')) + 1} av {dots.length}
      </span>
      {dots.map((d, i) => (
        <div key={i} aria-hidden className={s.dot} style={{ background: BG[d], color: d === 'future' ? 'var(--ink-faint)' : 'var(--white)' }}>
          {d === 'done' ? '✓' : i + 1}
        </div>
      ))}
      <div className={s.spacer} />
      <button type="button" className={`${s.help} touch-44`} onClick={onHelp}>
        Hjälp mig
      </button>
    </div>
  );
}
