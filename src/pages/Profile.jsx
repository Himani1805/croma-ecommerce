import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
    const user = useSelector(state => state.auth.user);
    if (!user) return <div className="p-8">Please login to view your profile.</div>;
    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded shadow mt-8">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <div className="mb-2"><span className="font-semibold">Name:</span> {user.name}</div>
            <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
            <div className="mb-2"><span className="font-semibold">Role:</span> {user.role || 'User'}</div>
        </div>
    );
}
