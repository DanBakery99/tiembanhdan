import { initialData } from './data.js';

// Load data from localStorage or use initial data
const loadData = () => {
    const savedData = localStorage.getItem('siteData');
    return savedData ? JSON.parse(savedData) : initialData;
};

const appData = loadData();

// Render Functions
const renderHero = () => {
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroDesc = document.getElementById('hero-desc');
    // const heroGrid = document.getElementById('hero-grid'); 

    // Check if elements exist before setting
    if (heroTitle) heroTitle.innerHTML = appData.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = appData.hero.subtitle;
    if (heroDesc) heroDesc.textContent = appData.hero.description;

    // Additional logic for background images if dynamic in the future
};

const renderAbout = () => {
    const aboutTitle = document.getElementById('about-title');
    const aboutImg = document.getElementById('about-img');
    const aboutTextContainer = document.getElementById('about-text-container');
    const aboutStatsContainer = document.getElementById('about-stats');

    if (aboutTitle) aboutTitle.innerHTML = `${appData.about.title} <span class="absolute bottom-0 left-0 w-1/3 h-1 bg-primary rounded-full"></span>`;
    if (aboutImg) aboutImg.src = appData.about.image;

    if (aboutTextContainer) {
        aboutTextContainer.innerHTML = appData.about.paragraphs.map(p =>
            `<p class="text-lg text-text/70 mb-6 leading-relaxed">${p}</p>`
        ).join('');
    }

    if (aboutStatsContainer) {
        aboutStatsContainer.innerHTML = appData.about.stats.map(stat => `
            <div class="flex flex-col gap-2">
                <span class="text-4xl font-serif font-bold text-primary">${stat.value}</span>
                <span class="text-text/60 font-medium">${stat.label}</span>
            </div>
        `).join('');
    }
};

const renderMenu = () => {
    const menuTitle = document.getElementById('menu-title');
    const menuSubtitle = document.getElementById('menu-subtitle');
    const menuGrid = document.getElementById('menu-grid');

    if (menuTitle) menuTitle.textContent = appData.menu.title;
    if (menuSubtitle) menuSubtitle.textContent = appData.menu.subtitle;

    if (menuGrid) {
        menuGrid.innerHTML = appData.menu.items.map(item => `
            <div class="bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                <div class="relative overflow-hidden rounded-xl aspect-square mb-4">
                    <img src="${item.image}" alt="${item.name}"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    ${item.tag ? `<div class="absolute top-2 right-2 bg-${item.tagColor || 'primary'} text-white text-xs font-bold px-2 py-1 rounded-full">${item.tag}</div>` : ''}
                </div>
                <div class="text-center">
                    <h3 class="font-serif text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">${item.name}</h3>
                    <p class="text-text/60 text-sm mb-3">${item.description}</p>
                    <span class="text-primary font-bold text-lg">${item.price}</span>
                </div>
            </div>
        `).join('');
    }
};

const renderGallery = () => {
    const galleryTitle = document.getElementById('gallery-title');
    const gallerySubtitle = document.getElementById('gallery-subtitle');
    const galleryGrid = document.getElementById('gallery-grid');

    if (galleryTitle) galleryTitle.textContent = appData.gallery.title;
    if (gallerySubtitle) gallerySubtitle.textContent = appData.gallery.subtitle;

    if (galleryGrid) {
        galleryGrid.innerHTML = appData.gallery.images.map(img => `
            <img src="${img}"
                class="w-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                alt="Gallery Image">
        `).join('');
    }
};

const renderContact = () => {
    const contactAddress = document.getElementById('contact-address');
    const contactPhone = document.getElementById('contact-phone');
    const contactHours = document.getElementById('contact-hours');
    const mapContainer = document.getElementById('map-container');

    if (contactAddress) contactAddress.textContent = appData.contact.address;
    if (contactPhone) contactPhone.textContent = appData.contact.phone;
    if (contactHours) contactHours.textContent = appData.contact.hours;

    if (mapContainer) {
        mapContainer.innerHTML = `<iframe src="${appData.contact.mapEmbed}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderHero();
    renderAbout();
    renderMenu();
    renderGallery();
    renderContact();
});
