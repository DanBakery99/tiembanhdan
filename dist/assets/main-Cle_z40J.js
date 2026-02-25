import{i as f}from"./data-EdnpEie_.js";const d=e=>String(e??"").replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),i=e=>{if(!e)return"#";const t=e.trim();if(t.startsWith("/")||t.startsWith("data:image/"))return t;try{const n=new URL(t,window.location.origin);return["http:","https:","tel:","mailto:"].includes(n.protocol)?n.href:"#"}catch{return console.warn("Blocked unsafe URL:",e),"#"}},w=e=>{try{const t=new URL(e,window.location.origin);return t.protocol==="https:"&&(t.hostname.includes("google.com")||t.hostname.includes("maps.app.goo.gl"))}catch{return!1}},k=()=>{const e=localStorage.getItem("siteData");if(!e)return f;try{const t=JSON.parse(e);return t.hero||(t.hero=JSON.parse(JSON.stringify(f.hero))),t.menu||(t.menu=JSON.parse(JSON.stringify(f.menu))),t.contact||(t.contact=JSON.parse(JSON.stringify(f.contact))),t.gallery||(t.gallery=JSON.parse(JSON.stringify(f.gallery))),t.menu.items&&t.menu.items.forEach(a=>{a.category==="món mặn"&&(a.category="bánh ngọt")}),((a,s)=>{for(const c in s)(a[c]===void 0||a[c]===null||a[c]==="")&&(a[c]=s[c])})(t.contact,f.contact),(!t.hero.backgroundImages||t.hero.backgroundImages.length===0)&&(t.hero.backgroundImages=f.hero.backgroundImages),t}catch(t){return console.error("Lỗi khi tải dữ liệu từ localStorage:",t),f}},r=k(),u=()=>{const e=r.contact.zaloUrl,t=r.contact.phone;return e&&e!=="#"?e:t?`tel:${t.replace(/\s/g,"")}`:"#"},y=()=>{const e=r.contact.zaloUrl;return e&&e!=="#"?"💬 Nhắn Zalo Đặt Món":"📞 Gọi Đặt Món"},E=()=>{const e=r.contact.phone;return e?`tel:${e.replace(/\s/g,"")}`:"#"},I=()=>{const e=document.getElementById("hero-stats");if(!e)return;const t=r.contact.googleRating,n=r.contact.googleReviewCount;e.innerHTML=`
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
            <span class="text-sm text-text/60">Google${n?` (${n})`:""}</span>
        </div>`:""}
    `},L=()=>{const e=document.getElementById("hero-img-1"),t=document.getElementById("hero-img-2"),n=document.getElementById("hero-img-mobile");if(r.hero&&r.hero.backgroundImages){const a=r.hero.backgroundImages;e&&a[0]&&(e.src=i(a[0].src)),t&&a[1]&&(t.src=i(a[1].src)),n&&a[0]&&(n.src=i(a[0].src))}},C=()=>{const e=document.getElementById("hero-cta-container");if(!e)return;const t=u(),n=y(),a=E();e.innerHTML=`
        <a href="#menu"
            class="px-8 py-4 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-vintage hover:bg-secondary transition-all transform hover:-translate-y-1 text-center">
            Xem Thực Đơn
        </a>
        <a href="${i(t)}" target="_blank" rel="noopener"
            class="px-8 py-4 bg-accent text-white rounded-full font-semibold shadow-lg hover:bg-accent/80 transition-all transform hover:-translate-y-1 text-center flex items-center justify-center gap-2">
            ${n}
        </a>
        <a href="${i(a)}"
            class="hidden sm:flex px-6 py-4 bg-white border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 items-center gap-2 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            ${r.contact.phone||"Gọi ngay"}
        </a>
    `},M=[{id:null,name:"Tất Cả"},{id:"bánh sinh nhật",name:"🎂 Bánh Sinh Nhật"},{id:"đồ uống",name:"☕ Đồ Uống"},{id:"bánh ngọt",name:"🍰 Bánh Ngọt"}],$=()=>{const e=document.getElementById("category-filters");e&&(e.innerHTML=M.map(t=>`
        <button class="filter-btn px-8 py-2 rounded-full ${t.id===null?"bg-primary text-white shadow-lg":"bg-white text-text border border-primary/10"} font-medium transition-all"
                data-category="${t.id??""}">
            ${t.name}
        </button>
    `).join(""),e.querySelectorAll(".filter-btn").forEach(t=>{t.addEventListener("click",()=>{e.querySelectorAll(".filter-btn").forEach(n=>{n.classList.remove("bg-primary","text-white","shadow-lg"),n.classList.add("bg-white","text-text","border","border-primary/10")}),t.classList.add("bg-primary","text-white","shadow-lg"),t.classList.remove("bg-white","text-text","border","border-primary/10"),b(t.dataset.category||null)})}))},b=(e=null)=>{const t=document.getElementById("menu-grid");if(!t)return;const n=e?r.menu.items.filter(s=>s.category===e):r.menu.items,a=u();t.innerHTML=n.map((s,c)=>{const l=d(s.name),m=d(s.description),o=d(s.price),p=d(s.tag),g=i(s.image);return`
            <div class="group bg-white rounded-[2rem] p-6 shadow-vintage hover:shadow-2xl transition-all duration-500 border border-primary/5 flex flex-col h-full animate-fade-in-up relative" style="animation-delay: ${c*100}ms">
                <div class="relative overflow-hidden rounded-[1.5rem] aspect-[4/5] mb-6">
                    <img src="${g}" alt="${l}" loading="lazy"
                         class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000">
                    
                    ${s.tag?`
                    <div class="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-badge z-10 uppercase tracking-[0.1em] border border-white/20">
                        ${p}
                    </div>`:""}
                    
                    <!-- Quick Order Overlay -->
                    <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <a href="${i(a)}" target="_blank" rel="noopener"
                           class="bg-white text-primary px-8 py-3 rounded-xl font-bold text-sm transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-accent hover:text-white cursor-pointer">
                            Đặt Món Ngay
                        </a>
                    </div>
                </div>
                
                <div class="flex-grow flex flex-col items-center text-center">
                    <h3 class="font-display text-2xl font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300 italic">${l}</h3>
                    <p class="text-text/60 text-sm mb-4 leading-relaxed font-light">${m}</p>
                    
                    <div class="mt-auto w-full pt-4 border-t border-primary/5 flex items-center justify-between">
                        <span class="text-accent font-serif italic text-lg opacity-40">Handmade</span>
                        <span class="text-primary font-bold text-xl drop-shadow-sm">${o}</span>
                    </div>

                    <!-- CTA Đặt Món (always visible below price) -->
                    <a href="${i(a)}" target="_blank" rel="noopener"
                       class="mt-4 w-full block text-center py-3 bg-primary/5 hover:bg-accent hover:text-white text-primary font-semibold rounded-xl border border-primary/10 hover:border-transparent transition-all duration-300 text-sm cursor-pointer">
                        Đặt Món
                    </a>
                </div>
            </div>
        `}).join("")},B=()=>{const e=document.getElementById("menu-section-cta");if(!e)return;const t=i(u()),n=y();e.href=t,e.setAttribute("target","_blank"),e.setAttribute("rel","noopener"),e.textContent=n},H=()=>{const e=document.getElementById("google-rating-summary"),t=document.getElementById("reviews-container"),n=document.getElementById("google-map-iframe"),a=document.getElementById("google-maps-link"),s=document.getElementById("get-directions-btn"),c=document.getElementById("display-address"),l=r.contact.googleRating,m=r.contact.googleMapsUrl||"#";if(e)if(l){const o=Math.floor(l),p=l-o>=.5;let g="";for(let h=0;h<o;h++)g+='<span class="text-yellow-400">★</span>';p&&(g+='<span class="text-yellow-300">★</span>');for(let h=o+(p?1:0);h<5;h++)g+='<span class="text-gray-300">★</span>';e.innerHTML=`
                <div class="flex items-center gap-4 flex-wrap">
                    <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                            <span class="text-5xl font-bold text-text">${l}</span>
                            <div class="flex flex-col gap-1">
                                <div class="flex text-xl leading-none">${g}</div>
                                <span class="text-xs text-text/50 uppercase tracking-wider">Google Reviews</span>
                            </div>
                        </div>
                        ${r.contact.googleReviewCount?`
                        <span class="text-sm text-text/60 mt-1">${r.contact.googleReviewCount} đánh giá trên Google</span>`:""}
                    </div>
                </div>
            `}else e.innerHTML='<p class="text-sm text-text/40 italic">Chưa có đánh giá — Nhập trong Admin &gt; Liên Hệ</p>';if(t&&r.contact.reviews&&r.contact.reviews.length>0?t.innerHTML=r.contact.reviews.slice(0,3).map(o=>{const p=d(o.name),g=d(o.text),h=d(o.date),x=Math.max(1,Math.min(5,parseInt(o.rating,10)||0));return`
                <div class="bg-surface/50 p-6 rounded-2xl border border-primary/5 hover:border-accent/20 transition-colors">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h4 class="font-bold text-text">${p}</h4>
                            <div class="flex text-yellow-400 text-sm mt-0.5">
                                ${"★".repeat(x)}${'<span class="text-gray-300">★</span>'.repeat(5-x)}
                            </div>
                        </div>
                        <span class="text-[10px] text-text/40 uppercase tracking-wider">${h}</span>
                    </div>
                    <p class="text-text/70 text-sm italic font-light">"${g}"</p>
                </div>
            `}).join(""):t&&(t.innerHTML='<p class="text-sm text-text/40 italic py-4">Chưa có review — Thêm trong Admin &gt; Liên Hệ &amp; Google Reviews</p>'),n&&r.contact.mapEmbed&&w(r.contact.mapEmbed)){const o=document.createElement("iframe");o.src=i(r.contact.mapEmbed),o.width="100%",o.height="100%",o.style.border="0",o.loading="lazy",o.referrerPolicy="no-referrer-when-downgrade",o.title="Bản đồ Tiệm Bánh DAN",n.innerHTML="",n.appendChild(o)}else n&&(n.innerHTML=`
            <div class="w-full h-full bg-surface flex flex-col items-center justify-center gap-3 text-text/40">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-sm font-medium">Chưa có bản đồ</p>
                <p class="text-xs px-6 text-center">Thêm Google Maps Embed URL trong Admin > Liên Hệ & Bản Đồ</p>
            </div>`);if(a){const o=i(m);a.href=o,o==="#"&&(a.style.opacity="0.4")}if(s){const o=i(m);s.href=o,o==="#"&&(s.style.opacity="0.4")}c&&(c.textContent=d(r.contact.address)||"Chưa có địa chỉ — Nhập trong Admin")},T=()=>{const e=document.getElementById("gallery-grid"),t=document.getElementById("gallery-instagram-link");if(t){const n=r.contact.instagramUrl;n&&n!=="#"?(t.href=n,t.textContent="Xem Instagram @tiembanhdan"):(t.href="#",t.textContent="Xem Thêm Hình Ảnh")}if(e){const n=r.gallery.images.slice(0,6);e.innerHTML=n.map((a,s)=>{const c=s%3===0?"row-span-2":"row-span-1",l=s%4===0?"md:col-span-2":"md:col-span-1",m=i(a);return`
            <div class="relative group overflow-hidden rounded-3xl ${c} ${l} shadow-vintage hover:shadow-2xl transition-all duration-700 cursor-pointer">
                <img src="${m}" 
                     loading="lazy"
                     class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 filter sepia-[0.2] group-hover:sepia-0" 
                     alt="Hình ảnh Tiệm Bánh DAN ${s+1}">
                <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 backdrop-blur-[2px]">
                    <p class="text-white font-serif italic text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Sweet Memories
                    </p>
                </div>
            </div>
        `}).join("")}},S=()=>{const e=document.getElementById("contact-address"),t=document.getElementById("contact-phone"),n=document.getElementById("contact-hours-list"),a=document.getElementById("footer-facebook"),s=document.getElementById("footer-instagram"),c=document.getElementById("footer-zalo"),l=document.getElementById("footer-maps-link");if(e&&(r.contact.address?(e.textContent=d(r.contact.address),e.style.opacity="1"):(e.textContent="Chưa có địa chỉ — Cập nhật trong Admin",e.style.opacity="0.5")),t)if(r.contact.phone){const o=`tel:${r.contact.phone.replace(/\s/g,"")}`;t.innerHTML=`<a href="${i(o)}" class="hover:text-accent transition-colors">${d(r.contact.phone)}</a>`}else t.textContent="Chưa có SĐT — Cập nhật trong Admin",t.style.opacity="0.5";if(n){const o=Array.isArray(r.contact.hours)?r.contact.hours:[r.contact.hours||""];o.length>0&&o[0]?n.innerHTML=o.map(p=>`<li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${d(p)}
                </li>`).join(""):n.innerHTML='<li class="opacity-50 italic">Chưa có giờ — Cập nhật trong Admin</li>'}a&&(a.href=i(r.contact.facebookUrl)||"#"),s&&(s.href=i(r.contact.instagramUrl)||"#"),c&&(c.href=i(r.contact.zaloUrl)||"#");const m=document.getElementById("footer-zalo-cta");m&&(m.href=i(r.contact.zaloUrl)||"#"),l&&(l.href=i(r.contact.googleMapsUrl)||"#")};document.addEventListener("DOMContentLoaded",()=>{L(),I(),C(),$(),b(),B(),H(),T(),S();const e=new IntersectionObserver(t=>{t.forEach(n=>{n.isIntersecting&&(n.target.classList.add("animate-fade-in-up"),e.unobserve(n.target))})},{threshold:.1});document.querySelectorAll("section").forEach(t=>{e.observe(t)})});const v=(e="/assets/img1.png")=>{try{document.querySelectorAll("img").forEach(t=>{t.dataset.fallbackBound||(t.addEventListener("error",()=>{(!t.src||t.src===""||t.naturalWidth===0)&&(t.src=e)}),t.dataset.fallbackBound="1")})}catch{}};document.addEventListener("DOMContentLoaded",()=>v());setTimeout(()=>v(),600);
