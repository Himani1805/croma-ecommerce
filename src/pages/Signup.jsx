import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save user to localStorage (simulate DB)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.email === form.email)) {
            toast.error('User already exists');
            return;
        }
        users.push(form);
        localStorage.setItem('users', JSON.stringify(users));
        dispatch(signup(form));
        toast.success('Signup successful!');
        navigate('/dashboard');
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Sign Up</button>
                <div className="text-center text-sm mt-2">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </div>
            </form>
        </div>
    );
}
