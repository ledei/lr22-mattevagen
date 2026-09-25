import { useRef } from 'react';
import { AnswerEquation, MessageBubble, NumberPad, StepProgress, type DotState } from '@/components/molecules';
import type { Board } from '@/data/types';
import { useOnChange } from '@/hooks/useOnChange';
import { messageIn, shake } from '@/lib/motion';
import { currentLevel, currentStep, useGame } from '@/store/gameStore';
import { ChartBoard, NumberLineBoard, PatternBoard, ShapesBoard, ShareBoard, TenFrameBoard } from '../boards';
import s from './LevelPanels.module.css';

const BOARDS: Record<Board, () => React.JSX.Element> = { frame: TenFrameBoard, pattern: PatternBoard, line: NumberLineBoard, share: ShareBoard, shapes: ShapesBoard, chart: ChartBoard };

/** Phase 2: the generic step engine – step dots, help, board, message, and the number pad for `type` steps. */
export function WorkPanel() {
  const st = useGame();
  const L = currentLevel(st);
  const step = currentStep(st);
  const BoardView = BOARDS[L.board];
  const boxRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);

  useOnChange(st.stepWrong, (prev) => { if (st.stepWrong > prev) shake(boxRef.current); });
  useOnChange(st.msg, () => { if (st.msg) messageIn(msgRef.current); });

  const dots: DotState[] = L.steps.map((_, i) => (i < st.si || (i === st.si && st.locked) ? 'done' : i === st.si ? 'current' : 'future'));

  return (
    <>
      <StepProgress dots={dots} onHelp={st.askHelp} />
      <div className={s.stepHead}>
        <h2 className={s.stepTitle}>{step.title}</h2>
        <p className={s.stepText}>{step.text}</p>
      </div>
      <BoardView />
      {st.msg && <MessageBubble ref={msgRef} kind={st.msgKind} text={st.msg} />}
      {step.t === 'type' && (
        <>
          <AnswerEquation eqL={step.eqL} eqR={step.eqR} value={st.input} correct={st.fb} answer={step.ans} boxRef={boxRef} />
          <NumberPad onDigit={st.press} onDelete={st.del} onSubmit={st.submit} />
        </>
      )}
    </>
  );
}
