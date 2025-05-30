import { createSlice } from '@reduxjs/toolkit';

const getInitialCart = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return [];
    const cart = localStorage.getItem(`cart_${user.email}`);
    return cart ? JSON.parse(cart) : [];
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: getInitialCart(),
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) localStorage.setItem(`cart_${user.email}`, JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) localStorage.setItem(`cart_${user.email}`, JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) localStorage.removeItem(`cart_${user.email}`);
        },
        setCart: (state, action) => {
            state.items = action.payload;
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) localStorage.setItem(`cart_${user.email}`, JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
