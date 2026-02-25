const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Capture console errors
    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.toString()));
    
    try {
        await page.goto('http://localhost:5174/admin.html', { waitUntil: 'networkidle0' });
        
        // Login
        await page.type('#password', 'Toobakery0810');
        await page.click('button[type="submit"]');
        await page.waitForSelector('#admin-dashboard:not(.hidden)', { timeout: 5000 });
        console.log('✓ Logged in successfully');
        
        // Click Menu tab
        await page.click('[data-tab="menu"]');
        await new Promise(r => setTimeout(r, 500));
        console.log('✓ Switched to Menu tab');
        
        // Count initial menu items
        const initialItems = await page.$$('#menu-list > div');
        console.log('Initial menu items count:', initialItems.length);
        
        // Try clicking 'Thêm Món Mới'
        console.log('Clicking Thêm Món Mới...');
        const addBtn = await page.$('button[onclick*="addMenuItem"]');
        if (addBtn) {
            await addBtn.click();
            await new Promise(r => setTimeout(r, 500));
            const newItems = await page.$$('#menu-list > div');
            console.log('Menu items after add:', newItems.length);
            if (newItems.length > initialItems.length) {
                console.log('✓ Add item works!');
            } else {
                console.log('✗ Add item did NOT create new item');
            }
        } else {
            console.log('✗ Could not find addMenuItem button');
        }
        
        // Try typing in first input
        const firstInput = await page.$('#menu-list input[type="text"]');
        if (firstInput) {
            const beforeVal = await page.evaluate(el => el.value, firstInput);
            console.log('Input value before:', beforeVal);
            
            // Check if input is disabled or readonly
            const isDisabled = await page.evaluate(el => el.disabled, firstInput);
            const isReadOnly = await page.evaluate(el => el.readOnly, firstInput);
            console.log('Input disabled:', isDisabled, 'readOnly:', isReadOnly);
            
            // Try to clear and type
            await firstInput.click({ clickCount: 3 }); // select all
            await firstInput.type('TEST123');
            const afterVal = await page.evaluate(el => el.value, firstInput);
            console.log('Input value after typing:', afterVal);
            
            if (afterVal.includes('TEST123')) {
                console.log('✓ Typing in input works!');
            } else {
                console.log('✗ Typing did not change input value');
            }
        } else {
            console.log('✗ No text input found in menu list');
        }
        
        // Check for overlays blocking content
        const overlays = await page.$$eval('.absolute.inset-0', els => 
            els.map(el => ({
                opacity: getComputedStyle(el).opacity,
                pointerEvents: getComputedStyle(el).pointerEvents,
                zIndex: getComputedStyle(el).zIndex
            }))
        );
        console.log('Overlays found:', overlays.length);
        overlays.forEach((o, i) => console.log(`  Overlay ${i}: opacity=${o.opacity}, pointerEvents=${o.pointerEvents}, zIndex=${o.zIndex}`));
        
    } catch (err) {
        console.log('ERROR:', err.message);
    }
    
    if (errors.length > 0) {
        console.log('\nConsole Errors:');
        errors.forEach(e => console.log('  -', e));
    } else {
        console.log('\n✓ No console errors detected');
    }
    
    await browser.close();
})();
