import { initialData } from './data.js';

const _getInitialData = () => JSON.parse(JSON.stringify(initialData));

const loadAdminData = () => {
    const saved = localStorage.getItem('siteData');
    if (!saved) return _getInitialData();
    try {
        const parsed = JSON.parse(saved);
        // Ensure structure consistency
        if (!parsed.hero) parsed.hero = _getInitialData().hero;
        if (!parsed.menu) parsed.menu = _getInitialData().menu;
        if (!parsed.gallery) parsed.gallery = _getInitialData().gallery;
        if (!parsed.contact) parsed.contact = _getInitialData().contact;
        return parsed;
    } catch {
        return _getInitialData();
    }
};

let appData = loadAdminData();

// Helper: Convert File to Base64 with resizing
const processImageFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1600; // Increased to 1600px for better quality on large screens

                    if (!img.width || !img.height) return reject(new Error('Invalid image dimensions'));

                    // Only scale down; avoid upscaling small images
                    const scaleSize = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
                    canvas.width = Math.round(img.width * scaleSize);
                    canvas.height = Math.round(img.height * scaleSize);

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/jpeg', 0.85)); // Increased to 85% quality to fix blurriness
                } catch (err) {
                    reject(err);
                }
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};

// Login Logic (restored simple flow)

// Login Logic
const loginModal = document.getElementById('login-modal');
const dashboard = document.getElementById('admin-dashboard');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    if (password === 'Toobakery0810') {
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
            t.classList.remove('bg-primary', 'text-white', 'shadow-lg');
            t.classList.add('text-secondary', 'hover:bg-white', 'hover:shadow-md');
        });
        // Add active class to clicked tab
        tab.classList.remove('text-secondary', 'hover:bg-white', 'hover:shadow-md');
        tab.classList.add('bg-primary', 'text-white', 'shadow-lg');

        // Hide all contents with a fade
        contents.forEach(c => c.classList.add('hidden'));
        // Show target content
        const target = document.getElementById(`tab-${tab.dataset.tab}`);
        if (target) target.classList.remove('hidden');
    });
});

// data management
const initAdmin = () => {
    renderHeroEditor();
    renderMenuEditor();
    renderGalleryEditor();
    renderAboutEditor();
    renderContactEditor();
};

/* Hero Editor */
const renderHeroEditor = () => {
    if (!appData.hero) appData.hero = initialData.hero;
    if (!appData.hero.backgroundImages) appData.hero.backgroundImages = initialData.hero.backgroundImages;

    const images = appData.hero.backgroundImages;

    // Preview IDs
    const p1 = document.getElementById('hero-preview-1');
    const p2 = document.getElementById('hero-preview-2');
    // URL Input IDs
    const u1 = document.getElementById('hero-url-1');
    const u2 = document.getElementById('hero-url-2');

    if (p1 && images[0]) p1.src = images[0].src;
    if (p2 && images[1]) p2.src = images[1].src;
    if (u1 && images[0]) u1.value = images[0].src;
    if (u2 && images[1]) u2.value = images[1].src;
};

window.updateHeroImage = (index, value) => {
    if (!appData.hero.backgroundImages[index]) {
        appData.hero.backgroundImages[index] = { src: value, label: "" };
    } else {
        appData.hero.backgroundImages[index].src = value;
    }
    renderHeroEditor();
};

window.uploadHeroImage = async (index, input) => {
    if (input.files && input.files[0]) {
        try {
            const base64 = await processImageFile(input.files[0]);
            window.updateHeroImage(index, base64);
        } catch (e) {
            alert("Lỗi upload ảnh: " + e.message);
        }
    }
};

