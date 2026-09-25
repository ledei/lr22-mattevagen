import s from './LevelHud.module.css';

/** ✕ back to map, "Bana n · namn" pill, optional "Extra stöd" chip. */
export function LevelHud({ title, support, onExit }: { title: string; support: boolean; onExit: () => void }) {
  return (
    <div className={s.hud}>
      <button type="button" className={s.close} onClick={onExit} aria-label="Till kartan">
        ✕
      </button>
      <div className={s.title}>{title}</div>
      <div className={s.spacer} />
      {support && <div className={s.support}>Extra stöd</div>}
    </div>
  );
}
