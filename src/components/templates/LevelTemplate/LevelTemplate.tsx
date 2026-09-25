import { useRef, type ReactNode } from 'react';
import { useLayout } from '@/hooks/useLayout';
import { useOnChange } from '@/hooks/useOnChange';
import { slideIn } from '@/lib/motion';
import s from './LevelTemplate.module.css';

export interface LevelTemplateProps {
  sky: string;
  scene: ReactNode;
  hud: ReactNode;
  /** workspace content */
  children: ReactNode;
  /** changes whenever a new step or phase starts – slides the workspace in */
  stepKey: string;
}

/** Scene on top (mobile) or left (desktop) and the paper workspace. */
export function LevelTemplate({ sky, scene, hud, children, stepKey }: LevelTemplateProps) {
  const L = useLayout();
  const wsRef = useRef<HTMLDivElement>(null);
  useOnChange(stepKey, () => slideIn(wsRef.current));

  return (
    <div className={s.screen} data-screen-label="Bana">
      <div className={s.pane} style={{ width: L.paneW, height: L.paneH, background: sky }}>
        {scene}
        {hud}
      </div>
      <div ref={wsRef} className={s.workspace} style={{ left: L.wsLeft, top: L.wsTop, borderRadius: L.wsRadius, padding: L.wsPad }}>
        {children}
      </div>
    </div>
  );
}
