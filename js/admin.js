import { initialData } from './data.js';

let appData = localStorage.getItem('siteData')
    ? JSON.parse(localStorage.getItem('siteData'))
    : JSON.parse(JSON.stringify(initialData)); // Deep copy to avoid mutating import

// Login Logic
const loginModal = document.getElementById('login-modal');
const dashboard = document.getElementById('admin-dashboard');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    if (password === 'admin123') { // Simple password
        loginModal.classList.add('hidden');
        dashboard.classList.remove('hidden');
        initAdmin();
    } else {
        loginError.classList.remove('hidden');
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    location.reload();
});

// Tab Switching
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => {
            t.classList.remove('bg-primary', 'text-white');
            t.classList.add('text-gray-600', 'hover:bg-white', 'hover:text-primary');
        });
        // Add active class to clicked tab
        tab.classList.remove('text-gray-600', 'hover:bg-white', 'hover:text-primary');
        tab.classList.add('bg-primary', 'text-white');

        // Hide all contents
        contents.forEach(c => c.classList.add('hidden'));
        // Show target content
        document.getElementById(`tab-${tab.dataset.tab}`).classList.remove('hidden');
    });
});

// data management
const initAdmin = () => {
    renderMenuEditor();
    renderGalleryEditor();
    renderAboutEditor();
    renderContactEditor();
};

/* Menu Editor */
const renderMenuEditor = () => {
    const list = document.getElementById('menu-list');
    list.innerHTML = '';
    appData.menu.items.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-start shadow-sm border border-gray-100';
        el.innerHTML = `
            <div class="w-full md:w-32 h-32 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                <img src="${item.image}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 space-y-3 w-full">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input type="text" value="${item.name}" placeholder="Tên món" class="p-2 border rounded w-full text-sm font-bold" onchange="updateMenuItem(${index}, 'name', this.value)">
                    <input type="text" value="${item.price}" placeholder="Giá" class="p-2 border rounded w-full text-sm" onchange="updateMenuItem(${index}, 'price', this.value)">
                </div>
                <input type="text" value="${item.description}" placeholder="Mô tả" class="p-2 border rounded w-full text-sm" onchange="updateMenuItem(${index}, 'description', this.value)">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                     <input type="text" value="${item.image}" placeholder="URL Hình ảnh" class="p-2 border rounded w-full text-sm text-gray-500" onchange="updateMenuItem(${index}, 'image', this.value)">
                     <input type="text" value="${item.tag || ''}" placeholder="Tag (e.g. Best Seller)" class="p-2 border rounded w-full text-sm" onchange="updateMenuItem(${index}, 'tag', this.value)">
                </div>
            </div>
            <button onclick="deleteMenuItem(${index})" class="text-red-500 hover:text-red-700 p-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `;
        list.appendChild(el);
    });
};

window.updateMenuItem = (index, field, value) => {
    appData.menu.items[index][field] = value;
};

window.deleteMenuItem = (index) => {
    if (confirm('Bạn có chắc muốn xóa món này?')) {
        appData.menu.items.splice(index, 1);
        renderMenuEditor();
    }
};

window.addMenuItem = () => {
    appData.menu.items.push({
        id: Date.now(),
        name: "Món Mới",
        description: "Mô tả món ăn...",
        price: "Liên hệ",
        image: "assets/img1.png",
        tag: "",
        tagColor: "primary"
    });
    renderMenuEditor();
};

/* Gallery Editor */
const renderGalleryEditor = () => {
    const list = document.getElementById('gallery-list');
    list.innerHTML = '';
    appData.gallery.images.forEach((img, index) => {
        const el = document.createElement('div');
        el.className = 'relative group aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow';
        el.innerHTML = `
            <img src="${img}" class="w-full h-full object-cover">
            <button onclick="deleteGalleryItem(${index})" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <input type="text" value="${img}" class="absolute bottom-0 left-0 w-full p-1 text-xs bg-white/90 outline-none opacity-0 group-hover:opacity-100 transition-opacity" onchange="updateGalleryItem(${index}, this.value)">
        `;
        list.appendChild(el);
    });
};

window.deleteGalleryItem = (index) => {
    if (confirm('Xóa ảnh này?')) {
        appData.gallery.images.splice(index, 1);
        renderGalleryEditor();
    }
};

window.updateGalleryItem = (index, value) => {
    appData.gallery.images[index] = value;
    renderGalleryEditor(); // re-render to update image preview
};

window.addGalleryItem = () => {
    const url = prompt("Nhập URL hình ảnh:");
    if (url) {
        appData.gallery.images.push(url);
        renderGalleryEditor();
    }
};

/* About Editor */
const renderAboutEditor = () => {
    document.getElementById('about-title-input').value = appData.about.title;
    document.getElementById('about-image-input').value = appData.about.image;
    document.getElementById('about-content-input').value = appData.about.paragraphs.join('\n');

    // Listeners are added manually to avoid re-binding issues or sophisticated framework logic
    document.getElementById('about-title-input').onchange = (e) => appData.about.title = e.target.value;
    document.getElementById('about-image-input').onchange = (e) => appData.about.image = e.target.value;
    document.getElementById('about-content-input').onchange = (e) => appData.about.paragraphs = e.target.value.split('\n').filter(p => p.trim() !== '');
};

/* Contact Editor */
const renderContactEditor = () => {
    document.getElementById('contact-address-input').value = appData.contact.address;
    document.getElementById('contact-phone-input').value = appData.contact.phone;
    document.getElementById('contact-hours-input').value = appData.contact.hours;
    document.getElementById('contact-map-input').value = appData.contact.mapEmbed;

    document.getElementById('contact-address-input').onchange = (e) => appData.contact.address = e.target.value;
    document.getElementById('contact-phone-input').onchange = (e) => appData.contact.phone = e.target.value;
    document.getElementById('contact-hours-input').onchange = (e) => appData.contact.hours = e.target.value;
    document.getElementById('contact-map-input').onchange = (e) => appData.contact.mapEmbed = e.target.value;
};


// Global Actions
document.getElementById('save-btn').addEventListener('click', () => {
    localStorage.setItem('siteData', JSON.stringify(appData));
    alert('Đã lưu thay đổi vào trình duyệt! Hãy F5 lại trang chủ để xem thử.');
});

document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Bạn có chắc muốn reset về mặc định không? Mọi thay đổi chưa xuất file sẽ mất.')) {
        localStorage.removeItem('siteData');
        location.reload();
    }
});

document.getElementById('export-btn').addEventListener('click', () => {
    const dataStr = "export const initialData = " + JSON.stringify(appData, null, 4) + ";";
    const blob = new Blob([dataStr], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = "data.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