/* Menu Editor */
const renderMenuEditor = () => {
    const list = document.getElementById('menu-list');
    list.innerHTML = '';
    appData.menu.items.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'bg-surface p-6 rounded-[2rem] flex flex-col md:flex-row gap-6 items-start border border-primary/5 shadow-sm hover:shadow-md transition-all group';
        el.innerHTML = `
            <div class="w-full md:w-40 h-40 flex-shrink-0 bg-white rounded-2xl overflow-hidden relative border border-primary/5">
                <img src="${item.image}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onclick="document.getElementById('menu-file-${index}').click()">
                    <span class="text-white text-[10px] font-bold uppercase tracking-widest">Đổi Ảnh</span>
                </div>
            </div>
            <div class="flex-1 space-y-4 w-full">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <label class="text-[9px] font-bold text-primary/30 uppercase tracking-tighter ml-1">Tên Món</label>
                        <input type="text" value="${item.name}" placeholder="Tên món" class="w-full px-4 py-2 bg-white border border-primary/5 rounded-xl text-sm font-bold focus:ring-2 focus:ring-accent outline-none" onchange="updateMenuItem(${index}, 'name', this.value)">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[9px] font-bold text-primary/30 uppercase tracking-tighter ml-1">Giá Tiền</label>
                        <input type="text" value="${item.price}" placeholder="Giá" class="w-full px-4 py-2 bg-white border border-primary/5 rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none" onchange="updateMenuItem(${index}, 'price', this.value)">
                    </div>
                </div>
                <div class="space-y-1">
                    <label class="text-[9px] font-bold text-primary/30 uppercase tracking-tighter ml-1">Mô Tả</label>
                    <input type="text" value="${item.description}" placeholder="Mô tả" class="w-full px-4 py-2 bg-white border border-primary/5 rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none" onchange="updateMenuItem(${index}, 'description', this.value)">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                     <div class="md:col-span-2 space-y-1">
                        <label class="text-[9px] font-bold text-primary/30 uppercase tracking-tighter ml-1">URL Hình Ảnh</label>
                        <input type="text" value="${item.image}" placeholder="URL Hình ảnh" class="w-full px-4 py-2 bg-white border border-primary/5 rounded-xl text-[10px] text-gray-500 focus:ring-2 focus:ring-accent outline-none" onchange="updateMenuItem(${index}, 'image', this.value)">
                        <input type="file" id="menu-file-${index}" class="hidden" accept="image/*" onchange="uploadMenuImage(${index}, this)">
                     </div>
                     <div class="space-y-1">
                        <label class="text-[9px] font-bold text-primary/30 uppercase tracking-tighter ml-1">Tag (vd: Best Seller)</label>
                        <input type="text" value="${item.tag || ''}" placeholder="Tag" class="w-full px-4 py-2 bg-white border border-primary/5 rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none" onchange="updateMenuItem(${index}, 'tag', this.value)">
                     </div>
                </div>
                <div class="flex items-center justify-between pt-2">
                    <select class="px-4 py-2 bg-white border border-primary/5 rounded-xl text-xs font-bold text-primary focus:ring-2 focus:ring-accent outline-none" onchange="updateMenuItem(${index}, 'category', this.value)">
                        <option value="bánh sinh nhật" ${item.category === 'bánh sinh nhật' ? 'selected' : ''}>🎂 Bánh Sinh Nhật</option>
                        <option value="đồ uống" ${item.category === 'đồ uống' ? 'selected' : ''}>☕ Đồ Uống</option>
                        <option value="bánh ngọt" ${item.category === 'bánh ngọt' ? 'selected' : ''}>🍰 Bánh Ngọt</option>
                    </select>
                    <button onclick="deleteMenuItem(${index})" class="p-2 text-rose-300 hover:text-rose-500 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        `;
        list.appendChild(el);
    });
};

window.updateMenuItem = (index, field, value) => {
    appData.menu.items[index][field] = value;
};

window.uploadMenuImage = async (index, input) => {
    if (input.files && input.files[0]) {
        try {
            const base64 = await processImageFile(input.files[0]);
            appData.menu.items[index].image = base64;
            renderMenuEditor();
        } catch (e) {
            alert("Lỗi upload ảnh: " + e.message);
        }
    }
}

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
        image: "/assets/img1.png",
        tag: "",
        tagColor: "primary",
        category: "bánh ngọt"
    });
    renderMenuEditor();
};

