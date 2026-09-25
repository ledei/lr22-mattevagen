import type { Ref } from 'react';
import s from './MessageBubble.module.css';

/** Help (yellow) or success (green) bubble. */
export function MessageBubble({ kind, text, ref }: { kind: 'ok' | 'help' | ''; text: string; ref?: Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={`${s.msg} ${kind === 'ok' ? s.ok : s.help}`}>
      {text}
    </div>
  );
}
