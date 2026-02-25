import { initialData } from './data.js';

// ─── Tiny sanitizer helpers to block trivial XSS vectors on user-provided data ──
const sanitizeText = (value) => String(value ?? '').replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

const sanitizeUrl = (url) => {
    if (!url) return '#';
    const trimmed = url.trim();
    // allow site-relative assets
    if (trimmed.startsWith('/')) return trimmed;
    // allow base64 images stored from the admin
    if (trimmed.startsWith('data:image/')) return trimmed;
    try {
        const parsed = new URL(trimmed, window.location.origin);
        const allowed = ['http:', 'https:', 'tel:', 'mailto:'];
        return allowed.includes(parsed.protocol) ? parsed.href : '#';
    } catch (e) {
        console.warn('Blocked unsafe URL:', url);
        return '#';
    }
};

const isSafeMapEmbed = (url) => {
    try {
        const parsed = new URL(url, window.location.origin);
        return parsed.protocol === 'https:' && (parsed.hostname.includes('google.com') || parsed.hostname.includes('maps.app.goo.gl'));
    } catch {
        return false;
    }
};

// Load data from localStorage or use initial data
// Auto-reset if saved data is outdated (old categories, missing fields)
const loadData = () => {
    const savedData = localStorage.getItem('siteData');
    if (!savedData) return initialData;

    try {
        const parsed = JSON.parse(savedData);

        // Ensure core objects exist
        if (!parsed.hero) parsed.hero = JSON.parse(JSON.stringify(initialData.hero));
        if (!parsed.menu) parsed.menu = JSON.parse(JSON.stringify(initialData.menu));
        if (!parsed.contact) parsed.contact = JSON.parse(JSON.stringify(initialData.contact));
        if (!parsed.gallery) parsed.gallery = JSON.parse(JSON.stringify(initialData.gallery));

        // Migration: Fix old category names instead of wiping
        if (parsed.menu.items) {
            parsed.menu.items.forEach(item => {
                if (item.category === 'món mặn') item.category = 'bánh ngọt';
            });
        }

        // Merge missing sub-fields from initialData safely
        const mergeFallback = (target, source) => {
            for (const key in source) {
                if (target[key] === undefined || target[key] === null || target[key] === '') {
                    target[key] = source[key];
                }
            }
        };

        mergeFallback(parsed.contact, initialData.contact);

        // Ensure hero background images structure
        if (!parsed.hero.backgroundImages || parsed.hero.backgroundImages.length === 0) {
            parsed.hero.backgroundImages = initialData.hero.backgroundImages;
        }

        return parsed;
    } catch (e) {
        console.error("Lỗi khi tải dữ liệu từ localStorage:", e);
        return initialData;
    }
};

const appData = loadData();

// ─── Helper: build order CTA href ─────────────────────────────────────────────
const getOrderHref = () => {
    const z = appData.contact.zaloUrl;
    const p = appData.contact.phone;
    if (z && z !== '#') return z;
    if (p) return `tel:${p.replace(/\s/g, '')}`;
    return '#';
};

const getOrderLabel = () => {
    const z = appData.contact.zaloUrl;
    if (z && z !== '#') return '💬 Nhắn Zalo Đặt Món';
    return '📞 Gọi Đặt Món';
};

const getCallHref = () => {
    const p = appData.contact.phone;
    return p ? `tel:${p.replace(/\s/g, '')}` : '#';
};

// ─── Hero Dynamic Stats ────────────────────────────────────────────────────────
const renderHeroStats = () => {
    const statsEl = document.getElementById('hero-stats');
    if (!statsEl) return;
    const rating = appData.contact.googleRating;
    const reviewCount = appData.contact.googleReviewCount;

    statsEl.innerHTML = `
        <div class="text-center">
            <span class="block text-3xl font-bold text-accent">50+</span>
            <span class="text-sm text-text/60">Loại Bánh</span>
        </div>
        <div class="w-px h-12 bg-primary/10"></div>
        <div class="text-center">
            <span class="block text-3xl font-bold text-accent">Handmade</span>
            <span class="text-sm text-text/60">Mỗi Ngày</span>
        </div>
        ${rating ? `
        <div class="w-px h-12 bg-primary/10"></div>
        <div class="text-center">
            <span class="block text-3xl font-bold text-accent">${rating}</span>
            <span class="text-sm text-text/60">Google${reviewCount ? ` (${reviewCount})` : ''}</span>
        </div>` : ''}
    `;
};

