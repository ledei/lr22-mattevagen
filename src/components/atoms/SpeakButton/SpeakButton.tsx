import { useSyncExternalStore } from 'react';
import { canSpeak, speak, speechStore } from '@/lib/speech';
import s from './SpeakButton.module.css';

export interface SpeakButtonProps {
  /** what is read aloud */
  text: string;
  /** stable id so a second tap stops the reading */
  speechKey: string;
  label?: string;
  size?: number;
}

/** Round speaker button. Hidden on devices without speech synthesis. */
export function SpeakButton({ text, speechKey, label = 'Läs upp', size = 40 }: SpeakButtonProps) {
  const current = useSyncExternalStore(speechStore.subscribe, speechStore.getKey, () => null);
  if (!canSpeak) return null;
  const on = current === speechKey;
  return (
    <button
      type="button"
      className={`${s.btn} ${on ? s.on : ''} touch-44`}
      style={{ width: size, height: size }}
      aria-label={on ? 'Sluta läsa' : label}
      aria-pressed={on}
      onClick={() => speak(text, speechKey)}
    >
      <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} aria-hidden>
        <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path className={s.wave1} d="M15.2 9.2a4 4 0 0 1 0 5.6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path className={s.wave2} d="M17.8 6.6a7.6 7.6 0 0 1 0 10.8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
