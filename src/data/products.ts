import aLineGown from '../assets/images/A-Line Syar\'i Wedding Gown.jpg';

export interface Product {
    id: number;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    price: number;
    originalPrice?: number;
    image: string;
    images: string[];
    sizes: string[];
    colors: { name: string; hex: string }[];
    rating: number;
    reviews: number;
    inStock: boolean;
    stock: number;
    badge?: string;
}

export const products: Product[] = [
    {
        id: 1,
        title: "A-Line Syar'i Wedding Gown",
        category: "Wedding Dress",
        description: "Elegant A-Line silhouette with full coverage and intricate lace details.",
        longDescription: "This breathtaking A-Line Syar'i Wedding Gown is designed for the bride who seeks both modesty and majesty. Featuring a flattering A-line silhouette, it moves gracefully with every step. The bodice is adorned with delicate hand-beaded lace, flowing seamlessly into a soft, full skirt. Fully lined for comfort and modesty.",
        price: 3500000,
        image: aLineGown,
        images: [
            aLineGown,
            aLineGown
        ],
        sizes: ["S", "M", "L", "XL", "Custom"],
        colors: [
            { name: "Pure White", hex: "#FFFFFF" },
            { name: "Broken White", hex: "#F8F8FF" }
        ],
        rating: 4.9,
        reviews: 128,
        inStock: true,
        stock: 15,
        badge: "Exclusive",
    },
    {
        id: 2,
        title: 'The Golden Hour',
        category: 'Bridal Hijab',
        description: 'Hand-embroidered gold thread on premium satin.',
        longDescription: 'The Golden Hour hijab features intricate gold thread embroidery on premium satin fabric. Inspired by the warm glow of sunset, this piece adds a touch of regal splendor to any bridal ensemble. The breathable fabric ensures comfort throughout your special day.',
        price: 890,
        image: 'https://www.lemon8-app.com/seo/image?item_id=7547836525028016641&index=2&sign=bda9ae2bf9cf4e3cd60e2f14d2c44169',
        images: [
            'https://www.lemon8-app.com/seo/image?item_id=7547836525028016641&index=2&sign=bda9ae2bf9cf4e3cd60e2f14d2c44169',
            'https://s.alicdn.com/@sc04/kf/Ac3c4631ae286467085b5291d936ed3c5Z/Luxury-White-Mermaid-Evening-Dress-with-Silver-Sequin-Embroidery-Modest-Hijab-Design-Floor-Length-Natural-Waist-Bridal-Gown.jpg',
        ],
        sizes: ['S', 'M', 'L'],
        colors: [
            { name: 'Gold', hex: '#D4A843' },
            { name: 'Rose Gold', hex: '#B76E79' },
        ],
        rating: 4.8,
        reviews: 85,
        inStock: true,
        stock: 8,
    },
    {
        id: 3,
        title: 'The Pearl Mist',
        category: 'Nikah Set',
        description: 'Complete bridal ensemble with matching accessories.',
        longDescription: 'The Pearl Mist is a complete nikah ensemble that includes a beautifully designed dress, matching hijab, and coordinating accessories. Crafted from premium chiffon with pearl accents throughout, this set ensures a cohesive and stunning bridal look.',
        price: 2400,
        originalPrice: 2800,
        image: 'https://i.pinimg.com/564x/48/b4/17/48b4174304f51b59b28a44f8697c5288.jpg',
        images: [
            'https://i.pinimg.com/564x/48/b4/17/48b4174304f51b59b28a44f8697c5288.jpg',
            'https://s.alicdn.com/@sc04/kf/Ac3c4631ae286467085b5291d936ed3c5Z/Luxury-White-Mermaid-Evening-Dress-with-Silver-Sequin-Embroidery-Modest-Hijab-Design-Floor-Length-Natural-Waist-Bridal-Gown.jpg',
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { name: 'Pearl White', hex: '#F5F5F5' },
            { name: 'Soft Cream', hex: '#FFFDD0' },
            { name: 'Dusty Rose', hex: '#DCAE96' },
        ],
        rating: 5.0,
        reviews: 0,
        inStock: true,
        stock: 5,
        badge: 'New Arrival',
    },
    {
        id: 4,
        title: 'The Silk Whisper',
        category: 'Evening Veil',
        description: 'Lightweight and breathable for unforgettable evenings.',
        longDescription: 'The Silk Whisper is designed for evening celebrations and special occasions. Made from ultra-lightweight silk, it drapes beautifully and feels like a gentle breeze. The subtle shimmer woven into the fabric adds an ethereal quality to your evening look.',
        price: 750,
        image: 'https://www.tanyabridal.com/cdn/shop/files/1_b85388e6-75ed-404d-b5fb-bb7d793c9682.png?v=1690871253',
        images: [
           'https://www.tanyabridal.com/cdn/shop/files/1_b85388e6-75ed-404d-b5fb-bb7d793c9682.png?v=1690871253',
            'https://s.alicdn.com/@sc04/kf/Ac3c4631ae286467085b5291d936ed3c5Z/Luxury-White-Mermaid-Evening-Dress-with-Silver-Sequin-Embroidery-Modest-Hijab-Design-Floor-Length-Natural-Waist-Bridal-Gown.jpg',
        ],
        sizes: ['S', 'M', 'L'],
        colors: [
            { name: 'Silver Mist', hex: '#C0C0C0' },
            { name: 'Moonlight', hex: '#F0EAD6' },
        ],
        rating: 4.7,
        reviews: 42,
        inStock: true,
        stock: 12,
    },
    {
        id: 5,
        title: 'The Royal Drape',
        category: 'Wedding Veil',
        description: 'Cathedral-length veil with lace border detailing.',
        longDescription: 'The Royal Drape is a cathedral-length veil featuring exquisite French lace borders. This statement piece extends dramatically behind the bride, creating an unforgettable silhouette. Each veil is custom-cut and finished with hand-sewn edges.',
        price: 1800,
        image: 'https://awsimages.detik.net.id/community/media/visual/2023/03/29/gaun-pengantin-hijab-modern-3.jpeg?w=600&q=90',
        images: [
           'https://awsimages.detik.net.id/community/media/visual/2023/03/29/gaun-pengantin-hijab-modern-3.jpeg?w=600&q=90',
           'https://s.alicdn.com/@sc04/kf/Ac3c4631ae286467085b5291d936ed3c5Z/Luxury-White-Mermaid-Evening-Dress-with-Silver-Sequin-Embroidery-Modest-Hijab-Design-Floor-Length-Natural-Waist-Bridal-Gown.jpg',
        ],
        sizes: ['M', 'L', 'XL'],
        colors: [
            { name: 'Pure White', hex: '#FFFFFF' },
            { name: 'Ivory', hex: '#FFFFF0' },
        ],
        rating: 4.9,
        reviews: 93,
        inStock: true,
        stock: 3,
    },
    {
        id: 6,
        title: 'The Satin Dream',
        category: 'Bridal Hijab',
        description: 'Luxurious satin hijab with crystal accents.',
        longDescription: 'The Satin Dream hijab combines the luxurious drape of premium satin with strategically placed Swarovski crystal accents. The crystals catch light from every angle, creating a dazzling effect that photographs beautifully.',
        price: 680,
        image: 'https://sarah-houston.com/cdn/shop/files/S58ea6dd243214e9587606897941d66efL.webp?v=1743198681',
        images: [
            'https://sarah-houston.com/cdn/shop/files/S58ea6dd243214e9587606897941d66efL.webp?v=1743198681',
            'https://s.alicdn.com/@sc04/kf/Ac3c4631ae286467085b5291d936ed3c5Z/Luxury-White-Mermaid-Evening-Dress-with-Silver-Sequin-Embroidery-Modest-Hijab-Design-Floor-Length-Natural-Waist-Bridal-Gown.jpg',
        ],
        sizes: ['S', 'M', 'L'],
        colors: [
            { name: 'Champagne', hex: '#F7E7CE' },
            { name: 'Soft Peach', hex: '#FFDAB9' },
            { name: 'Lavender', hex: '#E6E6FA' },
        ],
        rating: 4.6,
        reviews: 37,
        inStock: false,
        stock: 0,
        badge: 'Sold Out',
    },
];
