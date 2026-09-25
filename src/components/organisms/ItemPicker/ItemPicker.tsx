import { ItemTile, SegmentedControl } from '@/components/molecules';
import { ITEMS } from '@/data/levels';
import type { Slot } from '@/data/types';
import { useGame } from '@/store/gameStore';
import { useShallow } from 'zustand/react/shallow';
import s from './ItemPicker.module.css';

const TABS: [Slot, string][] = [['hat', 'Hatt'], ['shirt', 'Tröja'], ['shoes', 'Skor'], ['skin', 'Figur']];

/** Tabs Hatt / Tröja / Skor / Figur and a 3-column tile grid. */
export function ItemPicker() {
  const { tab, setTab, avatar, inventory, pickItem } = useGame(useShallow((s) => ({ tab: s.tab, setTab: s.setTab, avatar: s.avatar, inventory: s.inventory, pickItem: s.pickItem })));
  return (
    <div className={s.sheet}>
      <SegmentedControl options={TABS} value={tab} onChange={setTab} />
      <div className={s.grid}>
        {ITEMS[tab].map((it) => {
          const locked = !!it.lv && !inventory.includes(it.id);
          return (
            <ItemTile
              key={it.id}
              name={it.name}
              preview={{ ...avatar, [tab]: it.id }}
              selected={avatar[tab] === it.id}
              locked={locked}
              lockText={it.lv === 7 ? 'Lös gåtan' : `Klara bana ${it.lv}`}
              onPick={() => { if (!locked) pickItem(tab, it.id); }}
            />
          );
        })}
      </div>
    </div>
  );
}
