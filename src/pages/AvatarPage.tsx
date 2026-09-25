import { AvatarShowcase, ItemPicker } from '@/components/organisms';
import { ColumnTemplate } from '@/components/templates';
import { useLayout } from '@/hooks/useLayout';
import { useGame } from '@/store/gameStore';
import s from './AvatarPage.module.css';

export function AvatarPage() {
  const { navH, colPadX } = useLayout();
  const avatar = useGame((st) => st.avatar);
  const count = useGame((st) => st.inventory.length);

  return (
    <ColumnTemplate label="Figur" background="oklch(0.88 0.07 230)" bottom={navH} padding={`0 ${colPadX}px`}>
      <div className={s.head}>
        <h1 className={s.title}>Min figur</h1>
        <div className={s.count}>{count} av 7 föremål</div>
      </div>
      <AvatarShowcase avatar={avatar} />
      <ItemPicker />
    </ColumnTemplate>
  );
}
