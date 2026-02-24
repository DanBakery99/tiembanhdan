import{i as l}from"./data-XfQZq-iO.js";const m=()=>{var t,o,a;const e=localStorage.getItem("siteData");if(!e)return l;try{const r=JSON.parse(e),i=(o=(t=r.menu)==null?void 0:t.items)==null?void 0:o.some(d=>d.category==="món mặn"),s=!((a=r.contact)!=null&&a.googleRating);return i||s?(console.log("[Tiệm Bánh DAN] Dữ liệu cũ phát hiện, tự động cập nhật..."),localStorage.removeItem("siteData"),l):r}catch{return localStorage.removeItem("siteData"),l}},n=m(),g=[{id:null,name:"Tất Cả"},{id:"bánh sinh nhật",name:"🎂 Bánh Sinh Nhật"},{id:"đồ uống",name:"☕ Đồ Uống"},{id:"bánh ngọt",name:"🍰 Bánh Ngọt"}],p=()=>{const e=document.getElementById("category-filters");e&&(e.innerHTML=g.map(t=>`
        <button class="filter-btn px-8 py-2 rounded-full ${t.id===null?"bg-primary text-white shadow-lg":"bg-white text-text border border-primary/10"} font-medium transition-all"
                data-category="${t.id??""}">
            ${t.name}
        </button>
    `).join(""),e.querySelectorAll(".filter-btn").forEach(t=>{t.addEventListener("click",()=>{e.querySelectorAll(".filter-btn").forEach(o=>{o.classList.remove("bg-primary","text-white","shadow-lg"),o.classList.add("bg-white","text-text","border","border-primary/10")}),t.classList.add("bg-primary","text-white","shadow-lg"),t.classList.remove("bg-white","text-text","border","border-primary/10"),c(t.dataset.category||null)})}))},c=(e=null)=>{const t=document.getElementById("menu-grid");if(t){const o=e?n.menu.items.filter(a=>a.category===e):n.menu.items;t.innerHTML=o.map((a,r)=>`
            <div class="group bg-white rounded-[2rem] p-6 shadow-vintage hover:shadow-2xl transition-all duration-500 border border-primary/5 flex flex-col h-full animate-fade-in-up relative" style="animation-delay: ${r*100}ms">
                <div class="relative overflow-hidden rounded-[1.5rem] aspect-[4/5] mb-6">
                    <img src="${a.image}" alt="${a.name}" 
                         class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000">
                    
                    ${a.tag?`
                    <div class="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-badge z-10 uppercase tracking-[0.1em] border border-white/20">
                        ${a.tag}
                    </div>`:""}
                    
                    <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <button class="bg-white text-primary px-8 py-3 rounded-xl font-bold text-sm transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-accent hover:text-white">
                            Thêm Vào Giỏ
                        </button>
                    </div>
                </div>
                
                <div class="flex-grow flex flex-col items-center text-center">
                    <h3 class="font-display text-2xl font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300 italic">${a.name}</h3>
                    <p class="text-text/60 text-sm mb-6 leading-relaxed font-light">${a.description}</p>
                    
                    <div class="mt-auto w-full pt-6 border-t border-primary/5 flex items-center justify-between">
                        <span class="text-accent font-serif italic text-lg opacity-40">Handmade</span>
                        <span class="text-primary font-bold text-xl drop-shadow-sm">${a.price}</span>
                    </div>
                </div>
            </div>
        `).join("")}},u=()=>{const e=document.getElementById("google-rating-summary"),t=document.getElementById("reviews-container"),o=document.getElementById("google-map-iframe"),a=document.getElementById("google-maps-link"),r=document.getElementById("get-directions-btn"),i=document.getElementById("display-address");if(e){const s="★".repeat(Math.floor(n.contact.googleRating))+"☆".repeat(5-Math.floor(n.contact.googleRating));e.innerHTML=`
            <div class="flex flex-col">
                <div class="flex items-center gap-1 text-yellow-500 text-2xl">
                    ${s}
                </div>
                <div class="text-text/60 text-sm mt-1">
                    <span class="font-bold text-text text-lg">${n.contact.googleRating}</span> 
                    trên Google (${n.contact.googleReviewCount} đánh giá)
                </div>
            </div>
        `}t&&n.contact.reviews&&(t.innerHTML=n.contact.reviews.map(s=>`
            <div class="bg-surface/50 p-6 rounded-2xl border border-primary/5 hover:border-accent/20 transition-colors">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h4 class="font-bold text-text">${s.name}</h4>
                        <div class="flex text-yellow-500 text-xs mt-0.5">
                            ${"★".repeat(s.rating)}${"☆".repeat(5-s.rating)}
                        </div>
                    </div>
                    <span class="text-[10px] text-text/40 uppercase tracking-wider">${s.date}</span>
                </div>
                <p class="text-text/70 text-sm italic font-light">"${s.text}"</p>
            </div>
        `).join("")),o&&(o.innerHTML=`<iframe src="${n.contact.mapEmbed}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`),a&&(a.href=n.contact.googleMapsUrl),r&&(r.href=n.contact.googleMapsUrl),i&&(i.textContent=n.contact.address)},f=()=>{const e=document.getElementById("gallery-grid");e&&(e.innerHTML=n.gallery.images.map((t,o)=>{const a=o%3===0?"row-span-2":"row-span-1",r=o%4===0?"md:col-span-2":"md:col-span-1";return`
            <div class="relative group overflow-hidden rounded-3xl ${a} ${r} shadow-vintage hover:shadow-2xl transition-all duration-700">
                <img src="${t}" 
                     class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 filter sepia-[0.2] group-hover:sepia-0" 
                     alt="Gallery Image">
                <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 backdrop-blur-[2px]">
                    <p class="text-white font-serif italic text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Sweet Memories
                    </p>
                </div>
            </div>
        `}).join(""))},h=()=>{const e=document.getElementById("contact-address"),t=document.getElementById("contact-phone"),o=document.getElementById("contact-hours-list");if(e&&(e.textContent=n.contact.address),t&&(t.textContent=n.contact.phone),o){const a=Array.isArray(n.contact.hours)?n.contact.hours:[n.contact.hours||""];o.innerHTML=a.map(r=>`<li>${r}</li>`).join("")}};document.addEventListener("DOMContentLoaded",()=>{p(),c(),u(),f(),h();const e=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&(o.target.classList.add("animate-fade-in-up"),e.unobserve(o.target))})},{threshold:.1});document.querySelectorAll("section").forEach(t=>{e.observe(t)})});
