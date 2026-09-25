import type { CSSProperties } from 'react';
import type { Avatar } from '@/data/types';
import s from './Figur.module.css';

const SKINS = { ljus: 'oklch(0.88 0.06 60)', mellan: 'oklch(0.76 0.09 55)', mork: 'oklch(0.5 0.08 45)', alien: 'oklch(0.8 0.16 140)', robot: 'oklch(0.82 0.02 250)' };
const SHIRTS = { green: 'oklch(0.7 0.15 150)', blue: 'oklch(0.66 0.14 245)', purple: 'oklch(0.62 0.15 300)', orange: 'oklch(0.74 0.16 55)' };
const SHOES = { sneakers: 'oklch(0.97 0.01 250)', rocket: 'oklch(0.63 0.2 25)' };

export interface FigurProps extends Partial<Avatar> {
  /** width in px, height is 1.5× */
  size?: number;
}

/** The child's figure. Drawn on a 100×150 grid and scaled. */
export function Figur({ size = 100, skin = 'mellan', hat = 'none', shirt = 'green', shoes = 'sneakers' }: FigurProps) {
  const vars = {
    width: size,
    height: size * 1.5,
    '--scale': size / 100,
    '--skin': SKINS[skin] ?? SKINS.mellan,
    '--shirt': SHIRTS[shirt] ?? SHIRTS.green,
    '--shoe': SHOES[shoes] ?? SHOES.sneakers,
    '--eye-r': skin === 'robot' ? '2px' : '50%',
  } as CSSProperties;

  return (
    <div className={s.root} style={vars} aria-hidden>
      <div className={s.canvas}>
        <div className={s.shadow} />
        {shoes === 'rocket' && (
          <>
            <div className={s.flame} style={{ left: 29 }} />
            <div className={s.flame} style={{ left: 55 }} />
          </>
        )}
        <div className={s.leg} style={{ left: 32 }} />
        <div className={s.leg} style={{ left: 54 }} />
        <div className={s.shoe} style={{ left: 26 }} />
        <div className={s.shoe} style={{ left: 52 }} />
        <div className={s.arm} style={{ left: 13, transform: 'rotate(14deg)' }} />
        <div className={s.arm} style={{ left: 71, transform: 'rotate(-14deg)' }} />
        <div className={s.hand} style={{ left: 9 }} />
        <div className={s.hand} style={{ left: 77 }} />
        <div className={s.body} />
        {skin === 'robot' && (
          <>
            <div className={s.robotStick} />
            <div className={s.robotBulb} />
          </>
        )}
        {skin === 'alien' && (
          <>
            <div className={s.alienStalk} style={{ left: 30, transform: 'rotate(-20deg)' }} />
            <div className={s.alienStalk} style={{ left: 66, transform: 'rotate(20deg)' }} />
            <div className={s.alienBall} style={{ left: 24 }} />
            <div className={s.alienBall} style={{ left: 66 }} />
          </>
        )}
        <div className={s.head} />
        <div className={s.eye} style={{ left: 36 }} />
        <div className={s.eye} style={{ left: 56 }} />
        <div className={s.cheek} style={{ left: 27 }} />
        <div className={s.cheek} style={{ left: 63 }} />
        <div className={s.mouth} />
        {hat === 'cap' && (
          <>
            <div className={s.capBrim} />
            <div className={s.capDome} />
            <div className={s.capButton} />
          </>
        )}
        {hat === 'helmet' && (
          <>
            <div className={s.helmet} />
            <div className={s.helmetShine} />
          </>
        )}
        {hat === 'crown' && <div className={s.crown} />}
      </div>
    </div>
  );
}
