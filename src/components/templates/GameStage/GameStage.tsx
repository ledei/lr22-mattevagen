import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { ConfettiBurst } from '@/components/atoms';
import { useElementSize } from '@/hooks/useElementSize';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { LayoutContext } from '@/hooks/useLayout';
import { useOnChange } from '@/hooks/useOnChange';
import { computeLayout, type LayoutMode } from '@/lib/layout';
import { screenIn } from '@/lib/motion';
import { useGame } from '@/store/gameStore';
import { SCREEN_BG } from '@/styles/colors';
import s from './GameStage.module.css';

export interface GameStageProps {
  layoutMode?: LayoutMode;
  /** the current page */
  children: ReactNode;
  /** bottom menu, rendered above the page */
  nav?: ReactNode;
  /** covers everything when a phone is held sideways */
  rotateHint?: ReactNode;
}

/**
 * Root template: a safe-area-inset fixed root, measured and drawn as a logical canvas
 * scaled to fill the window exactly. Hosts the page, the confetti layer and the bottom menu.
 */
export function GameStage({ layoutMode = 'Automatisk', children, nav, rotateHint }: GameStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const { w, h } = useElementSize(rootRef);
  const coarse = useMediaQuery('(pointer: coarse)');
  const layout = useMemo(() => computeLayout(w, h, layoutMode, coarse), [w, h, layoutMode, coarse]);
  const screen = useGame((st) => st.screen);
  const burst = useGame((st) => st.burst);
  const bg = SCREEN_BG[screen];

  useEffect(() => {
    document.body.style.background = bg;
  }, [bg]);
  useOnChange(screen, () => screenIn(contentRef.current));

  /**
   * `overflow: hidden` boxes must never scroll: focus or scrollIntoView could otherwise
   * shift the whole scaled canvas. Real scroll areas (overflow auto) are left alone.
   */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const pin = (e: Event) => {
      const el = e.target;
      if (!(el instanceof HTMLElement) || !(el.scrollTop || el.scrollLeft)) return;
      const cs = getComputedStyle(el);
      if (cs.overflowX === 'hidden' && cs.overflowY === 'hidden') el.scrollTo(0, 0);
    };
    root.addEventListener('scroll', pin, true);
    return () => root.removeEventListener('scroll', pin, true);
  }, []);

  return (
    <LayoutContext.Provider value={layout}>
      <div ref={rootRef} className={s.root} style={{ background: bg }}>
        <div
          className={s.stage}
          inert={layout.rotate}
         
          style={{ left: layout.stageLeft, top: layout.stageTop, width: layout.LW, height: layout.LH, transform: `scale(${layout.sc})`, background: bg }}
        >
          <main ref={contentRef} className={s.content}>
            {children}
          </main>
          <div className={s.confetti}>{burst && <ConfettiBurst key={burst.id} big={burst.big} />}</div>
          {nav}
        </div>
        {layout.rotate && rotateHint}
      </div>
    </LayoutContext.Provider>
  );
}
