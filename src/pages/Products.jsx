import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { fetchAllProducts } from '../slices/productSlice';
import { categories } from '../data/products';
import toast from 'react-hot-toast';
import { Star, Heart, HeartOff, Loader2, Filter, ChevronDown, ChevronUp, Truck, ShieldCheck, Clock, Percent, Search, X } from 'lucide-react';

const sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Name: A-Z', value: 'name_asc' },
    { label: 'Name: Z-A', value: 'name_desc' },
    { label: 'Rating: High to Low', value: 'rating_desc' },
    { label: 'Newest First', value: 'newest' },
];

const priceRanges = [
    { label: 'Under ₹1,000', min: 0, max: 1000 },
    { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
    { label: '₹20,000 - ₹50,000', min: 20000, max: 50000 },
    { label: 'Above ₹50,000', min: 50000, max: Infinity },
];

const brands = [
    'Apple', 'Samsung', 'OnePlus', 'Sony', 'LG', 'Boat', 'HP', 'Dell', 'Lenovo', 'Croma'
];

function getSortedProducts(products, sort) {
    switch (sort) {
        case 'price_asc':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price_desc':
            return [...products].sort((a, b) => b.price - a.price);
        case 'name_asc':
            return [...products].sort((a, b) => a.name.localeCompare(b.name));
        case 'name_desc':
            return [...products].sort((a, b) => b.name.localeCompare(a.name));
        case 'rating_desc':
            return [...products].sort((a, b) => b.rating - a.rating);
        case 'newest':
            return [...products].sort((a, b) => b.id - a.id); // Assuming newer products have higher IDs
        default:
            return products;
    }
}

function getInitialWishlist() {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

export default function Products() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [sort, setSort] = useState('relevance');
    const [wishlist, setWishlist] = useState(getInitialWishlist());
    const [showFilters, setShowFilters] = useState(false);
    const [showCategoryFilter, setShowCategoryFilter] = useState(true);
    const [showBrandFilter, setShowBrandFilter] = useState(false);
    const [showPriceFilter, setShowPriceFilter] = useState(false);

    // Get products from Redux store
    const { items: products, loading, error } = useSelector(state => state.products);

    // Parse URL query parameters
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        const searchParam = params.get('search');
        
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
        
        if (searchParam) {
            setSearchQuery(searchParam);
        }
    }, [location.search]);

    // Fetch products when component mounts
    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    };

    // Toggle brand selection
    const toggleBrand = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedCategory('All');
        setSelectedBrands([]);
        setSelectedPriceRange(null);
        setSearchQuery('');
        navigate('/products');
    };

    // Memoized filtered and sorted products
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        // Start with all products
        let result = [...products];
        
        // Apply category filter
        if (selectedCategory !== 'All') {
            result = result.filter(product => 
                product.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        // Apply brand filter
        if (selectedBrands.length > 0) {
            result = result.filter(product => 
                selectedBrands.includes(product.brand));
        }

        // Apply price range filter
        if (selectedPriceRange) {
            result = result.filter(product => 
                product.price >= selectedPriceRange.min && 
                product.price <= selectedPriceRange.max);
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const searchLower = searchQuery.toLowerCase().trim();
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower) ||
                product.brand.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        return getSortedProducts(result, sort);
    }, [products, selectedCategory, selectedBrands, selectedPriceRange, searchQuery, sort]);

    // Add to cart handler
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Added to cart!');
    };

    // Wishlist toggle handler
    const handleWishlist = (productId) => {
        let newWishlist;
        if (wishlist.includes(productId)) {
            newWishlist = wishlist.filter(id => id !== productId);
            toast('Removed from wishlist', { icon: '💔' });
        } else {
            newWishlist = [...wishlist, productId];
            toast('Added to wishlist', { icon: '💚' });
        }
        setWishlist(newWishlist);
        saveWishlist(newWishlist);
    };

    if (loading) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-green-600 mb-4" />
                <p className="text-gray-600 font-medium">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center">
                <div className="text-red-500 text-center">
                    <p className="text-xl font-semibold mb-2">Oops! Something went wrong</p>
                    <p className="text-gray-600">Error loading products: {error}</p>
                    <button 
                        onClick={() => dispatch(fetchAllProducts())}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            {/* Hero Banner Carousel */}
            <div className="w-full bg-white rounded-lg mb-8 overflow-hidden shadow-sm">
                <div className="relative">
                    <div className="w-full h-[300px] md:h-[400px] bg-gradient-to-r from-green-700 to-green-500 flex items-center">
                        <div className="w-full md:w-1/2 p-8 md:p-12">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Welcome to Croma</h1>
                            <p className="text-lg md:text-xl text-white opacity-90 mb-6">Shop the latest electronics at unbeatable prices!</p>
                            <div className="flex gap-4">
                                <button className="bg-white text-green-700 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                                    Shop Now
                                </button>
                                <button className="border border-white text-white px-6 py-2 rounded-md font-medium hover:bg-white/10 transition-colors">
                                    View Deals
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:block w-1/2 p-8">
                            <img 
                                src="https://www.croma.com/blog/wp-content/uploads/2023/09/Croma-Diwali-Sale-2023-Offers-on-Electronics-Appliances-Gadgets.png" 
                                alt="Croma Electronics" 
                                className="max-h-[300px] object-contain mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Featured Categories */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Featured Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {['Mobiles', 'Laptops', 'TVs', 'Audio', 'Fashion', 'Accessories'].map(category => (
                        <div 
                            key={category}
                            onClick={() => {
                                setSelectedCategory(category);
                                navigate(`/products?category=${category.toLowerCase()}`);
                            }}
                            className="bg-white rounded-lg shadow-sm p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-green-100 rounded-full">
                                <img 
                                    src={`https://www.croma.com/assets/images/category_${category.toLowerCase()}.png`} 
                                    alt={category}
                                    className="w-6 h-6 object-contain"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://www.croma.com/assets/images/croma_logo.png';
                                    }}
                                />
                            </div>
                            <p className="text-sm font-medium">{category}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Search, Filters and Sort */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        {searchQuery && (
                            <button 
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    navigate('/products');
                                }}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </form>
                    
                    {/* Sort Dropdown */}
                    <div className="md:w-64">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Filter Toggle Button (Mobile) */}
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden flex items-center justify-center gap-2 bg-green-600 text-white p-3 rounded-md font-medium"
                    >
                        <Filter className="w-5 h-5" />
                        Filters
                    </button>
                </div>
                
                {/* Active Filters */}
                {(selectedCategory !== 'All' || selectedBrands.length > 0 || selectedPriceRange || searchQuery) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        <div className="text-sm font-medium text-gray-700 flex items-center mr-2">Active Filters:</div>
                        
                        {selectedCategory !== 'All' && (
                            <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                                Category: {selectedCategory}
                                <button onClick={() => setSelectedCategory('All')} className="ml-1 text-green-700 hover:text-green-900">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        
                        {selectedBrands.map(brand => (
                            <div key={brand} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                                Brand: {brand}
                                <button onClick={() => toggleBrand(brand)} className="ml-1 text-green-700 hover:text-green-900">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        
                        {selectedPriceRange && (
                            <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                                Price: {selectedPriceRange.label}
                                <button onClick={() => setSelectedPriceRange(null)} className="ml-1 text-green-700 hover:text-green-900">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        
                        {searchQuery && (
                            <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                                Search: {searchQuery}
                                <button 
                                    onClick={() => {
                                        setSearchQuery('');
                                        navigate('/products');
                                    }} 
                                    className="ml-1 text-green-700 hover:text-green-900"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        
                        <button 
                            onClick={clearFilters}
                            className="text-red-600 text-sm font-medium hover:text-red-800 ml-auto"
                        >
                            Clear All
                        </button>
                    </div>
                )}
                
                {/* Filter Panels */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${showFilters ? 'block' : 'hidden md:grid'}`}>
                    {/* Category Filter */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">Categories</h3>
                            <button 
                                onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                                className="text-gray-500 hover:text-green-700"
                            >
                                {showCategoryFilter ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                        </div>
                        
                        {showCategoryFilter && (
                            <div className="space-y-2">
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        navigate('/products');
                                    }}
                                    className={`block w-full text-left px-3 py-2 rounded ${selectedCategory === 'All' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
                                >
                                    All Categories
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setSelectedCategory(category.name);
                                            navigate(`/products?category=${category.id.toLowerCase()}`);
                                        }}
                                        className={`block w-full text-left px-3 py-2 rounded ${selectedCategory === category.name || selectedCategory.toLowerCase() === category.id.toLowerCase() ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Brand Filter */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-sm font-medium text-gray-700">Brands</div>
                            <button 
                                onClick={() => setShowBrandFilter(!showBrandFilter)}
                                className="text-green-600 hover:text-green-800 flex items-center text-sm"
                            >
                                {showBrandFilter ? (
                                    <>
                                        <ChevronUp className="w-4 h-4 mr-1" /> Hide
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4 mr-1" /> Show
                                    </>
                                )}
                            </button>
                        </div>
                        
                        {showBrandFilter && (
                            <div className="bg-gray-50 p-3 rounded-md max-h-60 overflow-y-auto">
                                {brands.map(brand => (
                                    <div key={brand} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded">
                                        <input
                                            type="checkbox"
                                            id={`brand-${brand}`}
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => toggleBrand(brand)}
                                            className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                                        />
                                        <label htmlFor={`brand-${brand}`} className="cursor-pointer w-full">
                                            {brand}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Price Range Filter */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-sm font-medium text-gray-700">Price Range</div>
                            <button 
                                onClick={() => setShowPriceFilter(!showPriceFilter)}
                                className="text-green-600 hover:text-green-800 flex items-center text-sm"
                            >
                                {showPriceFilter ? (
                                    <>
                                        <ChevronUp className="w-4 h-4 mr-1" /> Hide
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4 mr-1" /> Show
                                    </>
                                )}
                            </button>
                        </div>
                        
                        {showPriceFilter && (
                            <div className="bg-gray-50 p-3 rounded-md max-h-60 overflow-y-auto">
                                {priceRanges.map(range => (
                                    <div 
                                        key={range.label} 
                                        className={`px-3 py-2 rounded cursor-pointer ${selectedPriceRange === range ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
                                        onClick={() => setSelectedPriceRange(range)}
                                    >
                                        {range.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Products Results Summary */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                    {filteredProducts.length === 0 ? 'No Products Found' : 
                     `Products (${filteredProducts.length} ${filteredProducts.length === 1 ? 'result' : 'results'})`}
                </h2>
                
                {selectedCategory !== 'All' && (
                    <div className="text-sm text-gray-600">
                        Showing results for <span className="font-medium">{selectedCategory}</span>
                    </div>
                )}
            </div>

            {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="text-gray-400 mb-4">
                        <Search className="w-16 h-16 mx-auto mb-4" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                    <button 
                        onClick={clearFilters}
                        className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                    >
                        Clear All Filters
                    </button>
                </div>
            ) : (
                <>
                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                            >
                                {/* Product Image with Badges */}
                                <div className="relative pt-4 px-4">
                                    {/* Wishlist Button */}
                                    <button
                                        onClick={() => handleWishlist(product.id)}
                                        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-sm"
                                        aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                                    >
                                        {wishlist.includes(product.id) ? (
                                            <Heart className="h-5 w-5 text-red-500 fill-current" />
                                        ) : (
                                            <Heart className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                                        )}
                                    </button>
                                    
                                    {/* Discount Badge */}
                                    {product.originalPrice && product.originalPrice > product.price && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                        </div>
                                    )}
                                    
                                    {/* Product Image */}
                                    <div 
                                        className="h-48 flex items-center justify-center cursor-pointer"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                                
                                {/* Product Details */}
                                <div className="p-4">
                                    {/* Brand */}
                                    <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                                    
                                    {/* Product Name */}
                                    <h3 
                                        className="font-medium text-gray-800 mb-2 line-clamp-2 h-12 cursor-pointer hover:text-green-700"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        {product.name}
                                    </h3>
                                    
                                    {/* Ratings */}
                                    <div className="flex items-center gap-1 mb-2">
                                        <div className="flex items-center bg-green-700 text-white text-xs px-1.5 py-0.5 rounded">
                                            <span className="font-bold">{product.rating}</span>
                                            <Star className="h-3 w-3 ml-0.5" />
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            ({product.reviews} {product.reviews === 1 ? 'review' : 'reviews'})
                                        </span>
                                    </div>
                                    
                                    {/* Price */}
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
                                            {product.originalPrice && product.originalPrice > product.price && (
                                                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                            )}
                                        </div>
                                        {product.emi && (
                                            <div className="text-xs text-gray-600 mt-1">
                                                <span className="font-medium">EMI</span> from {product.emi}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Features Highlights */}
                                    {product.features && product.features.length > 0 && (
                                        <ul className="text-xs text-gray-600 mb-3 space-y-1">
                                            {product.features.slice(0, 2).map((feature, index) => (
                                                <li key={index} className="flex items-start gap-1">
                                                    <span className="text-green-600 font-bold mt-0.5">•</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => navigate(`/product/${product.id}`)}
                                            className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                                        >
                                            Details
                                        </button>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="flex-1 bg-green-600 text-white py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Quick Info Footer */}
                                <div className="bg-gray-50 px-4 py-2 text-xs text-gray-600 flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Truck className="h-3 w-3" />
                                        <span>Free Delivery</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ShieldCheck className="h-3 w-3" />
                                        <span>{product.warranty}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    {filteredProducts.length > 0 && (
                        <div className="mt-8 flex justify-center">
                            <nav className="flex items-center gap-1">
                                <button className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                                    Previous
                                </button>
                                <button className="px-3 py-1 border rounded-md bg-green-600 text-white">
                                    1
                                </button>
                                <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-50">
                                    2
                                </button>
                                <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-50">
                                    3
                                </button>
                                <span className="px-2 text-gray-500">...</span>
                                <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-50">
                                    Next
                                </button>
                            </nav>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
