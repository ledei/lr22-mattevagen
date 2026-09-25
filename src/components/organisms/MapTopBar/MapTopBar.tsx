import { WordCountPill, WorldPill } from '@/components/molecules';
import s from './MapTopBar.module.css';

export function MapTopBar({ words, wide }: { words: number; wide: boolean }) {
  return (
    <div className={s.bar} style={{ padding: wide ? '28px 36px 0' : '18px 16px 0' }}>
      <WorldPill>Värld 1 · Gröna dalen</WorldPill>
      <div className={s.spacer} />
      <WordCountPill count={words} />
    </div>
  );
}
