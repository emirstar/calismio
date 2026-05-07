/**
 * Kenar ile bağlantılı ve zemine yakın renkleri şeffaf yap (siyah / düz açık fon).
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'

const inputPath = process.argv[2] ?? 'public/mascot.png'
const outputPath = process.argv[3] ?? 'public/mascot.png'

const buf = readFileSync(inputPath)
const { data: raw, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const data = Buffer.from(raw)

const w = info.width
const h = info.height
const st = 4

function I(x, y) {
  return (y * w + x) * st
}

function rgb(i) {
  return { r: data[i], g: data[i + 1], b: data[i + 2] }
}

function dist(a, b) {
  const dr = a.r - b.r
  const dg = a.g - b.g
  const db = a.b - b.b
  return Math.hypot(dr, dg, db)
}

let sr = 0,
  sg = 0,
  sb = 0,
  ec = 0
for (let x = 0; x < w; x++) {
  for (const y of [0, h - 1]) {
    const i = I(x, y)
    sr += data[i]
    sg += data[i + 1]
    sb += data[i + 2]
    ec++
  }
}
for (let y = 1; y < h - 1; y++) {
  for (const x of [0, w - 1]) {
    const i = I(x, y)
    sr += data[i]
    sg += data[i + 1]
    sb += data[i + 2]
    ec++
  }
}

const bgRef = { r: sr / ec, g: sg / ec, b: sb / ec }
const tol = 52

function matches(i) {
  return dist(rgb(i), bgRef) <= tol
}

const queued = new Uint8Array(w * h)
const q = []

function seed(x, y) {
  if (x < 0 || x >= w || y < 0 || y >= h) return
  const p = y * w + x
  if (queued[p]) return
  const i = I(x, y)
  if (!matches(i)) return
  queued[p] = 1
  q.push([x, y])
}

for (let x = 0; x < w; x++) {
  seed(x, 0)
  seed(x, h - 1)
}
for (let y = 0; y < h; y++) {
  seed(0, y)
  seed(w - 1, y)
}

for (let k = 0; k < q.length; k++) {
  const [x, y] = q[k]
  const i = I(x, y)
  data[i + 3] = 0
  const nb = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ]
  for (const [nx, ny] of nb) seed(nx, ny)
}

/** Şeffaf boşluğa komşu mat beyaz/gri halo (anti-alias) katmanlarını soy */
function peelHalos(rounds = 14) {
  function touchesTransparent(x, y) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue
        const nx = x + dx
        const ny = y + dy
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) return true
        if (data[I(nx, ny) + 3] < 28) return true
      }
    }
    return false
  }

  function neutralBright(r, g, b) {
    const lum = (r + g + b) / 3
    const sat = Math.max(r, g, b) - Math.min(r, g, b)
    return lum > 228 && sat < 42 && Math.abs(r - g) < 48 && Math.abs(g - b) < 48
  }

  for (let r = 0; r < rounds; r++) {
    const victims = []
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = I(x, y)
        if (data[i + 3] < 40) continue
        const rr = data[i],
          g = data[i + 1],
          b = data[i + 2]
        if (!neutralBright(rr, g, b)) continue
        if (touchesTransparent(x, y)) victims.push(i)
      }
    }
    if (victims.length === 0) break
    for (const i of victims) data[i + 3] = 0
  }
}

peelHalos()

const out = await sharp(data, {
  raw: { width: w, height: h, channels: 4 },
})
  .png()
  .toBuffer()

writeFileSync(outputPath, out)
console.log('transparent:', outputPath)
