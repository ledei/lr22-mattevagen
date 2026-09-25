/**
 * Read-aloud with the browser's built-in speech synthesis (Swedish voice when the device has one).
 * No recordings: works offline on most tablets and phones. Speaks only when the child asks
 * (a speaker button or "Hjälp mig"), never on its own, so a classroom stays quiet.
 */
const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

export const canSpeak = synth !== null;

let voice: SpeechSynthesisVoice | null = null;
function pickVoice() {
  const voices = synth?.getVoices() ?? [];
  voice = voices.find((v) => v.lang === 'sv-SE' && v.localService) ?? voices.find((v) => v.lang.toLowerCase().startsWith('sv')) ?? null;
}
if (synth) {
  pickVoice();
  synth.addEventListener?.('voiceschanged', pickVoice);
}

/** Turns math symbols into the words a child hears in class. */
export function toSpokenSwedish(text: string) {
  return text
    .replace(/−|-(?=\s*\d)/g, ' minus ')
    .replace(/\+/g, ' plus ')
    .replace(/÷/g, ' delat med ')
    .replace(/=/g, ' är lika med ')
    .replace(/·/g, ', ')
    .replace(/[”"“]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

let speakingKey: string | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const speechStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getKey: () => speakingKey,
};

export function stopSpeaking() {
  if (!synth) return;
  synth.cancel();
  speakingKey = null;
  emit();
}

/** Speak `text`. Calling again with the same key while it is speaking stops it. */
export function speak(text: string, key = text) {
  if (!synth) return;
  const toggleOff = speakingKey === key;
  synth.cancel();
  speakingKey = null;
  if (toggleOff) return emit();
  const u = new SpeechSynthesisUtterance(toSpokenSwedish(text));
  u.lang = 'sv-SE';
  if (voice) u.voice = voice;
  u.rate = 0.9;
  u.pitch = 1.05;
  const done = () => {
    if (speakingKey === key) {
      speakingKey = null;
      emit();
    }
  };
  u.onend = done;
  u.onerror = done;
  speakingKey = key;
  emit();
  synth.speak(u);
}
