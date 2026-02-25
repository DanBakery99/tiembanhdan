import{i as y}from"./data-EdnpEie_.js";const i=t=>t==null?"":String(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),s=()=>JSON.parse(JSON.stringify(y)),M=()=>{const t=localStorage.getItem("siteData");if(!t)return s();try{const e=JSON.parse(t);return e.hero||(e.hero=s().hero),e.menu||(e.menu=s().menu),e.gallery||(e.gallery=s().gallery),e.contact||(e.contact=s().contact),e}catch{return s()}};let n=M();const m=t=>new Promise((e,a)=>{const o=new FileReader;o.readAsDataURL(t),o.onload=r=>{const c=new Image;c.src=r.target.result,c.onload=()=>{try{const l=document.createElement("canvas"),b=1600;if(!c.width||!c.height)return a(new Error("Invalid image dimensions"));const v=c.width>b?b/c.width:1;l.width=Math.round(c.width*v),l.height=Math.round(c.height*v),l.getContext("2d").drawImage(c,0,0,l.width,l.height),e(l.toDataURL("image/jpeg",.85))}catch(l){a(l)}},c.onerror=l=>a(l)},o.onerror=r=>a(r)}),$=document.getElementById("login-modal"),D=document.getElementById("admin-dashboard"),T=document.getElementById("login-form"),d=document.getElementById("login-error");let h=0,g=0;const S=5,C=300*1e3;T.addEventListener("submit",t=>{if(t.preventDefault(),Date.now()<g){const a=Math.ceil((g-Date.now())/1e3);d.textContent=`Tạm khóa ${a}s vì nhập sai quá nhiều.`,d.classList.remove("hidden");return}document.getElementById("password").value==="Toobakery0810"?(h=0,g=0,$.classList.add("hidden"),D.classList.remove("hidden"),R()):(h+=1,h>=S?(g=Date.now()+C,d.textContent="Sai mật khẩu quá 5 lần. Vui lòng thử lại sau ít phút."):d.textContent="Mật khẩu không chính xác!",d.classList.remove("hidden"))});document.getElementById("logout-btn").addEventListener("click",()=>{location.reload()});const I=document.querySelectorAll(".tab-btn"),U=document.querySelectorAll(".tab-content"),j=t=>{I.forEach(a=>{const o=!!a.closest("aside");a.dataset.tab===t?(a.classList.remove("text-secondary","text-gray-800","text-gray-500","hover:bg-white","hover:shadow-md","bg-surface","text-gray-900","border","border-primary/10","text-gray-400","border-primary/5"),a.classList.add("bg-amber-100","text-gray-900","border-2","border-primary","shadow-sm")):(a.classList.remove("bg-amber-100","text-gray-900","border-2","border-primary","shadow-sm"),o?a.classList.add("text-gray-800","hover:bg-white","hover:shadow-md"):a.classList.add("bg-surface","text-gray-900","border","border-primary/10"))}),U.forEach(a=>a.classList.add("hidden"));const e=document.getElementById(`tab-${t}`);e&&e.classList.remove("hidden")};I.forEach(t=>{t.addEventListener("click",()=>j(t.dataset.tab))});const R=()=>{E(),p(),u(),H(),A()},E=()=>{n.hero||(n.hero=y.hero),n.hero.backgroundImages||(n.hero.backgroundImages=y.hero.backgroundImages);const t=n.hero.backgroundImages,e=document.getElementById("hero-preview-1"),a=document.getElementById("hero-preview-2"),o=document.getElementById("hero-url-1"),r=document.getElementById("hero-url-2");e&&t[0]&&(e.src=t[0].src),a&&t[1]&&(a.src=t[1].src),o&&t[0]&&(o.value=t[0].src),r&&t[1]&&(r.value=t[1].src)};window.updateHeroImage=(t,e)=>{n.hero.backgroundImages[t]?n.hero.backgroundImages[t].src=e:n.hero.backgroundImages[t]={src:e,label:""},E()};window.uploadHeroImage=async(t,e)=>{if(e.files&&e.files[0])try{const a=await m(e.files[0]);window.updateHeroImage(t,a)}catch(a){alert("Lỗi upload ảnh: "+a.message)}};const p=()=>{const t=document.getElementById("menu-list");t.innerHTML="",n.menu.items.forEach((e,a)=>{const o=document.createElement("div");o.className="bg-surface p-6 rounded-[2rem] flex flex-col md:flex-row gap-6 items-start border border-primary/5 shadow-sm hover:shadow-md transition-all group",o.innerHTML=`
            <div class="w-full md:w-40 h-40 flex-shrink-0 bg-white rounded-2xl overflow-hidden relative border border-primary/5">
                <img src="${i(e.image)}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onclick="document.getElementById('menu-file-${a}').click()">
                    <span class="text-white text-[10px] font-bold uppercase tracking-widest">Đổi Ảnh</span>
                </div>
            </div>
            <div class="flex-1 space-y-4 w-full">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <label class="text-[10px] font-bold text-primary/70 uppercase tracking-tighter ml-1">Tên Món</label>
                        <input type="text" value="${i(e.name)}" placeholder="Tên món" class="w-full px-4 py-2 bg-white border border-primary/5 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-accent outline-none" onchange="updateMenuItem(${a}, 'name', this.value)">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] font-bold text-primary/70 uppercase tracking-tighter ml-1">Giá Tiền</label>
                        <input type="text" value="${i(e.price)}" placeholder="Giá" class="w-full px-4 py-2 bg-white border border-primary/5 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-accent outline-none" onchange="updateMenuItem(${a}, 'price', this.value)">
                    </div>
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-bold text-primary/70 uppercase tracking-tighter ml-1">Mô Tả</label>
                    <input type="text" value="${i(e.description)}" placeholder="Mô tả" class="w-full px-4 py-2 bg-white border border-primary/5 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-accent outline-none" onchange="updateMenuItem(${a}, 'description', this.value)">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                     <div class="md:col-span-2 space-y-1">
                        <label class="text-[10px] font-bold text-primary/70 uppercase tracking-tighter ml-1">URL Hình Ảnh</label>
                        <input type="text" value="${i(e.image)}" placeholder="URL Hình ảnh" class="w-full px-4 py-2 bg-white border border-primary/5 rounded-xl text-[10px] text-gray-500 focus:ring-2 focus:ring-accent outline-none" onchange="updateMenuItem(${a}, 'image', this.value)">
                        <input type="file" id="menu-file-${a}" class="hidden" accept="image/*" onchange="uploadMenuImage(${a}, this)">
                     </div>
                     <div class="space-y-1">
                        <label class="text-[10px] font-bold text-primary/70 uppercase tracking-tighter ml-1">Tag (vd: Best Seller)</label>
                        <input type="text" value="${i(e.tag||"")}" placeholder="Tag" class="w-full px-4 py-2 bg-white border border-primary/5 rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none" onchange="updateMenuItem(${a}, 'tag', this.value)">
                     </div>
                </div>
                <div class="flex items-center justify-between pt-2">
                    <select class="px-4 py-2 bg-white border border-primary/5 rounded-xl text-xs font-bold text-primary focus:ring-2 focus:ring-accent outline-none" onchange="updateMenuItem(${a}, 'category', this.value)">
                        <option value="bánh sinh nhật" ${e.category==="bánh sinh nhật"?"selected":""}>🎂 Bánh Sinh Nhật</option>
                        <option value="đồ uống" ${e.category==="đồ uống"?"selected":""}>☕ Đồ Uống</option>
                        <option value="bánh ngọt" ${e.category==="bánh ngọt"?"selected":""}>🍰 Bánh Ngọt</option>
                    </select>
                    <button onclick="deleteMenuItem(${a})" class="p-2 text-rose-300 hover:text-rose-500 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        `,t.appendChild(o)})};window.updateMenuItem=(t,e,a)=>{n.menu.items[t][e]=a};window.uploadMenuImage=async(t,e)=>{if(e.files&&e.files[0])try{const a=await m(e.files[0]);n.menu.items[t].image=a,p()}catch(a){alert("Lỗi upload ảnh: "+a.message)}};window.deleteMenuItem=t=>{confirm("Bạn có chắc muốn xóa món này?")&&(n.menu.items.splice(t,1),p())};window.addMenuItem=()=>{n.menu.items.push({id:Date.now(),name:"Món Mới",description:"Mô tả món ăn...",price:"Liên hệ",image:"/assets/img1.png",tag:"",tagColor:"primary",category:"bánh ngọt"}),p()};const u=()=>{const t=document.getElementById("gallery-list");t.innerHTML="";const e=document.createElement("div");e.className="flex flex-col items-center justify-center bg-surface border-2 border-dashed border-primary/10 rounded-2xl aspect-square cursor-pointer hover:bg-white hover:border-accent/40 transition-all group",e.onclick=()=>document.getElementById("gallery-upload-input").click(),e.innerHTML=`
        <div class="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        </div>
        <span class="text-xs text-primary/60 font-bold uppercase tracking-widest">Thêm Ảnh</span>
        <input type="file" id="gallery-upload-input" class="hidden" accept="image/*" onchange="uploadGalleryImage(this)">
    `,t.appendChild(e),n.gallery.images.forEach((a,o)=>{const r=document.createElement("div");r.className="relative group aspect-square rounded-2xl overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl transition-all",r.innerHTML=`
            <img src="${i(a)}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div class="flex justify-end">
                    <button onclick="deleteGalleryItem(${o})" class="bg-rose-500 text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <input type="text" value="${i(a)}" class="w-full p-2 text-[9px] bg-white rounded-lg outline-none" onchange="updateGalleryItem(${o}, this.value)">
            </div>
        `,t.appendChild(r)})};window.uploadGalleryImage=async t=>{if(t.files&&t.files[0])try{const e=await m(t.files[0]);n.gallery.images.push(e),u()}catch(e){alert("Lỗi upload ảnh: "+e.message)}};window.deleteGalleryItem=t=>{confirm("Xóa ảnh này?")&&(n.gallery.images.splice(t,1),u())};window.updateGalleryItem=(t,e)=>{n.gallery.images[t]=e,u()};window.addGalleryItem=()=>{const t=prompt("Nhập URL hình ảnh (hoặc dùng nút Upload):");t&&(n.gallery.images.push(t),u())};const H=()=>{document.getElementById("about-title-input").value=n.about.title,document.getElementById("about-image-input").value=n.about.image,document.getElementById("about-content-input").value=n.about.paragraphs.join(`
`),document.getElementById("about-title-input").onchange=e=>n.about.title=e.target.value,document.getElementById("about-image-input").onchange=e=>n.about.image=e.target.value,document.getElementById("about-content-input").onchange=e=>n.about.paragraphs=e.target.value.split(`
`).filter(a=>a.trim()!=="");const t=document.getElementById("about-image-file");t&&(t.onchange=async e=>{if(e.target.files&&e.target.files[0])try{const a=await m(e.target.files[0]);n.about.image=a,document.getElementById("about-image-input").value=a,alert("Đã cập nhật ảnh thành công!")}catch(a){alert("Lỗi: "+a)}})},A=()=>{document.getElementById("contact-address-input").value=n.contact.address||"",document.getElementById("contact-phone-input").value=n.contact.phone||"",document.getElementById("contact-hours-input").value=Array.isArray(n.contact.hours)?n.contact.hours.join(", "):n.contact.hours||"",document.getElementById("contact-map-input").value=n.contact.mapEmbed||"",document.getElementById("contact-google-rating-input").value=n.contact.googleRating||5,document.getElementById("contact-google-count-input").value=n.contact.googleReviewCount||0,document.getElementById("contact-maps-url-input").value=n.contact.googleMapsUrl||"",document.getElementById("contact-zalo-input").value=n.contact.zaloUrl||"",document.getElementById("contact-facebook-input").value=n.contact.facebookUrl||"",document.getElementById("contact-instagram-input").value=n.contact.instagramUrl||"",document.getElementById("contact-address-input").onchange=e=>n.contact.address=e.target.value,document.getElementById("contact-phone-input").onchange=e=>n.contact.phone=e.target.value,document.getElementById("contact-hours-input").onchange=e=>n.contact.hours=e.target.value.split(",").map(a=>a.trim()).filter(a=>a!==""),document.getElementById("contact-map-input").onchange=e=>n.contact.mapEmbed=e.target.value,document.getElementById("contact-google-rating-input").onchange=e=>n.contact.googleRating=parseFloat(e.target.value),document.getElementById("contact-google-count-input").onchange=e=>n.contact.googleReviewCount=parseInt(e.target.value),document.getElementById("contact-maps-url-input").onchange=e=>n.contact.googleMapsUrl=e.target.value,document.getElementById("contact-zalo-input").onchange=e=>n.contact.zaloUrl=e.target.value,document.getElementById("contact-facebook-input").onchange=e=>n.contact.facebookUrl=e.target.value,document.getElementById("contact-instagram-input").onchange=e=>n.contact.instagramUrl=e.target.value;const t=document.getElementById("admin-reviews-list");if(t){for(n.contact.reviews||(n.contact.reviews=[]);n.contact.reviews.length<3;)n.contact.reviews.push({name:"Khách hàng",rating:5,text:"",date:"vừa xong"});t.innerHTML=n.contact.reviews.map((e,a)=>`
            <div class="p-6 bg-white border border-primary/5 rounded-[1.5rem] space-y-4 shadow-sm">
                <div class="flex justify-between items-center border-b border-primary/5 pb-2">
                    <span class="text-[10px] font-bold text-accent uppercase tracking-widest italic">Bình luận #${a+1}</span>
                    <div class="flex gap-1 text-amber-400">
                        ${Array(5).fill(0).map((o,r)=>`
                            <svg class="w-3 h-3 ${r<e.rating?"fill-current":"text-gray-200"}" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        `).join("")}
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <label class="text-[10px] font-bold text-primary/70 uppercase tracking-tighter ml-1">Tên Khách</label>
                        <input type="text" value="${e.name}" placeholder="Tên khách" class="w-full px-4 py-2 bg-surface border border-primary/5 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-accent outline-none" onchange="appData.contact.reviews[${a}].name = this.value">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] font-bold text-primary/70 uppercase tracking-tighter ml-1">Số Sao</label>
                        <input type="number" min="1" max="5" value="${e.rating}" class="w-full px-4 py-2 bg-surface border border-primary/5 rounded-xl text-sm focus:ring-2 focus:ring-accent outline-none" onchange="appData.contact.reviews[${a}].rating = parseInt(this.value); renderContactEditor();">
                    </div>
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-bold text-primary/70 uppercase tracking-tighter ml-1">Thời Gian (vd: 2 tuần trước)</label>
                    <input type="text" value="${e.date}" class="w-full px-4 py-2 bg-surface border border-primary/5 rounded-xl text-xs focus:ring-2 focus:ring-accent outline-none" onchange="appData.contact.reviews[${a}].date = this.value">
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-bold text-primary/70 uppercase tracking-tighter ml-1">Nội Dung Review</label>
                    <textarea placeholder="Nội dung review..." class="w-full px-4 py-2 bg-surface border border-primary/5 rounded-xl text-xs h-24 focus:ring-2 focus:ring-accent outline-none" onchange="appData.contact.reviews[${a}].text = this.value">${e.text}</textarea>
                </div>
            </div>
        `).join("")}},k=()=>{try{localStorage.setItem("siteData",JSON.stringify(n)),alert("Đã lưu thay đổi vào trình duyệt! Refresh trang chủ để xem.")}catch(t){t.name==="QuotaExceededError"?alert("Lỗi: Dung lượng lưu trữ đã đầy! Hãy thử xóa bớt ảnh hoặc dùng ảnh nhỏ hơn."):alert("Lỗi khi lưu: "+t.message)}},B=()=>{confirm("Reset dữ liệu xem trước về mặc định? Mọi thay đổi chưa xuất file sẽ mất.")&&(localStorage.removeItem("siteData"),location.reload())},L=()=>{const t="export const initialData = "+JSON.stringify(n,null,4)+";",e=new Blob([t],{type:"text/javascript;charset=utf-8"}),a=URL.createObjectURL(e),o=document.createElement("a");o.href=a,o.download="data.js",document.body.appendChild(o),o.click(),document.body.removeChild(o)};document.getElementById("save-btn").addEventListener("click",k);document.getElementById("reset-btn").addEventListener("click",B);document.getElementById("export-btn").addEventListener("click",L);const f=document.getElementById("save-btn-mobile"),x=document.getElementById("export-btn-mobile"),w=document.getElementById("reset-btn-mobile");f&&f.addEventListener("click",k);x&&x.addEventListener("click",L);w&&w.addEventListener("click",B);
