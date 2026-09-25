import { useEffect, useRef, type MouseEvent } from 'react';
import { MapDecor, MapTopBar, NextLevelCard, WorldMap } from '@/components/organisms';
import { parallaxTransform } from '@/lib/motion';
import { MapTemplate } from '@/components/templates';
import { useLayout } from '@/hooks/useLayout';
import { useGame } from '@/store/gameStore';

export function MapPage() {
  const { wide, cardLeft, cardTop } = useLayout();
  const words = useGame((s) => Object.keys(s.done).length);
  const layerRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => () => { if (raf.current !== null) cancelAnimationFrame(raf.current); }, []);

  /** Pointer parallax, written straight to the decor layer once per frame. */
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!wide) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      raf.current = null;
      if (layerRef.current) layerRef.current.style.transform = parallaxTransform(px, py);
    });
  };

  return (
    <MapTemplate
      onPointerMove={onMove}
      decor={wide ? <MapDecor layerRef={layerRef} /> : null}
      map={<WorldMap />}
      aside={wide ? <NextLevelCard left={cardLeft} top={cardTop} /> : null}
      topBar={<MapTopBar words={words} wide={wide} />}
    />
  );
}
