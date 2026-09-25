import { useRef, useState, type MouseEvent } from 'react';
import { MapDecor, MapTopBar, NextLevelCard, WorldMap } from '@/components/organisms';
import { MapTemplate } from '@/components/templates';
import { useLayout } from '@/hooks/useLayout';
import { useGame } from '@/store/gameStore';

export function MapPage() {
  const { wide, cardLeft, cardTop } = useLayout();
  const words = useGame((s) => Object.keys(s.done).length);
  const [par, setPar] = useState({ px: 0, py: 0 });
  const raf = useRef<number | null>(null);
  const pending = useRef(par);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!wide) return;
    const r = e.currentTarget.getBoundingClientRect();
    pending.current = { px: (e.clientX - r.left) / r.width - 0.5, py: (e.clientY - r.top) / r.height - 0.5 };
    if (raf.current === null) {
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        setPar(pending.current);
      });
    }
  };

  return (
    <MapTemplate
      onPointerMove={onMove}
      decor={wide ? <MapDecor px={par.px} py={par.py} /> : null}
      map={<WorldMap />}
      aside={wide ? <NextLevelCard left={cardLeft} top={cardTop} /> : null}
      topBar={<MapTopBar words={words} wide={wide} />}
    />
  );
}
