import axios from 'axios';

// Base URL for DummyJSON API
const API_BASE_URL = 'https://dummyjson.com';

// Function to fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products?limit=100`);
        // Transform the data to match our schema
        return response.data.products.map(item => ({
            id: item.id,
            name: item.title,
            price: Math.round(item.price * 80), // Convert USD to INR
            originalPrice: item.discountPercentage ? Math.round((item.price * 80) / (1 - item.discountPercentage / 100)) : null,
            image: item.thumbnail,
            images: item.images || [item.thumbnail],
            description: item.description,
            shortDescription: item.title,
            category: mapCategory(item.category),
            brand: item.brand,
            rating: item.rating,
            reviews: Math.floor(Math.random() * 200) + 10, // DummyJSON doesn't provide review count
            stock: item.stock,
            badges: getBadges(item.price, item.rating, item.discountPercentage),
            features: item.description ? getFeatures(item.description) : [],
            warranty: item.warrantyInformation || '1 Year Manufacturer Warranty',
            inStock: item.stock > 0,
            emi: getEMIString(Math.round(item.price * 80)),
            tags: item.tags || [],
            availabilityStatus: getAvailabilityStatus(item.stock)
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// Function to fetch a single product by ID
export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        const item = response.data;
        return {
            id: item.id,
            name: item.title,
            price: Math.round(item.price * 80),
            originalPrice: item.discountPercentage ? Math.round((item.price * 80) / (1 - item.discountPercentage / 100)) : null,
            image: item.thumbnail,
            images: item.images || [item.thumbnail],
            description: item.description,
            shortDescription: item.title,
            category: mapCategory(item.category),
            brand: item.brand,
            rating: item.rating,
            reviews: Math.floor(Math.random() * 200) + 10,
            stock: item.stock,
            badges: getBadges(item.price, item.rating, item.discountPercentage),
            features: item.description ? getFeatures(item.description) : [],
            warranty: item.warrantyInformation || '1 Year Manufacturer Warranty',
            inStock: item.stock > 0,
            emi: getEMIString(Math.round(item.price * 80)),
            tags: item.tags || [],
            availabilityStatus: getAvailabilityStatus(item.stock),
            specifications: {
                weight: item.weight || (Math.random() * 2 + 0.5).toFixed(2),
                dimensions: item.dimensions || {
                    width: Math.floor(Math.random() * 20 + 5),
                    height: Math.floor(Math.random() * 15 + 5),
                    depth: Math.floor(Math.random() * 5 + 1)
                },
                sku: item.sku || `SKU${item.id}${Math.floor(Math.random() * 10000)}`,
                color: item.color || getRandomColor(),
                material: item.material || getRandomMaterial(item.category)
            }
        };
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        return null;
    }
};

// Function to get availability status based on stock
function getAvailabilityStatus(stock) {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    if (stock < 50) return 'In Stock';
    return 'High Availability';
}

// Helper functions
function mapCategory(dummyJsonCategory) {
    const categoryMap = {
        'electronics': 'mobiles',
        'smartphones': 'mobiles',
        'laptops': 'laptops',
        'fragrances': 'accessories',
        'skincare': 'accessories',
        'groceries': 'other',
        'home-decoration': 'other',
        'furniture': 'other',
        'tops': 'fashion',
        'womens-dresses': 'fashion',
        'womens-shoes': 'fashion',
        'mens-shirts': 'fashion',
        'mens-shoes': 'fashion',
        'mens-watches': 'accessories',
        'womens-watches': 'accessories',
        'womens-bags': 'accessories',
        'womens-jewellery': 'accessories',
        'sunglasses': 'accessories',
        'automotive': 'other',
        'motorcycle': 'other',
        'lighting': 'other'
    };
    return categoryMap[dummyJsonCategory] || 'other';
}

function getBrandFromTitle(title) {
    const brands = ['Samsung', 'Apple', 'Sony', 'LG', 'HP', 'Dell'];
    const foundBrand = brands.find(brand => title.includes(brand));
    return foundBrand || 'Generic';
}

function getBadges(price, rating, discountPercentage) {
    const badges = [];
    if (rating >= 4.5) badges.push('Top Rated');
    if (price >= 10000) badges.push('Premium');
    if (price < 2000) badges.push('Budget Pick');
    
    // Add discount badges based on discount percentage
    if (discountPercentage) {
        if (discountPercentage >= 20) badges.push('Hot Deal');
        else if (discountPercentage >= 10) badges.push('Deal of the Day');
        else if (discountPercentage >= 5) badges.push('Special Offer');
    }
    
    return badges;
}

function getFeatures(description) {
    // Extract 3-5 key points from description
    const sentences = description.split('. ');
    return sentences.slice(0, Math.min(4, sentences.length))
        .map(s => s.trim())
        .filter(s => s.length > 0);
}

function getEMIString(price) {
    if (price < 3000) return '';
    const monthlyEMI = Math.round(price / 12);
    return `No Cost EMI starts from ₹${monthlyEMI}/month`;
}

function getRandomColor() {
    const colors = ['Black', 'White', 'Silver', 'Space Gray', 'Gold', 'Rose Gold', 'Blue', 'Red', 'Green', 'Purple'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomMaterial(category) {
    const materialsByCategory = {
        'smartphones': ['Aluminum', 'Glass', 'Ceramic', 'Plastic'],
        'laptops': ['Aluminum', 'Plastic', 'Magnesium Alloy', 'Carbon Fiber'],
        'fragrances': ['Glass', 'Plastic'],
        'skincare': ['Glass', 'Plastic'],
        'furniture': ['Wood', 'Metal', 'Glass', 'Plastic', 'Fabric'],
        'tops': ['Cotton', 'Polyester', 'Nylon', 'Silk', 'Wool'],
        'womens-dresses': ['Cotton', 'Polyester', 'Silk', 'Linen', 'Rayon'],
        'mens-shirts': ['Cotton', 'Polyester', 'Linen', 'Denim'],
        'mens-watches': ['Stainless Steel', 'Leather', 'Titanium', 'Ceramic', 'Plastic']
    };
    
    // Default materials if category not found
    const defaultMaterials = ['Plastic', 'Metal', 'Glass', 'Composite'];
    
    const materials = materialsByCategory[category] || defaultMaterials;
    return materials[Math.floor(Math.random() * materials.length)];
}

export const categories = [
    {
        id: 'all',
        name: 'All Categories',
        icon: 'grid',
        image: 'https://fakestoreapi.com/img/categories.jpg'
    },
    {
        id: 'mobiles',
        name: 'Electronics',
        icon: 'smartphone',
        image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg'
    },
    {
        id: 'fashion',
        name: 'Fashion',
        icon: 'shirt',
        image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg'
    },
    {
        id: 'accessories',
        name: 'Accessories',
        icon: 'diamond',
        image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg'
    }
];

export const banners = [
    {
        id: 1,
        title: 'Electronics Sale',
        description: 'Up to 40% off on Electronics',
        image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
        link: '/products?category=mobiles'
    },
    {
        id: 2,
        title: 'Fashion Week',
        description: 'Latest Trends in Fashion',
        image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
        link: '/products?category=fashion'
    },
    {
        id: 3,
        title: 'Premium Accessories',
        description: 'Luxury Collection',
        image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
        link: '/products?category=accessories'
    }
];

const products = [
    {
        id: 1,
        name: 'Apple iPhone 15 Pro',
        price: 129999,
        originalPrice: 134900,
        image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697018314/Croma%20Assets/Communication/Mobiles/Images/300649_0_qgm6ue.png',
        images: [
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697018314/Croma%20Assets/Communication/Mobiles/Images/300649_0_qgm6ue.png',
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697018309/Croma%20Assets/Communication/Mobiles/Images/300649_1_c3bwtf.png',
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697018312/Croma%20Assets/Communication/Mobiles/Images/300649_2_rqwvt1.png'
        ],
        description: 'iPhone 15 Pro with A17 Pro chip, 6.1-inch Super Retina XDR display, 128GB storage, Pro camera system.',
        shortDescription: 'A17 Pro chip, 6.1" display, 128GB',
        category: 'mobiles',
        brand: 'Apple',
        rating: 4.8,
        reviews: 245,
        stock: 15,
        badges: ['New Launch', 'Bank Offer'],
        features: [
            'A17 Pro chip',
            '6.1" Super Retina XDR display',
            'Pro camera system',
            'Titanium design',
            'USB-C connector'
        ],
        warranty: '1 Year Manufacturer Warranty',
        inStock: true,
        emi: 'No Cost EMI starts from ₹10,834/month'
    }, {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra',
        price: 119999,
        originalPrice: 124999,
        image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1705595615/Croma%20Assets/Communication/Mobiles/Images/303581_0_p1woz9.png',
        images: [
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1705595615/Croma%20Assets/Communication/Mobiles/Images/303581_0_p1woz9.png',
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1705595612/Croma%20Assets/Communication/Mobiles/Images/303581_1_ueflwm.png',
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1705595614/Croma%20Assets/Communication/Mobiles/Images/303581_2_pigqor.png'
        ],
        description: 'Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3, 6.8-inch QHD+ display, 256GB storage, S Pen included.',
        shortDescription: 'Snapdragon 8 Gen 3, 6.8" QHD+, 256GB',
        category: 'mobiles',
        brand: 'Samsung',
        rating: 4.7,
        reviews: 189,
        stock: 10,
        badges: ['New Launch', 'Exchange Offer'],
        features: [
            'Snapdragon 8 Gen 3',
            '6.8" Dynamic AMOLED 2X',
            '200MP main camera',
            'S Pen included',
            '5000mAh battery'
        ],
        warranty: '1 Year Manufacturer Warranty',
        inStock: true,
        emi: 'No Cost EMI starts from ₹9,999/month'
    },
    {
        id: 3,
        name: 'Sony WH-1000XM5 Headphones',
        price: 29999,
        originalPrice: 34990,
        image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683567316/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/258770_0_a2qbgx.png',
        images: [
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683567316/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/258770_0_a2qbgx.png',
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1683567314/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/258770_1_qfazdq.png'
        ],
        description: 'Industry-leading noise cancellation headphones with up to 30 hours battery life, Multi-device connectivity.',
        shortDescription: '30hr battery, ANC, Multi-device',
        category: 'audio',
        brand: 'Sony',
        rating: 4.9,
        reviews: 412,
        stock: 25,
        badges: ['Best Seller', 'Price Drop'],
        features: [
            'Industry-leading ANC',
            '30 hours battery life',
            'Multi-device pairing',
            'Touch controls',
            'Hi-Res Audio'
        ],
        warranty: '1 Year Manufacturer Warranty',
        inStock: true,
        emi: 'No Cost EMI starts from ₹2,499/month'
    },
    {
        id: 4,
        name: 'HP Pavilion 15 Gaming Laptop',
        price: 74999,
        originalPrice: 89990,
        image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697627694/Croma%20Assets/Computers%20Peripherals/Laptop/Images/272559_0_qupssm.png',
        images: [
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697627694/Croma%20Assets/Computers%20Peripherals/Laptop/Images/272559_0_qupssm.png',
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697627696/Croma%20Assets/Computers%20Peripherals/Laptop/Images/272559_1_d7ayuf.png'
        ],
        description: 'HP Pavilion Gaming with Intel i7 12th Gen, 16GB RAM, 512GB SSD, RTX 3050, 15.6-inch FHD 144Hz display.',
        shortDescription: 'i7 12th Gen, 16GB, RTX 3050',
        category: 'laptops',
        brand: 'HP',
        rating: 4.5,
        reviews: 156,
        stock: 8,
        badges: ['Gaming', 'Fast Delivery'],
        features: [
            'Intel i7 12th Gen',
            'NVIDIA RTX 3050 4GB',
            '16GB DDR4 RAM',
            '512GB NVMe SSD',
            '144Hz FHD display'
        ],
        warranty: '1 Year Onsite Warranty',
        inStock: true,
        emi: 'No Cost EMI starts from ₹6,249/month'
    },
    {
        id: 5,
        name: 'boAt Airdopes 141',
        price: 1499,
        originalPrice: 4490,
        image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697019730/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/270555_0_hjqt1r.png',
        images: [
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697019730/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/270555_0_hjqt1r.png',
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697019732/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/270555_1_zpdzw7.png'
        ],
        description: 'boAt Airdopes 141 True Wireless Earbuds with 42H playback, ENx™ Technology, IWP™ Technology.',
        shortDescription: '42H playback, Beast Mode',
        category: 'audio',
        brand: 'boAt',
        rating: 4.3,
        reviews: 3240,
        stock: 100,
        badges: ['Best Seller', 'Deal of the Day'],
        features: [
            '42 hours playback',
            'BEAST™ Mode',
            'ENx™ Technology',
            'IPX4 Water Resistant',
            'Touch Controls'
        ],
        warranty: '1 Year Manufacturer Warranty',
        inStock: true,
        emi: 'Starting at ₹71/month'
    }, {
        id: 6,
        name: 'LG 55 inches 4K Ultra HD Smart OLED TV',
        price: 109999,
        originalPrice: 129990,
        image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697019259/Croma%20Assets/Entertainment/Television/Images/273233_0_e8nadfpk.png',
        images: [
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697019259/Croma%20Assets/Entertainment/Television/Images/273233_0_e8nadfpk.png',
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697019262/Croma%20Assets/Entertainment/Television/Images/273233_1_d53c8j.png'
        ],
        description: 'LG 55 inches 4K Ultra HD Smart OLED TV with α9 AI Processor 4K Gen6, WebOS 23, 120Hz.',
        shortDescription: '4K OLED, α9 AI Processor',
        category: 'tv',
        brand: 'LG',
        rating: 4.6,
        reviews: 89,
        stock: 5,
        badges: ['Premium', 'Installation Included'],
        features: [
            'α9 AI Processor 4K Gen6',
            'WebOS 23',
            'Dolby Vision IQ',
            'Dolby Atmos',
            '120Hz refresh rate'
        ],
        warranty: '1 Year Comprehensive Warranty',
        inStock: true,
        emi: 'No Cost EMI starts from ₹9,166/month'
    },
    {
        id: 7,
        name: 'MacBook Air M3',
        price: 114999,
        originalPrice: 119900,
        image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1706169176/Croma%20Assets/Computers%20Peripherals/Laptop/Images/302786_0_qy9vi3.png',
        images: [
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1706169176/Croma%20Assets/Computers%20Peripherals/Laptop/Images/302786_0_qy9vi3.png',
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1706169178/Croma%20Assets/Computers%20Peripherals/Laptop/Images/302786_1_k8nczx.png'
        ],
        description: 'Apple MacBook Air M3 chip with 8-core CPU, 10-core GPU, 8GB RAM, 256GB SSD',
        shortDescription: 'M3 chip, 13.6" Liquid Retina',
        category: 'laptops',
        brand: 'Apple',
        rating: 4.9,
        reviews: 76,
        stock: 12,
        badges: ['New Launch', 'Student Offer'],
        features: [
            'M3 chip',
            '13.6" Liquid Retina display',
            '8GB unified memory',
            '256GB SSD',
            'Up to 18 hours battery'
        ],
        warranty: '1 Year Limited Warranty',
        inStock: true,
        emi: 'No Cost EMI starts from ₹9,583/month'
    },
    {
        id: 8,
        name: 'Nothing Phone (2)',
        price: 44999,
        originalPrice: 49999,
        image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1689401873/Croma%20Assets/Communication/Mobiles/Images/275391_0_qd9ipm.png',
        images: [
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1689401873/Croma%20Assets/Communication/Mobiles/Images/275391_0_qd9ipm.png',
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1689401875/Croma%20Assets/Communication/Mobiles/Images/275391_1_hz7gjb.png'
        ],
        description: 'Nothing Phone (2) with Snapdragon 8+ Gen 1, 6.7" LTPO OLED display, 12GB RAM, 256GB storage',
        shortDescription: 'SD 8+ Gen 1, 12GB RAM',
        category: 'mobiles',
        brand: 'Nothing',
        rating: 4.5,
        reviews: 328,
        stock: 20,
        badges: ['Top Rated', 'Exchange Offer'],
        features: [
            'Snapdragon 8+ Gen 1',
            'Glyph Interface',
            '50MP dual camera',
            '4700mAh battery',
            '45W fast charging'
        ],
        warranty: '1 Year Manufacturer Warranty',
        inStock: true,
        emi: 'No Cost EMI starts from ₹3,750/month'
    }
];

export const brands = [
    { id: 'electronics', name: 'Electronics Brands', category: ['mobiles'] },
    { id: 'fashion', name: 'Fashion Brands', category: ['fashion'] },
    { id: 'jewelry', name: 'Jewelry Brands', category: ['accessories'] }
];

export default products;