// ─── Hero Images ──────────────────────────────────────────────────────────────
const renderHeroImages = () => {
    const img1 = document.getElementById('hero-img-1');
    const img2 = document.getElementById('hero-img-2');
    const imgMob = document.getElementById('hero-img-mobile');

    if (appData.hero && appData.hero.backgroundImages) {
        const images = appData.hero.backgroundImages;
        if (img1 && images[0]) img1.src = sanitizeUrl(images[0].src);
        if (img2 && images[1]) img2.src = sanitizeUrl(images[1].src);
        if (imgMob && images[0]) imgMob.src = sanitizeUrl(images[0].src);
    }
};

// ─── Hero CTAs ─────────────────────────────────────────────────────────────────
const renderHeroCTAs = () => {
    const ctaContainer = document.getElementById('hero-cta-container');
    if (!ctaContainer) return;
    const orderHref = getOrderHref();
    const orderLabel = getOrderLabel();
    const callHref = getCallHref();

    ctaContainer.innerHTML = `
        <a href="#menu"
            class="px-8 py-4 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-vintage hover:bg-secondary transition-all transform hover:-translate-y-1 text-center">
            Xem Thực Đơn
        </a>
        <a href="${sanitizeUrl(orderHref)}" target="_blank" rel="noopener"
            class="px-8 py-4 bg-accent text-white rounded-full font-semibold shadow-lg hover:bg-accent/80 transition-all transform hover:-translate-y-1 text-center flex items-center justify-center gap-2">
            ${orderLabel}
        </a>
        <a href="${sanitizeUrl(callHref)}"
            class="hidden sm:flex px-6 py-4 bg-white border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 items-center gap-2 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            ${appData.contact.phone || 'Gọi ngay'}
        </a>
    `;
};

// ─── Render Functions ──────────────────────────────────────────────────────────

const CATEGORIES = [
    { id: null, name: 'Tất Cả' },
    { id: 'bánh sinh nhật', name: '🎂 Bánh Sinh Nhật' },
    { id: 'đồ uống', name: '☕ Đồ Uống' },
    { id: 'bánh ngọt', name: '🍰 Bánh Ngọt' }
];

const renderCategoryFilters = () => {
    const categoryFilters = document.getElementById('category-filters');
    if (!categoryFilters) return;

    categoryFilters.innerHTML = CATEGORIES.map(cat => `
        <button class="filter-btn px-8 py-2 rounded-full ${cat.id === null ? 'bg-primary text-white shadow-lg' : 'bg-white text-text border border-primary/10'} font-medium transition-all"
                data-category="${cat.id ?? ''}">
            ${cat.name}
        </button>
    `).join('');

    categoryFilters.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            categoryFilters.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'shadow-lg');
                b.classList.add('bg-white', 'text-text', 'border', 'border-primary/10');
            });
            btn.classList.add('bg-primary', 'text-white', 'shadow-lg');
            btn.classList.remove('bg-white', 'text-text', 'border', 'border-primary/10');
            renderMenu(btn.dataset.category || null);
        });
    });
};

