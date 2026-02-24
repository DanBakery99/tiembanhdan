const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'public', 'assets');
const outDir = srcDir; // write webp alongside originals

(async () => {
  try {
    const files = await fs.promises.readdir(srcDir);
    const imgs = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));
    for (const img of imgs) {
      const input = path.join(srcDir, img);
      const name = path.parse(img).name;
      const out = path.join(outDir, name + '.webp');
      try {
        await sharp(input).webp({ quality: 80 }).toFile(out);
        console.log('Created', out);
      } catch (e) {
        console.error('Failed', input, e.message);
      }
    }
    console.log('Image optimization finished');
    process.exit(0);
  } catch (err) {
    console.error('Image optimization script error', err);
    process.exit(1);
  }
})();
