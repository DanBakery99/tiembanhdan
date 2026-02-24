import{i as d}from"./data-oOYYI1OB.js";const u=()=>{var e,r,a;const t=localStorage.getItem("siteData");if(!t)return d;try{const o=JSON.parse(t),l=(r=(e=o.menu)==null?void 0:e.items)==null?void 0:r.some(c=>c.category==="món mặn"),i=!((a=o.contact)!=null&&a.googleRating);return l||i?(console.log("[Tiệm Bánh DAN] Dữ liệu cũ phát hiện, tự động cập nhật..."),localStorage.removeItem("siteData"),d):(o.contact.zaloUrl||(o.contact.zaloUrl=d.contact.zaloUrl),o.contact.facebookUrl||(o.contact.facebookUrl=d.contact.facebookUrl),o.contact.instagramUrl||(o.contact.instagramUrl=d.contact.instagramUrl),o)}catch{return localStorage.removeItem("siteData"),d}},n=u(),f=()=>{const t=n.contact.zaloUrl,e=n.contact.phone;return t&&t!=="#"?t:e?`tel:${e.replace(/\s/g,"")}`:"#"},h=()=>{const t=n.contact.zaloUrl;return t&&t!=="#"?"💬 Nhắn Zalo Đặt Món":"📞 Gọi Đặt Món"},y=()=>{const t=n.contact.phone;return t?`tel:${t.replace(/\s/g,"")}`:"#"},v=()=>{const t=document.getElementById("hero-stats");if(!t)return;const e=n.contact.googleRating,r=n.contact.googleReviewCount;t.innerHTML=`
        <div class="text-center">
            <span class="block text-3xl font-bold text-accent">50+</span>
            <span class="text-sm text-text/60">Loại Bánh</span>
        </div>
        <div class="w-px h-12 bg-primary/10"></div>
        <div class="text-center">
            <span class="block text-3xl font-bold text-accent">Handmade</span>
            <span class="text-sm text-text/60">Mỗi Ngày</span>
        </div>
        ${e?`
        <div class="w-px h-12 bg-primary/10"></div>
        <div class="text-center">
            <span class="block text-3xl font-bold text-accent">${e}</span>
            <span class="text-sm text-text/60">Google${r?` (${r})`:""}</span>
        </div>`:""}
    `},b=()=>{const t=document.getElementById("hero-cta-container");if(!t)return;const e=f(),r=h(),a=y();t.innerHTML=`
        <a href="#menu"
            class="px-8 py-4 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-vintage hover:bg-secondary transition-all transform hover:-translate-y-1 text-center">
            Xem Thực Đơn
        </a>
        <a href="${e}" target="_blank" rel="noopener"
            class="px-8 py-4 bg-accent text-white rounded-full font-semibold shadow-lg hover:bg-accent/80 transition-all transform hover:-translate-y-1 text-center flex items-center justify-center gap-2">
            ${r}
        </a>
        <a href="${a}"
            class="hidden sm:flex px-6 py-4 bg-white border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 items-center gap-2 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            ${n.contact.phone||"Gọi ngay"}
        </a>
    `},w=[{id:null,name:"Tất Cả"},{id:"bánh sinh nhật",name:"🎂 Bánh Sinh Nhật"},{id:"đồ uống",name:"☕ Đồ Uống"},{id:"bánh ngọt",name:"🍰 Bánh Ngọt"}],k=()=>{const t=document.getElementById("category-filters");t&&(t.innerHTML=w.map(e=>`
        <button class="filter-btn px-8 py-2 rounded-full ${e.id===null?"bg-primary text-white shadow-lg":"bg-white text-text border border-primary/10"} font-medium transition-all"
                data-category="${e.id??""}">
            ${e.name}
        </button>
    `).join(""),t.querySelectorAll(".filter-btn").forEach(e=>{e.addEventListener("click",()=>{t.querySelectorAll(".filter-btn").forEach(r=>{r.classList.remove("bg-primary","text-white","shadow-lg"),r.classList.add("bg-white","text-text","border","border-primary/10")}),e.classList.add("bg-primary","text-white","shadow-lg"),e.classList.remove("bg-white","text-text","border","border-primary/10"),x(e.dataset.category||null)})}))},x=(t=null)=>{const e=document.getElementById("menu-grid");if(!e)return;const r=t?n.menu.items.filter(o=>o.category===t):n.menu.items,a=f();e.innerHTML=r.map((o,l)=>`
        <div class="group bg-white rounded-[2rem] p-6 shadow-vintage hover:shadow-2xl transition-all duration-500 border border-primary/5 flex flex-col h-full animate-fade-in-up relative" style="animation-delay: ${l*100}ms">
            <div class="relative overflow-hidden rounded-[1.5rem] aspect-[4/5] mb-6">
                <img src="${o.image}" alt="${o.name}" loading="lazy"
                     class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000">
                
                ${o.tag?`
                <div class="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-badge z-10 uppercase tracking-[0.1em] border border-white/20">
                    ${o.tag}
                </div>`:""}
                
                <!-- Quick Order Overlay -->
                <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <a href="${a}" target="_blank" rel="noopener"
                       class="bg-white text-primary px-8 py-3 rounded-xl font-bold text-sm transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-accent hover:text-white cursor-pointer">
                        Đặt Món Ngay
                    </a>
                </div>
            </div>
            
            <div class="flex-grow flex flex-col items-center text-center">
                <h3 class="font-display text-2xl font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300 italic">${o.name}</h3>
                <p class="text-text/60 text-sm mb-4 leading-relaxed font-light">${o.description}</p>
                
                <div class="mt-auto w-full pt-4 border-t border-primary/5 flex items-center justify-between">
                    <span class="text-accent font-serif italic text-lg opacity-40">Handmade</span>
                    <span class="text-primary font-bold text-xl drop-shadow-sm">${o.price}</span>
                </div>

                <!-- CTA Đặt Món (always visible below price) -->
                <a href="${a}" target="_blank" rel="noopener"
                   class="mt-4 w-full block text-center py-3 bg-primary/5 hover:bg-accent hover:text-white text-primary font-semibold rounded-xl border border-primary/10 hover:border-transparent transition-all duration-300 text-sm cursor-pointer">
                    Đặt Món
                </a>
            </div>
        </div>
    `).join("")},$=()=>{const t=document.getElementById("menu-section-cta");if(!t)return;const e=f(),r=h();t.href=e,t.setAttribute("target","_blank"),t.setAttribute("rel","noopener"),t.textContent=r},C=()=>{const t=document.getElementById("google-rating-summary"),e=document.getElementById("reviews-container"),r=document.getElementById("google-map-iframe"),a=document.getElementById("google-maps-link"),o=document.getElementById("get-directions-btn"),l=document.getElementById("display-address"),i=n.contact.googleRating,c=n.contact.googleMapsUrl||"#";if(t)if(i){const s=Math.floor(i),p=i-s>=.5;let g="";for(let m=0;m<s;m++)g+='<span class="text-yellow-400">★</span>';p&&(g+='<span class="text-yellow-300">★</span>');for(let m=s+(p?1:0);m<5;m++)g+='<span class="text-gray-300">★</span>';t.innerHTML=`
                <div class="flex items-center gap-4 flex-wrap">
                    <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                            <span class="text-5xl font-bold text-text">${i}</span>
                            <div class="flex flex-col gap-1">
                                <div class="flex text-xl leading-none">${g}</div>
                                <span class="text-xs text-text/50 uppercase tracking-wider">Google Reviews</span>
                            </div>
                        </div>
                        ${n.contact.googleReviewCount?`
                        <span class="text-sm text-text/60 mt-1">${n.contact.googleReviewCount} đánh giá trên Google</span>`:""}
                    </div>
                </div>
            `}else t.innerHTML='<p class="text-sm text-text/40 italic">Chưa có đánh giá — Nhập trong Admin &gt; Liên Hệ</p>';e&&n.contact.reviews&&n.contact.reviews.length>0?e.innerHTML=n.contact.reviews.slice(0,3).map(s=>`
            <div class="bg-surface/50 p-6 rounded-2xl border border-primary/5 hover:border-accent/20 transition-colors">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h4 class="font-bold text-text">${s.name}</h4>
                        <div class="flex text-yellow-400 text-sm mt-0.5">
                            ${"★".repeat(s.rating)}${'<span class="text-gray-300">★</span>'.repeat(5-s.rating)}
                        </div>
                    </div>
                    <span class="text-[10px] text-text/40 uppercase tracking-wider">${s.date}</span>
                </div>
                <p class="text-text/70 text-sm italic font-light">"${s.text}"</p>
            </div>
        `).join(""):e&&(e.innerHTML='<p class="text-sm text-text/40 italic py-4">Chưa có review — Thêm trong Admin &gt; Liên Hệ &amp; Google Reviews</p>'),r&&n.contact.mapEmbed?r.innerHTML=`<iframe src="${n.contact.mapEmbed}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Bản đồ Tiệm Bánh DAN"></iframe>`:r&&(r.innerHTML=`
            <div class="w-full h-full bg-surface flex flex-col items-center justify-center gap-3 text-text/40">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-sm font-medium">Chưa có bản đồ</p>
                <p class="text-xs px-6 text-center">Thêm Google Maps Embed URL trong Admin > Liên Hệ & Bản Đồ</p>
            </div>`),a&&(a.href=c,c==="#"&&(a.style.opacity="0.4")),o&&(o.href=c,c==="#"&&(o.style.opacity="0.4")),l&&(l.textContent=n.contact.address||"Chưa có địa chỉ — Nhập trong Admin")},L=()=>{const t=document.getElementById("gallery-grid"),e=document.getElementById("gallery-instagram-link");if(e){const r=n.contact.instagramUrl;r&&r!=="#"?(e.href=r,e.textContent="Xem Instagram @tiembanhdan"):(e.href="#",e.textContent="Xem Thêm Hình Ảnh")}if(t){const r=n.gallery.images.slice(0,6);t.innerHTML=r.map((a,o)=>{const l=o%3===0?"row-span-2":"row-span-1",i=o%4===0?"md:col-span-2":"md:col-span-1";return`
            <div class="relative group overflow-hidden rounded-3xl ${l} ${i} shadow-vintage hover:shadow-2xl transition-all duration-700 cursor-pointer">
                <img src="${a}" 
                     loading="lazy"
                     class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 filter sepia-[0.2] group-hover:sepia-0" 
                     alt="Hình ảnh Tiệm Bánh DAN ${o+1}">
                <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 backdrop-blur-[2px]">
                    <p class="text-white font-serif italic text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Sweet Memories
                    </p>
                </div>
            </div>
        `}).join("")}},E=()=>{const t=document.getElementById("contact-address"),e=document.getElementById("contact-phone"),r=document.getElementById("contact-hours-list"),a=document.getElementById("footer-facebook"),o=document.getElementById("footer-instagram"),l=document.getElementById("footer-zalo"),i=document.getElementById("footer-maps-link");if(t&&(n.contact.address?(t.textContent=n.contact.address,t.style.opacity="1"):(t.textContent="Chưa có địa chỉ — Cập nhật trong Admin",t.style.opacity="0.5")),e)if(n.contact.phone){const s=`tel:${n.contact.phone.replace(/\s/g,"")}`;e.innerHTML=`<a href="${s}" class="hover:text-accent transition-colors">${n.contact.phone}</a>`}else e.textContent="Chưa có SĐT — Cập nhật trong Admin",e.style.opacity="0.5";if(r){const s=Array.isArray(n.contact.hours)?n.contact.hours:[n.contact.hours||""];s.length>0&&s[0]?r.innerHTML=s.map(p=>`<li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${p}
                </li>`).join(""):r.innerHTML='<li class="opacity-50 italic">Chưa có giờ — Cập nhật trong Admin</li>'}a&&(a.href=n.contact.facebookUrl||"#"),o&&(o.href=n.contact.instagramUrl||"#"),l&&(l.href=n.contact.zaloUrl||"#");const c=document.getElementById("footer-zalo-cta");c&&(c.href=n.contact.zaloUrl||"#"),i&&(i.href=n.contact.googleMapsUrl||"#")};document.addEventListener("DOMContentLoaded",()=>{v(),b(),k(),x(),$(),C(),L(),E();const t=new IntersectionObserver(e=>{e.forEach(r=>{r.isIntersecting&&(r.target.classList.add("animate-fade-in-up"),t.unobserve(r.target))})},{threshold:.1});document.querySelectorAll("section").forEach(e=>{t.observe(e)})});
