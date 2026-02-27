import{i as h}from"./data-INXpcub8.js";const m=t=>String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),c=t=>{if(!t)return"#";const e=t.trim();if(e.startsWith("/")||e.startsWith("data:image/"))return e;try{const n=new URL(e,window.location.origin);return["http:","https:","tel:","mailto:"].includes(n.protocol)?n.href:"#"}catch{return console.warn("Blocked unsafe URL:",t),"#"}},I=t=>{try{const e=new URL(t,window.location.origin);return e.protocol==="https:"&&(e.hostname.includes("google.com")||e.hostname.includes("maps.app.goo.gl"))}catch{return!1}},C=async()=>{try{const t=await fetch("/.netlify/functions/site_data_get");if(t.ok){const e=await t.json();if(e&&e.data&&typeof e.data=="object"){const n=e.data;return n.hero||(n.hero=JSON.parse(JSON.stringify(h.hero))),n.menu||(n.menu=JSON.parse(JSON.stringify(h.menu))),n.contact||(n.contact=JSON.parse(JSON.stringify(h.contact))),n.gallery||(n.gallery=JSON.parse(JSON.stringify(h.gallery))),n.menu.items&&n.menu.items.forEach(o=>{o.category==="món mặn"&&(o.category="bánh ngọt")}),((o,l)=>{for(const i in l)(o[i]===void 0||o[i]===null||o[i]==="")&&(o[i]=l[i])})(n.contact,h.contact),(!n.hero.backgroundImages||n.hero.backgroundImages.length===0)&&(n.hero.backgroundImages=h.hero.backgroundImages),n}}}catch(t){console.warn("Failed to load data from server, using default:",t)}return h};let r=h;const x=()=>{const t=r.contact.zaloUrl,e=r.contact.phone;return t&&t!=="#"?t:e?`tel:${e.replace(/\s/g,"")}`:"#"},b=()=>{const t=r.contact.zaloUrl;return t&&t!=="#"?"💬 Nhắn Zalo Đặt Món":"📞 Gọi Đặt Món"},v=()=>{const t=r.contact.phone;return t?`tel:${t.replace(/\s/g,"")}`:"#"},M=()=>{const t=document.getElementById("hero-stats");if(!t)return;const e=r.contact.googleRating,n=r.contact.googleReviewCount;t.innerHTML=`
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
            <span class="text-sm text-text/60">Google${n?` (${n})`:""}</span>
        </div>`:""}
    `},$=()=>{const t=document.getElementById("hero-img-1"),e=document.getElementById("hero-img-2"),n=document.getElementById("hero-img-mobile");if(r.hero&&r.hero.backgroundImages){const a=r.hero.backgroundImages;t&&a[0]&&(t.src=c(a[0].src)),e&&a[1]&&(e.src=c(a[1].src)),n&&a[0]&&(n.src=c(a[0].src))}},y=t=>!(!t||t==="#"||t.startsWith("tel:")||t.startsWith("mailto:")),B=()=>{const t=document.getElementById("hero-cta-container");if(!t)return;const e=x(),n=b(),a=v(),o=c(e),l=c(a),i=y(o);t.innerHTML=`
        <a href="#menu"
            class="px-8 py-4 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-vintage hover:bg-secondary transition-all transform hover:-translate-y-1 text-center">
            Xem Thực Đơn
        </a>
        <a href="${o}" ${i?'target="_blank" rel="noopener noreferrer"':""}
            class="px-8 py-4 bg-accent text-white rounded-full font-semibold shadow-lg hover:bg-accent/80 transition-all transform hover:-translate-y-1 text-center flex items-center justify-center gap-2">
            ${n}
        </a>
        <a href="${l}"
            class="hidden sm:flex px-6 py-4 bg-white border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 items-center gap-2 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            ${r.contact.phone||"Gọi ngay"}
        </a>
    `},L=[{id:null,name:"Tất Cả"},{id:"bánh sinh nhật",name:"🎂 Bánh Sinh Nhật"},{id:"đồ uống",name:"☕ Đồ Uống"},{id:"bánh ngọt",name:"🍰 Bánh Ngọt"}],H=()=>{const t=document.getElementById("category-filters");t&&(t.innerHTML=L.map(e=>`
        <button class="filter-btn px-8 py-2 rounded-full ${e.id===null?"bg-primary text-white shadow-lg":"bg-white text-text border border-primary/10"} font-medium transition-all"
                data-category="${e.id??""}">
            ${e.name}
        </button>
    `).join(""),t.querySelectorAll(".filter-btn").forEach(e=>{e.addEventListener("click",()=>{t.querySelectorAll(".filter-btn").forEach(n=>{n.classList.remove("bg-primary","text-white","shadow-lg"),n.classList.add("bg-white","text-text","border","border-primary/10")}),e.classList.add("bg-primary","text-white","shadow-lg"),e.classList.remove("bg-white","text-text","border","border-primary/10"),w(e.dataset.category||null)})}))},w=(t=null)=>{const e=document.getElementById("menu-grid");if(!e)return;const n=t?r.menu.items.filter(d=>d.category===t):r.menu.items,a=x(),o=c(a),i=y(o)?'target="_blank" rel="noopener noreferrer"':"";e.innerHTML=n.map((d,s)=>{const f=m(d.name),p=m(d.description),g=m(d.price),u=m(d.tag),k=c(d.image);return`
            <div class="group bg-white rounded-[2rem] p-6 shadow-vintage hover:shadow-2xl transition-all duration-500 border border-primary/5 flex flex-col h-full animate-fade-in-up relative" style="animation-delay: ${s*100}ms">
                <div class="relative overflow-hidden rounded-[1.5rem] aspect-[4/5] mb-6">
                    <img src="${k}" alt="${f}" loading="lazy"
                         class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000">
                    
                    ${d.tag?`
                    <div class="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-badge z-10 uppercase tracking-[0.1em] border border-white/20">
                        ${u}
                    </div>`:""}
                    
                    <!-- Quick Order Overlay -->
                    <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <a href="${o}" ${i}
                           class="bg-white text-primary px-8 py-3 rounded-xl font-bold text-sm transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-accent hover:text-white cursor-pointer">
                            Đặt Món Ngay
                        </a>
                    </div>
                </div>
                
                <div class="flex-grow flex flex-col items-center text-center">
                    <h3 class="font-display text-2xl font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300 italic">${f}</h3>
                    <p class="text-text/60 text-sm mb-4 leading-relaxed font-light">${p}</p>
                    
                    <div class="mt-auto w-full pt-4 border-t border-primary/5 flex items-center justify-between">
                        <span class="text-accent font-serif italic text-lg opacity-40">Handmade</span>
                        <span class="text-primary font-bold text-xl drop-shadow-sm">${g}</span>
                    </div>

                    <!-- CTA Đặt Món (always visible below price) -->
                    <a href="${o}" ${i}
                       class="mt-4 w-full block text-center py-3 bg-primary/5 hover:bg-accent hover:text-white text-primary font-semibold rounded-xl border border-primary/10 hover:border-transparent transition-all duration-300 text-sm cursor-pointer">
                        Đặt Món
                    </a>
                </div>
            </div>
        `}).join("")},T=()=>{const t=document.getElementById("menu-section-cta");if(!t)return;const e=c(x()),n=b();t.href=e,y(e)?(t.setAttribute("target","_blank"),t.setAttribute("rel","noopener noreferrer")):(t.removeAttribute("target"),t.removeAttribute("rel")),t.textContent=n},A=()=>{const t=document.getElementById("google-rating-summary"),e=document.getElementById("reviews-container"),n=document.getElementById("google-map-iframe"),a=document.getElementById("google-maps-link"),o=document.getElementById("get-directions-btn"),l=document.getElementById("display-address"),i=r.contact.googleRating,d=r.contact.googleMapsUrl||"#";if(t)if(i){const s=Math.floor(i),f=i-s>=.5;let p="";for(let g=0;g<s;g++)p+='<span class="text-yellow-400">★</span>';f&&(p+='<span class="text-yellow-300">★</span>');for(let g=s+(f?1:0);g<5;g++)p+='<span class="text-gray-300">★</span>';t.innerHTML=`
                <div class="flex items-center gap-4 flex-wrap">
                    <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                            <span class="text-5xl font-bold text-text">${i}</span>
                            <div class="flex flex-col gap-1">
                                <div class="flex text-xl leading-none">${p}</div>
                                <span class="text-xs text-text/50 uppercase tracking-wider">Google Reviews</span>
                            </div>
                        </div>
                        ${r.contact.googleReviewCount?`
                        <span class="text-sm text-text/60 mt-1">${r.contact.googleReviewCount} đánh giá trên Google</span>`:""}
                    </div>
                </div>
            `}else t.innerHTML='<p class="text-sm text-text/40 italic">Chưa có đánh giá — Nhập trong Admin &gt; Liên Hệ</p>';if(e&&r.contact.reviews&&r.contact.reviews.length>0?e.innerHTML=r.contact.reviews.slice(0,3).map(s=>{const f=m(s.name),p=m(s.text),g=m(s.date),u=Math.max(1,Math.min(5,parseInt(s.rating,10)||0));return`
                <div class="bg-surface/50 p-6 rounded-2xl border border-primary/5 hover:border-accent/20 transition-colors">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h4 class="font-bold text-text">${f}</h4>
                            <div class="flex text-yellow-400 text-sm mt-0.5">
                                ${"★".repeat(u)}${'<span class="text-gray-300">★</span>'.repeat(5-u)}
                            </div>
                        </div>
                        <span class="text-[10px] text-text/40 uppercase tracking-wider">${g}</span>
                    </div>
                    <p class="text-text/70 text-sm italic font-light">"${p}"</p>
                </div>
            `}).join(""):e&&(e.innerHTML='<p class="text-sm text-text/40 italic py-4">Chưa có review — Thêm trong Admin &gt; Liên Hệ &amp; Google Reviews</p>'),n&&r.contact.mapEmbed&&I(r.contact.mapEmbed)){const s=document.createElement("iframe");s.src=c(r.contact.mapEmbed),s.width="100%",s.height="100%",s.style.border="0",s.loading="lazy",s.referrerPolicy="no-referrer-when-downgrade",s.title="Bản đồ Tiệm Bánh DAN",n.innerHTML="",n.appendChild(s)}else n&&(n.innerHTML=`
            <div class="w-full h-full bg-surface flex flex-col items-center justify-center gap-3 text-text/40">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-sm font-medium">Chưa có bản đồ</p>
                <p class="text-xs px-6 text-center">Thêm Google Maps Embed URL trong Admin > Liên Hệ & Bản Đồ</p>
            </div>`);if(a){const s=c(d);a.href=s,s==="#"&&(a.style.opacity="0.4")}if(o){const s=c(d);o.href=s,s==="#"&&(o.style.opacity="0.4")}l&&(l.textContent=m(r.contact.address)||"Chưa có địa chỉ — Nhập trong Admin")},N=()=>{const t=document.getElementById("gallery-grid"),e=document.getElementById("gallery-instagram-link"),n=document.getElementById("gallery-more-cta");if(e){const a=r.contact.instagramUrl;if(a&&a!=="#"){e.href=a;const o=Array.from(e.childNodes).filter(l=>l.nodeType===Node.TEXT_NODE);o.length>0&&(o[o.length-1].textContent=" Xem Instagram @tiembanhdan"),n&&(n.href=a)}else{e.href="#";const o=Array.from(e.childNodes).filter(l=>l.nodeType===Node.TEXT_NODE);o.length>0&&(o[o.length-1].textContent=" Xem Thêm Hình Ảnh")}}if(t){const a=r.gallery.images.slice(0,6);t.innerHTML=a.map((o,l)=>{const i=l%3===0?"row-span-2":"row-span-1",d=l%4===0?"md:col-span-2":"md:col-span-1",s=c(o);return`
            <div class="relative group overflow-hidden rounded-3xl ${i} ${d} shadow-vintage hover:shadow-2xl transition-all duration-700 cursor-pointer">
                <img src="${s}" 
                     loading="lazy"
                     class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 filter sepia-[0.2] group-hover:sepia-0" 
                     alt="Hình ảnh Tiệm Bánh DAN ${l+1}">
                <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 backdrop-blur-[2px]">
                    <p class="text-white font-serif italic text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Sweet Memories
                    </p>
                </div>
            </div>
        `}).join("")}},S=()=>{const t=document.getElementById("contact-address"),e=document.getElementById("contact-phone"),n=document.getElementById("contact-hours-list"),a=document.getElementById("footer-facebook"),o=document.getElementById("footer-instagram"),l=document.getElementById("footer-zalo"),i=document.getElementById("footer-maps-link");if(t&&(r.contact.address?(t.textContent=m(r.contact.address),t.style.opacity="1"):(t.textContent="Chưa có địa chỉ — Cập nhật trong Admin",t.style.opacity="0.5")),e)if(r.contact.phone){const s=`tel:${r.contact.phone.replace(/\s/g,"")}`;e.innerHTML=`<a href="${c(s)}" class="hover:text-accent transition-colors">${m(r.contact.phone)}</a>`}else e.textContent="Chưa có SĐT — Cập nhật trong Admin",e.style.opacity="0.5";if(n){const s=Array.isArray(r.contact.hours)?r.contact.hours:[r.contact.hours||""];s.length>0&&s[0]?n.innerHTML=s.map(f=>`<li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${m(f)}
                </li>`).join(""):n.innerHTML='<li class="opacity-50 italic">Chưa có giờ — Cập nhật trong Admin</li>'}a&&(a.href=c(r.contact.facebookUrl)||"#"),o&&(o.href=c(r.contact.instagramUrl)||"#"),l&&(l.href=c(r.contact.zaloUrl)||"#");const d=document.getElementById("footer-zalo-cta");d&&(d.href=c(r.contact.zaloUrl)||"#"),i&&(i.href=c(r.contact.googleMapsUrl)||"#")};document.addEventListener("DOMContentLoaded",async()=>{r=await C(),$(),M(),B(),H(),w(),T(),A(),N(),S();const t=document.getElementById("mobile-cta-zalo"),e=document.getElementById("mobile-cta-call");if(t){const a=c(x());t.href=a,y(a)&&(t.setAttribute("target","_blank"),t.setAttribute("rel","noopener noreferrer"))}e&&(e.href=c(v())),window.dispatchEvent(new CustomEvent("app:rendered"));const n=new IntersectionObserver(a=>{a.forEach(o=>{o.isIntersecting&&(o.target.classList.add("animate-fade-in-up"),n.unobserve(o.target))})},{threshold:.1});document.querySelectorAll("section").forEach(a=>{n.observe(a)})});const E=(t="/assets/img1.png")=>{try{document.querySelectorAll("img").forEach(e=>{e.dataset.fallbackBound||(e.addEventListener("error",()=>{(!e.src||e.src===""||e.naturalWidth===0)&&(e.src=t)}),e.dataset.fallbackBound="1")})}catch{}};document.addEventListener("DOMContentLoaded",()=>E());setTimeout(()=>E(),600);
