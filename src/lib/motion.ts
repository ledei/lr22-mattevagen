export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const EASE = 'cubic-bezier(.2,.8,.3,1)';

/** Run a Web Animation. With reduced motion only the opacity part is kept. */
export function animate(el: Element | null | undefined, keyframes: Keyframe[], options: KeyframeAnimationOptions) {
  if (!el || !('animate' in el)) return;
  if (prefersReducedMotion()) {
    const opacityOnly = keyframes.map((k) => ('opacity' in k ? { opacity: k.opacity } : {}));
    if (!opacityOnly.some((k) => 'opacity' in k)) return;
    el.animate(opacityOnly, options);
    return;
  }
  el.animate(keyframes, options);
}

/** Everything you tap: pop scale 1 → .88 → 1.07 → 1, 280 ms. */
export function pop(el: Element | null | undefined) {
  animate(el, [{ transform: 'scale(1)' }, { transform: 'scale(0.88)' }, { transform: 'scale(1.07)' }, { transform: 'scale(1)' }], { duration: 280, easing: 'ease-out' });
}

export const screenIn = (el: Element | null) =>
  animate(el, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 360, easing: EASE });

export const slideIn = (el: Element | null) =>
  animate(el, [{ opacity: 0, transform: 'translateX(36px)' }, { opacity: 1, transform: 'none' }], { duration: 340, easing: EASE });

export const shake = (el: Element | null) =>
  animate(el, [{ transform: 'translateX(0)' }, { transform: 'translateX(-9px) rotate(-2deg)' }, { transform: 'translateX(9px) rotate(2deg)' }, { transform: 'translateX(-5px)' }, { transform: 'none' }], { duration: 360 });

export const messageIn = (el: Element | null) =>
  animate(el, [{ transform: 'scale(0.9)', opacity: 0 }, { transform: 'scale(1.03)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], { duration: 300, easing: 'ease-out' });
