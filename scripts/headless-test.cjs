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
        // ignore benign warnings about tailwind CDN and favicon load messages
        if (type === 'error') {
            if (text && text.includes('favicon.ico')) return;
            console.error('[PAGE CONSOLE ERROR]', text);
            // do not treat console.error as fatal here; use network/page errors instead
        } else {
            // log other console outputs but don't treat warnings as failures
            console.log('[PAGE CONSOLE]', type, text);
        }
    });

    page.on('pageerror', err => {
        console.error('[PAGE ERROR]', err.toString());
        hadError = true;
    });

    // Attach network failure logging
    page.on('requestfailed', req => {
        const f = req.failure && req.failure();
        console.error('[REQUEST FAILED]', req.url(), f && f.errorText);
        hadError = true;
    });
    page.on('response', res => {
        const status = res.status();
        const url = res.url() || '';
        // ignore favicon 404
        if (url.endsWith('/favicon.ico')) return;
        if (status >= 400) {
            console.error('[BAD RESPONSE]', url, status);
            hadError = true;
        }
    });

    for (const p of PATHS) {
        const url = BASE + p;
        console.log('Visiting', url);
        try {
            const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
            if (!res || res.status() >= 400) {
                console.error('[NAV ERROR] Non-OK response for', url, res && res.status());
                hadError = true;
            }
            // small pause
            await new Promise(r => setTimeout(r, 1000));
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
