import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const TMP = "C:/Users/karin/AppData/Local/Temp";
const dir = `${TMP}/gp_imgs`;
// usable photos only (exclude avatar img_01 + pixel img_32)
const files = fs
  .readFileSync(`${TMP}/unique.txt`, "utf8")
  .split("\n")
  .map((s) => s.trim().replace(/^\*/, ""))
  .filter(Boolean)
  .filter((f) => f !== "img_01.jpg" && f !== "img_32.jpg");

const cols = 4;
const tw = 360;
const th = 540;
const pad = 8;
const labelH = 22;
const cellW = tw + pad * 2;
const cellH = th + pad * 2 + labelH;
const rows = Math.ceil(files.length / cols);
const W = cols * cellW;
const H = rows * cellH;

const composites = [];
for (let i = 0; i < files.length; i++) {
  const f = files[i];
  const col = i % cols;
  const row = Math.floor(i / cols);
  const x = col * cellW + pad;
  const y = row * cellH + pad;
  const thumb = await sharp(path.join(dir, f))
    .resize(tw, th, { fit: "cover" })
    .jpeg({ quality: 70 })
    .toBuffer();
  composites.push({ input: thumb, left: x, top: y });
  const label = Buffer.from(
    `<svg width="${tw}" height="${labelH}"><rect width="100%" height="100%" fill="#111"/><text x="6" y="16" font-family="monospace" font-size="14" fill="#fff">${f}</text></svg>`,
  );
  composites.push({ input: label, left: x, top: y + th + 2 });
}

await sharp({
  create: { width: W, height: H, channels: 3, background: "#222" },
})
  .composite(composites)
  .jpeg({ quality: 72 })
  .toFile(`${TMP}/contact_sheet.jpg`);

console.log(`montage: ${files.length} photos, ${W}x${H}`);
console.log(files.join(" "));
