import type { MouseEvent, ReactNode } from 'react';
import { MAP_H, MAP_W } from '@/lib/layout';
import { useLayout } from '@/hooks/useLayout';
import s from './MapTemplate.module.css';

export interface MapTemplateProps {
  decor?: ReactNode;
  map: ReactNode;
  aside?: ReactNode;
  topBar: ReactNode;
  onPointerMove?: (e: MouseEvent<HTMLDivElement>) => void;
}

/** Grass background, optional full-width decor, the scaled map canvas, a side card and the top bar. */
export function MapTemplate({ decor, map, aside, topBar, onPointerMove }: MapTemplateProps) {
  const { xo, mapTop, mapFit } = useLayout();
  return (
    <div className={s.screen} data-screen-label="Karta" onMouseMove={onPointerMove}>
      {decor}
      <div className={s.mapFrame} style={{ left: xo, top: mapTop, width: MAP_W, height: MAP_H, transform: `scale(${mapFit})` }}>
        {map}
      </div>
      {aside}
      {topBar}
    </div>
  );
}
