/**
 * Comprehensive link/CTA audit test for Tiệm Bánh DAN.
 * Validates all external links, social links, tel: links, and mobile CTAs
 * at both desktop and mobile viewport widths.
 *
 * Usage: node scripts/test-links.cjs [BASE_URL]
 * Default BASE_URL: http://localhost:5173
 */
const puppeteer = require('puppeteer');

const BASE = process.argv[2] || process.env.BASE_URL || 'http://localhost:5173';
const DESKTOP = { width: 1280, height: 900 };
const MOBILE = { width: 375, height: 812 };

// Expected link patterns (from data.js defaults)
const EXPECTED = {
    zaloUrl: /^https:\/\/zalo\.me\//,
    facebookUrl: /^https:\/\/facebook\.com\//,
    instagramUrl: /^https:\/\/www\.instagram\.com\//,
    telHref: /^tel:\d+/,
    googleMapsUrl: /^https:\/\/maps\.app\.goo\.gl\//,
    mapEmbed: /^https:\/\/www\.google\.com\/maps\/embed/,
};

let errors = [];
let warnings = [];

const pass = (msg) => console.log(`  ✅ ${msg}`);
const fail = (msg) => { console.error(`  ❌ ${msg}`); errors.push(msg); };
const warn = (msg) => { console.warn(`  ⚠️  ${msg}`); warnings.push(msg); };

