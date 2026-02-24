import{i as c}from"./data-EdnpEie_.js";const y=()=>{const e=localStorage.getItem("siteData");if(!e)return c;try{const t=JSON.parse(e);return t.hero||(t.hero=JSON.parse(JSON.stringify(c.hero))),t.menu||(t.menu=JSON.parse(JSON.stringify(c.menu))),t.contact||(t.contact=JSON.parse(JSON.stringify(c.contact))),t.gallery||(t.gallery=JSON.parse(JSON.stringify(c.gallery))),t.menu.items&&t.menu.items.forEach(o=>{o.category==="món mặn"&&(o.category="bánh ngọt")}),((o,a)=>{for(const s in a)(o[s]===void 0||o[s]===null||o[s]==="")&&(o[s]=a[s])})(t.contact,c.contact),(!t.hero.backgroundImages||t.hero.backgroundImages.length===0)&&(t.hero.backgroundImages=c.hero.backgroundImages),t}catch(t){return console.error("Lỗi khi tải dữ liệu từ localStorage:",t),c}},n=y(),f=()=>{const e=n.contact.zaloUrl,t=n.contact.phone;return e&&e!=="#"?e:t?`tel:${t.replace(/\s/g,"")}`:"#"},h=()=>{const e=n.contact.zaloUrl;return e&&e!=="#"?"💬 Nhắn Zalo Đặt Món":"📞 Gọi Đặt Món"},b=()=>{const e=n.contact.phone;return e?`tel:${e.replace(/\s/g,"")}`:"#"},v=()=>{const e=document.getElementById("hero-stats");if(!e)return;const t=n.contact.googleRating,r=n.contact.googleReviewCount;e.innerHTML=`
        <div class="text-center">
            <span class="block text-3xl font-bold text-accent">50+</span>
            <span class="text-sm text-text/60">Loại Bánh</span>
        </div>
        <div class="w-px h-12 bg-primary/10"></div>
        <div class="text-center">
            <span class="block text-3xl font-bold text-accent">Handmade</span>
            <span class="text-sm text-text/60">Mỗi Ngày</span>
        </div>
        ${t?`
        <div class="w-px h-12 bg-primary/10"></div>
        <div class="text-center">
            <span class="block text-3xl font-bold text-accent">${t}</span>
            <span class="text-sm text-text/60">Google${r?` (${r})`:""}</span>
        </div>`:""}
    `},w=()=>{const e=document.getElementById("hero-img-1"),t=document.getElementById("hero-img-2"),r=document.getElementById("hero-img-mobile");if(n.hero&&n.hero.backgroundImages){const o=n.hero.backgroundImages;e&&o[0]&&(e.src=o[0].src),t&&o[1]&&(t.src=o[1].src),r&&o[0]&&(r.src=o[0].src)}},k=()=>{const e=document.getElementById("hero-cta-container");if(!e)return;const t=f(),r=h(),o=b();e.innerHTML=`
        <a href="#menu"
            class="px-8 py-4 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-vintage hover:bg-secondary transition-all transform hover:-translate-y-1 text-center">
            Xem Thực Đơn
        </a>
        <a href="${t}" target="_blank" rel="noopener"
            class="px-8 py-4 bg-accent text-white rounded-full font-semibold shadow-lg hover:bg-accent/80 transition-all transform hover:-translate-y-1 text-center flex items-center justify-center gap-2">
            ${r}
        </a>
        <a href="${o}"
            class="hidden sm:flex px-6 py-4 bg-white border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 items-center gap-2 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            ${n.contact.phone||"Gọi ngay"}
        </a>
    `},E=[{id:null,name:"Tất Cả"},{id:"bánh sinh nhật",name:"🎂 Bánh Sinh Nhật"},{id:"đồ uống",name:"☕ Đồ Uống"},{id:"bánh ngọt",name:"🍰 Bánh Ngọt"}],I=()=>{const e=document.getElementById("category-filters");e&&(e.innerHTML=E.map(t=>`
        <button class="filter-btn px-8 py-2 rounded-full ${t.id===null?"bg-primary text-white shadow-lg":"bg-white text-text border border-primary/10"} font-medium transition-all"
                data-category="${t.id??""}">
            ${t.name}
        </button>
    `).join(""),e.querySelectorAll(".filter-btn").forEach(t=>{t.addEventListener("click",()=>{e.querySelectorAll(".filter-btn").forEach(r=>{r.classList.remove("bg-primary","text-white","shadow-lg"),r.classList.add("bg-white","text-text","border","border-primary/10")}),t.classList.add("bg-primary","text-white","shadow-lg"),t.classList.remove("bg-white","text-text","border","border-primary/10"),u(t.dataset.category||null)})}))},u=(e=null)=>{const t=document.getElementById("menu-grid");if(!t)return;const r=e?n.menu.items.filter(a=>a.category===e):n.menu.items,o=f();t.innerHTML=r.map((a,s)=>`
        <div class="group bg-white rounded-[2rem] p-6 shadow-vintage hover:shadow-2xl transition-all duration-500 border border-primary/5 flex flex-col h-full animate-fade-in-up relative" style="animation-delay: ${s*100}ms">
            <div class="relative overflow-hidden rounded-[1.5rem] aspect-[4/5] mb-6">
                <img src="${a.image}" alt="${a.name}" loading="lazy"
                     class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000">
                
                ${a.tag?`
                <div class="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-badge z-10 uppercase tracking-[0.1em] border border-white/20">
                    ${a.tag}
                </div>`:""}
                
                <!-- Quick Order Overlay -->
                <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <a href="${o}" target="_blank" rel="noopener"
                       class="bg-white text-primary px-8 py-3 rounded-xl font-bold text-sm transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-accent hover:text-white cursor-pointer">
                        Đặt Món Ngay
                    </a>
                </div>
            </div>
            
            <div class="flex-grow flex flex-col items-center text-center">
                <h3 class="font-display text-2xl font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300 italic">${a.name}</h3>
                <p class="text-text/60 text-sm mb-4 leading-relaxed font-light">${a.description}</p>
                
                <div class="mt-auto w-full pt-4 border-t border-primary/5 flex items-center justify-between">
                    <span class="text-accent font-serif italic text-lg opacity-40">Handmade</span>
                    <span class="text-primary font-bold text-xl drop-shadow-sm">${a.price}</span>
                </div>

                <!-- CTA Đặt Món (always visible below price) -->
                <a href="${o}" target="_blank" rel="noopener"
                   class="mt-4 w-full block text-center py-3 bg-primary/5 hover:bg-accent hover:text-white text-primary font-semibold rounded-xl border border-primary/10 hover:border-transparent transition-all duration-300 text-sm cursor-pointer">
                    Đặt Món
                </a>
            </div>
        </div>
    `).join("")},$=()=>{const e=document.getElementById("menu-section-cta");if(!e)return;const t=f(),r=h();e.href=t,e.setAttribute("target","_blank"),e.setAttribute("rel","noopener"),e.textContent=r},L=()=>{const e=document.getElementById("google-rating-summary"),t=document.getElementById("reviews-container"),r=document.getElementById("google-map-iframe"),o=document.getElementById("google-maps-link"),a=document.getElementById("get-directions-btn"),s=document.getElementById("display-address"),l=n.contact.googleRating,d=n.contact.googleMapsUrl||"#";if(e)if(l){const i=Math.floor(l),g=l-i>=.5;let p="";for(let m=0;m<i;m++)p+='<span class="text-yellow-400">★</span>';g&&(p+='<span class="text-yellow-300">★</span>');for(let m=i+(g?1:0);m<5;m++)p+='<span class="text-gray-300">★</span>';e.innerHTML=`
                <div class="flex items-center gap-4 flex-wrap">
                    <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                            <span class="text-5xl font-bold text-text">${l}</span>
                            <div class="flex flex-col gap-1">
                                <div class="flex text-xl leading-none">${p}</div>
                                <span class="text-xs text-text/50 uppercase tracking-wider">Google Reviews</span>
                            </div>
                        </div>
                        ${n.contact.googleReviewCount?`
                        <span class="text-sm text-text/60 mt-1">${n.contact.googleReviewCount} đánh giá trên Google</span>`:""}
                    </div>
                </div>
            `}else e.innerHTML='<p class="text-sm text-text/40 italic">Chưa có đánh giá — Nhập trong Admin &gt; Liên Hệ</p>';t&&n.contact.reviews&&n.contact.reviews.length>0?t.innerHTML=n.contact.reviews.slice(0,3).map(i=>`
            <div class="bg-surface/50 p-6 rounded-2xl border border-primary/5 hover:border-accent/20 transition-colors">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h4 class="font-bold text-text">${i.name}</h4>
                        <div class="flex text-yellow-400 text-sm mt-0.5">
                            ${"★".repeat(i.rating)}${'<span class="text-gray-300">★</span>'.repeat(5-i.rating)}
                        </div>
                    </div>
                    <span class="text-[10px] text-text/40 uppercase tracking-wider">${i.date}</span>
                </div>
                <p class="text-text/70 text-sm italic font-light">"${i.text}"</p>
            </div>
        `).join(""):t&&(t.innerHTML='<p class="text-sm text-text/40 italic py-4">Chưa có review — Thêm trong Admin &gt; Liên Hệ &amp; Google Reviews</p>'),r&&n.contact.mapEmbed?r.innerHTML=`<iframe src="${n.contact.mapEmbed}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Bản đồ Tiệm Bánh DAN"></iframe>`:r&&(r.innerHTML=`
            <div class="w-full h-full bg-surface flex flex-col items-center justify-center gap-3 text-text/40">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-sm font-medium">Chưa có bản đồ</p>
                <p class="text-xs px-6 text-center">Thêm Google Maps Embed URL trong Admin > Liên Hệ & Bản Đồ</p>
            </div>`),o&&(o.href=d,d==="#"&&(o.style.opacity="0.4")),a&&(a.href=d,d==="#"&&(a.style.opacity="0.4")),s&&(s.textContent=n.contact.address||"Chưa có địa chỉ — Nhập trong Admin")},C=()=>{const e=document.getElementById("gallery-grid"),t=document.getElementById("gallery-instagram-link");if(t){const r=n.contact.instagramUrl;r&&r!=="#"?(t.href=r,t.textContent="Xem Instagram @tiembanhdan"):(t.href="#",t.textContent="Xem Thêm Hình Ảnh")}if(e){const r=n.gallery.images.slice(0,6);e.innerHTML=r.map((o,a)=>{const s=a%3===0?"row-span-2":"row-span-1",l=a%4===0?"md:col-span-2":"md:col-span-1";return`
            <div class="relative group overflow-hidden rounded-3xl ${s} ${l} shadow-vintage hover:shadow-2xl transition-all duration-700 cursor-pointer">
                <img src="${o}" 
                     loading="lazy"
                     class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 filter sepia-[0.2] group-hover:sepia-0" 
                     alt="Hình ảnh Tiệm Bánh DAN ${a+1}">
                <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 backdrop-blur-[2px]">
                    <p class="text-white font-serif italic text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Sweet Memories
                    </p>
                </div>
            </div>
        `}).join("")}},B=()=>{const e=document.getElementById("contact-address"),t=document.getElementById("contact-phone"),r=document.getElementById("contact-hours-list"),o=document.getElementById("footer-facebook"),a=document.getElementById("footer-instagram"),s=document.getElementById("footer-zalo"),l=document.getElementById("footer-maps-link");if(e&&(n.contact.address?(e.textContent=n.contact.address,e.style.opacity="1"):(e.textContent="Chưa có địa chỉ — Cập nhật trong Admin",e.style.opacity="0.5")),t)if(n.contact.phone){const i=`tel:${n.contact.phone.replace(/\s/g,"")}`;t.innerHTML=`<a href="${i}" class="hover:text-accent transition-colors">${n.contact.phone}</a>`}else t.textContent="Chưa có SĐT — Cập nhật trong Admin",t.style.opacity="0.5";if(r){const i=Array.isArray(n.contact.hours)?n.contact.hours:[n.contact.hours||""];i.length>0&&i[0]?r.innerHTML=i.map(g=>`<li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${g}
                </li>`).join(""):r.innerHTML='<li class="opacity-50 italic">Chưa có giờ — Cập nhật trong Admin</li>'}o&&(o.href=n.contact.facebookUrl||"#"),a&&(a.href=n.contact.instagramUrl||"#"),s&&(s.href=n.contact.zaloUrl||"#");const d=document.getElementById("footer-zalo-cta");d&&(d.href=n.contact.zaloUrl||"#"),l&&(l.href=n.contact.googleMapsUrl||"#")};document.addEventListener("DOMContentLoaded",()=>{w(),v(),k(),I(),u(),$(),L(),C(),B();const e=new IntersectionObserver(t=>{t.forEach(r=>{r.isIntersecting&&(r.target.classList.add("animate-fade-in-up"),e.unobserve(r.target))})},{threshold:.1});document.querySelectorAll("section").forEach(t=>{e.observe(t)})});const x=(e="/assets/img1.png")=>{try{document.querySelectorAll("img").forEach(t=>{t.dataset.fallbackBound||(t.addEventListener("error",()=>{(!t.src||t.src===""||t.naturalWidth===0)&&(t.src=e)}),t.dataset.fallbackBound="1")})}catch{}};document.addEventListener("DOMContentLoaded",()=>x());setTimeout(()=>x(),600);
