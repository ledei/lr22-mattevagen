/** Level-scoped timers (`later` / `clearT` in the prototype). Cleared when a level is left. */
let timers: ReturnType<typeof setTimeout>[] = [];

export function later(ms: number, fn: () => void) {
  timers.push(setTimeout(fn, ms));
}

export function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}
