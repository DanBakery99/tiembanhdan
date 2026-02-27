// ESM wrapper — delegates to the CJS test file which uses require()
// Package.json has "type": "module" so .js files are ESM by default.
// Puppeteer requires CommonJS-style loading in this test setup.

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
    execSync(`node "${join(__dirname, 'headless-test.cjs')}"`, {
        stdio: 'inherit',
        env: { ...process.env },
    });
} catch (e) {
    process.exit(e.status || 2);
}
