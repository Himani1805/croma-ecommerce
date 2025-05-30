import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../slices/productSlice';
import { addToCart } from '../slices/cartSlice';
import toast from 'react-hot-toast';
import { 
    Star, 
    Truck, 
    ShieldCheck, 
    ArrowLeft, 
    Heart, 
    Share2, 
    ChevronDown, 
    ChevronUp, 
    Loader2,
    Minus,
    Plus 
} from 'lucide-react';

// Helper for reviews in localStorage
function getReviewsKey(productId) {
    return `reviews_${productId}`;
}
function getInitialReviews(productId) {
    return JSON.parse(localStorage.getItem(getReviewsKey(productId))) || [];
}
function saveReviews(productId, reviews) {
    localStorage.setItem(getReviewsKey(productId), JSON.stringify(reviews));
}

export default function ProductSingle() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentProduct: product, loading, error } = useSelector(state => state.products);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
    const [showDescription, setShowDescription] = useState(true);
    const [showSpecifications, setShowSpecifications] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    
    // Fetch product data when component mounts
    useEffect(() => {
        dispatch(fetchProduct(Number(id)));
    }, [dispatch, id]);
    
    // Load reviews from localStorage when product data is available
    useEffect(() => {
        if (product) {
            setReviews(getInitialReviews(id));
        }
    }, [product, id]);

    const handleAddToCart = () => {
        if (product) {
            // Add the selected quantity of the product to cart
            for (let i = 0; i < quantity; i++) {
                dispatch(addToCart(product));
            }
            toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart!`);
        }
    };

    const handleReviewChange = (e) => {
        setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!reviewForm.name || !reviewForm.comment) {
            toast.error('Please fill all fields');
            return;
        }
        const newReview = {
            ...reviewForm,
            rating: Number(reviewForm.rating),
            date: new Date().toLocaleDateString(),
        };
        const updatedReviews = [newReview, ...reviews];
        setReviews(updatedReviews);
        saveReviews(id, updatedReviews);
        setReviewForm({ name: '', rating: 5, comment: '' });
        toast.success('Review added!');
    };

    // Handle quantity changes
    const increaseQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-green-600 mb-4" />
                <p className="text-gray-600 font-medium">Loading product details...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center">
                <div className="text-red-500 text-center">
                    <p className="text-xl font-semibold mb-2">Oops! Something went wrong</p>
                    <p className="text-gray-600">Error loading product: {error}</p>
                    <button
                        onClick={() => dispatch(fetchProduct(Number(id)))}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Product not found state
    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center mx-auto"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
                <button onClick={() => navigate('/products')} className="hover:text-green-700">Home</button>
                <span className="mx-2">/</span>
                <button 
                    onClick={() => navigate(`/products?category=${product.category.toLowerCase()}`)} 
                    className="hover:text-green-700"
                >
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </button>
                <span className="mx-2">/</span>
                <span className="text-gray-700 font-medium">{product.name}</span>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div>
                        {/* Main Image */}
                        <div className="mb-4 border rounded-lg p-4 flex items-center justify-center h-[400px]">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`border rounded-md p-1 h-20 w-20 flex-shrink-0 ${selectedImage === index ? 'border-green-500 border-2' : 'border-gray-200'}`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} - view ${index + 1}`}
                                            className="h-full w-full object-contain"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Share and Wishlist */}
                        <div className="flex justify-between mt-4">
                            <button className="flex items-center text-gray-600 hover:text-green-700">
                                <Share2 className="w-5 h-5 mr-1" />
                                <span className="text-sm">Share</span>
                            </button>
                            <button className="flex items-center text-gray-600 hover:text-red-500">
                                <Heart className="w-5 h-5 mr-1" />
                                <span className="text-sm">Add to Wishlist</span>
                            </button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Brand and Title */}
                        <div className="mb-4">
                            <div className="text-gray-500 text-sm mb-1">{product.brand}</div>
                            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                        </div>

                        {/* Ratings */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center bg-green-700 text-white text-sm px-2 py-0.5 rounded">
                                <span className="font-bold">{product.rating}</span>
                                <Star className="h-3 w-3 ml-0.5" />
                            </div>
                            <span className="text-sm text-gray-500">
                                {product.reviews} {product.reviews === 1 ? 'review' : 'reviews'}
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
                                {product.originalPrice && (
                                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                )}
                                {product.originalPrice && (
                                    <span className="text-sm text-green-700 font-medium">
                                        {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                                    </span>
                                )}
                            </div>
                            {product.emi && (
                                <div className="text-sm text-gray-600 mt-1">
                                    <span className="font-medium">EMI</span> {product.emi}
                                </div>
                            )}
                        </div>

                        {/* Badges */}
                        {product.badges && product.badges.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {product.badges.map((badge, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Availability */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Availability:</span>
                                <span className={`text-sm ${product.stock > 0 ? 'text-green-700' : 'text-red-600'}`}>
                                    {product.availabilityStatus}
                                </span>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <div className="text-sm font-medium mb-2">Quantity:</div>
                            <div className="flex items-center">
                                <button 
                                    onClick={decreaseQuantity}
                                    disabled={quantity <= 1}
                                    className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-l-md disabled:opacity-50"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <div className="w-12 h-10 border-t border-b border-gray-300 flex items-center justify-center text-gray-700">
                                    {quantity}
                                </div>
                                <button 
                                    onClick={increaseQuantity}
                                    disabled={quantity >= product.stock}
                                    className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-r-md disabled:opacity-50"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                className="bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    handleAddToCart();
                                    navigate('/cart');
                                }}
                                disabled={!product.inStock}
                                className="bg-orange-600 text-white py-3 px-6 rounded-md font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Delivery Info */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <div className="flex items-start gap-3 mb-3">
                                <Truck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <div className="font-medium">Free Delivery</div>
                                    <div className="text-sm text-gray-600">Delivery by 3-5 business days</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <div className="font-medium">{product.warranty}</div>
                                    <div className="text-sm text-gray-600">Know More</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                {/* Description Tab */}
                <div className="border-b pb-4 mb-4">
                    <button
                        onClick={() => setShowDescription(!showDescription)}
                        className="flex items-center justify-between w-full text-left font-medium text-lg"
                    >
                        <span>Product Description</span>
                        {showDescription ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    {showDescription && (
                        <div className="mt-4 text-gray-700 space-y-4">
                            <p>{product.description}</p>

                            {product.features && product.features.length > 0 && (
                                <div>
                                    <h3 className="font-medium mb-2">Key Features:</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {product.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Specifications Tab */}
                <div className="border-b pb-4 mb-4">
                    <button
                        onClick={() => setShowSpecifications(!showSpecifications)}
                        className="flex items-center justify-between w-full text-left font-medium text-lg"
                    >
                        <span>Specifications</span>
                        {showSpecifications ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    {showSpecifications && (
                        <div className="mt-4">
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 text-gray-600 font-medium w-1/3">Brand</td>
                                        <td className="py-2">{product.brand}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 text-gray-600 font-medium">Model</td>
                                        <td className="py-2">{product.name}</td>
                                    </tr>
                                    {product.specifications && product.specifications.sku && (
                                        <tr className="border-b">
                                            <td className="py-2 pr-4 text-gray-600 font-medium">SKU</td>
                                            <td className="py-2">{product.specifications.sku}</td>
                                        </tr>
                                    )}
                                    {product.specifications && product.specifications.weight && (
                                        <tr className="border-b">
                                            <td className="py-2 pr-4 text-gray-600 font-medium">Weight</td>
                                            <td className="py-2">{product.specifications.weight} kg</td>
                                        </tr>
                                    )}
                                    {product.specifications && product.specifications.dimensions && (
                                        <tr className="border-b">
                                            <td className="py-2 pr-4 text-gray-600 font-medium">Dimensions</td>
                                            <td className="py-2">
                                                {product.specifications.dimensions.width} ×
                                                {product.specifications.dimensions.height} ×
                                                {product.specifications.dimensions.depth} cm
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 text-gray-600 font-medium">Warranty</td>
                                        <td className="py-2">{product.warranty}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Reviews Tab */}
                <div>
                    <button
                        onClick={() => setShowReviews(!showReviews)}
                        className="flex items-center justify-between w-full text-left font-medium text-lg"
                    >
                        <span>Customer Reviews ({reviews.length})</span>
                        {showReviews ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    {showReviews && (
                        <div className="mt-4">
                            {/* Review Form */}
                            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                                <h3 className="font-semibold mb-3">Write a Review</h3>
                                <form onSubmit={handleReviewSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={reviewForm.name}
                                            onChange={handleReviewChange}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">Rating</label>
                                        <div className="flex items-center gap-1">
                                            {[5, 4, 3, 2, 1].map(num => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setReviewForm({ ...reviewForm, rating: num })}
                                                    className="focus:outline-none"
                                                >
                                                    <Star
                                                        className={`h-6 w-6 ${num <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        fill={num <= reviewForm.rating ? 'currentColor' : 'none'}
                                                    />
                                                </button>
                                            ))}
                                            <span className="ml-2 text-sm text-gray-600">{reviewForm.rating} Star{reviewForm.rating !== 1 ? 's' : ''}</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">Your Review</label>
                                        <textarea
                                            name="comment"
                                            value={reviewForm.comment}
                                            onChange={handleReviewChange}
                                            className="w-full p-2 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700 transition-colors"
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            </div>

                            {/* Reviews List */}
                            <div>
                                {reviews.length === 0 ? (
                                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                                        <p className="text-gray-500 mb-2">No reviews yet.</p>
                                        <p className="text-gray-700 font-medium">Be the first to review this product!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {reviews.map((review, index) => (
                                            <div key={index} className="border-b pb-6 last:border-b-0">
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="font-semibold">{review.name}</div>
                                                    <div className="text-sm text-gray-500">{review.date}</div>
                                                </div>
                                                <div className="flex mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            fill={i < review.rating ? 'currentColor' : 'none'}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-gray-700">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products - Placeholder */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
                <div className="text-center py-8 text-gray-500">
                    Related products will appear here
                </div>
            </div>
        </div>
    );
}