const renderMenu = (filterCategory = null) => {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;

    const filteredItems = filterCategory
        ? appData.menu.items.filter(item => item.category === filterCategory)
        : appData.menu.items;

    const orderHref = getOrderHref();

    menuGrid.innerHTML = filteredItems.map((item, index) => {
        const safeName = sanitizeText(item.name);
        const safeDesc = sanitizeText(item.description);
        const safePrice = sanitizeText(item.price);
        const safeTag = sanitizeText(item.tag);
        const safeImage = sanitizeUrl(item.image);

        return `
            <div class="group bg-white rounded-[2rem] p-6 shadow-vintage hover:shadow-2xl transition-all duration-500 border border-primary/5 flex flex-col h-full animate-fade-in-up relative" style="animation-delay: ${index * 100}ms">
                <div class="relative overflow-hidden rounded-[1.5rem] aspect-[4/5] mb-6">
                    <img src="${safeImage}" alt="${safeName}" loading="lazy"
                         class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000">
                    
                    ${item.tag ? `
                    <div class="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-badge z-10 uppercase tracking-[0.1em] border border-white/20">
                        ${safeTag}
                    </div>` : ''}
                    
                    <!-- Quick Order Overlay -->
                    <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <a href="${sanitizeUrl(orderHref)}" target="_blank" rel="noopener"
                           class="bg-white text-primary px-8 py-3 rounded-xl font-bold text-sm transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-accent hover:text-white cursor-pointer">
                            Đặt Món Ngay
                        </a>
                    </div>
                </div>
                
                <div class="flex-grow flex flex-col items-center text-center">
                    <h3 class="font-display text-2xl font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300 italic">${safeName}</h3>
                    <p class="text-text/60 text-sm mb-4 leading-relaxed font-light">${safeDesc}</p>
                    
                    <div class="mt-auto w-full pt-4 border-t border-primary/5 flex items-center justify-between">
                        <span class="text-accent font-serif italic text-lg opacity-40">Handmade</span>
                        <span class="text-primary font-bold text-xl drop-shadow-sm">${safePrice}</span>
                    </div>

                    <!-- CTA Đặt Món (always visible below price) -->
                    <a href="${sanitizeUrl(orderHref)}" target="_blank" rel="noopener"
                       class="mt-4 w-full block text-center py-3 bg-primary/5 hover:bg-accent hover:text-white text-primary font-semibold rounded-xl border border-primary/10 hover:border-transparent transition-all duration-300 text-sm cursor-pointer">
                        Đặt Món
                    </a>
                </div>
            </div>
        `;
    }).join('');
};

// ─── Render "Đặt Món Ngay" button in menu section footer ──────────────────────
const renderMenuCTA = () => {
    const ctaEl = document.getElementById('menu-section-cta');
    if (!ctaEl) return;
    const orderHref = sanitizeUrl(getOrderHref());
    const orderLabel = getOrderLabel();
    ctaEl.href = orderHref;
    ctaEl.setAttribute('target', '_blank');
    ctaEl.setAttribute('rel', 'noopener');
    ctaEl.textContent = orderLabel;
};

