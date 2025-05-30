# Croma Clone - Modern E-commerce Platform

![Croma Clone](https://www.croma.com/assets/images/croma_logo.png)

A modern, responsive e-commerce web application built with React, Redux, and Tailwind CSS. This project is a clone of the Croma website, an Indian electronics retail platform, featuring a comprehensive shopping experience with product browsing, filtering, cart management, and more.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [Workflow](#workflow)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Navigation & UI
- **Modern Navbar** with two-tier navigation system
- **Responsive Design** that works on mobile, tablet, and desktop
- **Category Navigation** for easy product browsing
- **Search Functionality** to find products quickly

### Product Browsing
- **Product Listing** with grid layout and card design
- **Advanced Filtering** by category, brand, and price range
- **Sorting Options** including price, name, and ratings
- **Pagination** for browsing through large product collections

### Product Details
- **Comprehensive Product View** with images, specifications, and features
- **Image Gallery** with thumbnail navigation
- **Product Reviews** system with ratings
- **Related Products** suggestions

### Shopping Experience
- **Cart Management** with add, remove, and quantity adjustment
- **Wishlist** functionality for saving favorite products
- **User Authentication** for personalized experience
- **Order Management** for tracking purchases

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.jsx        # Navigation bar component
│   ├── Footer.jsx        # Footer component
│   └── ...               # Other components
├── pages/                # Page components
│   ├── Products.jsx      # Products listing page
│   ├── ProductSingle.jsx # Single product page
│   ├── Cart.jsx          # Shopping cart page
│   └── ...               # Other pages
├── slices/               # Redux slices
│   ├── productSlice.js   # Product state management
│   ├── cartSlice.js      # Cart state management
│   └── ...               # Other slices
├── data/                 # Data and API services
│   └── products.js       # Product data and API functions
├── App.jsx               # Main application component
└── main.jsx             # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/croma-clone.git
   cd croma-clone
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🔄 API Integration

The application uses DummyJSON API for product data. The API endpoints are abstracted in the `src/data/products.js` file, which provides functions for:

- Fetching all products
- Fetching a single product by ID
- Filtering products by category
- Searching products

The data is transformed to match the application's schema, including:

- Converting prices from USD to INR
- Calculating discount percentages
- Mapping categories to the application's category structure
- Generating additional product information like EMI options and warranties

## 🔄 Workflow

### User Flow

1. **Home Page**: Users land on the home page with featured categories and products
2. **Browse Products**: Users can browse products by category or use search/filters
3. **View Product**: Users can view detailed product information
4. **Add to Cart**: Users can add products to cart or wishlist
5. **Checkout**: Users can proceed to checkout and place orders

### Development Workflow

1. **Component Development**: Build reusable UI components
2. **Page Integration**: Assemble components into full pages
3. **State Management**: Implement Redux for state management
4. **API Integration**: Connect to backend services
5. **Testing & Optimization**: Ensure performance and reliability

## 📸 Screenshots

*(Add screenshots of your application here)*

## 🔮 Future Enhancements

- User authentication with JWT
- Payment gateway integration
- Order tracking system
- Product reviews and ratings system
- Admin dashboard for product management
- Performance optimizations with React.lazy and Suspense
- Unit and integration testing

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Croma](https://www.croma.com/) for design inspiration
- [DummyJSON](https://dummyjson.com/) for the mock API
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide React](https://lucide.dev/) for the beautiful icons

