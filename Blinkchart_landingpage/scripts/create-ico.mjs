/**
 * Create favicon.ico from PNG
 */

import sharp from "sharp";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

async function createFaviconIco() {
  // Create ICO from 32x32 PNG
  await sharp(resolve(publicDir, "favicon-32x32.png"))
    .resize(32, 32, { fit: "contain" })
    .toFile(resolve(publicDir, "favicon.ico"));
  
  console.log("✓ Generated favicon.ico");
}

createFaviconIco().catch(err => console.error(err));
