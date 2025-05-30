import React from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-1 px-4 text-center text-sm">
        <div className="container mx-auto">
          <p>PLAYOFF SALE | 29MAY-3JUNE | POWERED BY SAMSUNG | ICICI Bank 100% tap 3,000</p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Location */}
          <div className="flex items-center gap-6 w-full md:w-auto">
            <h1 className="text-2xl font-bold text-blue-600">croma</h1>
            
            <div className="hidden sm:flex items-center gap-1 text-gray-700">
              <FiMapPin className="text-blue-600" />
              <span>Mumbai,4000B/</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
          </div>

          {/* Right Side Items */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              TATA NEU
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-700 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
              <button className="p-2 text-gray-700 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;