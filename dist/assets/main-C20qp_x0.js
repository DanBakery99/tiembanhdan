import{i as f}from"./data-INXpcub8.js";const d=e=>String(e??"").replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),c=e=>{if(!e)return"#";const t=e.trim();if(t.startsWith("/")||t.startsWith("data:image/"))return t;try{const n=new URL(t,window.location.origin);return["http:","https:","tel:","mailto:"].includes(n.protocol)?n.href:"#"}catch{return console.warn("Blocked unsafe URL:",e),"#"}},w=e=>{try{const t=new URL(e,window.location.origin);return t.protocol==="https:"&&(t.hostname.includes("google.com")||t.hostname.includes("maps.app.goo.gl"))}catch{return!1}},k=async()=>{try{const e=await fetch("/.netlify/functions/site_data_get");if(e.ok){const t=await e.json();if(t&&t.data&&typeof t.data=="object"){const n=t.data;return n.hero||(n.hero=JSON.parse(JSON.stringify(f.hero))),n.menu||(n.menu=JSON.parse(JSON.stringify(f.menu))),n.contact||(n.contact=JSON.parse(JSON.stringify(f.contact))),n.gallery||(n.gallery=JSON.parse(JSON.stringify(f.gallery))),n.menu.items&&n.menu.items.forEach(s=>{s.category==="món mặn"&&(s.category="bánh ngọt")}),((s,l)=>{for(const i in l)(s[i]===void 0||s[i]===null||s[i]==="")&&(s[i]=l[i])})(n.contact,f.contact),(!n.hero.backgroundImages||n.hero.backgroundImages.length===0)&&(n.hero.backgroundImages=f.hero.backgroundImages),n}}}catch(e){console.warn("Failed to load data from server, using default:",e)}return f};let a=f;const u=()=>{const e=a.contact.zaloUrl,t=a.contact.phone;return e&&e!=="#"?e:t?`tel:${t.replace(/\s/g,"")}`:"#"},y=()=>{const e=a.contact.zaloUrl;return e&&e!=="#"?"💬 Nhắn Zalo Đặt Món":"📞 Gọi Đặt Món"},E=()=>{const e=a.contact.phone;return e?`tel:${e.replace(/\s/g,"")}`:"#"},I=()=>{const e=document.getElementById("hero-stats");if(!e)return;const t=a.contact.googleRating,n=a.contact.googleReviewCount;e.innerHTML=`
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
    `},C=()=>{const e=document.getElementById("hero-img-1"),t=document.getElementById("hero-img-2"),n=document.getElementById("hero-img-mobile");if(a.hero&&a.hero.backgroundImages){const o=a.hero.backgroundImages;e&&o[0]&&(e.src=c(o[0].src)),t&&o[1]&&(t.src=c(o[1].src)),n&&o[0]&&(n.src=c(o[0].src))}},L=()=>{const e=document.getElementById("hero-cta-container");if(!e)return;const t=u(),n=y(),o=E();e.innerHTML=`
        <a href="#menu"
            class="px-8 py-4 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-vintage hover:bg-secondary transition-all transform hover:-translate-y-1 text-center">
            Xem Thực Đơn
        </a>
        <a href="${c(t)}" target="_blank" rel="noopener"
            class="px-8 py-4 bg-accent text-white rounded-full font-semibold shadow-lg hover:bg-accent/80 transition-all transform hover:-translate-y-1 text-center flex items-center justify-center gap-2">
            ${n}
        </a>
        <a href="${c(o)}"
            class="hidden sm:flex px-6 py-4 bg-white border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 items-center gap-2 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            ${a.contact.phone||"Gọi ngay"}
        </a>
    `},M=[{id:null,name:"Tất Cả"},{id:"bánh sinh nhật",name:"🎂 Bánh Sinh Nhật"},{id:"đồ uống",name:"☕ Đồ Uống"},{id:"bánh ngọt",name:"🍰 Bánh Ngọt"}],$=()=>{const e=document.getElementById("category-filters");e&&(e.innerHTML=M.map(t=>`
        <button class="filter-btn px-8 py-2 rounded-full ${t.id===null?"bg-primary text-white shadow-lg":"bg-white text-text border border-primary/10"} font-medium transition-all"
                data-category="${t.id??""}">
            ${t.name}
        </button>
    `).join(""),e.querySelectorAll(".filter-btn").forEach(t=>{t.addEventListener("click",()=>{e.querySelectorAll(".filter-btn").forEach(n=>{n.classList.remove("bg-primary","text-white","shadow-lg"),n.classList.add("bg-white","text-text","border","border-primary/10")}),t.classList.add("bg-primary","text-white","shadow-lg"),t.classList.remove("bg-white","text-text","border","border-primary/10"),b(t.dataset.category||null)})}))},b=(e=null)=>{const t=document.getElementById("menu-grid");if(!t)return;const n=e?a.menu.items.filter(s=>s.category===e):a.menu.items,o=u();t.innerHTML=n.map((s,l)=>{const i=d(s.name),m=d(s.description),r=d(s.price),g=d(s.tag),p=c(s.image);return`
            <div class="group bg-white rounded-[2rem] p-6 shadow-vintage hover:shadow-2xl transition-all duration-500 border border-primary/5 flex flex-col h-full animate-fade-in-up relative" style="animation-delay: ${l*100}ms">
                <div class="relative overflow-hidden rounded-[1.5rem] aspect-[4/5] mb-6">
                    <img src="${p}" alt="${i}" loading="lazy"
                         class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000">
                    
                    ${s.tag?`
                    <div class="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-badge z-10 uppercase tracking-[0.1em] border border-white/20">
                        ${g}
                    </div>`:""}
                    
                    <!-- Quick Order Overlay -->
                    <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <a href="${c(o)}" target="_blank" rel="noopener"
                           class="bg-white text-primary px-8 py-3 rounded-xl font-bold text-sm transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-accent hover:text-white cursor-pointer">
                            Đặt Món Ngay
                        </a>
                    </div>
                </div>
                
                <div class="flex-grow flex flex-col items-center text-center">
                    <h3 class="font-display text-2xl font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300 italic">${i}</h3>
                    <p class="text-text/60 text-sm mb-4 leading-relaxed font-light">${m}</p>
                    
                    <div class="mt-auto w-full pt-4 border-t border-primary/5 flex items-center justify-between">
                        <span class="text-accent font-serif italic text-lg opacity-40">Handmade</span>
                        <span class="text-primary font-bold text-xl drop-shadow-sm">${r}</span>
                    </div>

                    <!-- CTA Đặt Món (always visible below price) -->
                    <a href="${c(o)}" target="_blank" rel="noopener"
                       class="mt-4 w-full block text-center py-3 bg-primary/5 hover:bg-accent hover:text-white text-primary font-semibold rounded-xl border border-primary/10 hover:border-transparent transition-all duration-300 text-sm cursor-pointer">
                        Đặt Món
                    </a>
                </div>
            </div>
        `}).join("")},B=()=>{const e=document.getElementById("menu-section-cta");if(!e)return;const t=c(u()),n=y();e.href=t,e.setAttribute("target","_blank"),e.setAttribute("rel","noopener"),e.textContent=n},H=()=>{const e=document.getElementById("google-rating-summary"),t=document.getElementById("reviews-container"),n=document.getElementById("google-map-iframe"),o=document.getElementById("google-maps-link"),s=document.getElementById("get-directions-btn"),l=document.getElementById("display-address"),i=a.contact.googleRating,m=a.contact.googleMapsUrl||"#";if(e)if(i){const r=Math.floor(i),g=i-r>=.5;let p="";for(let h=0;h<r;h++)p+='<span class="text-yellow-400">★</span>';g&&(p+='<span class="text-yellow-300">★</span>');for(let h=r+(g?1:0);h<5;h++)p+='<span class="text-gray-300">★</span>';e.innerHTML=`
                <div class="flex items-center gap-4 flex-wrap">
                    <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                            <span class="text-5xl font-bold text-text">${i}</span>
                            <div class="flex flex-col gap-1">
                                <div class="flex text-xl leading-none">${p}</div>
                                <span class="text-xs text-text/50 uppercase tracking-wider">Google Reviews</span>
                            </div>
                        </div>
                        ${a.contact.googleReviewCount?`
                        <span class="text-sm text-text/60 mt-1">${a.contact.googleReviewCount} đánh giá trên Google</span>`:""}
                    </div>
                </div>
            `}else e.innerHTML='<p class="text-sm text-text/40 italic">Chưa có đánh giá — Nhập trong Admin &gt; Liên Hệ</p>';if(t&&a.contact.reviews&&a.contact.reviews.length>0?t.innerHTML=a.contact.reviews.slice(0,3).map(r=>{const g=d(r.name),p=d(r.text),h=d(r.date),x=Math.max(1,Math.min(5,parseInt(r.rating,10)||0));return`
                <div class="bg-surface/50 p-6 rounded-2xl border border-primary/5 hover:border-accent/20 transition-colors">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h4 class="font-bold text-text">${g}</h4>
                            <div class="flex text-yellow-400 text-sm mt-0.5">
                                ${"★".repeat(x)}${'<span class="text-gray-300">★</span>'.repeat(5-x)}
                            </div>
                        </div>
                        <span class="text-[10px] text-text/40 uppercase tracking-wider">${h}</span>
                    </div>
                    <p class="text-text/70 text-sm italic font-light">"${p}"</p>
                </div>
            `}).join(""):t&&(t.innerHTML='<p class="text-sm text-text/40 italic py-4">Chưa có review — Thêm trong Admin &gt; Liên Hệ &amp; Google Reviews</p>'),n&&a.contact.mapEmbed&&w(a.contact.mapEmbed)){const r=document.createElement("iframe");r.src=c(a.contact.mapEmbed),r.width="100%",r.height="100%",r.style.border="0",r.loading="lazy",r.referrerPolicy="no-referrer-when-downgrade",r.title="Bản đồ Tiệm Bánh DAN",n.innerHTML="",n.appendChild(r)}else n&&(n.innerHTML=`
            <div class="w-full h-full bg-surface flex flex-col items-center justify-center gap-3 text-text/40">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-sm font-medium">Chưa có bản đồ</p>
                <p class="text-xs px-6 text-center">Thêm Google Maps Embed URL trong Admin > Liên Hệ & Bản Đồ</p>
            </div>`);if(o){const r=c(m);o.href=r,r==="#"&&(o.style.opacity="0.4")}if(s){const r=c(m);s.href=r,r==="#"&&(s.style.opacity="0.4")}l&&(l.textContent=d(a.contact.address)||"Chưa có địa chỉ — Nhập trong Admin")},T=()=>{const e=document.getElementById("gallery-grid"),t=document.getElementById("gallery-instagram-link"),n=document.getElementById("gallery-more-cta");if(t){const o=a.contact.instagramUrl;o&&o!=="#"?(t.href=o,t.textContent="Xem Instagram @tiembanhdan",n&&(n.href=o)):(t.href="#",t.textContent="Xem Thêm Hình Ảnh")}if(e){const o=a.gallery.images.slice(0,6);e.innerHTML=o.map((s,l)=>{const i=l%3===0?"row-span-2":"row-span-1",m=l%4===0?"md:col-span-2":"md:col-span-1",r=c(s);return`
            <div class="relative group overflow-hidden rounded-3xl ${i} ${m} shadow-vintage hover:shadow-2xl transition-all duration-700 cursor-pointer">
                <img src="${r}" 
                     loading="lazy"
                     class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 filter sepia-[0.2] group-hover:sepia-0" 
                     alt="Hình ảnh Tiệm Bánh DAN ${l+1}">
                <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 backdrop-blur-[2px]">
                    <p class="text-white font-serif italic text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Sweet Memories
                    </p>
                </div>
            </div>
        `}).join("")}},S=()=>{const e=document.getElementById("contact-address"),t=document.getElementById("contact-phone"),n=document.getElementById("contact-hours-list"),o=document.getElementById("footer-facebook"),s=document.getElementById("footer-instagram"),l=document.getElementById("footer-zalo"),i=document.getElementById("footer-maps-link");if(e&&(a.contact.address?(e.textContent=d(a.contact.address),e.style.opacity="1"):(e.textContent="Chưa có địa chỉ — Cập nhật trong Admin",e.style.opacity="0.5")),t)if(a.contact.phone){const r=`tel:${a.contact.phone.replace(/\s/g,"")}`;t.innerHTML=`<a href="${c(r)}" class="hover:text-accent transition-colors">${d(a.contact.phone)}</a>`}else t.textContent="Chưa có SĐT — Cập nhật trong Admin",t.style.opacity="0.5";if(n){const r=Array.isArray(a.contact.hours)?a.contact.hours:[a.contact.hours||""];r.length>0&&r[0]?n.innerHTML=r.map(g=>`<li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${d(g)}
                </li>`).join(""):n.innerHTML='<li class="opacity-50 italic">Chưa có giờ — Cập nhật trong Admin</li>'}o&&(o.href=c(a.contact.facebookUrl)||"#"),s&&(s.href=c(a.contact.instagramUrl)||"#"),l&&(l.href=c(a.contact.zaloUrl)||"#");const m=document.getElementById("footer-zalo-cta");m&&(m.href=c(a.contact.zaloUrl)||"#"),i&&(i.href=c(a.contact.googleMapsUrl)||"#")};document.addEventListener("DOMContentLoaded",async()=>{a=await k(),C(),I(),L(),$(),b(),B(),H(),T(),S();const e=new IntersectionObserver(t=>{t.forEach(n=>{n.isIntersecting&&(n.target.classList.add("animate-fade-in-up"),e.unobserve(n.target))})},{threshold:.1});document.querySelectorAll("section").forEach(t=>{e.observe(t)})});const v=(e="/assets/img1.png")=>{try{document.querySelectorAll("img").forEach(t=>{t.dataset.fallbackBound||(t.addEventListener("error",()=>{(!t.src||t.src===""||t.naturalWidth===0)&&(t.src=e)}),t.dataset.fallbackBound="1")})}catch{}};document.addEventListener("DOMContentLoaded",()=>v());setTimeout(()=>v(),600);
