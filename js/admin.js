import { initialData } from './data.js';

let appData = localStorage.getItem('siteData')
    ? JSON.parse(localStorage.getItem('siteData'))
    : JSON.parse(JSON.stringify(initialData)); // Deep copy to avoid mutating import

// Helper: Convert File to Base64 with resizing
const processImageFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800; // Resize to max width 800px to save space
                const scaleSize = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scaleSize;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to 70% quality
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};

// Login Logic
const loginModal = document.getElementById('login-modal');
const dashboard = document.getElementById('admin-dashboard');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    if (password === 'Toobakery0810') { // Updated password
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
            <div class="w-full md:w-32 h-32 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden group relative">
                <img src="${item.image}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer" onclick="document.getElementById('menu-file-${index}').click()">
                    <span class="text-white text-xs text-center px-1">Đổi Ảnh</span>
                </div>
            </div>
            <div class="flex-1 space-y-3 w-full">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input type="text" value="${item.name}" placeholder="Tên món" class="p-2 border rounded w-full text-sm font-bold" onchange="updateMenuItem(${index}, 'name', this.value)">
                    <input type="text" value="${item.price}" placeholder="Giá" class="p-2 border rounded w-full text-sm" onchange="updateMenuItem(${index}, 'price', this.value)">
                </div>
                <input type="text" value="${item.description}" placeholder="Mô tả" class="p-2 border rounded w-full text-sm" onchange="updateMenuItem(${index}, 'description', this.value)">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                     <div class="flex gap-2 items-center">
                        <input type="text" value="${item.image}" placeholder="URL Hình ảnh" class="p-2 border rounded w-full text-sm text-gray-500 flex-1" onchange="updateMenuItem(${index}, 'image', this.value)">
                        <input type="file" id="menu-file-${index}" class="hidden" accept="image/*" onchange="uploadMenuImage(${index}, this)">
                        <button onclick="document.getElementById('menu-file-${index}').click()" class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded text-xs whitespace-nowrap">Upload</button>
                     </div>
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

    // Add "Add New" button as the first card
    const addEl = document.createElement('div');
    addEl.className = 'flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg aspect-square cursor-pointer hover:bg-gray-200 transition-colors';
    addEl.onclick = () => document.getElementById('gallery-upload-input').click();
    addEl.innerHTML = `
        <svg class="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        <span class="text-sm text-gray-500 font-medium">Thêm Ảnh Mới</span>
        <input type="file" id="gallery-upload-input" class="hidden" accept="image/*" onchange="uploadGalleryImage(this)">
    `;
    list.appendChild(addEl);

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
