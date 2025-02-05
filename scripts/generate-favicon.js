const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = {
  'favicon-16x16': 16,
  'favicon-32x32': 32,
  'apple-touch-icon': 180
};

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));
  
  // Generate PNGs
  for (const [name, size] of Object.entries(sizes)) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../public/${name}.png`));
    
    // Also save the 32x32 version as favicon.ico (it's actually a PNG)
    if (size === 32) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(__dirname, '../public/favicon.ico'));
    }
  }

  console.log('Favicon files generated successfully!');
}

generateFavicons().catch(console.error); 