import type { Ref } from 'react';
import { SpeakButton } from '@/components/atoms';
import s from './MessageBubble.module.css';

/** Help (yellow) or success (green) bubble, with an optional read-aloud button. */
export function MessageBubble({ kind, text, speechKey, ref }: { kind: 'ok' | 'help' | ''; text: string; speechKey?: string; ref?: Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={`${s.msg} ${kind === 'ok' ? s.ok : s.help}`}>
      <span className={s.text}>{text}</span>
      {speechKey && <SpeakButton speechKey={speechKey} text={text} size={32} />}
    </div>
  );
}
