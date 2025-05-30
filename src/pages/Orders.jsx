import React from 'react';
import { useSelector } from 'react-redux';

export default function Orders() {
    const user = useSelector(state => state.auth.user);
    const ordersKey = user ? `orders_${user.email}` : null;
    const orders = ordersKey ? JSON.parse(localStorage.getItem(ordersKey)) || [] : [];

    if (!user) {
        return <div className="p-8">Please login to view your orders.</div>;
    }

    if (orders.length === 0) {
        return <div className="p-8">No orders found.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            <ul className="space-y-6">
                {orders.map(order => (
                    <li key={order.id} className="border rounded p-4">
                        <div className="mb-2 font-semibold">Order ID: {order.id}</div>
                        <div className="mb-2 text-sm text-gray-500">Date: {order.date}</div>
                        <div className="mb-2">Address: {order.address.name}, {order.address.city}, {order.address.state} - {order.address.pincode}</div>
                        <div className="mb-2">Total: <span className="font-bold">₹{order.total.toLocaleString()}</span></div>
                        <div>
                            <span className="font-semibold">Items:</span>
                            <ul className="ml-4 list-disc">
                                {order.items.map(item => (
                                    <li key={item.id}>{item.name} - ₹{item.price.toLocaleString()}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
