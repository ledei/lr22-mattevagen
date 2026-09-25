import { Eyebrow, Figur } from '@/components/atoms';
import type { Avatar, MathWord } from '@/data/types';
import s from './RewardCards.module.css';

/** "Nytt matteord i din ordbok" – pops in with scale .8 rotate(−4deg) → 1. */
export function RewardWordCard({ word, shown }: { word: MathWord; shown: boolean }) {
  return (
    <div className={s.word} style={{ transform: shown ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-4deg)' }}>
      <Eyebrow size={12} spacing=".08em" color="oklch(0.5 0.14 250)">Nytt matteord i din ordbok</Eyebrow>
      <div className={s.w}>{word.w}</div>
      <div className={s.d}>{word.d}</div>
      <div className={s.ex}>{word.ex}</div>
    </div>
  );
}

/** "Nytt föremål": the figure wearing the new item, floating. */
export function RewardItemCard({ name, preview }: { name: string; preview: Avatar }) {
  return (
    <div className={s.item}>
      <div className={s.fig}>
        <Figur {...preview} size={62} />
      </div>
      <div className={s.itemText}>
        <Eyebrow size={12} spacing=".08em" color="oklch(0.6 0.16 45)">Nytt föremål</Eyebrow>
        <div className={s.itemName}>{name}</div>
      </div>
    </div>
  );
}

/** Spaced repetition teaser. */
export function AgainNote({ text }: { text: string }) {
  return (
    <div className={s.again}>
      <strong>Kommer tillbaka:</strong> {text}
    </div>
  );
}
