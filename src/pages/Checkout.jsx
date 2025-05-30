import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Checkout() {
    const items = useSelector(state => state.cart.items);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setAddress] = useState({ name: '', city: '', state: '', pincode: '' });

    const total = items.reduce((sum, item) => sum + item.price, 0);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleOrder = (e) => {
        e.preventDefault();
        if (!address.name || !address.city || !address.state || !address.pincode) {
            toast.error('Please fill all address fields');
            return;
        }
        // Save order to localStorage per user
        const ordersKey = `orders_${user.email}`;
        const orders = JSON.parse(localStorage.getItem(ordersKey)) || [];
        const newOrder = {
            id: Date.now(),
            items,
            total,
            address,
            date: new Date().toLocaleString(),
        };
        orders.push(newOrder);
        localStorage.setItem(ordersKey, JSON.stringify(orders));
        dispatch(clearCart());
        toast.success('Order placed successfully!');
        navigate('/order-confirm');
    };

    if (items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-8 text-center">
                <h2 className="text-2xl font-bold mb-4">No items in cart</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => navigate('/products')}>Shop Now</button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-8">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <form onSubmit={handleOrder} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={address.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={address.state}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={address.pincode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <div className="flex justify-between items-center font-bold">
                    <span>Total:</span>
                    <span>₹{total.toLocaleString()}</span>
                </div>
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Place Order</button>
            </form>
        </div>
    );
}
