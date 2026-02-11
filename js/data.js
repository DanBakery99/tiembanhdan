export const initialData = {
    hero: {
        title: "Hương Vị Ngọt Ngào <br> <span class=\"text-primary\">Tiệm Bánh DAN</span>",
        subtitle: "Chào mừng đến với",
        description: "Nơi hội tụ những chiếc bánh thủ công tinh tế và ly cà phê đậm đà. Một không gian ấm cúng để bạn tận hưởng những khoảnh khắc tuyệt vời.",
        ctaConnect: "Xem Menu",
        ctaOrder: "Đặt Bàn Ngay",
        backgroundImages: [
            { src: "assets/img2.jpg", label: "Bánh Tươi Mỗi Ngày" },
            { src: "assets/img1.png", label: "Hương Vị Độc Đáo" },
            { src: "assets/img3.png", label: "Nguyên Liệu Cao Cấp" }
        ]
    },
    about: {
        title: "Câu Chuyện Dan Cafe",
        image: "assets/img4.png",
        paragraphs: [
            "Tiệm Bánh DAN được thành lập với niềm đam mê mang đến những chiếc bánh ngọt ngào nhất cho mọi người. Từng chiếc bánh được làm thủ công bằng cả trái tim, sử dụng những nguyên liệu tươi ngon nhất, chọn lọc kỹ càng.",
            "Không gian của chúng tôi được thiết kế để bạn tìm thấy sự bình yên giữa phố thị ồn ào. Hãy đến và cảm nhận sự khác biệt trong từng hương vị."
        ],
        stats: [
            { value: "50+", label: "Loại Bánh Ngọt" },
            { value: "100%", label: "Nguyên Liệu Tự Nhiên" }
        ]
    },
    menu: {
        title: "Thực Đơn Nổi Bật",
        subtitle: "Khám phá những món \"Best Seller\" được khách hàng yêu thích nhất tại Tiệm Bánh DAN.",
        items: [
            {
                id: 1,
                name: "Bánh Kem Dâu Tây",
                description: "Với lớp kem tươi mềm mịn và dâu tây tươi mọng.",
                price: "Liên hệ",
                image: "assets/img1.png",
                tag: "Best Seller",
                tagColor: "primary"
            },
            {
                id: 2,
                name: "Classic Tiramisu",
                description: "Hương vị cà phê nồng nàn quyện cùng phô mai béo ngậy.",
                price: "Liên hệ",
                image: "assets/img3.png",
                tag: null,
                tagColor: null
            },
            {
                id: 3,
                name: "Berry Panna Cotta",
                description: "Món tráng miệng thanh mát với sốt trái cây rừng.",
                price: "Liên hệ",
                image: "assets/img2.jpg",
                tag: null,
                tagColor: null
            },
            {
                id: 4,
                name: "Trà Sữa Signature",
                description: "Vị trà đậm đà, kết hợp topping handmade độc quyền.",
                price: "Liên hệ",
                image: "assets/img4.png",
                tag: "New",
                tagColor: "secondary"
            }
        ]
    },
    gallery: {
        title: "Góc Check-in",
        subtitle: "Những khoảnh khắc đẹp được khách hàng lưu giữ tại Tiệm Bánh DAN.",
        images: [
            "assets/img1.png",
            "assets/img2.jpg",
            "assets/img3.png",
            "assets/img4.png",
            "assets/img2.jpg",
            "assets/img1.png"
        ]
    },
    contact: {
        address: "Tiệm Bánh ĐAN - Trảng Dài, Biên Hòa, Đồng Nai (Gần ngã tư Tân Phong)",
        phone: "093 888 7777",
        hours: "Thứ 2 - Chủ Nhật: 7:00 - 22:00",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15669.968602931498!2d106.8501450!3d11.0006639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174dde5f9b332c1%3A0x32d7d2e662eb2471!2zVGnhu4dtIELDoW5oIMSQQU4!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
    }
};
