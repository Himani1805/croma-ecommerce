import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 pt-10 pb-6 mt-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Newsletter Subscription */}
                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h3 className="text-white text-lg font-semibold mb-1">Subscribe to our Newsletter</h3>
                            <p className="text-gray-400 text-sm">Get the latest updates, offers and exclusive deals</p>
                        </div>
                        <div className="w-full md:w-auto">
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="px-4 py-2 rounded-l-md w-full md:w-64 text-gray-800 focus:outline-none"
                                />
                                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md font-medium transition duration-200">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    {/* Column 1: About */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <img src="https://www.croma.com/assets/images/croma_logo.png" alt="Croma Logo" className="h-8" />
                            <span className="font-bold text-xl text-green-400">Croma</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            Croma is an Indian retail chain of consumer electronics and durables run by Infiniti Retail Limited, a subsidiary of the Tata Group.
                        </p>
                        <div className="flex items-center gap-4 mb-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Youtube size={18} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Shop By Category */}
                    <div>
                        <h3 className="text-white text-base font-semibold mb-4">Shop By Category</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/products?category=Mobiles" className="text-gray-400 hover:text-white transition-colors">Mobiles & Tablets</Link></li>
                            <li><Link to="/products?category=TVs" className="text-gray-400 hover:text-white transition-colors">Televisions</Link></li>
                            <li><Link to="/products?category=Headphones" className="text-gray-400 hover:text-white transition-colors">Audio & Headphones</Link></li>
                            <li><Link to="/products?category=Laptops" className="text-gray-400 hover:text-white transition-colors">Computers & Tablets</Link></li>
                            <li><Link to="/products?category=Appliances" className="text-gray-400 hover:text-white transition-colors">Home Appliances</Link></li>
                            <li><Link to="/products?category=Accessories" className="text-gray-400 hover:text-white transition-colors">Accessories</Link></li>
                            <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Kitchen Appliances</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Service */}
                    <div>
                        <h3 className="text-white text-base font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help & FAQs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Warranty Information</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Order</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Service Centers</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bulk Orders</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Extended Warranty</a></li>
                        </ul>
                    </div>

                    {/* Column 4: About Croma */}
                    <div>
                        <h3 className="text-white text-base font-semibold mb-4">About Croma</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Croma Gift Card</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">EMI Store</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Store Locator</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Croma Privileges</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Site Map</a></li>
                        </ul>
                    </div>

                    {/* Column 5: Contact Us */}
                    <div>
                        <h3 className="text-white text-base font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400">Infiniti Retail Ltd, Wadia International Centre, Pandurang Budhkar Marg, Mumbai - 400025</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-gray-400 flex-shrink-0" />
                                <span className="text-gray-400">1800 267 7777</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-gray-400 flex-shrink-0" />
                                <span className="text-gray-400">support@croma.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="border-t border-gray-700 pt-6 pb-4">
                    <h3 className="text-white text-base font-semibold mb-3">We Accept</h3>
                    <div className="flex flex-wrap gap-3">
                        <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8 w-auto bg-white rounded p-1" />
                        <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="MasterCard" className="h-8 w-auto bg-white rounded p-1" />
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968279.png" alt="PayPal" className="h-8 w-auto bg-white rounded p-1" />
                        <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="American Express" className="h-8 w-auto bg-white rounded p-1" />
                        <img src="https://cdn-icons-png.flaticon.com/512/5977/5977576.png" alt="UPI" className="h-8 w-auto bg-white rounded p-1" />
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 pt-6 mt-4 text-center">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Croma. All rights reserved. A Tata Enterprise.</div>
                        <div className="flex flex-wrap justify-center gap-4 text-xs">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Use</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Disclaimer</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
