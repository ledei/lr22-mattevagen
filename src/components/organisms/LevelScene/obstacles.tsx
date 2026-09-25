import { BIRDS, FRIENDS, SHAPES, TREE } from '@/data/levels';
import type { LevelRun } from '@/store/gameStore';
import { C } from '@/styles/colors';
import s from './LevelScene.module.css';

type Run = Pick<LevelRun, 'added' | 'gone' | 'pat' | 'pile' | 'found' | 'sorted' | 'phase'> & {
  base: number;
  /** the level's share step has started (buns leave the counter) */
  shareStarted: boolean;
};

/** Muren – bricks fill in as the ten-frame fills. */
export function Wall({ base, added }: Run) {
  const filled = base + added;
  return (
    <div className={s.wall}>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className={s.brick} style={{ background: i < 7 ? C.stone : i < filled ? C.yellow : 'transparent', border: i < filled ? 'none' : '2px dashed oklch(1 0 0 / 0.8)' }} />
      ))}
    </div>
  );
}

/** Bron – planks get their colours. */
export function River({ pat }: Run) {
  return (
    <>
      <div className={s.water} style={{ left: 170, width: 190 }} />
      <div className={s.planks}>
        {Array.from({ length: 9 }, (_, i) => {
          const c = pat[i];
          return <div key={i} className={s.plank} style={{ background: c ? C[c] : 'transparent', border: c ? 'none' : '2px dashed oklch(1 0 0 / 0.6)' }} />;
        })}
      </div>
    </>
  );
}

/** Bäcken – stepping stones. */
export function Stones() {
  return (
    <>
      <div className={s.water} style={{ left: 150, width: 220 }} />
      <div className={s.stepStones}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={s.stepStone} />
        ))}
      </div>
    </>
  );
}

/** Äppelträdet – apples leave the tree, friends jump when done. */
export function AppleTree({ pile, phase }: Run) {
  return (
    <>
      <div className={s.appleTrunk} />
      <div className={s.appleCrown}>
        {TREE.map(([x, y], i) => (
          <div key={i} className={s.treeApple} style={{ left: x, top: y, opacity: i < pile ? 1 : 0 }} />
        ))}
      </div>
      <div className={s.friends} style={{ transform: phase === 'done' ? 'translateY(-14px)' : 'none' }}>
        {FRIENDS.map((f, fi) => (
          <div key={fi} className={s.friend} style={{ animationDelay: `${fi * -0.45}s` }}>
            <div className={s.friendHead} style={{ background: f.head }} />
            <div className={s.friendBody} style={{ background: f.shirt }} />
          </div>
        ))}
      </div>
    </>
  );
}

/** Bageriet – buns on the counter double, then go to the two customers. */
export function Bakery({ base, added, pile, shareStarted, phase }: Run) {
  const onCounter = shareStarted ? pile : base + added;
  return (
    <>
      <div className={s.shopWall} />
      <div className={s.shopDoor} />
      <div className={s.awning} />
      <div className={s.shopSign}>Bageri</div>
      <div className={s.counter} />
      <div className={s.counterTop} />
      <div className={s.counterBuns}>
        {Array.from({ length: onCounter }, (_, i) => (
          <div key={i} className={s.sceneBun} style={{ background: i < base ? C.bun : C.bunIced }} />
        ))}
      </div>
      <div className={s.customers} style={{ transform: phase === 'done' ? 'translateY(-14px)' : 'none' }}>
        {FRIENDS.slice(0, 2).map((f, fi) => (
          <div key={fi} className={s.friend} style={{ animationDelay: `${fi * -0.45}s` }}>
            <div className={s.friendHead} style={{ background: f.head }} />
            <div className={s.friendBody} style={{ background: f.shirt }} />
          </div>
        ))}
      </div>
    </>
  );
}

/** Trollet – shows how many apples he has. */
export function Troll({ base, added, gone, phase }: Run) {
  return (
    <>
      <div className={s.troll} style={{ transform: phase === 'done' ? 'translateY(-10px)' : 'none' }}>
        <div className={s.trollHorn} style={{ left: 12 }} />
        <div className={s.trollHorn} style={{ left: 76 }} />
        <div className={s.trollBody} />
        <div className={s.trollEye} style={{ left: 28 }} />
        <div className={s.trollEye} style={{ left: 68 }} />
        <div className={s.trollMouth} />
      </div>
      <div className={s.trollCount}>
        <div className={s.trollCountApple} />
        {base + added - gone.length}
      </div>
    </>
  );
}

/** Formporten – symbols light up, gate sinks when done. */
export function Gate({ found, phase }: Run) {
  const kindDone = (k: 'tri' | 'quad') => SHAPES.every((x, i) => x.k !== k || found.includes(i));
  return (
    <div className={s.gate} style={{ transform: phase === 'done' ? 'scaleY(0.04)' : 'none' }}>
      <div className={s.gateTri} style={{ background: kindDone('tri') ? C.R : 'oklch(0.42 0.03 260)' }} />
      <div className={s.gateQuad} style={{ background: kindDone('quad') ? C.B : 'oklch(0.42 0.03 260)' }} />
    </div>
  );
}

/** Fågelräkningen – birds fly off the branch as they are sorted. */
export function Birds({ sorted }: Run) {
  return (
    <>
      <div className={s.post} />
      <div className={s.branch} />
      <div className={s.birds}>
        {BIRDS.map((b, i) => (
          <div key={i} className={s.sceneBird} style={{ background: C[b], opacity: sorted.includes(i) ? 0 : 1, animationDelay: `${i * -0.23}s` }} />
        ))}
      </div>
    </>
  );
}
