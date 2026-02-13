import{i as s}from"./data-B5owOQz6.js";const i=()=>{const e=localStorage.getItem("siteData");return e?JSON.parse(e):s},r=i(),l=()=>{const e=document.getElementById("chef-image"),t=document.getElementById("chef-story-content");e&&(e.src=r.about.image),t&&(t.innerHTML=r.about.paragraphs.map(o=>`<p>${o}</p>`).join(""))},c=()=>{const e=document.getElementById("menu-grid");e&&(e.innerHTML=r.menu.items.map((t,o)=>`
            <div class="group bg-white rounded-2xl p-4 shadow-card hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col h-full animate-fade-in-up" years-delay="${o*100}">
                <div class="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                    <img src="${t.image}" alt="${t.name}" 
                         class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                    ${t.tag?`
                    <div class="absolute top-3 right-3 bg-${t.tagColor||"primary"} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 uppercase tracking-wide">
                        ${t.tag}
                    </div>`:""}
                    <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button class="bg-white text-primary px-4 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-accent hover:text-white">
                            Chi Tiết
                        </button>
                    </div>
                </div>
                
                <div class="flex-grow flex flex-col justify-between text-center">
                    <div>
                        <h3 class="font-display text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">${t.name}</h3>
                        <p class="text-text/60 text-sm mb-4 line-clamp-2">${t.description}</p>
                    </div>
                    <div class="mt-auto pt-4 border-t border-gray-100">
                        <span class="text-primary font-bold text-lg hover:text-accent transition-colors cursor-pointer">${t.price}</span>
                    </div>
                </div>
            </div>
        `).join(""))},d=()=>{const e=document.getElementById("gallery-grid");e&&(e.innerHTML=r.gallery.images.map((t,o)=>{const n=o%3===0?"row-span-2":"row-span-1",a=o%4===0?"md:col-span-2":"md:col-span-1";return`
            <div class="relative group overflow-hidden rounded-2xl ${n} ${a} shadow-md hover:shadow-xl transition-all duration-300">
                <img src="${t}" 
                     class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100" 
                     alt="Gallery Image">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p class="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Memorable Moments
                    </p>
                </div>
            </div>
        `}).join(""))},m=()=>{const e=document.getElementById("contact-address"),t=document.getElementById("contact-phone"),o=document.getElementById("contact-hours-list"),n=document.getElementById("map-container");e&&(e.textContent=r.contact.address),t&&(t.textContent=r.contact.phone),o&&(o.innerHTML=r.contact.hours.map(a=>`<li>${a}</li>`).join("")),n&&(n.innerHTML=`<iframe src="${r.contact.mapEmbed}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`)};document.addEventListener("DOMContentLoaded",()=>{l(),c(),d(),m();const e=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&(o.target.classList.add("animate-fade-in-up"),e.unobserve(o.target))})},{threshold:.1});document.querySelectorAll("section").forEach(t=>{e.observe(t)})});
