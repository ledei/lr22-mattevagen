import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { BIRDS, COLS, LEVEL_COUNT, PAT, PAT_LENGTH, PAT_START, REWARD, SHAPES, getLevel } from '@/data/levels';
import type { Avatar, Level, PatColor, Slot, Step, StepType } from '@/data/types';
import { clearTimers, later } from './timers';

export type Screen = 'map' | 'level' | 'reward' | 'avatar' | 'words';
export type SupportSetting = 'Automatiskt' | 'Alltid på' | 'Av';
export type StartPreset = 'Ny spelare' | 'Halvvägs' | 'Allt klart';

export interface Persisted {
  done: Record<number, 1>;
  /** 1..LEVEL_COUNT + 1 (LEVEL_COUNT + 1 = world complete) */
  unlocked: number;
  inventory: string[];
  avatar: Avatar;
  /** Adult view only – never shown to the child. */
  log: Record<number, { help: number }>;
  autoSupport: boolean;
  supportFrom: number | null;
  /** Guardian / teacher setting. */
  support: SupportSetting;
  avatarNode: number;
}

export interface Hop {
  from: number;
  to: number;
  dir: 1 | -1;
  k: number;
}

export interface LevelRun {
  phase: 'intro' | 'work' | 'done';
  si: number;
  input: string;
  stepWrong: number;
  stepHelp: number;
  help: number;
  msg: string;
  msgKind: 'ok' | 'help' | '';
  locked: boolean;
  fb: boolean;
  countOrder: number[];
  added: number;
  gone: number[];
  pat: PatColor[];
  pos: number;
  hops: Hop[];
  stepHops: number;
  baskets: number[];
  pile: number;
  found: number[];
  tally: [number, number, number];
  sorted: number[];
  charX: number;
  walking: boolean;
}

export interface RewardInfo {
  slot: Slot;
  item: string;
  name: string;
  isNew: boolean;
}

interface UiState {
  screen: Screen;
  lv: number | null;
  zoom: number | null;
  tab: Slot;
  wtab: 'kid' | 'adult';
  reward: RewardInfo | null;
  cardIn: boolean;
  mapWalk: boolean;
  burst: { id: number; big: boolean } | null;
}

interface Actions {
  navigate: (screen: Exclude<Screen, 'level' | 'reward'>) => void;
  setTab: (tab: Slot) => void;
  setWordsTab: (tab: 'kid' | 'adult') => void;
  pickItem: (slot: Slot, id: string) => void;
  setSupport: (support: SupportSetting) => void;
  applyPreset: (preset: StartPreset) => void;

  openLevel: (id: number) => void;
  exitLevel: () => void;
  begin: () => void;
  askHelp: () => void;

  tapCell: (i: number) => void;
  pickColor: (c: PatColor) => void;
  tapStone: (n: number) => void;
  tapBasket: (i: number) => void;
  returnApple: (i: number) => void;
  tapShape: (i: number) => void;
  tapBird: (i: number) => void;
  tapBar: (j: number) => void;
  press: (d: string) => void;
  del: () => void;
  submit: () => void;

  finish: () => void;
  toMap: () => void;
  equip: () => void;
}

export type GameState = Persisted & LevelRun & UiState & Actions;

export const lvReset = (L?: Level): LevelRun => ({
  phase: 'intro', si: 0, input: '', stepWrong: 0, stepHelp: 0, help: 0, msg: '', msgKind: '', charX: 4, walking: false,
  locked: false, fb: false, countOrder: [], added: 0, gone: [], pat: [...PAT_START], pos: L?.start ?? 0, hops: [], stepHops: 0,
  baskets: Array<number>(L?.share?.baskets ?? 3).fill(0), pile: L?.share?.pile ?? 0, found: [], tally: [0, 0, 0], sorted: [],
});

const DEFAULT_AVATAR: Avatar = { skin: 'mellan', hat: 'none', shirt: 'green', shoes: 'sneakers' };

export function presetState(start: StartPreset): Omit<Persisted, 'support'> {
  const base: Omit<Persisted, 'support'> = { done: {}, unlocked: 1, inventory: [], log: {}, autoSupport: false, supportFrom: null, avatar: { ...DEFAULT_AVATAR }, avatarNode: 1 };
  if (start === 'Halvvägs') return { ...base, done: { 1: 1, 2: 1, 3: 1 }, unlocked: 4, avatarNode: 4, inventory: ['cap', 'orange', 'purple'], log: { 1: { help: 1 }, 2: { help: 4 }, 3: { help: 0 } }, autoSupport: true, supportFrom: 2, avatar: { ...DEFAULT_AVATAR, hat: 'cap', shirt: 'purple' } };
  if (start === 'Allt klart') return { ...base, done: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 }, unlocked: 9, avatarNode: 9, inventory: ['cap', 'orange', 'purple', 'rocket', 'helmet', 'alien', 'chef', 'crown'], log: { 1: { help: 0 }, 2: { help: 4 }, 3: { help: 0 }, 4: { help: 1 }, 5: { help: 0 }, 6: { help: 1 }, 7: { help: 2 }, 8: { help: 3 } }, autoSupport: true, supportFrom: 2, avatar: { skin: 'mellan', hat: 'crown', shirt: 'orange', shoes: 'rocket' } };
  return base;
}

