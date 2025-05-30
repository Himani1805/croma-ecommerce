import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              {["Contact Us", "Track Order", "Return & Refund", "Delivery Information", "Help Center"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">SHOP</h3>
            <ul className="space-y-2">
              {["New Arrivals", "Best Sellers", "Deals & Promotions", "Gift Cards", "Store Locator"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">QUICK LINKS</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blog", "Sitemap", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">CONTACT US</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:support@example.com" className="hover:text-blue-600">support@example.com</a>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p>+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="font-medium mb-2">Follow Us</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-blue-600"><FaFacebook size={20} /></a>
                  <a href="#" className="text-gray-600 hover:text-blue-400"><FaTwitter size={20} /></a>
                  <a href="#" className="text-gray-600 hover:text-pink-600"><FaInstagram size={20} /></a>
                  <a href="#" className="text-gray-600 hover:text-red-600"><FaYoutube size={20} /></a>
                  <a href="#" className="text-gray-600 hover:text-blue-700"><FaLinkedin size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="mb-6">Get the latest updates on new products and upcoming sales</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 border border-gray-300 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p> {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;