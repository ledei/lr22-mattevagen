import { NavIcon } from '@/components/atoms';
import s from './NavButton.module.css';

export function NavButton({ kind, label, active, onClick }: { kind: 'avatar' | 'map' | 'words'; label: string; active: boolean; onClick: () => void }) {
  const color = active ? 'var(--white)' : 'var(--ink)';
  return (
    <button type="button" className={s.btn} onClick={onClick} aria-current={active ? 'page' : undefined} style={{ background: active ? 'var(--orange-strong)' : 'transparent', color }}>
      <div className={s.icon}>
        <NavIcon kind={kind} color={color} />
      </div>
      <span>{label}</span>
    </button>
  );
}