/** Selectors */
export const currentLevel = (s: Pick<GameState, 'lv'>) => getLevel(s.lv ?? 1);
export const currentStep = (s: Pick<GameState, 'lv' | 'si'>): Step => currentLevel(s).steps[s.si];
export const isSupportActive = (s: Pick<GameState, 'support' | 'autoSupport'>) =>
  s.support === 'Alltid på' || (s.support === 'Automatiskt' && s.autoSupport);
/** Numbers and markings: always with support, otherwise after 2 wrong/help events in a step. */
export const showNums = (s: GameState) => isSupportActive(s) || s.stepWrong + s.stepHelp >= 2;

export const useGame = create<GameState>()(
  persist(
    (set, get) => {
      const canAct = (t: StepType) => {
        const s = get();
        return s.screen === 'level' && s.phase === 'work' && !s.locked && currentStep(s).t === t;
      };
      const burst = (big: boolean) => set({ burst: { id: Date.now(), big } });

      const next = () => {
        const s = get();
        const L = currentLevel(s);
        if (s.si + 1 < L.steps.length) {
          set({ si: s.si + 1, input: '', stepWrong: 0, stepHelp: 0, msg: '', msgKind: '', stepHops: 0, locked: false, fb: false });
        } else {
          set({ phase: 'done', msg: '' });
          burst(true);
          later(500, () => set({ charX: 108, walking: true }));
          later(1700, () => set({ walking: false }));
        }
      };
      /** Step goal met: green message, small confetti, move on after 1.4 s. */
      const complete = () => {
        set({ msg: currentStep(get()).done, msgKind: 'ok', locked: true });
        burst(false);
        later(1400, next);
      };
      const nudge = (text: string) => set((s) => ({ msg: text, msgKind: 'help', help: s.help + 1 }));

      const startLevel = (id: number) => {
        set({ screen: 'level', lv: id, zoom: null, ...lvReset(getLevel(id)) });
        later(250, () => set({ charX: 22, walking: true }));
        later(1400, () => set({ walking: false }));
      };

      return {
        ...presetState('Ny spelare'),
        support: 'Automatiskt',
        ...lvReset(),
        screen: 'map', lv: null, zoom: null, tab: 'hat', wtab: 'kid', reward: null, cardIn: false, mapWalk: false, burst: null,

        navigate: (screen) => {
          const s = get();
          if (s.screen === 'level') clearTimers();
          set({ screen, zoom: null, ...(s.screen === 'level' ? lvReset() : {}) });
        },
        setTab: (tab) => set({ tab }),
        setWordsTab: (wtab) => set({ wtab }),
        pickItem: (slot, id) => set((s) => ({ avatar: { ...s.avatar, [slot]: id } })),
        setSupport: (support) => set({ support }),
        applyPreset: (preset) => {
          clearTimers();
          set({ ...presetState(preset), ...lvReset(), screen: 'map', lv: null, zoom: null, reward: null });
        },

        openLevel: (id) => {
          const s = get();
          if (id > s.unlocked || s.zoom) return;
          set({ zoom: id });
          later(520, () => startLevel(id));
        },
        exitLevel: () => {
          clearTimers();
          set({ screen: 'map', ...lvReset() });
        },
        begin: () => set({ phase: 'work' }),
        askHelp: () => {
          const s = get();
          if (s.locked) return;
          const h = currentStep(s).help;
          set({ stepHelp: s.stepHelp + 1, help: s.help + 1, msg: h[Math.min(s.stepHelp, h.length - 1)], msgKind: 'help' });
        },

        tapCell: (i) => {
          const s = get();
          const L = currentLevel(s);
          const st = currentStep(s);
          const base = L.base ?? 0;
          const filled = base + s.added;
          if (!(s.phase === 'work' && !s.locked)) return;
          if (st.t === 'count' && i < base && !s.countOrder.includes(i)) {
            const co = [...s.countOrder, i];
            set({ countOrder: co, msg: '' });
            if (co.length === base) complete();
          } else if (st.t === 'fill' && i >= filled && filled < st.to) {
            const a = s.added + 1;
            set({ added: a, msg: '' });
            if (base + a === st.to) complete();
          } else if (st.t === 'remove' && i < filled && !s.gone.includes(i)) {
            const g = [...s.gone, i];
            set({ gone: g, msg: '' });
            if (g.length === st.k) complete();
          }
        },
        pickColor: (c) => {
          if (!canAct('pattern')) return;
          const s = get();
          const exp = PAT[s.pat.length % 3];
          if (c !== exp) return nudge('Hmm, inte riktigt. Säg färgerna högt från början: röd, blå, blå …');
          const pat = [...s.pat, c];
          set({ pat, msg: '' });
          if (pat.length === PAT_LENGTH) complete();
        },
        tapStone: (n) => {
          if (!canAct('hop')) return;
          const s = get();
          const st = currentStep(s);
          if (st.t !== 'hop') return;
          const target = s.pos + st.dir;
          if (n === s.pos) return;
          if (n !== target) return nudge(st.dir > 0 ? 'Ett hopp i taget – till stenen precis till höger.' : 'Ett hopp i taget – till stenen precis till vänster.');
          const k = s.stepHops + 1;
          set({ pos: n, stepHops: k, hops: [...s.hops, { from: s.pos, to: n, dir: st.dir, k }], msg: '' });
          if (k === st.n) complete();
        },
        tapBasket: (i) => {
          if (!canAct('share')) return;
          const s = get();
          if (s.pile <= 0) return;
          const b = s.baskets.map((x, j) => (j === i ? x + 1 : x));
          const pile = s.pile - 1;
          set({ baskets: b, pile, msg: '' });
          if (pile === 0) {
            if (b.every((x) => x === b[0])) complete();
            else nudge(`Är det rättvist? Alla ska ha lika många. Tryck på − vid en korg för att ta tillbaka ${currentLevel(s).share?.item ?? 'en sak'}.`);
          }
        },
        returnApple: (i) => {
          if (!canAct('share')) return;
          const s = get();
          if (s.baskets[i] <= 0) return;
          set({ baskets: s.baskets.map((x, j) => (j === i ? x - 1 : x)), pile: s.pile + 1, msg: '' });
        },
        tapShape: (i) => {
          if (!canAct('find')) return;
          const s = get();
          const st = currentStep(s);
          if (st.t !== 'find') return;
          const sh = SHAPES[i];
          if (s.found.includes(i)) return;
          if (sh.k !== st.kind) {
            return nudge(sh.k === 'circle' ? 'En cirkel har inga hörn alls!' : st.kind === 'tri' ? 'Räkna hörnen. En triangel har precis 3.' : 'Räkna hörnen. En fyrhörning har precis 4.');
          }
          const f = [...s.found, i];
          set({ found: f, msg: '' });
          if (SHAPES.every((x, j) => x.k !== st.kind || f.includes(j))) complete();
        },
        tapBird: (i) => {
          if (!canAct('sort')) return;
          const s = get();
          if (s.sorted.includes(i)) return;
          const c = COLS.indexOf(BIRDS[i]);
          const so = [...s.sorted, i];
          set({ tally: s.tally.map((x, j) => (j === c ? x + 1 : x)) as LevelRun['tally'], sorted: so, msg: '' });
          if (so.length === BIRDS.length) complete();
        },
        tapBar: (j) => {
          if (!canAct('bar')) return;
          if (j === 0) complete();
          else nudge('Titta noga – vilken stapel är högst?');
        },
        press: (d) => {
          if (!canAct('type')) return;
          set((s) => (s.input.length >= 2 ? s : { input: s.input + d }));
        },
        del: () => {
          if (!canAct('type')) return;
          set((s) => ({ input: s.input.slice(0, -1) }));
        },
        submit: () => {
          if (!canAct('type')) return;
          const s = get();
          const st = currentStep(s);
          if (st.t !== 'type' || !s.input) return;
          if (+s.input === st.ans) {
            set({ fb: true });
            complete();
            return;
          }
          const sw = s.stepWrong + 1;
          set({ stepWrong: sw, help: s.help + 1, input: '', msg: 'Nästan! ' + st.help[Math.min(sw - 1, st.help.length - 1)], msgKind: 'help' });
        },

        finish: () => {
          const s = get();
          const L = currentLevel(s);
          const [slot, item, name] = REWARD[L.id];
          const isNew = !s.inventory.includes(item);
          const trig = !s.autoSupport && s.help >= 3;
          set({
            screen: 'reward',
            done: { ...s.done, [L.id]: 1 },
            unlocked: Math.max(s.unlocked, L.id + 1),
            inventory: isNew ? [...s.inventory, item] : s.inventory,
            log: { ...s.log, [L.id]: { help: s.help } },
            autoSupport: s.autoSupport || trig,
            supportFrom: trig ? L.id : s.supportFrom,
            reward: { slot, item, name, isNew },
            cardIn: false,
          });
          later(150, () => {
            set({ cardIn: true });
            burst(true);
          });
        },
        toMap: () => {
          set({ screen: 'map', zoom: null });
          later(450, () => set((s) => ({ avatarNode: Math.min(s.unlocked, LEVEL_COUNT + 1), mapWalk: true })));
          later(1400, () => set({ mapWalk: false }));
        },
        equip: () => {
          const r = get().reward;
          if (!r) return;
          set((s) => ({ avatar: { ...s.avatar, [r.slot]: r.item }, screen: 'avatar', tab: r.slot, avatarNode: Math.min(s.unlocked, LEVEL_COUNT + 1) }));
        },
      };
    },
    {
      name: 'mattevagen:v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (s): Persisted => ({
        done: s.done, unlocked: s.unlocked, inventory: s.inventory, avatar: s.avatar, log: s.log,
        autoSupport: s.autoSupport, supportFrom: s.supportFrom, support: s.support, avatarNode: s.avatarNode,
      }),
    },
  ),
);
