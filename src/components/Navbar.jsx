import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X, MapPin, Heart, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const cartItems = useSelector(state => state.cart.items);
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            {/* Top Bar */}
            <div className="bg-gray-100 py-1 px-4 text-xs text-gray-600 hidden md:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <a href="#" className="flex items-center gap-1 hover:text-green-700">
                            <MapPin className="w-3 h-3" /> Store Locator
                        </a>
                        <a href="#" className="flex items-center gap-1 hover:text-green-700">
                            <Phone className="w-3 h-3" /> 1800 267 7777
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-green-700">EMI Store</a>
                        <a href="#" className="hover:text-green-700">Croma Gift Card</a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="w-full bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Mobile Menu Button */}
                        <div className="flex items-center gap-4">
                            <button onClick={toggleMobileMenu} className="md:hidden text-gray-700">
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                            <Link to="/products" className="flex items-center gap-2">
                                <img src="https://www.croma.com/assets/images/croma_logo.png" alt="Croma Logo" className="h-8" />
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8 relative">
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-green-700">
                                <Search className="w-5 h-5" />
                            </button>
                        </form>

                        {/* Right Navigation */}
                        <div className="flex items-center gap-5">
                            <Link to="/wishlist" className="hidden md:flex flex-col items-center text-gray-700 hover:text-green-700">
                                <Heart className="w-5 h-5" />
                                <span className="text-xs">Wishlist</span>
                            </Link>

                            <Link to="/cart" className="flex flex-col items-center text-gray-700 hover:text-green-700 relative">
                                <ShoppingCart className="w-5 h-5" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                                <span className="text-xs">Cart</span>
                            </Link>

                            {user ? (
                                <div className="flex flex-col items-center text-gray-700 hover:text-green-700 cursor-pointer"
                                     onClick={() => navigate('/dashboard')}>
                                    <User className="w-5 h-5" />
                                    <span className="text-xs truncate max-w-[60px]">{user.name}</span>
                                </div>
                            ) : (
                                <Link to="/login" className="flex flex-col items-center text-gray-700 hover:text-green-700">
                                    <User className="w-5 h-5" />
                                    <span className="text-xs">Login</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Category Navigation */}
                    <div className="hidden md:flex items-center justify-between py-2 border-t text-sm">
                        <div className="flex items-center space-x-6">
                            <Link to="/products?category=mobiles" className="hover:text-green-700">Mobiles</Link>
                            <Link to="/products?category=laptops" className="hover:text-green-700">Laptops</Link>
                            <Link to="/products?category=tvs" className="hover:text-green-700">TVs</Link>
                            <Link to="/products?category=audio" className="hover:text-green-700">Audio</Link>
                            <Link to="/products?category=fashion" className="hover:text-green-700">Fashion</Link>
                            <Link to="/products?category=accessories" className="hover:text-green-700">Accessories</Link>
                            <Link to="/products?category=other" className="hover:text-green-700">Other</Link>
                            <Link to="/products" className="text-green-700 font-medium">Deal of the Day</Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <form onSubmit={handleSearch} className="p-4 border-b">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="What are you looking for?"
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="absolute right-0 top-0 h-full px-4 text-gray-500">
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                        <div className="py-2">
                            <Link to="/products?category=mobiles" className="block px-4 py-2 hover:bg-gray-100">Mobiles</Link>
                            <Link to="/products?category=laptops" className="block px-4 py-2 hover:bg-gray-100">Laptops</Link>
                            <Link to="/products?category=tvs" className="block px-4 py-2 hover:bg-gray-100">TVs</Link>
                            <Link to="/products?category=audio" className="block px-4 py-2 hover:bg-gray-100">Audio</Link>
                            <Link to="/products?category=fashion" className="block px-4 py-2 hover:bg-gray-100">Fashion</Link>
                            <Link to="/products?category=accessories" className="block px-4 py-2 hover:bg-gray-100">Accessories</Link>
                            <Link to="/products?category=other" className="block px-4 py-2 hover:bg-gray-100">Other</Link>
                            <Link to="/products" className="block px-4 py-2 hover:bg-gray-100 text-green-700 font-medium">Deal of the Day</Link>
                        </div>
                        <div className="border-t py-2">
                            <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100">Wishlist</Link>
                            {!user && <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100">Sign Up</Link>}
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Store Locator</a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Customer Support</a>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
