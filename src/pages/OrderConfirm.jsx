import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderConfirm() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-white p-8 rounded shadow text-center">
                <h2 className="text-2xl font-bold mb-4 text-green-600">Order Confirmed!</h2>
                <p className="mb-4">Thank you for your purchase. Your order has been placed successfully.</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => navigate('/orders')}>View Orders</button>
            </div>
        </div>
    );
}
