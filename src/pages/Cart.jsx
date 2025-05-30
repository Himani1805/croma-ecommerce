import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const items = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const total = items.reduce((sum, item) => sum + item.price, 0);

    if (items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => navigate('/products')}>Shop Now</button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <ul className="divide-y divide-gray-200 mb-4">
                {items.map(item => (
                    <li key={item.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="h-12 w-12 object-contain" />
                            <span>{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">₹{item.price.toLocaleString()}</span>
                            <button className="text-red-500 hover:underline" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between items-center mb-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold">₹{total.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => dispatch(clearCart())}>Clear Cart</button>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1" onClick={() => navigate('/checkout')}>Checkout</button>
            </div>
        </div>
    );
}