/* Gallery Editor */
const renderGalleryEditor = () => {
    const list = document.getElementById('gallery-list');
    list.innerHTML = '';

    // Add "Add New" button as the first card
    const addEl = document.createElement('div');
    addEl.className = 'flex flex-col items-center justify-center bg-surface border-2 border-dashed border-primary/10 rounded-2xl aspect-square cursor-pointer hover:bg-white hover:border-accent/40 transition-all group';
    addEl.onclick = () => document.getElementById('gallery-upload-input').click();
    addEl.innerHTML = `
        <div class="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        </div>
        <span class="text-xs text-primary/60 font-bold uppercase tracking-widest">Thêm Ảnh</span>
        <input type="file" id="gallery-upload-input" class="hidden" accept="image/*" onchange="uploadGalleryImage(this)">
    `;
    list.appendChild(addEl);

    appData.gallery.images.forEach((img, index) => {
        const el = document.createElement('div');
        el.className = 'relative group aspect-square rounded-2xl overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl transition-all';
        el.innerHTML = `
            <img src="${img}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div class="flex justify-end">
                    <button onclick="deleteGalleryItem(${index})" class="bg-rose-500 text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <input type="text" value="${img}" class="w-full p-2 text-[9px] bg-white/90 rounded-lg outline-none backdrop-blur-sm" onchange="updateGalleryItem(${index}, this.value)">
            </div>
        `;
        list.appendChild(el);
    });
};

window.uploadGalleryImage = async (input) => {
    if (input.files && input.files[0]) {
        try {
            const base64 = await processImageFile(input.files[0]);
            appData.gallery.images.push(base64);
            renderGalleryEditor();
        } catch (e) {
            alert("Lỗi upload ảnh: " + e.message);
        }
    }
}

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
    const url = prompt("Nhập URL hình ảnh (hoặc dùng nút Upload):");
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

    document.getElementById('about-title-input').onchange = (e) => appData.about.title = e.target.value;
    document.getElementById('about-image-input').onchange = (e) => appData.about.image = e.target.value;
    document.getElementById('about-content-input').onchange = (e) => appData.about.paragraphs = e.target.value.split('\n').filter(p => p.trim() !== '');

    // Bind upload for about image
    const fileInput = document.getElementById('about-image-file');
    if (fileInput) {
        fileInput.onchange = async (e) => {
            if (e.target.files && e.target.files[0]) {
                try {
                    const base64 = await processImageFile(e.target.files[0]);
                    appData.about.image = base64;
                    document.getElementById('about-image-input').value = base64; // Update text input view
                    alert("Đã cập nhật ảnh thành công!");
                } catch (err) {
                    alert("Lỗi: " + err);
                }
            }
        }
    }
};

