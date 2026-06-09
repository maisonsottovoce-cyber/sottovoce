import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const TMP = "C:/Users/karin/AppData/Local/Temp";
const SRC = `${TMP}/gp_imgs`;
const OUT = path.resolve("public/images/lookbook");
fs.mkdirSync(OUT, { recursive: true });

const files = fs
  .readFileSync(`${TMP}/unique.txt`, "utf8")
  .split("\n")
  .map((s) => s.trim().replace(/^\*/, ""))
  .filter(Boolean)
  .filter((f) => f !== "img_01.jpg" && f !== "img_32.jpg");

let total = 0;
for (const f of files) {
  const out = path.join(OUT, f.replace(/\.jpg$/, "") + ".jpg");
  await sharp(path.join(SRC, f))
    .resize(1080, 1620, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(out);
  total += fs.statSync(out).size;
}
console.log(`processed ${files.length} images → ${(total / 1048576).toFixed(1)}MB total`);
