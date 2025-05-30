import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const categories = [
    'Mobiles',
    'Laptops',
    'Headphones',
    'Accessories',
    'TVs',
    'Appliances',
];

export default function Sidebar() {
    const location = useLocation();
    // Hide sidebar on login/signup/dashboard/order pages
    if (["/login", "/signup", "/dashboard", "/orders", "/order-confirm", "/checkout", "/cart"].includes(location.pathname)) {
        return null;
    }
    return (
        <aside className="hidden md:block w-56 bg-gray-50 border-r min-h-[calc(100vh-4rem)] pt-8">
            <div className="font-bold text-lg mb-4 px-4 text-green-700">Categories</div>
            <ul className="space-y-2 px-4">
                {categories.map(cat => (
                    <li key={cat}>
                        <Link to="#" className="block py-1 px-2 rounded hover:bg-green-100 text-gray-700">{cat}</Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
