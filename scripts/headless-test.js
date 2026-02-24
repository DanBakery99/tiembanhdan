const puppeteer = require('puppeteer');

const BASE = process.env.BASE_URL || 'http://localhost:5173';
const PATHS = ['/', '/admin.html'];

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    let hadError = false;

    page.on('console', msg => {
        const type = msg.type();
        const text = msg.text();
        if (type === 'error') {
            console.error('[PAGE CONSOLE ERROR]', text);
            hadError = true;
        } else {
            console.log('[PAGE CONSOLE]', type, text);
        }
    });

    page.on('pageerror', err => {
        console.error('[PAGE ERROR]', err.toString());
        hadError = true;
    });

    for (const p of PATHS) {
        const url = BASE + p;
        console.log('Visiting', url);
        try {
            const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
            if (!res || !res.ok()) {
                console.error('[NAV ERROR] Non-OK response for', url, res && res.status());
                hadError = true;
            }
            await page.waitForTimeout(1000);
        } catch (e) {
            console.error('[NAV ERROR]', e.toString());
            hadError = true;
        }
    }

    await browser.close();

    if (hadError) {
        console.error('Headless test finished: ERRORS detected');
        process.exit(2);
    }

    console.log('Headless test finished: no console/page errors detected');
    process.exit(0);
})();
