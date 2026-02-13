export const initialData = {
    hero: {
        title: "Hương Vị Ngọt Ngào <br> <span class=\"text-accent italic\">Từ Trái Tim</span>",
        subtitle: "Chào mừng đến với Tiệm Bánh DAN",
        description: "Mỗi chiếc bánh là một tác phẩm nghệ thuật, được làm từ những nguyên liệu tươi ngon nhất và niềm đam mê cháy bỏng. Hãy đến và cảm nhận sự khác biệt.",
        ctaConnect: "Xem Menu",
        ctaOrder: "Đặt Món",

        backgroundImages: [
            { src: "assets/img1.png", label: "Signature Cakes" },
            { src: "assets/img2.jpg", label: "Fresh Pastries" },
            { src: "assets/img3.png", label: "Cozy Space" }
        ]
    },
    about: {
        title: "Câu Chuyện Bếp Trưởng",
        image: "assets/img4.png", // Will need a chef-like or kitchen shot here
        paragraphs: [
            "Hành trình của chúng tôi bắt đầu từ căn bếp nhỏ, nơi mùi hương của bơ và vani luôn lan tỏa mỗi sớm mai. Với hơn 10 năm kinh nghiệm, chúng tôi không chỉ làm bánh, mà còn gửi gắm tình yêu và sự tỉ mỉ vào từng chi tiết.",
            "Tại Tiệm Bánh DAN, chúng tôi tin rằng những nguyên liệu tự nhiên, không chất bảo quản mới tạo nên linh hồn của chiếc bánh. Mỗi ngày, chúng tôi dậy sớm để chọn lọc những quả dâu tây căng mọng nhất, những thanh chocolate nguyên chất để mang đến cho thực khách trải nghiệm vị giác trọn vẹn."
        ],
        stats: [
            { value: "10+", label: "Năm Kinh Nghiệm" },
            { value: "50+", label: "Loại Bánh" },
            { value: "100%", label: "Homemade" }
        ]
    },
    menu: {
        title: "Thực Đơn Nổi Bật",
        subtitle: "Những món ăn được thực khách yêu thích nhất",
        items: [
            {
                id: 1,
                name: "Strawberry Dream Cake",
                description: "Lớp bánh chiffon mềm mịn kết hợp kem tươi và dâu đà lạt.",
                price: "Liên hệ",
                image: "assets/img1.png",
                tag: "Best Seller",
                tagColor: "accent",
                category: "bánh ngọt"
            },
            {
                id: 2,
                name: "Tiramisu Classic",
                description: "Hương vị Ý đích thực với mascarpone béo ngậy và cà phê espresso.",
                price: "Liên hệ",
                image: "assets/img3.png",
                tag: "Must Try",
                tagColor: "primary",
                category: "bánh ngọt"
            },
            {
                id: 3,
                name: "Golden Croissant",
                description: "Vỏ bánh ngàn lớp giòn tan, thơm lừng mùi bơ Pháp cao cấp.",
                price: "Liên hệ",
                image: "assets/img2.jpg",
                tag: "Fresh Daily",
                tagColor: "secondary",
                category: "bánh ngọt"
            },
            {
                id: 4,
                name: "Signature Matcha Latte",
                description: "Trà xanh Nhật Bản thượng hạng kết hợp sữa tươi thanh trùng.",
                price: "Liên hệ",
                image: "assets/img4.png",
                tag: "New",
                tagColor: "accent",
                category: "đồ uống"
            },
            {
                id: 5,
                name: "Macaron Assorted",
                description: "Bộ sưu tập 6 hương vị macaron ngọt ngào đầy màu sắc.",
                price: "Liên hệ",
                image: "assets/img2.jpg",
                tag: null,
                tagColor: null,
                category: "bánh ngọt"
            },
            {
                id: 6,
                name: "Chocolate Lava Cake",
                description: "Bánh socola chảy quyến rũ, dùng kèm kem vani mát lạnh.",
                price: "Liên hệ",
                image: "assets/img3.png",
                tag: "Hot",
                tagColor: "secondary",
                category: "món mặn"
            }
        ]
    },
    gallery: {
        title: "Thư Viện Ảnh",
        subtitle: "Những khoảnh khắc đẹp tại Tiệm Bánh DAN",
        images: [
            "assets/img1.png",
            "assets/img2.jpg",
            "assets/img3.png",
            "assets/img4.png",
            "assets/img2.jpg",
            "assets/img1.png",
            "assets/img3.png",
            "assets/img4.png"
        ]
    },
    contact: {
        address: "123 Đường Nguyễn Ái Quốc, P. Trảng Dài, Biên Hòa, Đồng Nai",
        phone: "090 123 4567",
        hours: [
            "Thứ 2 - Thứ 6: 07:00 - 22:00",
            "Thứ 7 - Chủ Nhật: 08:00 - 23:00"
        ],
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.066498263725!2d106.84888931481977!3d10.882570160205862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8fc2264b3ab%3A0x6b4532646d526768!2zVHLu4bqjbmcgRMOgaSwgQmnDqm4gSMOyYSwgxJDhu5NuZyBOYWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
    }
};
