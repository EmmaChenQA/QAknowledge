const zlib = require('zlib'), fs = require('fs'), path = require('path');

const CRC = (() => { const t = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = buf => { let c = 0xffffffff; for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};
function png(w, h, pixels, colorType) {
  const bpp = colorType === 6 ? 4 : 2;
  const raw = Buffer.alloc(h * (1 + w * bpp));
  for (let y = 0; y < h; y++) {
    raw[y * (1 + w * bpp)] = 0;
    pixels.copy(raw, y * (1 + w * bpp) + 1, y * w * bpp, (y + 1) * w * bpp);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = colorType; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0)),
  ]);
}

function inPoly(x, y, p) {
  let hit = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    if ((p[i][1] > y) !== (p[j][1] > y)
      && x < (p[j][0] - p[i][0]) * (y - p[i][1]) / (p[j][1] - p[i][1]) + p[i][0]) hit = !hit;
  }
  return hit;
}
function distPoly(x, y, p) {
  let best = Infinity;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    const ax = p[j][0], ay = p[j][1], bx = p[i][0], by = p[i][1];
    const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
    const t = l2 ? Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / l2)) : 0;
    best = Math.min(best, Math.hypot(x - (ax + t * dx), y - (ay + t * dy)));
  }
  return best;
}

// 取自 scripts/build.js:125 的網站 logo（24x24 viewBox）
const BACK = [[9, 4], [16, 4], [11, 12], [16, 20], [9, 20], [4, 12]];
const FRONT = [[15, 4], [22, 4], [17, 12], [22, 20], [15, 20], [10, 12]];
const GAP = 1.35;

// 把 0..1 畫布座標映射到 logo 的 24 單位座標，mark 置中
function mapper(fit, polys) {
  const xs = polys.flat().map(p => p[0]), ys = polys.flat().map(p => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const scale = Math.max(x1 - x0, y1 - y0) / fit;
  return (u, v) => [(x0 + x1) / 2 + (u - .5) * scale, (y0 + y1) / 2 + (v - .5) * scale];
}
const dilatedFront = (x, y) => inPoly(x, y, FRONT) || distPoly(x, y, FRONT) <= GAP;

const mapBoth = mapper(.92, [BACK, FRONT]);
const mapFront = mapper(.92, [FRONT]);

const bothChevrons = (u, v) => {
  const [x, y] = mapBoth(u, v);
  return { a: inPoly(x, y, FRONT) || (inPoly(x, y, BACK) && !dilatedFront(x, y)) ? 1 : 0 };
};
const frontOnly = (u, v) => {
  const [x, y] = mapFront(u, v);
  return { a: inPoly(x, y, FRONT) ? 1 : 0 };
};
const bothFadedFront = (u, v) => {
  const [x, y] = mapBoth(u, v);
  if (inPoly(x, y, FRONT)) return { a: .45 };
  return { a: inPoly(x, y, BACK) && !dilatedFront(x, y) ? 1 : 0 };
};
function triBang(u, v) {
  const y0 = .13, y1 = .87, halfAt = y => (y - y0) / (y1 - y0) * .42;
  if (!(v >= y0 && v <= y1 && Math.abs(u - .5) <= halfAt(v))) return { a: 0 };
  const bar = Math.abs(u - .5) <= .065 && v >= .40 && v <= .66;
  const dot = Math.hypot(u - .5, v - .765) <= .075;
  return { a: bar || dot ? 0 : 1 };
}

const SS = 4;
function renderGray(size, fn) {
  const px = Buffer.alloc(size * size * 2);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let acc = 0;
    for (let sy = 0; sy < SS; sy++) for (let sx = 0; sx < SS; sx++)
      acc += fn((x + (sx + .5) / SS) / size, (y + (sy + .5) / SS) / size).a;
    const i = (y * size + x) * 2;
    px[i] = 0; px[i + 1] = Math.round(acc / (SS * SS) * 255);
  }
  return png(size, size, px, 4);
}
function renderRGBA(size, fn) {
  const px = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let r = 0, g = 0, b = 0, a = 0;
    for (let sy = 0; sy < SS; sy++) for (let sx = 0; sx < SS; sx++) {
      const c = fn((x + (sx + .5) / SS) / size, (y + (sy + .5) / SS) / size);
      r += c[0] * c[3]; g += c[1] * c[3]; b += c[2] * c[3]; a += c[3];
    }
    const n = SS * SS, i = (y * size + x) * 4;
    px[i] = a ? Math.round(r / a) : 0; px[i + 1] = a ? Math.round(g / a) : 0;
    px[i + 2] = a ? Math.round(b / a) : 0; px[i + 3] = Math.round(a / n * 255);
  }
  return png(size, size, px, 6);
}

// app 圖示：忠實還原網站 logo（藍底圓角方 + 兩個白 chevron，後者 .55 透明）
const mapApp = mapper(.60, [BACK, FRONT]);
function appIcon(u, v) {
  const r = .22, inset = .055, lo = inset, hi = 1 - inset;
  const cx = Math.min(Math.max(u, lo + r), hi - r), cy = Math.min(Math.max(v, lo + r), hi - r);
  if (!(u >= lo && u <= hi && v >= lo && v <= hi && Math.hypot(u - cx, v - cy) <= r)) return [0, 0, 0, 0];
  const [x, y] = mapApp(u, v);
  let c = [37, 99, 235];
  if (inPoly(x, y, BACK)) c = c.map(v0 => Math.round(v0 + (255 - v0) * .55));
  if (inPoly(x, y, FRONT)) c = [255, 255, 255];
  return [c[0], c[1], c[2], 1];
}

// Windows 系統匣：純黑在深色工作列會消失，改用藍底色塊 + 白色字符
const tile = glyph => (u, v) => {
  const r = .22, inset = .03, lo = inset, hi = 1 - inset;
  const cx = Math.min(Math.max(u, lo + r), hi - r), cy = Math.min(Math.max(v, lo + r), hi - r);
  if (!(u >= lo && u <= hi && v >= lo && v <= hi && Math.hypot(u - cx, v - cy) <= r)) return [0, 0, 0, 0];
  const s = .64, a = glyph(.5 + (u - .5) / s, .5 + (v - .5) / s).a;
  return [37 + (255 - 37) * a, 99 + (255 - 99) * a, 235 + (255 - 235) * a, 1];
};

const OUT = path.join(__dirname, 'icons');
fs.mkdirSync(OUT, { recursive: true });
const STATES = { stopped: frontOnly, starting: bothFadedFront, running: bothChevrons, error: triBang };
for (const [n, fn] of Object.entries(STATES)) {
  fs.writeFileSync(path.join(OUT, n + 'Template.png'), renderGray(16, fn));
  fs.writeFileSync(path.join(OUT, n + 'Template@2x.png'), renderGray(32, fn));
  fs.writeFileSync(path.join(OUT, n + '.png'), renderRGBA(16, tile(fn)));
  fs.writeFileSync(path.join(OUT, n + '@2x.png'), renderRGBA(32, tile(fn)));
}
const BUILD = path.resolve(__dirname, '..', 'build');
fs.mkdirSync(BUILD, { recursive: true });
fs.writeFileSync(path.join(BUILD, 'icon.png'), renderRGBA(512, appIcon));
console.log('icons written');
