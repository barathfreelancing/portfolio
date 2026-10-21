// One sky per chapter. The reader travels from dusk at the floating city to first light
// above the cloud sea; World.jsx blends between these as each section arrives.

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

export const CHAPTERS = [
  {
    id: 'top', // dusk over the floating city
    cam: 0,
    top: hex('#0b0a26'),
    mid: hex('#3a2a88'),
    low: hex('#d9509c'),
    sun: hex('#ff86c4'),
    sunPos: [0.6, 0.27],
    stars: 0.3,
    aurora: 0,
    clouds: 1,
    isles: 1,
    entity: [0.69, 0.71, 0.085],
  },
  {
    id: 'about', // twilight
    cam: 0.85,
    top: hex('#080721'),
    mid: hex('#21196a'),
    low: hex('#6a37b0'),
    sun: hex('#b88aff'),
    sunPos: [0.72, -0.08],
    stars: 0.6,
    aurora: 0,
    clouds: 0.9,
    isles: 1,
    entity: [0.86, 0.74, 0.05],
  },
  {
    id: 'technology', // night among distant islands
    cam: 0.92,
    top: hex('#05061a'),
    mid: hex('#0f1448'),
    low: hex('#2a2a78'),
    sun: hex('#5d6cff'),
    sunPos: [0.5, -0.25],
    stars: 1,
    aurora: 0.15,
    clouds: 0.7,
    isles: 1,
    entity: [0.9, 0.22, 0.045],
  },
  {
    id: 'work', // deep night, so the work carries the colour
    cam: 1,
    top: hex('#04040e'),
    mid: hex('#0a0a28'),
    low: hex('#17184a'),
    sun: hex('#4a55e8'),
    sunPos: [0.5, -0.4],
    stars: 1,
    aurora: 0,
    clouds: 0.55,
    isles: 1,
    entity: [0.95, 0.9, 0.032],
  },
  {
    id: 'services', // aurora
    cam: 1.18,
    top: hex('#050515'),
    mid: hex('#0c1340'),
    low: hex('#271c6c'),
    sun: hex('#7d63ff'),
    sunPos: [0.5, -0.3],
    stars: 0.85,
    aurora: 1,
    clouds: 0.75,
    isles: 1,
    entity: [0.8, 0.8, 0.045],
  },
  {
    id: 'contact', // first light over the cloud sea
    cam: 1.36,
    top: hex('#0b0b2c'),
    mid: hex('#36379a'),
    low: hex('#f0649f'),
    sun: hex('#ffadd6'),
    sunPos: [0.46, 0.13],
    stars: 0.2,
    aurora: 0,
    clouds: 1,
    isles: 0.25,
    entity: [0.46, 0.38, 0.05],
  },
];

const KEYS = ['top', 'mid', 'low', 'sun', 'sunPos', 'entity'];
const SCALARS = ['cam', 'stars', 'aurora', 'clouds', 'isles'];

export function cloneChapter(c) {
  const out = {};
  KEYS.forEach((k) => {
    out[k] = c[k].slice();
  });
  SCALARS.forEach((k) => {
    out[k] = c[k];
  });
  return out;
}

// Blend `to` into `out` by w (0..1), in place.
export function blendInto(out, to, w) {
  KEYS.forEach((k) => {
    const a = out[k];
    const b = to[k];
    for (let i = 0; i < a.length; i += 1) a[i] += (b[i] - a[i]) * w;
  });
  SCALARS.forEach((k) => {
    out[k] += (to[k] - out[k]) * w;
  });
}
