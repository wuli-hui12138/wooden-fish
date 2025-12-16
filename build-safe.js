import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const distDir = path.resolve('dist');
const tempDir = path.resolve('dist_temp');

// 1. Clean temp dir if exists
if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
}

// 2. Run Vite build to temp dir
console.log('Building to temporary directory...');
try {
    // --emptyOutDir is safe here because tempDir is disposable
    execSync('npx vite build --outDir dist_temp --emptyOutDir', { stdio: 'inherit' });
} catch (error) {
    console.error('Build failed');
    process.exit(1);
}

// 3. Sync files to dist (preserving .user.ini)
console.log('Syncing files to dist...');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Copy everything from temp to dist, replacing existing files
const files = fs.readdirSync(tempDir);
for (const file of files) {
    const srcPath = path.join(tempDir, file);
    const destPath = path.join(distDir, file);

    // Check if dest is .user.ini (shouldn't be in temp, but good to check)
    if (file === '.user.ini') continue;

    // If dest exists and is not .user.ini, remove it first (clean update)
    if (fs.existsSync(destPath)) {
        if (fs.statSync(destPath).isDirectory()) {
            fs.rmSync(destPath, { recursive: true, force: true });
        } else {
            fs.unlinkSync(destPath);
        }
    }

    // Move/Copy file
    fs.cpSync(srcPath, destPath, { recursive: true });
}

// 4. Cleanup temp
fs.rmSync(tempDir, { recursive: true, force: true });

console.log('Build completed successfully!');
