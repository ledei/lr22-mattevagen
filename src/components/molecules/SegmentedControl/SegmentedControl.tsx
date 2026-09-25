import s from './SegmentedControl.module.css';

export interface SegmentedControlProps<K extends string> {
  options: [K, string][];
  value: K;
  onChange: (k: K) => void;
  /** 'wide' = 4-col (Figur tabs), 'compact' = 2-col (Ord tabs) */
  variant?: 'wide' | 'compact';
}

export function SegmentedControl<K extends string>({ options, value, onChange, variant = 'wide' }: SegmentedControlProps<K>) {
  return (
    <div role="tablist" className={`${s.root} ${s[variant]}`} style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0,1fr))` }}>
      {options.map(([k, label]) => {
        const on = k === value;
        return (
          <button key={k} type="button" role="tab" aria-selected={on} className={`${s.tab} touch-44`} onClick={() => onChange(k)} style={{ background: on ? 'var(--white)' : 'transparent', color: on ? 'var(--ink)' : 'var(--ink-soft)' }}>
            {label}
          </button>
        );
      })}
    </div>
  );
}
