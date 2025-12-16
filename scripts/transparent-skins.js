import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';

const skinsDir = path.resolve('public/skins');
const threshold = 30; // 0-255, tolerance for "white"

async function processImages() {
    if (!fs.existsSync(skinsDir)) {
        console.log("Skins directory not found.");
        return;
    }

    const files = fs.readdirSync(skinsDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

    for (const file of files) {
        console.log(`Processing ${file}...`);
        const filePath = path.join(skinsDir, file);

        try {
            const image = await Jimp.read(filePath);

            // Scan for white-ish pixels and make them transparent
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
                const red = this.bitmap.data[idx + 0];
                const green = this.bitmap.data[idx + 1];
                const blue = this.bitmap.data[idx + 2];
                // const alpha = this.bitmap.data[idx + 3];

                // Check if pixel is white-ish
                if (red > 255 - threshold && green > 255 - threshold && blue > 255 - threshold) {
                    this.bitmap.data[idx + 3] = 0; // Set alpha to 0
                }
            });

            // Save as PNG (to support transparency) if it wasn't already
            const newPath = filePath.replace(/\.(jpg|jpeg)$/i, '.png');
            await image.write(newPath);

            if (newPath !== filePath) {
                fs.unlinkSync(filePath); // Delete old jpg
                console.log(`Converted to PNG: ${newPath}`);
            } else {
                console.log(`Updated: ${filePath}`);
            }

        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }
}

processImages();
