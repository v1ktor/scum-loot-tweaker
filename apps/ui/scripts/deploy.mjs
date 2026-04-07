import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const repo = 'git@github.com:v1ktor/scum-loot-tweaker.git';
const branch = 'gh-pages';

if (!fs.existsSync(distDir)) {
    console.error('dist/ directory not found. Run build first.');
    process.exit(1);
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gh-pages-'));

try {
    console.log(`Deploying to ${branch}...`);

    const run = (cmd, cwd = tmpDir) => execSync(cmd, { cwd, stdio: 'inherit' });

    run('git init');
    run(`git checkout --orphan ${branch}`);

    copyDirSync(distDir, tmpDir);

    run('git add .');
    run('git commit -m "Deploy"');
    run(`git remote add origin ${repo}`);
    run(`git push origin ${branch} --force`);

    console.log('Deployed successfully!');
} finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
}

function copyDirSync(src, dest) {
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyDirSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}
