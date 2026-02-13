import { initialData } from './data.js';

// Load data from localStorage or use initial data
const loadData = () => {
    const savedData = localStorage.getItem('siteData');
    return savedData ? JSON.parse(savedData) : initialData;
};

const appData = loadData();

// Render Functions

const renderChefStory = () => {
    const chefImage = document.getElementById('chef-image');
    const chefContent = document.getElementById('chef-story-content');

    if (chefImage) {
        chefImage.src = appData.about.image;
    }

    if (chefContent) {
        chefContent.innerHTML = appData.about.paragraphs.map(p =>
            `<p>${p}</p>`
        ).join('');
    }
};

const renderMenu = (filterCategory = null) => {
    const menuGrid = document.getElementById('menu-grid');

    if (menuGrid) {
        // Filter items based on category
        const filteredItems = filterCategory
            ? appData.menu.items.filter(item => item.category === filterCategory)
            : appData.menu.items;

        menuGrid.innerHTML = filteredItems.map((item, index) => `
            <div class="group bg-white rounded-2xl p-4 shadow-card hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col h-full animate-fade-in-up" years-delay="${index * 100}" data-category="${item.category}">
                <div class="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                    <img src="${item.image}" alt="${item.name}" 
                         class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                    ${item.tag ? `
                    <div class="absolute top-3 right-3 bg-${item.tagColor || 'primary'} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 uppercase tracking-wide">
                        ${item.tag}
                    </div>` : ''}
                    <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button class="bg-white text-primary px-4 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-accent hover:text-white">
                            Chi Tiết
                        </button>
                    </div>
                </div>
                
                <div class="flex-grow flex flex-col justify-between text-center">
                    <div>
                        <h3 class="font-display text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">${item.name}</h3>
                        <p class="text-text/60 text-sm mb-4 line-clamp-2">${item.description}</p>
                    </div>
                    <div class="mt-auto pt-4 border-t border-gray-100">
                        <span class="text-primary font-bold text-lg hover:text-accent transition-colors cursor-pointer">${item.price}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

const renderGallery = () => {
    const galleryGrid = document.getElementById('gallery-grid');

    if (galleryGrid) {
        // Create a masonry-like grid by spanning rows for some items
        galleryGrid.innerHTML = appData.gallery.images.map((img, index) => {
            const rowSpan = index % 3 === 0 ? 'row-span-2' : 'row-span-1';
            const colSpan = index % 4 === 0 ? 'md:col-span-2' : 'md:col-span-1';

            return `
            <div class="relative group overflow-hidden rounded-2xl ${rowSpan} ${colSpan} shadow-md hover:shadow-xl transition-all duration-300">
                <img src="${img}" 
                     class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100" 
                     alt="Gallery Image">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p class="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Memorable Moments
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
    const mapContainer = document.getElementById('map-container');

    if (contactAddress) contactAddress.textContent = appData.contact.address;
    if (contactPhone) contactPhone.textContent = appData.contact.phone;

    if (contactHoursList) {
        contactHoursList.innerHTML = appData.contact.hours.map(h =>
            `<li>${h}</li>`
        ).join('');
    }

    if (mapContainer) {
        mapContainer.innerHTML = `<iframe src="${appData.contact.mapEmbed}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderChefStory();
    renderMenu();
    renderGallery();
    renderContact();

    // Category Filter
    const categoryButtons = document.querySelectorAll('#menu .flex.justify-center button');
    categoryButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'shadow-md');
                b.classList.add('bg-white', 'text-text', 'border', 'border-primary/10');
            });

            // Add active class to clicked button
            btn.classList.add('bg-primary', 'text-white', 'shadow-md');
            btn.classList.remove('bg-white', 'text-text', 'border', 'border-primary/10');

            // Filter menu
            const categories = [null, 'bánh ngọt', 'đồ uống', 'món mặn'];
            renderMenu(categories[index]);
        });
    });

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
