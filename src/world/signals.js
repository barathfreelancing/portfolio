// Moments the sky reacts to. Sections call these; World.jsx listens.
// Hover attraction needs no call: mark a control with `data-attract` and the entity leans toward it.

const FLARE = 'world:flare';

export function flareWorld() {
  window.dispatchEvent(new Event(FLARE));
}

export function onFlare(handler) {
  window.addEventListener(FLARE, handler);
  return () => window.removeEventListener(FLARE, handler);
}