async function testPage(page, viewport, label) {
    console.log(`\n━━━ ${label} (${viewport.width}x${viewport.height}) ━━━`);
    await page.setViewport(viewport);
    await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 30000 });
    // Wait for app.js async rendering (app:rendered event)
    await new Promise(r => setTimeout(r, 3000));

    // ── 1. Social links in footer ──────────────────────────────────
    console.log('\n  [Footer social links]');
    const footerFb = await page.$eval('#footer-facebook', el => el.href).catch(() => null);
    const footerIg = await page.$eval('#footer-instagram', el => el.href).catch(() => null);
    const footerZalo = await page.$eval('#footer-zalo', el => el.href).catch(() => null);
    const footerMaps = await page.$eval('#footer-maps-link', el => el.href).catch(() => null);
    const footerZaloCta = await page.$eval('#footer-zalo-cta', el => el.href).catch(() => null);

    if (footerFb && EXPECTED.facebookUrl.test(footerFb)) pass(`Facebook: ${footerFb}`);
    else fail(`Facebook link missing or wrong: ${footerFb}`);

    if (footerIg && EXPECTED.instagramUrl.test(footerIg)) pass(`Instagram: ${footerIg}`);
    else fail(`Instagram link missing or wrong: ${footerIg}`);

    if (footerZalo && EXPECTED.zaloUrl.test(footerZalo)) pass(`Zalo: ${footerZalo}`);
    else fail(`Zalo link missing or wrong: ${footerZalo}`);

    if (footerMaps && EXPECTED.googleMapsUrl.test(footerMaps)) pass(`Maps: ${footerMaps}`);
    else fail(`Maps link missing or wrong: ${footerMaps}`);

    if (footerZaloCta && EXPECTED.zaloUrl.test(footerZaloCta)) pass(`Zalo CTA: ${footerZaloCta}`);
    else fail(`Zalo CTA link missing or wrong: ${footerZaloCta}`);

    // Check rel attributes
    const fbRel = await page.$eval('#footer-facebook', el => el.rel).catch(() => '');
    const igRel = await page.$eval('#footer-instagram', el => el.rel).catch(() => '');
    const zaloRel = await page.$eval('#footer-zalo', el => el.rel).catch(() => '');
    for (const [name, rel] of [['Facebook', fbRel], ['Instagram', igRel], ['Zalo', zaloRel]]) {
        if (rel.includes('noopener') && rel.includes('noreferrer')) pass(`${name} rel="${rel}"`);
        else warn(`${name} rel="${rel}" — should include noopener noreferrer`);
    }

    // ── 2. Gallery Instagram links ──────────────────────────────────
    console.log('\n  [Gallery Instagram links]');
    const galleryInsta = await page.$eval('#gallery-instagram-link', el => el.href).catch(() => null);
    const galleryMore = await page.$eval('#gallery-more-cta', el => el.href).catch(() => null);
    const gallerySvg = await page.$eval('#gallery-instagram-link svg', el => !!el).catch(() => false);

    if (galleryInsta && EXPECTED.instagramUrl.test(galleryInsta)) pass(`Gallery insta link: ${galleryInsta}`);
    else fail(`Gallery insta link wrong: ${galleryInsta}`);

    if (galleryMore && EXPECTED.instagramUrl.test(galleryMore)) pass(`Gallery more CTA: ${galleryMore}`);
    else fail(`Gallery more CTA wrong: ${galleryMore}`);

    if (gallerySvg) pass('Gallery insta SVG icon preserved');
    else fail('Gallery insta SVG icon was wiped by JS');

    // ── 3. Reviews & Map section ────────────────────────────────────
    console.log('\n  [Reviews & Map]');
    const mapsLink = await page.$eval('#google-maps-link', el => el.href).catch(() => null);
    const directionsBtn = await page.$eval('#get-directions-btn', el => el.href).catch(() => null);
    const mapIframe = await page.$eval('#google-map-iframe iframe', el => el.src).catch(() => null);

    if (mapsLink && EXPECTED.googleMapsUrl.test(mapsLink)) pass(`Maps review link: ${mapsLink}`);
    else fail(`Maps review link wrong: ${mapsLink}`);

    if (directionsBtn && EXPECTED.googleMapsUrl.test(directionsBtn)) pass(`Directions btn: ${directionsBtn}`);
    else fail(`Directions btn wrong: ${directionsBtn}`);

    if (mapIframe && EXPECTED.mapEmbed.test(mapIframe)) pass(`Map iframe: loaded`);
    else warn(`Map iframe not loaded: ${mapIframe}`);

    // ── 4. Hero CTAs ────────────────────────────────────────────────
    console.log('\n  [Hero CTAs]');
    const heroCtas = await page.$$eval('#hero-cta-container a', els => els.map(e => ({
        href: e.href, target: e.target, rel: e.rel, text: e.textContent.trim()
    }))).catch(() => []);

    for (const cta of heroCtas) {
        if (cta.href.includes('#menu')) {
            pass(`Menu CTA: ${cta.href}`);
        } else if (EXPECTED.zaloUrl.test(cta.href)) {
            pass(`Zalo order CTA: ${cta.href}`);
            if (cta.target === '_blank') pass('  Has target=_blank');
            else warn('  Missing target=_blank for external link');
        } else if (EXPECTED.telHref.test(cta.href)) {
            pass(`Phone CTA: ${cta.href}`);
            if (cta.target !== '_blank') pass('  No target=_blank (correct for tel:)');
            else fail('  Has target=_blank on tel: link');
        } else {
            warn(`Unknown hero CTA: text="${cta.text}" href="${cta.href}"`);
        }
    }

    // ── 5. Menu section CTA ─────────────────────────────────────────
    console.log('\n  [Menu CTA]');
    const menuCta = await page.$eval('#menu-section-cta', el => ({
        href: el.href, target: el.target, text: el.textContent.trim()
    })).catch(() => null);

    if (menuCta) {
        if (EXPECTED.zaloUrl.test(menuCta.href) || EXPECTED.telHref.test(menuCta.href)) {
            pass(`Menu CTA: ${menuCta.href}`);
        } else {
            fail(`Menu CTA href wrong: ${menuCta.href}`);
        }
    }

    // ── 6. Individual menu item "Đặt Món" buttons ───────────────────
    console.log('\n  [Menu item CTAs]');
    const menuItemCtas = await page.$$eval('#menu-grid a[href]', els => els.map(e => ({
        href: e.href, target: e.target, rel: e.rel
    }))).catch(() => []);

    let goodMenuCtas = 0, badMenuCtas = 0;
    for (const cta of menuItemCtas) {
        if (EXPECTED.zaloUrl.test(cta.href) || EXPECTED.telHref.test(cta.href)) {
            goodMenuCtas++;
        } else if (cta.href !== '#') {
            badMenuCtas++;
            fail(`Menu item CTA bad href: ${cta.href}`);
        }
    }
    if (goodMenuCtas > 0) pass(`${goodMenuCtas} menu item CTAs point to correct Zalo/tel link`);
    if (badMenuCtas > 0) fail(`${badMenuCtas} menu item CTAs have wrong hrefs`);

    // ── 7. Mobile sticky CTA bar ────────────────────────────────────
    console.log('\n  [Mobile sticky CTA bar]');
    const mobileZalo = await page.$eval('#mobile-cta-zalo', el => ({
        href: el.href, display: getComputedStyle(el).display
    })).catch(() => null);
    const mobileCall = await page.$eval('#mobile-cta-call', el => ({
        href: el.href, display: getComputedStyle(el).display
    })).catch(() => null);

    if (mobileZalo) {
        if (EXPECTED.zaloUrl.test(mobileZalo.href) || EXPECTED.telHref.test(mobileZalo.href)) {
            pass(`Mobile Zalo CTA: ${mobileZalo.href}`);
        } else {
            fail(`Mobile Zalo CTA href="#" or wrong: ${mobileZalo.href}`);
        }
    }
    if (mobileCall) {
        if (EXPECTED.telHref.test(mobileCall.href)) {
            pass(`Mobile Call CTA: ${mobileCall.href}`);
        } else {
            fail(`Mobile Call CTA href wrong: ${mobileCall.href}`);
        }
    }

    // ── 8. Phone number link in footer ──────────────────────────────
    console.log('\n  [Footer phone]');
    const phoneLink = await page.$eval('#contact-phone a', el => el.href).catch(() => null);
    if (phoneLink && EXPECTED.telHref.test(phoneLink)) pass(`Footer phone: ${phoneLink}`);
    else fail(`Footer phone link missing or wrong: ${phoneLink}`);

    // ── 9. Check for broken href="#" on visible elements ────────────
    console.log('\n  [Broken href="#" check]');
    const brokenLinks = await page.$$eval('a[href="#"]', els => {
        return els
            .filter(el => {
                const rect = el.getBoundingClientRect();
                const style = getComputedStyle(el);
                return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
            })
            .map(el => ({ id: el.id, text: el.textContent.trim().slice(0, 50), tag: el.tagName }));
    }).catch(() => []);

    // Filter out nav anchor links like #home, #menu
    const realBrokenLinks = brokenLinks.filter(l => !['Tiệm Bánh DAN'].includes(l.text));
    if (realBrokenLinks.length === 0) {
        pass('No visible broken href="#" links');
    } else {
        for (const bl of realBrokenLinks) {
            warn(`Visible link with href="#": id="${bl.id}" text="${bl.text}"`);
        }
    }

    // ── 10. Check for white-on-light contrast issues ────────────────
    console.log('\n  [Contrast check]');
    const contrastIssues = await page.$$eval('a, button', els => {
        const issues = [];
        for (const el of els) {
            const style = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;
            if (style.display === 'none' || style.visibility === 'hidden') continue;
            
            const color = style.color;
            const bg = style.backgroundColor;
            // Check for white text on very light background (rough check)
            if (color === 'rgb(255, 255, 255)' || color === 'rgba(255, 255, 255, 1)') {
                if (bg && (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent')) {
                    // Transparent bg — skip (inherits from parent)
                } else if (bg) {
                    // Parse RGB
                    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                    if (match) {
                        const [, r, g, b] = match.map(Number);
                        const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
                        if (luminance > 180) {
                            issues.push({
                                id: el.id,
                                text: el.textContent.trim().slice(0, 30),
                                color: color,
                                bg: bg,
                                luminance: Math.round(luminance),
                            });
                        }
                    }
                }
            }
        }
        return issues;
    }).catch(() => []);

    if (contrastIssues.length === 0) {
        pass('No white-on-light contrast issues found on buttons/links');
    } else {
        for (const ci of contrastIssues) {
            fail(`Contrast issue: id="${ci.id}" text="${ci.text}" color=${ci.color} bg=${ci.bg} luminance=${ci.luminance}`);
        }
    }
}

(async () => {
    console.log(`\n🔍 Link & CTA Audit for: ${BASE}\n`);

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Suppress noisy console
    page.on('pageerror', err => {
        // Only log real errors, not warnings
        if (!err.toString().includes('kaspersky') && !err.toString().includes('favicon')) {
            console.error(`  [PAGE ERROR] ${err.toString().slice(0, 120)}`);
        }
    });

    try {
        await testPage(page, DESKTOP, 'DESKTOP');
        await testPage(page, MOBILE, 'MOBILE');
    } catch (e) {
        console.error('Test runner error:', e);
        errors.push('Test runner crashed: ' + e.message);
    }

    await browser.close();

    console.log('\n━━━ SUMMARY ━━━');
    console.log(`  Errors:   ${errors.length}`);
    console.log(`  Warnings: ${warnings.length}`);

    if (errors.length > 0) {
        console.log('\n  Errors:');
        errors.forEach((e, i) => console.log(`    ${i + 1}. ${e}`));
    }

    if (warnings.length > 0) {
        console.log('\n  Warnings:');
        warnings.forEach((w, i) => console.log(`    ${i + 1}. ${w}`));
    }

    process.exit(errors.length > 0 ? 1 : 0);
})();