// ─── Reviews & Map ────────────────────────────────────────────────────────────
const renderReviews = () => {
    const ratingSummary = document.getElementById('google-rating-summary');
    const reviewsContainer = document.getElementById('reviews-container');
    const mapIframe = document.getElementById('google-map-iframe');
    const mapsLink = document.getElementById('google-maps-link');
    const getDirectionsBtn = document.getElementById('get-directions-btn');
    const displayAddress = document.getElementById('display-address');

    const rating = appData.contact.googleRating;
    const mapsUrl = appData.contact.googleMapsUrl || '#';

    if (ratingSummary) {
        if (rating) {
            const fullStars = Math.floor(rating);
            const halfStar = rating - fullStars >= 0.5;
            let stars = '';
            for (let i = 0; i < fullStars; i++) stars += '<span class="text-yellow-400">★</span>';
            if (halfStar) stars += '<span class="text-yellow-300">★</span>';
            for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) stars += '<span class="text-gray-300">★</span>';

            ratingSummary.innerHTML = `
                <div class="flex items-center gap-4 flex-wrap">
                    <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                            <span class="text-5xl font-bold text-text">${rating}</span>
                            <div class="flex flex-col gap-1">
                                <div class="flex text-xl leading-none">${stars}</div>
                                <span class="text-xs text-text/50 uppercase tracking-wider">Google Reviews</span>
                            </div>
                        </div>
                        ${appData.contact.googleReviewCount ? `
                        <span class="text-sm text-text/60 mt-1">${appData.contact.googleReviewCount} đánh giá trên Google</span>` : ''}
                    </div>
                </div>
            `;
        } else {
            ratingSummary.innerHTML = `<p class="text-sm text-text/40 italic">Chưa có đánh giá — Nhập trong Admin &gt; Liên Hệ</p>`;
        }
    }

    if (reviewsContainer && appData.contact.reviews && appData.contact.reviews.length > 0) {
        reviewsContainer.innerHTML = appData.contact.reviews.slice(0, 3).map(rev => {
            const safeName = sanitizeText(rev.name);
            const safeText = sanitizeText(rev.text);
            const safeDate = sanitizeText(rev.date);
            const starCount = Math.max(1, Math.min(5, parseInt(rev.rating, 10) || 0));
            return `
                <div class="bg-surface/50 p-6 rounded-2xl border border-primary/5 hover:border-accent/20 transition-colors">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h4 class="font-bold text-text">${safeName}</h4>
                            <div class="flex text-yellow-400 text-sm mt-0.5">
                                ${'★'.repeat(starCount)}${'<span class="text-gray-300">★</span>'.repeat(5 - starCount)}
                            </div>
                        </div>
                        <span class="text-[10px] text-text/40 uppercase tracking-wider">${safeDate}</span>
                    </div>
                    <p class="text-text/70 text-sm italic font-light">"${safeText}"</p>
                </div>
            `;
        }).join('');
    } else if (reviewsContainer) {
        reviewsContainer.innerHTML = `<p class="text-sm text-text/40 italic py-4">Chưa có review — Thêm trong Admin &gt; Liên Hệ &amp; Google Reviews</p>`;
    }

    if (mapIframe && appData.contact.mapEmbed && isSafeMapEmbed(appData.contact.mapEmbed)) {
        const iframe = document.createElement('iframe');
        iframe.src = sanitizeUrl(appData.contact.mapEmbed);
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.border = '0';
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        iframe.title = 'Bản đồ Tiệm Bánh DAN';
        mapIframe.innerHTML = '';
        mapIframe.appendChild(iframe);
    } else if (mapIframe) {
        mapIframe.innerHTML = `
            <div class="w-full h-full bg-surface flex flex-col items-center justify-center gap-3 text-text/40">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-sm font-medium">Chưa có bản đồ</p>
                <p class="text-xs px-6 text-center">Thêm Google Maps Embed URL trong Admin > Liên Hệ & Bản Đồ</p>
            </div>`;
    }

    if (mapsLink) {
        const safeMaps = sanitizeUrl(mapsUrl);
        mapsLink.href = safeMaps;
        if (safeMaps === '#') mapsLink.style.opacity = '0.4';
    }
    if (getDirectionsBtn) {
        const safeMaps = sanitizeUrl(mapsUrl);
        getDirectionsBtn.href = safeMaps;
        if (safeMaps === '#') getDirectionsBtn.style.opacity = '0.4';
    }
    if (displayAddress) {
        displayAddress.textContent = sanitizeText(appData.contact.address) || 'Chưa có địa chỉ — Nhập trong Admin';
    }
};

// ─── Gallery Teaser (max 6 images on homepage) ────────────────────────────────
const renderGallery = () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryCtaLink = document.getElementById('gallery-instagram-link');

    const galleryMoreCta = document.getElementById('gallery-more-cta');

    if (galleryCtaLink) {
        const instaUrl = appData.contact.instagramUrl;
        if (instaUrl && instaUrl !== '#') {
            galleryCtaLink.href = instaUrl;
            galleryCtaLink.textContent = 'Xem Instagram @tiembanhdan';
            if (galleryMoreCta) galleryMoreCta.href = instaUrl;
        } else {
            galleryCtaLink.href = '#';
            galleryCtaLink.textContent = 'Xem Thêm Hình Ảnh';
        }
    }

    if (galleryGrid) {
        // Only show 6 images max on homepage (teaser)
        const teaserImages = appData.gallery.images.slice(0, 6);

        galleryGrid.innerHTML = teaserImages.map((img, index) => {
            const rowSpan = index % 3 === 0 ? 'row-span-2' : 'row-span-1';
            const colSpan = index % 4 === 0 ? 'md:col-span-2' : 'md:col-span-1';
            const safeImg = sanitizeUrl(img);

            return `
            <div class="relative group overflow-hidden rounded-3xl ${rowSpan} ${colSpan} shadow-vintage hover:shadow-2xl transition-all duration-700 cursor-pointer">
                <img src="${safeImg}" 
                     loading="lazy"
                     class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 filter sepia-[0.2] group-hover:sepia-0" 
                     alt="Hình ảnh Tiệm Bánh DAN ${index + 1}">
                <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 backdrop-blur-[2px]">
                    <p class="text-white font-serif italic text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Sweet Memories
                    </p>
                </div>
            </div>
        `}).join('');
    }
};

