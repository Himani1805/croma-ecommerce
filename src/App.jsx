import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductSingle from './pages/ProductSingle';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderConfirm from './pages/OrderConfirm';

import Profile from './pages/Profile';

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-right" />
        <Navbar />
        <div className="flex flex-1">
          {/* <Sidebar /><button 
              onClick={() => navigate(`/products?category=${product.category.toLowerCase()}`)} 
              className="hover:text-green-700"
          >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </button> */}
          <main className="flex-1 p-4 bg-gray-50">
            <Routes>
              <Route path="/" element={<Navigate to="/products" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductSingle />} />
              <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
              <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
              <Route path="/order-confirm" element={<PrivateRoute><OrderConfirm /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
