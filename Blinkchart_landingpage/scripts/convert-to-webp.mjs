/**
 * convert-to-webp.mjs
 * Converts PNG assets used in the app to WebP at <= 200 KB each.
 * Run once:  node scripts/convert-to-webp.mjs
 */

import sharp from "sharp";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readdir, stat } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = resolve(__dirname, "../src/assets");

const conversions = [
  // Team photos — target 480 px wide, 75 % quality
  { file: "abi.png",       width: 480, quality: 75 },
  { file: "akshaya.png",   width: 480, quality: 75 },
  { file: "avr.png",       width: 480, quality: 75 },
  { file: "freeza.png",    width: 480, quality: 75 },
  { file: "Gunavathi.png", width: 480, quality: 75 },
  { file: "hari.png",      width: 480, quality: 75 },
  { file: "nandhini.png",  width: 480, quality: 75 },
  // Logo — target 300 px wide, 80 % quality
  { file: "bink 1.png",    width: 300, quality: 80 },
];

const TARGET_KB = 200;

async function convert({ file, width, quality }) {
  const input  = resolve(assetsDir, file);
  const output = resolve(assetsDir, file.replace(/\.png$/i, ".webp").replace(/ /g, "-"));

  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(output);

  const { size } = await stat(output);
  const kb = (size / 1024).toFixed(1);
  const flag = size / 1024 > TARGET_KB ? "⚠  ABOVE 200 KB" : "✓";
  console.log(`${flag}  ${file.padEnd(20)} → ${output.split(/[/\\]/).pop().padEnd(28)} ${kb} KB`);
}

for (const item of conversions) {
  await convert(item);
}

console.log("\nDone. Review any ⚠ entries and lower quality/width if needed.");
