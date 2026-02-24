import { initialData } from './data.js';

// Load data from localStorage or use initial data
// Auto-reset if saved data is outdated (old categories, missing fields)
const loadData = () => {
    const savedData = localStorage.getItem('siteData');
    if (!savedData) return initialData;

    try {
        const parsed = JSON.parse(savedData);
        // Check if data is outdated: old category 'món mặn' or missing Google fields
        const hasOldCategory = parsed.menu?.items?.some(item => item.category === 'món mặn');
        const missingGoogleFields = !parsed.contact?.googleRating;

        if (hasOldCategory || missingGoogleFields) {
            console.log('[Tiệm Bánh DAN] Dữ liệu cũ phát hiện, tự động cập nhật...');
            localStorage.removeItem('siteData');
            return initialData;
        }
        return parsed;
    } catch (e) {
        localStorage.removeItem('siteData');
        return initialData;
    }
};

const appData = loadData();

// Render Functions

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

    if (menuGrid) {
        const filteredItems = filterCategory
            ? appData.menu.items.filter(item => item.category === filterCategory)
            : appData.menu.items;

        menuGrid.innerHTML = filteredItems.map((item, index) => `
            <div class="group bg-white rounded-[2rem] p-6 shadow-vintage hover:shadow-2xl transition-all duration-500 border border-primary/5 flex flex-col h-full animate-fade-in-up relative" style="animation-delay: ${index * 100}ms">
                <div class="relative overflow-hidden rounded-[1.5rem] aspect-[4/5] mb-6">
                    <img src="${item.image}" alt="${item.name}" 
                         class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000">
                    
                    ${item.tag ? `
                    <div class="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-badge z-10 uppercase tracking-[0.1em] border border-white/20">
                        ${item.tag}
                    </div>` : ''}
                    
                    <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <button class="bg-white text-primary px-8 py-3 rounded-xl font-bold text-sm transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-accent hover:text-white">
                            Thêm Vào Giỏ
                        </button>
                    </div>
                </div>
                
                <div class="flex-grow flex flex-col items-center text-center">
                    <h3 class="font-display text-2xl font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300 italic">${item.name}</h3>
                    <p class="text-text/60 text-sm mb-6 leading-relaxed font-light">${item.description}</p>
                    
                    <div class="mt-auto w-full pt-6 border-t border-primary/5 flex items-center justify-between">
                        <span class="text-accent font-serif italic text-lg opacity-40">Handmade</span>
                        <span class="text-primary font-bold text-xl drop-shadow-sm">${item.price}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

const renderReviews = () => {
    const ratingSummary = document.getElementById('google-rating-summary');
    const reviewsContainer = document.getElementById('reviews-container');
    const mapIframe = document.getElementById('google-map-iframe');
    const mapsLink = document.getElementById('google-maps-link');
    const getDirectionsBtn = document.getElementById('get-directions-btn');
    const displayAddress = document.getElementById('display-address');

    if (ratingSummary) {
        const stars = '★'.repeat(Math.floor(appData.contact.googleRating)) + '☆'.repeat(5 - Math.floor(appData.contact.googleRating));
        ratingSummary.innerHTML = `
            <div class="flex flex-col">
                <div class="flex items-center gap-1 text-yellow-500 text-2xl">
                    ${stars}
                </div>
                <div class="text-text/60 text-sm mt-1">
                    <span class="font-bold text-text text-lg">${appData.contact.googleRating}</span> 
                    trên Google (${appData.contact.googleReviewCount} đánh giá)
                </div>
            </div>
        `;
    }

    if (reviewsContainer && appData.contact.reviews) {
        reviewsContainer.innerHTML = appData.contact.reviews.map(rev => `
            <div class="bg-surface/50 p-6 rounded-2xl border border-primary/5 hover:border-accent/20 transition-colors">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h4 class="font-bold text-text">${rev.name}</h4>
                        <div class="flex text-yellow-500 text-xs mt-0.5">
                            ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
                        </div>
                    </div>
                    <span class="text-[10px] text-text/40 uppercase tracking-wider">${rev.date}</span>
                </div>
                <p class="text-text/70 text-sm italic font-light">"${rev.text}"</p>
            </div>
        `).join('');
    }

    if (mapIframe) {
        mapIframe.innerHTML = `<iframe src="${appData.contact.mapEmbed}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
    }

    if (mapsLink) mapsLink.href = appData.contact.googleMapsUrl;
    if (getDirectionsBtn) getDirectionsBtn.href = appData.contact.googleMapsUrl;
    if (displayAddress) displayAddress.textContent = appData.contact.address;
};

const renderGallery = () => {
    const galleryGrid = document.getElementById('gallery-grid');

    if (galleryGrid) {
        galleryGrid.innerHTML = appData.gallery.images.map((img, index) => {
            const rowSpan = index % 3 === 0 ? 'row-span-2' : 'row-span-1';
            const colSpan = index % 4 === 0 ? 'md:col-span-2' : 'md:col-span-1';

            return `
            <div class="relative group overflow-hidden rounded-3xl ${rowSpan} ${colSpan} shadow-vintage hover:shadow-2xl transition-all duration-700">
                <img src="${img}" 
                     class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 filter sepia-[0.2] group-hover:sepia-0" 
                     alt="Gallery Image">
                <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 backdrop-blur-[2px]">
                    <p class="text-white font-serif italic text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Sweet Memories
                    </p>
                </div>
            </div>
        `}).join('');
    }
};

const renderContact = () => {
    const contactAddress = document.getElementById('contact-address');
    const contactPhone = document.getElementById('contact-phone');
    const contactHoursList = document.getElementById('contact-hours-list');

    if (contactAddress) contactAddress.textContent = appData.contact.address;
    if (contactPhone) contactPhone.textContent = appData.contact.phone;

    if (contactHoursList) {
        const hours = Array.isArray(appData.contact.hours) ? appData.contact.hours : [appData.contact.hours || ''];
        contactHoursList.innerHTML = hours.map(h =>
            `<li>${h}</li>`
        ).join('');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCategoryFilters();
    renderMenu();
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
