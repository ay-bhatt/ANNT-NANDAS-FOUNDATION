import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = process.cwd();

const slideshowSources = [
  "src/assets/hero/HERO (1).jpeg",
  "src/assets/hero/HERO.jpeg",
  "src/assets/hero/HERO (2).jpeg",
  "src/assets/hero/HERO (3).jpeg",
  "src/assets/hero/HERO (4).jpeg",
  "src/assets/hero/gallery (3).jpeg",
  "src/assets/gallery/gallery (1).jpeg",
  "src/assets/events/event (1).jpeg",
  "src/assets/education/gallery-032.jpg.jpeg",
  "src/assets/environment/gallery-049.jpg.jpeg",
];

const generalSources = [
  "src/assets/hero/HERO.jpeg",
  "src/assets/hero/HERO (1).jpeg",
  "src/assets/hero/HERO (2).jpeg",
  "src/assets/hero/HERO (3).jpeg",
  "src/assets/hero/HERO (4).jpeg",
  "src/assets/Kalam singh bisht/event-011.jpg.jpeg",
  "src/assets/Kalam singh bisht/collage (4).jpeg",
  "src/assets/Kalam singh bisht/collage (5).jpeg",
  "src/assets/education/gallery-032.jpg.jpeg",
  "src/assets/education/gallery-066.jpg.jpeg",
  "src/assets/education/gallery-067.jpg.jpeg",
  "src/assets/women empowerment/gallery-029.jpg.jpeg",
  "src/assets/women empowerment/gallery-031.jpg.jpeg",
  "src/assets/women empowerment/image.jpeg",
  "src/assets/healthcare/event (4).jpeg",
  "src/assets/environment/gallery-049.jpg.jpeg",
  "src/assets/events/event (1).jpeg",
  "src/assets/events/event (4).jpeg",
  "src/assets/events/event (10).jpeg",
  "src/assets/events/event (14).jpeg",
  "src/assets/events/event (16).jpeg",
  "src/assets/events/event-010.jpg.jpeg",
  "src/assets/news/news.jpeg",
  "src/assets/news/news (1).jpeg",
  "src/assets/news/news (2).jpeg",
  "src/assets/news/news (3).jpeg",
  "src/assets/news/news (4).jpeg",
  "src/assets/news/news (5).jpeg",
  "src/assets/news/news (6).jpeg",
  "src/assets/gallery/gallery (1).jpeg",
  "src/assets/gallery/gallery (2).jpeg",
  "src/assets/gallery/gallery (3).jpeg",
  "src/assets/gallery/gallery (4).jpeg",
  "src/assets/gallery/gallery-015.jpg.jpeg",
  "src/assets/gallery/gallery-020.jpg.jpeg",
  "src/assets/gallery/gallery-021.jpg.jpeg",
  "src/assets/gallery/gallery-024.jpg.jpeg",
  "src/assets/gallery/gallery-031.jpg.jpeg",
  "src/assets/gallery/gallery-034.jpg.jpeg",
  "src/assets/gallery/gallery-041.jpg.jpeg",
  "src/assets/gallery/gallery-054.jpg.jpeg",
  "src/assets/gallery/gallery-060.jpg.jpeg",
  "src/assets/gallery/gallery-065.jpg.jpeg",
  "src/assets/collage/collage (1).jpeg",
  "src/assets/collage/collage (6).jpeg",
  "src/assets/collage/collage (10).jpeg",
  "src/assets/collage/gallery (1).jpeg",
  "src/assets/collage/gallery (2).jpeg",
  "src/assets/hero MOB/mob-hero (2).jpeg",
  "src/assets/logo.jpeg",
];

async function convert(srcRel, destRel, options) {
  const src = path.join(root, srcRel);
  const dest = path.join(root, destRel);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing source image: ${srcRel}`);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(src)
    .rotate()
    .resize({
      width: options.width,
      height: options.height,
      fit: options.fit || "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: options.quality, effort: 4 })
    .toFile(dest);
  const fromKb = Math.round(fs.statSync(src).size / 1024);
  const toKb = Math.round(fs.statSync(dest).size / 1024);
  console.log(`${srcRel} ${fromKb}KB -> ${destRel} ${toKb}KB`);
}

const slideshowDir = "src/assets/hero/slideshow";
for (let i = 0; i < slideshowSources.length; i += 1) {
  const name = `slide-${String(i + 1).padStart(2, "0")}.webp`;
  await convert(slideshowSources[i], path.join(slideshowDir, name), {
    width: 1920,
    height: 1080,
    fit: "cover",
    quality: 74,
  });
}

for (const srcRel of generalSources) {
  const destRel = srcRel.replace(/\.(jpe?g|png)$/i, ".webp");
  const isLogo = srcRel.endsWith("logo.jpeg");
  await convert(srcRel, destRel, {
    width: isLogo ? 256 : 1600,
    quality: isLogo ? 82 : 76,
  });
}
