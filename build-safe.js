import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const distDir = path.resolve('dist');

if (fs.existsSync(distDir)) {
    console.log('Cleaning dist directory (preserving .user.ini)...');
    const files = fs.readdirSync(distDir);
    for (const file of files) {
        if (file === '.user.ini') {
            console.log('Skipping .user.ini');
            continue;
        }
        const filePath = path.join(distDir, file);
        fs.rmSync(filePath, { recursive: true, force: true });
    }
}

console.log('Running Vite build...');
try {
    execSync('vite build', { stdio: 'inherit' });
} catch (error) {
    process.exit(1);
}
