import { useEffect, useLayoutEffect, useRef } from 'react';

/** Calls `fn(prev)` after render whenever `value` changes (not on mount). */
export function useOnChange<T>(value: T, fn: (prev: T) => void) {
  const prev = useRef(value);
  const cb = useRef(fn);
  useLayoutEffect(() => {
    cb.current = fn;
  });
  useEffect(() => {
    if (!Object.is(prev.current, value)) {
      const p = prev.current;
      prev.current = value;
      cb.current(p);
    }
  }, [value]);
}