// ─── Contact / Footer ─────────────────────────────────────────────────────────
const renderContact = () => {
    const contactAddress = document.getElementById('contact-address');
    const contactPhone = document.getElementById('contact-phone');
    const contactHoursList = document.getElementById('contact-hours-list');
    const footerFacebook = document.getElementById('footer-facebook');
    const footerInstagram = document.getElementById('footer-instagram');
    const footerZalo = document.getElementById('footer-zalo');
    const footerMapsLink = document.getElementById('footer-maps-link');

    if (contactAddress) {
        if (appData.contact.address) {
            contactAddress.textContent = sanitizeText(appData.contact.address);
            contactAddress.style.opacity = '1';
        } else {
            contactAddress.textContent = 'Chưa có địa chỉ — Cập nhật trong Admin';
            contactAddress.style.opacity = '0.5';
        }
    }

    if (contactPhone) {
        if (appData.contact.phone) {
            const phoneHref = `tel:${appData.contact.phone.replace(/\s/g, '')}`;
            contactPhone.innerHTML = `<a href="${sanitizeUrl(phoneHref)}" class="hover:text-accent transition-colors">${sanitizeText(appData.contact.phone)}</a>`;
        } else {
            contactPhone.textContent = 'Chưa có SĐT — Cập nhật trong Admin';
            contactPhone.style.opacity = '0.5';
        }
    }

    if (contactHoursList) {
        const hours = Array.isArray(appData.contact.hours)
            ? appData.contact.hours
            : [appData.contact.hours || ''];

        if (hours.length > 0 && hours[0]) {
            contactHoursList.innerHTML = hours.map(h =>
                `<li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${sanitizeText(h)}
                </li>`
            ).join('');
        } else {
            contactHoursList.innerHTML = `<li class="opacity-50 italic">Chưa có giờ — Cập nhật trong Admin</li>`;
        }
    }

    // Social links
    if (footerFacebook) {
        footerFacebook.href = sanitizeUrl(appData.contact.facebookUrl) || '#';
    }
    if (footerInstagram) {
        footerInstagram.href = sanitizeUrl(appData.contact.instagramUrl) || '#';
    }
    if (footerZalo) {
        footerZalo.href = sanitizeUrl(appData.contact.zaloUrl) || '#';
    }
    const footerZaloCta = document.getElementById('footer-zalo-cta');
    if (footerZaloCta) {
        footerZaloCta.href = sanitizeUrl(appData.contact.zaloUrl) || '#';
    }
    if (footerMapsLink) {
        footerMapsLink.href = sanitizeUrl(appData.contact.googleMapsUrl) || '#';
    }
};

// ─── Initialize ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderHeroImages();
    renderHeroStats();
    renderHeroCTAs();
    renderCategoryFilters();
    renderMenu();
    renderMenuCTA();
    renderReviews();
    renderGallery();
    renderContact();

    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Global image fallback: attach `error` handlers to replace broken images
// with a safe placeholder so UI doesn't show missing image icons.
const attachImageFallbacks = (fallback = '/assets/img1.png') => {
    try {
        document.querySelectorAll('img').forEach(img => {
            if (img.dataset.fallbackBound) return;
            img.addEventListener('error', () => {
                if (!img.src || img.src === '' || img.naturalWidth === 0) {
                    img.src = fallback;
                }
            });
            // mark as bound to avoid duplicate handlers when re-rendering
            img.dataset.fallbackBound = '1';
        });
    } catch {
        // silent: defensive in case DOM not available during SSR/tests
    }
};

// Ensure fallbacks are attached on load and after dynamic renders
document.addEventListener('DOMContentLoaded', () => attachImageFallbacks());
// Re-attach after short delay to catch images injected by scripts
setTimeout(() => attachImageFallbacks(), 600);
