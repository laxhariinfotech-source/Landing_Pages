/**
 * generate-favicons.mjs
 * Creates favicon files from SVG in multiple sizes
 */

import sharp from "sharp";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = resolve(__dirname, "../public");

// Favicon sizes to generate
const sizes = [16, 32, 192];

async function generateFavicons() {
  const svgPath = resolve(assetsDir, "favicon.svg");
  
  for (const size of sizes) {
    const outputPath = resolve(assetsDir, `favicon-${size}x${size}.png`);
    
    await sharp(svgPath)
      .resize(size, size, {
        fit: "contain",
        background: { r: 255, g: 102, b: 0, alpha: 1 }
      })
      .png({ effort: 9 })
      .toFile(outputPath);
    
    console.log(`✓ Generated favicon-${size}x${size}.png`);
  }

  // Also generate apple-touch-icon (larger, iOS)
  await sharp(svgPath)
    .resize(180, 180, {
      fit: "contain",
      background: { r: 255, g: 102, b: 0, alpha: 1 }
    })
    .png({ effort: 9 })
    .toFile(resolve(assetsDir, "apple-touch-icon.png"));
  
  console.log("✓ Generated apple-touch-icon.png");
  console.log("\n✅ All favicons generated successfully!");
}

generateFavicons().catch(err => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
