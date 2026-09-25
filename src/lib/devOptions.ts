import type { LayoutMode } from './layout';
import type { StartPreset, SupportSetting } from '@/store/gameStore';

const START: Record<string, StartPreset> = { ny: 'Ny spelare', halvvags: 'Halvvägs', klart: 'Allt klart' };
const LAYOUT: Record<string, LayoutMode> = { auto: 'Automatisk', mobil: 'Mobil', desktop: 'Desktop' };
const SUPPORT: Record<string, SupportSetting> = { auto: 'Automatiskt', pa: 'Alltid på', av: 'Av' };

/**
 * Demo / QA switches from the prototype's props, read from the URL:
 * `?start=ny|halvvags|klart`, `?layout=auto|mobil|desktop`, `?support=auto|pa|av`.
 */
export function readDevOptions() {
  const q = new URLSearchParams(typeof location !== 'undefined' ? location.search : '');
  return {
    start: START[q.get('start') ?? ''] as StartPreset | undefined,
    layout: LAYOUT[q.get('layout') ?? ''] ?? 'Automatisk',
    support: SUPPORT[q.get('support') ?? ''] as SupportSetting | undefined,
  };
}
