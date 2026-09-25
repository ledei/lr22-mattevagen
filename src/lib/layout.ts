export type LayoutMode = 'Automatisk' | 'Mobil' | 'Desktop';

export const MAP_W = 390;
export const MAP_H = 696;
export const SCENE_W = 390;
export const SCENE_H = 226;
export const WS_W = 560;
export const TOPBAR_H = 64;

export interface StageLayout {
  vw: number;
  vh: number;
  wide: boolean;
  /** phone held sideways: too short to play, ask the child to turn it */
  rotate: boolean;
  /** logical canvas size and scale */
  LW: number;
  LH: number;
  sc: number;
  stageLeft: number;
  stageTop: number;
  /** map */
  xo: number;
  mapTop: number;
  mapFit: number;
  wFit: number;
  cardLeft: number;
  cardTop: number;
  /** level */
  sceneScale: number;
  paneW: number;
  paneH: number;
  wsLeft: number;
  wsTop: number;
  wsRadius: string;
  wsPad: string;
  /** centred column screens */
  colPadX: number;
  navH: number;
}

/**
 * The whole game is drawn on a logical canvas scaled with `transform: scale()` to fill
 * the window exactly (no letterboxing). See "Responsive layout" in the handoff README.
 */
export function computeLayout(vwIn: number, vhIn: number, mode: LayoutMode = 'Automatisk', coarsePointer = false): StageLayout {
  const vw = vwIn || 390;
  const vh = vhIn || 844;
  // Short and wide. On a touch phone the canvas would shrink to ~47 %, so we ask for portrait;
  // a short desktop window uses the desktop layout instead of a stretched phone layout.
  const shortLandscape = mode === 'Automatisk' && vw > vh && vh < 520;
  const rotate = shortLandscape && coarsePointer;
  const wide = mode === 'Desktop' || (mode === 'Automatisk' && ((vw >= 900 && vh >= 520) || (shortLandscape && !coarsePointer)));

  let LW: number, LH: number, sc: number;
  if (wide) {
    sc = Math.min(vw / 1200, vh / 760);
    LW = vw / sc;
    LH = vh / sc;
  } else {
    LW = 390;
    sc = vw / LW;
    LH = vh / sc;
    if (LH < 760) {
      LH = 760;
      sc = vh / LH;
      LW = vw / sc;
    }
  }

  const xo = (LW - MAP_W) / 2;
  const sceneScale = wide ? (LW - WS_W) / SCENE_W : LW / SCENE_W;
  const paneH = wide ? LH : Math.min(SCENE_H * sceneScale, LH * 0.34);
  const wFit = Math.min(1.2, (LH - TOPBAR_H - 120) / MAP_H);
  const mFit = Math.min(1, (LH - TOPBAR_H - 84) / MAP_H);
  const colPadX = Math.max(0, (LW - 520) / 2);
  const wideMapTop = TOPBAR_H + Math.max(0, (LH - 184 - MAP_H * wFit) / 2);

  return {
    vw, vh, wide, rotate, LW, LH, sc,
    stageLeft: (vw - LW * sc) / 2,
    stageTop: (vh - LH * sc) / 2,
    xo,
    mapTop: wide ? wideMapTop : TOPBAR_H + Math.max(0, (LH - 148 - MAP_H) / 2),
    mapFit: wide ? wFit : mFit,
    wFit,
    cardLeft: xo + 195 + 195 * wFit - 10,
    cardTop: wideMapTop + MAP_H * wFit * 0.32,
    sceneScale,
    paneW: wide ? LW - WS_W : LW,
    paneH,
    wsLeft: wide ? LW - WS_W : 0,
    wsTop: wide ? 0 : paneH - 18,
    wsRadius: wide ? '0px' : '26px 26px 0 0',
    wsPad: wide ? '40px 36px 32px' : '18px 18px 22px',
    colPadX,
    navH: wide ? 104 : 84,
  };
}
