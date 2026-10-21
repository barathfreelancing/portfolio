// The world: one fullscreen fragment shader. Everything here is procedural geometry and noise,
// so the scene is original and needs no raster assets.

export const VERTEX = /* glsl */ `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const FRAGMENT = /* glsl */ `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform float uCam;       // camera height; rises as the reader scrolls
uniform vec3 uTop;
uniform vec3 uMid;
uniform vec3 uLow;
uniform vec3 uSun;
uniform vec2 uSunPos;     // x as a fraction of width, y in height units
uniform float uStars;
uniform float uAurora;
uniform float uClouds;
uniform vec3 uEnt;        // entity x (fraction of width), y, radius
uniform float uEntA;
uniform float uEntGlow;   // 1 at rest, higher while a call to action is hovered
uniform float uFlare;     // 0 idle, 0..1 while a flare ring expands
uniform float uIsles;    // how many distant islands this chapter shows (0..1)
uniform float uNearA;    // fades the near islands (reduced motion only)
uniform vec2 uPtr;
uniform float uOct;

float h1(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

vec2 h2(vec2 p) {
  float n = h1(p);
  return vec2(n, h1(p + n * 17.13));
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h1(i), h1(i + vec2(1.0, 0.0)), u.x),
             mix(h1(i + vec2(0.0, 1.0)), h1(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 6; i++) {
    if (float(i) >= uOct) break;
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

vec3 sky(float y) {
  vec3 c = mix(uLow, uMid, smoothstep(0.0, 0.55, y));
  return mix(c, uTop, smoothstep(0.45, 1.05, y));
}

// Floating island in local space: half-width 1, ground near y = 0. The underside is a function
// of x, so the rock hangs in several uneven drips instead of one cone.
float islandBody(vec2 u, float seed) {
  float x = u.x;
  float top = 0.05 * noise(vec2(x * 4.0 + seed, seed)) + 0.025 * noise(vec2(x * 11.0, seed * 2.0))
            + 0.05 * (1.0 - x * x);
  float depth = 1.25 + 0.6 * h1(vec2(seed, 1.7));
  float span = max(1.0 - x * x, 0.0);
  float drips = 0.62 + 0.42 * noise(vec2(x * 3.2 + seed, seed)) + 0.28 * noise(vec2(x * 8.5 + seed * 3.0, 4.0));
  float bottom = -depth * pow(span, 1.15) * drips;
  return max(max(u.y - top, (bottom - u.y) * 0.45), abs(x) - 1.0);
}

float box(vec2 u, vec2 c, vec2 h) {
  vec2 d = abs(u - c) - h;
  return max(d.x, d.y);
}

// A tower shaft of half-width w and height h at x, finished with a tapering spire.
float tower(vec2 u, float x, float w, float h) {
  float d = box(u, vec2(x, h * 0.5), vec2(w, h * 0.5));
  float sy = (u.y - h) / (0.35 * h);
  return min(d, max(abs(u.x - x) - w * 0.6 * (1.0 - sy), max(-sy, sy - 1.0)));
}

float isle1(vec2 c) { return min(islandBody(c, 21.0), tower(c, 0.1, 0.07, 0.7)); }
float isle3(vec2 c) { return min(islandBody(c, 51.0), min(tower(c, -0.2, 0.06, 0.9), tower(c, 0.25, 0.05, 0.55))); }

// Towers, spires and a ring-gate standing on the city island.
float city(vec2 u) {
  float d = 1e3;
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float x = -0.66 + fi * 0.2 + 0.04 * sin(fi * 7.1);
    float w = 0.035 + 0.03 * h1(vec2(fi, 3.0));
    float tall = 0.22 + 0.7 * pow(1.0 - abs(fi - 3.2) / 3.6, 1.6) + 0.15 * h1(vec2(fi, 9.0));
    d = min(d, box(u, vec2(x, tall * 0.5), vec2(w, tall * 0.5)));
    // Spire: a narrowing shaft above the tower
    float sy = (u.y - tall) / (0.28 * tall);
    float spire = max(abs(u.x - x) - w * 0.55 * (1.0 - sy), max(-sy, sy - 1.0));
    d = min(d, spire);
  }
  // Ring-gate on the right shoulder
  vec2 g = u - vec2(0.62, 0.3);
  float ring = abs(length(g) - 0.24) - 0.022;
  d = min(d, max(ring, -u.y + 0.02));
  // A thin floating halo above the tallest tower
  vec2 hp = (u - vec2(-0.02, 1.32)) * vec2(1.0, 4.0);
  d = min(d, (abs(length(hp) - 0.2) - 0.05) * 0.25);
  return d;
}

// Hashed layer of distant islands; returns rgb in xyz and coverage in w.
vec4 islandLayer(vec2 p, float z, vec2 cell, float dens, float seed, vec3 baseCol, vec3 rimCol, vec2 ldir) {
  vec2 q = p;
  q.y += uCam * z;
  q.x += uPtr.x * 0.02 * z + seed;
  vec2 c = floor(q / cell);
  vec2 f = q - c * cell;
  float h = h1(c + seed);
  if (h > dens) return vec4(0.0);
  vec2 j = h2(c + seed * 2.0);
  float w = cell.x * (0.11 + 0.14 * j.x);
  vec2 ctr = vec2(cell.x * (0.32 + 0.36 * j.y), cell.y * (0.5 + 0.2 * h1(c + 5.0)));
  ctr.y += 0.008 * sin(uTime * 0.3 + h * 20.0);
  // Copy columns sit on the left of every chapter, so the nearer of these layers keeps clear of it.
  float sx = (c.x * cell.x + ctr.x - seed) / (uRes.x / uRes.y);
  if (z > 0.5 && sx < 0.52) return vec4(0.0);
  vec2 u = (f - ctr) / w;
  float body = islandBody(u, h * 10.0);
  // Some islands carry a tower and spire, others a ring-gate, echoing the city
  float town = 1e3;
  if (j.x > 0.45) {
    float tall = 0.3 + 0.4 * h1(c + 9.0);
    town = box(u, vec2(-0.15, tall * 0.5), vec2(0.07, tall * 0.5));
    float sy = (u.y - tall) / 0.2;
    town = min(town, max(abs(u.x + 0.15) - 0.04 * (1.0 - sy), max(-sy, sy - 1.0)));
  }
  if (j.y > 0.6) town = min(town, max(abs(length(u - vec2(0.35, 0.22)) - 0.2) - 0.03, -u.y + 0.02));
  float d = min(body, town);
  float aa = 1.5 / (uRes.y * w);
  float m = smoothstep(aa, -aa, d);
  if (m <= 0.0) return vec4(0.0);
  float dl = min(islandBody(u + ldir * 0.09, h * 10.0), town + 0.04);
  float rim = m * smoothstep(-aa, aa, dl);
  // A violet-magenta skylight rim along the top edge keeps islands legible after the sun sets
  float sky = m * smoothstep(-aa, aa, islandBody(u + vec2(0.0, 0.07), h * 10.0)) * step(u.y, 0.2);
  vec3 c0 = mix(baseCol, rimCol, rim * 0.8);
  c0 = mix(c0, vec3(0.78, 0.5, 1.0), sky * 0.45 * z);
  // Window lights in the towers
  vec2 wg = u * vec2(30.0, 22.0);
  float win = step(0.72, h1(floor(wg) + c)) * step(0.3, fract(wg.x)) * step(0.35, fract(wg.y));
  c0 += vec3(1.0, 0.6, 0.86) * win * smoothstep(aa, -aa, town) * step(0.03, u.y) * 0.8 * z;
  return vec4(c0 * m, m);
}

float cloudDen(vec2 p, float band, float thick, float t) {
  float wy = p.y + uCam;
  float prof = 1.0 - smoothstep(0.0, thick, abs(wy - band));
  if (prof <= 0.0) return 0.0;
  vec2 q = vec2(p.x * 0.95 + t * 0.012, wy * 1.7);
  vec2 w = vec2(fbm(q + vec2(0.0, t * 0.01)), fbm(q + vec2(5.2, 1.3)));
  float n = fbm(q + w * 0.55);
  return clamp((n - 0.44 + prof * 0.42) * 3.0, 0.0, 1.0) * prof;
}

vec3 motes(vec2 p, float s, float spd, float seed) {
  vec2 q = p * s + vec2(seed * 7.1, -uTime * spd + uCam * s * 0.6);
  vec2 c = floor(q);
  vec2 f = fract(q);
  float h = h1(c + seed);
  if (h < 0.6) return vec3(0.0);
  vec2 o = 0.3 + 0.4 * h2(c + seed * 3.0);
  o.x += 0.06 * sin(uTime * 0.6 + h * 30.0);
  float d = length(f - o);
  float r = 0.035 + 0.05 * h1(c + 11.0);
  float b = smoothstep(r, 0.0, d) + 0.3 * smoothstep(r * 2.5, 0.0, d);
  float tw = 0.55 + 0.45 * sin(uTime * (1.2 + h * 2.0) + h * 50.0);
  vec3 col = mix(vec3(0.62, 0.5, 1.0), vec3(1.0, 0.4, 0.78), step(0.86, h));
  col = mix(col, vec3(0.42, 0.6, 1.0), step(0.93, h));
  return col * b * tw;
}

vec3 entity(vec2 p, float asp, float sc) {
  float lift = (1.0 - smoothstep(0.7, 1.3, asp)) * 0.2;
  vec2 e = vec2(uEnt.x * asp, min(uEnt.y + lift, 0.88));
  float R = uEnt.z * sc;
  vec2 d = p - e;
  float r = length(d);
  vec3 c = vec3(0.0);
  float pulse = 0.88 + 0.12 * sin(uTime * 1.3);
  c += vec3(1.0, 0.94, 1.0) * smoothstep(R * 0.15, R * 0.05, r);
  c += vec3(0.72, 0.56, 1.0) * exp(-r / (R * 0.32)) * 0.85 * pulse;
  c += vec3(1.0, 0.36, 0.76) * exp(-r / (R * 1.5)) * 0.22;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float rot = 0.5 + fi * 1.1 + uTime * (0.05 + 0.03 * fi);
    float tilt = 0.24 + 0.17 * sin(uTime * 0.33 + fi * 2.0);
    mat2 m = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
    vec2 q = m * d;
    q.y /= tilt;
    float rr = R * (0.58 + 0.3 * fi);
    float dist = abs(length(q) - rr) * mix(tilt, 1.0, abs(q.x) / max(length(q), 1e-4));
    float a = atan(q.y, q.x);
    float dir = mod(fi, 2.0) * 2.0 - 1.0;
    float seg = step(0.3, fract(a * (3.0 + fi * 2.0) / 6.2832 + uTime * (0.07 + 0.04 * fi) * dir));
    float lw = R * 0.016 + 1.0 / uRes.y;
    float line = smoothstep(lw, 0.0, dist) * seg;
    vec3 rc = mix(vec3(0.36, 0.52, 1.0), vec3(1.0, 0.36, 0.76), fi * 0.5);
    c += rc * (line * 1.3 + exp(-dist / (R * 0.06)) * 0.14);
  }
  // Attraction: brighter, with a wider magenta halo
  c *= uEntGlow;
  c += vec3(1.0, 0.36, 0.76) * exp(-r / (R * 2.4)) * 0.3 * max(uEntGlow - 1.0, 0.0);
  // Flare: one ring of light expanding out of the core, fading as it grows
  if (uFlare > 0.0) {
    float fr = R * (0.6 + 5.0 * uFlare);
    float fade = 1.0 - uFlare;
    c += vec3(1.0, 0.55, 0.88) * smoothstep(R * 0.08, 0.0, abs(r - fr)) * fade * fade * 1.6;
    c += vec3(0.8, 0.62, 1.0) * exp(-r / (R * 0.7)) * fade * 0.9;
  }
  return c * uEntA;
}

void main() {
  float asp = uRes.x / uRes.y;
  vec2 p = gl_FragCoord.xy / uRes.y;
  float t = uTime;
  float sc = clamp(asp / 1.6, 0.6, 1.0);

  vec2 sun = vec2(uSunPos.x * asp, uSunPos.y);
  vec2 sv = p - sun;
  float sd = length(sv);
  vec2 ldir = normalize(sun - p + vec2(0.0, 0.001));

  vec3 col = sky(p.y);
  col += uSun * (0.4 * exp(-sd * 2.6) + 0.32 * exp(-sd * 11.0));

  // Light rays fanning out of the sun
  float ang = atan(sv.y, sv.x);
  float rays = noise(vec2(ang * 7.0, t * 0.04)) * noise(vec2(ang * 13.0 + 3.0, t * 0.03));
  col += uSun * rays * 0.2 * exp(-sd * 1.5) * smoothstep(-0.2, 0.1, sv.y);

  // Stars, dimmed near the sun
  float sunL = clamp(dot(uSun, vec3(0.3, 0.5, 0.2)) * exp(-sd * 1.8) * 2.0, 0.0, 1.0);
  vec2 sp = (p + vec2(0.0, uCam * 0.12)) * 64.0;
  vec2 sc0 = floor(sp);
  float sh = h1(sc0);
  if (sh > 0.9 && uStars > 0.01) {
    vec2 so = 0.5 + (h2(sc0 + 3.0) - 0.5) * 0.6;
    float tw = 0.6 + 0.4 * sin(t * (0.8 + sh * 3.0) + sh * 40.0);
    float s = smoothstep(0.13, 0.0, length(fract(sp) - so)) * tw * (sh - 0.9) * 10.0;
    col += vec3(0.86, 0.86, 1.0) * s * uStars * (1.0 - sunL);
  }

  // Aurora curtains
  if (uAurora > 0.01) {
    // Two hanging curtains: a sharp lower hem that folds across the sky, vertical rays rising
    // from it, blue at the hem fringing to magenta at the top.
    for (int k = 0; k < 2; k++) {
      float fk = float(k);
      float fold = fbm(vec2(p.x * (1.0 + fk * 0.6) + t * 0.02 + fk * 9.0, fk * 3.0));
      float y0 = 0.4 + fk * 0.12 + 0.24 * fold;
      float above = p.y - y0;
      float height = 0.3 + 0.18 * noise(vec2(p.x * 2.5 + fk * 5.0, t * 0.05));
      float curtain = smoothstep(-0.012, 0.015, above) * (1.0 - smoothstep(0.0, height, above));
      float rays = 0.25 + 1.3 * pow(noise(vec2(p.x * 60.0 + fold * 24.0, t * 0.35 + fk * 4.0)), 2.0);
      float band = 0.3 + 0.7 * smoothstep(0.25, 0.75, noise(vec2(p.x * 1.6 - t * 0.04, 7.0 + fk)));
      float glow = exp(-max(above, 0.0) * 3.0);
      vec3 ac = mix(vec3(0.32, 0.52, 1.0), vec3(0.62, 0.42, 1.0), smoothstep(0.0, height * 0.5, above));
      ac = mix(ac, vec3(1.0, 0.34, 0.74), smoothstep(height * 0.45, height, above));
      col += ac * curtain * rays * band * glow * uAurora * (0.8 - fk * 0.3);
    }
  }

  vec3 haze = sky(p.y);
  vec3 ink = vec3(0.03, 0.025, 0.07);

  // Far and mid archipelagos, fading into the sky with distance
  vec4 far = islandLayer(p, 0.35, vec2(0.3, 0.62), 0.3, 3.0, mix(ink, haze, 0.66), mix(haze, uSun, 0.6), ldir);
  col = mix(col, far.rgb / max(far.a, 1e-4), far.a * uIsles);
  vec4 mid = islandLayer(p, 0.6, vec2(0.6, 1.05), 0.32, 11.0, mix(ink, haze, 0.42), mix(haze, uSun, 0.8), ldir);
  col = mix(col, mid.rgb / max(mid.a, 1e-4), mid.a * uIsles);

  // Cloud banks: one beneath the city, one sea of cloud high above it
  if (uClouds > 0.01) {
    float lo = cloudDen(p, 0.12, 0.22, t);
    float hi = cloudDen(p, 1.62, 0.32, t);
    float den = max(lo, hi) * uClouds;
    if (den > 0.0) {
      // Light the billows from the sun's side: denser toward the sun means this pixel is in shadow.
      float toward = max(cloudDen(p + ldir * 0.025, 0.12, 0.22, t), cloudDen(p + ldir * 0.025, 1.62, 0.32, t)) * uClouds;
      float light = clamp(0.62 + (den - toward) * 1.6, 0.0, 1.0);
      float sunInf = exp(-sd * 1.4);
      vec3 shade = mix(uTop, uMid, 0.35) * 0.75;
      vec3 lit = mix(uMid * 1.2, uSun * 1.15 + uLow * 0.2, 0.35 + 0.65 * sunInf);
      vec3 cc = mix(shade, lit, light);
      col = mix(col, cc, smoothstep(0.0, 0.6, den) * 0.95);
    }
  }

  // The floating city, nearest layer
  // On portrait screens the copy fills the lower half, so the city floats higher.
  float lift = (1.0 - smoothstep(0.7, 1.3, asp)) * 0.2;
  float cw = 0.17 * sc;
  vec2 cc0 = vec2(0.69 * asp, 0.43 + lift - uCam);
  cc0 += vec2(uPtr.x * 0.03, 0.01 * sin(t * 0.28));
  vec2 u = (p - cc0) / cw;
  float aa = 1.5 / (uRes.y * cw);
  float body = islandBody(u, 4.0);
  float town = city(u);
  float dc = min(body, town);
  float m = smoothstep(aa, -aa, dc);

  // Two smaller companions near the city, and islands that rise into view at dawn
  vec2 c1 = (p - vec2(0.93 * asp, 0.64 - uCam + 0.006 * sin(t * 0.4 + 1.0))) / (0.05 * sc);
  vec2 c2 = (p - vec2(0.44 * asp, 0.84 - uCam + 0.006 * sin(t * 0.35 + 2.0))) / (0.032 * sc);
  vec2 c3 = (p - vec2(0.46 * asp, 1.68 - uCam + 0.008 * sin(t * 0.3))) / (0.062 * sc);
  float d1 = isle1(c1);
  float d2 = islandBody(c2, 37.0);
  float d3 = isle3(c3);
  float m1 = smoothstep(1.5 / (uRes.y * 0.05 * sc), -1.5 / (uRes.y * 0.05 * sc), d1);
  float m2 = smoothstep(1.5 / (uRes.y * 0.032 * sc), -1.5 / (uRes.y * 0.032 * sc), d2);
  float m3 = smoothstep(1.5 / (uRes.y * 0.062 * sc), -1.5 / (uRes.y * 0.062 * sc), d3);
  float near = max(max(m, m1), max(m2, m3)) * uNearA;

  if (near > 0.0) {
    vec2 ul = u + ldir * 0.06;
    float lit = m * smoothstep(-aa, aa, min(islandBody(ul, 4.0), city(ul)));
    lit = max(lit, m1 * smoothstep(0.0, 0.05, isle1(c1 + ldir * 0.08)));
    lit = max(lit, m3 * smoothstep(0.0, 0.05, isle3(c3 + ldir * 0.08)));
    vec3 base = mix(ink, haze, 0.1 + 0.1 * smoothstep(-1.5, 0.0, u.y));
    vec3 ncol = mix(base, uSun * 1.1 + vec3(0.06), lit * 0.85);
    col = mix(col, ncol, near);

    // Lit windows in the towers
    vec2 wg = u * vec2(46.0, 30.0);
    float win = step(0.8, h1(floor(wg))) * step(0.25, fract(wg.x)) * step(0.35, fract(wg.y));
    float blink = step(0.15, fract(h1(floor(wg) + 2.0) + t * 0.03));
    float inTown = smoothstep(aa, -aa, town) * step(0.02, u.y);
    col += vec3(1.0, 0.62, 0.86) * win * blink * inTown * 0.9 * uNearA;
  }

  // Light falling from the city's edges into the cloud below
  for (int k = 0; k < 2; k++) {
    float fk = float(k);
    float wx = mix(-0.8, 0.7, fk) + 0.012 * sin(u.y * 9.0 + t * 1.5 + fk);
    float fall = smoothstep(0.045, 0.0, abs(u.x - wx)) * smoothstep(-2.6, -0.2, u.y) * step(u.y, 0.02);
    fall *= 0.45 + 0.55 * noise(vec2(u.x * 30.0, u.y * 5.0 + t * 2.4));
    col += vec3(0.5, 0.62, 1.0) * fall * 0.55 * (1.0 - m) * uNearA;
  }

  col += entity(p, asp, sc);
  col += motes(p, 9.0, 0.05, 1.0) * 0.9;
  col += motes(p, 17.0, 0.08, 7.0) * 0.55;

  vec2 vu = gl_FragCoord.xy / uRes - 0.5;
  col *= mix(0.7, 1.0, smoothstep(0.85, 0.25, length(vu * vec2(1.1, 1.0))));
  col += (h1(gl_FragCoord.xy + fract(t)) - 0.5) / 255.0;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;
