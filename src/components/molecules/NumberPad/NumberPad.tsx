import { ChunkyButton } from '@/components/atoms';
import { pop } from '@/lib/motion';
import s from './NumberPad.module.css';

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export interface NumberPadProps {
  onDigit: (d: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
}

/** 5×2 digit grid plus ⌫ (1fr) and Klar (2fr). Active recall – never multiple choice. */
export function NumberPad({ onDigit, onDelete, onSubmit }: NumberPadProps) {
  return (
    <div className={s.pad}>
      <div className={s.digits}>
        {DIGITS.map((d) => (
          <ChunkyButton key={d} tone="key" height={48} fontSize={24} radius={14} depth={4} press={3} onClick={(e) => { pop(e.currentTarget); onDigit(d); }} aria-label={d}>
            {d}
          </ChunkyButton>
        ))}
      </div>
      <div className={s.actions}>
        <ChunkyButton tone="keyMuted" bodyFont height={50} fontSize={20} radius={14} depth={4} press={3} onClick={onDelete} aria-label="Radera">
          ⌫
        </ChunkyButton>
        <ChunkyButton tone="green" height={50} fontSize={22} radius={14} depth={4} press={3} onClick={onSubmit}>
          Klar
        </ChunkyButton>
      </div>
    </div>
  );
}
