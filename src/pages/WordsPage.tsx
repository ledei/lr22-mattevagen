import { SegmentedControl } from '@/components/molecules';
import { AdultReport, WordBook } from '@/components/organisms';
import { ColumnTemplate } from '@/components/templates';
import { useLayout } from '@/hooks/useLayout';
import { useGame } from '@/store/gameStore';
import { useShallow } from 'zustand/react/shallow';
import s from './WordsPage.module.css';

export function WordsPage() {
  const { navH, colPadX } = useLayout();
  const { wtab, setWordsTab } = useGame(useShallow((s) => ({ wtab: s.wtab, setWordsTab: s.setWordsTab })));

  return (
    <ColumnTemplate label="Ord" background="var(--words-bg)" bottom={navH} padding={`26px ${Math.max(18, colPadX)}px 20px`} gap={14} scroll>
      <div className={s.head}>
        <h1 className={s.title}>{wtab === 'kid' ? 'Min ordbok' : 'För vuxna'}</h1>
        <SegmentedControl variant="compact" options={[['kid', 'Mina ord'], ['adult', 'För vuxna']]} value={wtab} onChange={setWordsTab} />
      </div>
      {wtab === 'kid' ? <WordBook /> : <AdultReport />}
    </ColumnTemplate>
  );
}