/* Contact Editor */
const renderContactEditor = () => {
    document.getElementById('contact-address-input').value = appData.contact.address || '';
    document.getElementById('contact-phone-input').value = appData.contact.phone || '';
    document.getElementById('contact-hours-input').value = Array.isArray(appData.contact.hours) ? appData.contact.hours.join(', ') : (appData.contact.hours || '');
    document.getElementById('contact-map-input').value = appData.contact.mapEmbed || '';

    // New Google Fields
    document.getElementById('contact-google-rating-input').value = appData.contact.googleRating || 5;
    document.getElementById('contact-google-count-input').value = appData.contact.googleReviewCount || 0;
    document.getElementById('contact-maps-url-input').value = appData.contact.googleMapsUrl || '';

    // New Social / Order channel fields
    document.getElementById('contact-zalo-input').value = appData.contact.zaloUrl || '';
    document.getElementById('contact-facebook-input').value = appData.contact.facebookUrl || '';
    document.getElementById('contact-instagram-input').value = appData.contact.instagramUrl || '';

    // Event Listeners
    document.getElementById('contact-address-input').onchange = (e) => appData.contact.address = e.target.value;
    document.getElementById('contact-phone-input').onchange = (e) => appData.contact.phone = e.target.value;
    document.getElementById('contact-hours-input').onchange = (e) => appData.contact.hours = e.target.value.split(',').map(h => h.trim()).filter(h => h !== '');
    document.getElementById('contact-map-input').onchange = (e) => appData.contact.mapEmbed = e.target.value;
    document.getElementById('contact-google-rating-input').onchange = (e) => appData.contact.googleRating = parseFloat(e.target.value);
    document.getElementById('contact-google-count-input').onchange = (e) => appData.contact.googleReviewCount = parseInt(e.target.value);
    document.getElementById('contact-maps-url-input').onchange = (e) => appData.contact.googleMapsUrl = e.target.value;
    document.getElementById('contact-zalo-input').onchange = (e) => appData.contact.zaloUrl = e.target.value;
    document.getElementById('contact-facebook-input').onchange = (e) => appData.contact.facebookUrl = e.target.value;
    document.getElementById('contact-instagram-input').onchange = (e) => appData.contact.instagramUrl = e.target.value;

    // Render 3 Reviews Editor
    const reviewsList = document.getElementById('admin-reviews-list');
    if (reviewsList) {
        if (!appData.contact.reviews) appData.contact.reviews = [];
        // Ensure we always have 3 reviews
        while (appData.contact.reviews.length < 3) {
            appData.contact.reviews.push({ name: "Khách hàng", rating: 5, text: "", date: "vừa xong" });
        }

        reviewsList.innerHTML = appData.contact.reviews.map((rev, i) => `
            <div class="p-6 bg-white border border-primary/5 rounded-[1.5rem] space-y-4 shadow-sm">
                <div class="flex justify-between items-center border-b border-primary/5 pb-2">
                    <span class="text-[10px] font-bold text-accent uppercase tracking-widest italic">Bình luận #${i + 1}</span>
                    <div class="flex gap-1 text-amber-400">
                        ${Array(5).fill(0).map((_, star) => `
                            <svg class="w-3 h-3 ${star < rev.rating ? 'fill-current' : 'text-gray-200'}" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        `).join('')}
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <label class="text-[9px] font-bold text-primary/30 uppercase tracking-tighter ml-1">Tên Khách</label>
                        <input type="text" value="${rev.name}" placeholder="Tên khách" class="w-full px-4 py-2 bg-surface border border-primary/5 rounded-xl text-sm font-bold focus:ring-2 focus:ring-accent outline-none" onchange="appData.contact.reviews[${i}].name = this.value">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[9px] font-bold text-primary/30 uppercase tracking-tighter ml-1">Số Sao</label>
                        <input type="number" min="1" max="5" value="${rev.rating}" class="w-full px-4 py-2 bg-surface border border-primary/5 rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none" onchange="appData.contact.reviews[${i}].rating = parseInt(this.value); renderContactEditor();">
                    </div>
                </div>
                <div class="space-y-1">
                    <label class="text-[9px] font-bold text-primary/30 uppercase tracking-tighter ml-1">Thời Gian (vd: 2 tuần trước)</label>
                    <input type="text" value="${rev.date}" class="w-full px-4 py-2 bg-surface border border-primary/5 rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none" onchange="appData.contact.reviews[${i}].date = this.value">
                </div>
                <div class="space-y-1">
                    <label class="text-[9px] font-bold text-primary/30 uppercase tracking-tighter ml-1">Nội Dung Review</label>
                    <textarea placeholder="Nội dung review..." class="w-full px-4 py-2 bg-surface border border-primary/5 rounded-xl text-xs h-24 focus:ring-2 focus:ring-accent outline-none" onchange="appData.contact.reviews[${i}].text = this.value">${rev.text}</textarea>
                </div>
            </div>
        `).join('');
    }
};


// Global Actions
document.getElementById('save-btn').addEventListener('click', () => {
    try {
        localStorage.setItem('siteData', JSON.stringify(appData));
        alert('Đã lưu thay đổi vào trình duyệt!');
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            alert('Lỗi: Dung lượng lưu trữ đã đầy! Hãy thử xóa bớt ảnh hoặc dùng ảnh nhỏ hơn.');
        } else {
            alert('Lỗi khi lưu: ' + e.message);
        }
    }
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
