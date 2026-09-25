import type { Ref } from 'react';
import { C } from '@/styles/colors';
import s from './AnswerEquation.module.css';

export interface AnswerEquationProps {
  eqL?: string;
  eqR?: string;
  /** typed input */
  value: string;
  /** answered correctly – show the answer in a green box */
  correct: boolean;
  answer: number;
  boxRef?: Ref<HTMLDivElement>;
}

/** "7 + [?] = 10" with the answer box (84×60). */
export function AnswerEquation({ eqL, eqR, value, correct, answer, boxRef }: AnswerEquationProps) {
  const shown = correct ? String(answer) : value || '?';
  return (
    <div className={s.eq}>
      {eqL && <span>{eqL}</span>}
      <div
        ref={boxRef}
        className={s.box}
        aria-live="polite"
        style={{
          borderColor: correct ? C.green : C.orange,
          background: correct ? 'oklch(0.94 0.07 145)' : C.white,
          color: value || correct ? C.ink : 'oklch(0.82 0.02 260)',
        }}
      >
        {shown}
      </div>
      {eqR && <span>{eqR}</span>}
    </div>
  );
}
