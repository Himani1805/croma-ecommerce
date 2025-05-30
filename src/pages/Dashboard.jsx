import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Dashboard() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-8">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name || 'User'}!</h2>
            <p className="mb-4">Email: {user?.email}</p>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>
    );
}
