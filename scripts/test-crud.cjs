const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Accept dialogs (confirm prompts for delete)
    page.on('dialog', async dialog => {
        console.log('Dialog:', dialog.type(), dialog.message());
        await dialog.accept();
    });
    
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
        console.log('✓ Logged in');
        
        // == Test Menu ==
        await page.click('[data-tab="menu"]');
        await new Promise(r => setTimeout(r, 300));
        
        // Add item
        let items = await page.$$('#menu-list > div');
        const initialCount = items.length;
        console.log('Menu: Initial count =', initialCount);
        
        await page.click('button[onclick*="addMenuItem"]');
        await new Promise(r => setTimeout(r, 300));
        items = await page.$$('#menu-list > div');
        console.log('Menu: After add =', items.length, items.length > initialCount ? '✓' : '✗');
        
        // Delete item (click trash icon on last item)
        const deleteBtn = await page.$('#menu-list > div:last-child button[onclick*="deleteMenuItem"]');
        if (deleteBtn) {
            await deleteBtn.click();
            await new Promise(r => setTimeout(r, 300));
            items = await page.$$('#menu-list > div');
            console.log('Menu: After delete =', items.length, items.length === initialCount ? '✓' : '✗');
        }
        
        // == Test Gallery ==
        await page.click('[data-tab="gallery"]');
        await new Promise(r => setTimeout(r, 300));
        
        let galleryItems = await page.$$('#gallery-list > div');
        const galleryInitial = galleryItems.length;
        console.log('Gallery: Initial count =', galleryInitial);
        
        // Click "Thêm Ảnh Thư Viện" button (in header, not the upload card)
        const galleryAddBtn = await page.$('button[onclick*="addGalleryItem"]');
        if (galleryAddBtn) {
            // This will trigger a prompt - we need to handle it
            page.once('dialog', async d => {
                await d.accept('https://example.com/test.jpg');
            });
            await galleryAddBtn.click();
            await new Promise(r => setTimeout(r, 500));
            galleryItems = await page.$$('#gallery-list > div');
            console.log('Gallery: After add =', galleryItems.length, galleryItems.length > galleryInitial ? '✓' : '✗');
        }
        
        // Delete gallery item
        const galleryDeleteBtn = await page.$('#gallery-list > div:nth-child(2) button[onclick*="deleteGalleryItem"]');
        if (galleryDeleteBtn) {
            // Hover to show the overlay first
            await page.hover('#gallery-list > div:nth-child(2)');
            await new Promise(r => setTimeout(r, 300));
            await galleryDeleteBtn.click();
            await new Promise(r => setTimeout(r, 300));
            galleryItems = await page.$$('#gallery-list > div');
            console.log('Gallery: After delete =', galleryItems.length, galleryItems.length === galleryInitial ? '✓' : '✗');
        }
        
        console.log('\n=== All CRUD operations tested ===');
        
    } catch (err) {
        console.log('ERROR:', err.message);
    }
    
    if (errors.length > 0) {
        console.log('\nConsole Errors:');
        errors.forEach(e => console.log('  -', e));
    } else {
        console.log('✓ No console errors');
    }
    
    await browser.close();
})();
