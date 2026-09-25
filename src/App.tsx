import { BottomNav } from '@/components/organisms';
import { GameStage } from '@/components/templates';
import { AvatarPage, LevelPage, MapPage, RewardPage, WordsPage } from '@/pages';
import { useGame } from '@/store/gameStore';
import { readDevOptions } from '@/lib/devOptions';

const PAGES = { map: MapPage, level: LevelPage, reward: RewardPage, avatar: AvatarPage, words: WordsPage };
const { layout } = readDevOptions();

export default function App() {
  const screen = useGame((s) => s.screen);
  const Page = PAGES[screen];
  const showNav = screen === 'map' || screen === 'avatar' || screen === 'words';
  return (
    <GameStage layoutMode={layout} nav={showNav ? <BottomNav /> : null}>
      <Page />
    </GameStage>
  );
}
