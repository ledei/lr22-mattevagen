import { NavButton } from '@/components/molecules';
import { useLayout } from '@/hooks/useLayout';
import { useGame, type Screen } from '@/store/gameStore';
import s from './BottomNav.module.css';

const ITEMS: [Exclude<Screen, 'level' | 'reward'>, string][] = [['avatar', 'Figur'], ['map', 'Karta'], ['words', 'Ord']];

/** Full-width bottom menu on mobile, floating 360×76 pill on desktop. */
export function BottomNav() {
  const { wide, LW } = useLayout();
  const { screen, navigate } = useGame();
  return (
    <nav className={`${s.nav} ${wide ? s.wide : s.mobile}`} style={wide ? { left: (LW - 360) / 2 } : undefined}>
      {ITEMS.map(([k, label]) => (
        <NavButton key={k} kind={k} label={label} active={screen === k} onClick={() => navigate(k)} />
      ))}
    </nav>
  );
}
