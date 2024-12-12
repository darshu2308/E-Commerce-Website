// src/app/checkout/page.js
'use client'
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Checkout = () => {
    const { user, isLoading } = useUser();
    const router = useRouter();
    
    // State management
    const [cart, setCart] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });

    // Calculated values
    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const total = subtotal + shipping;

    // Load cart and user data
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(storedCart);

        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    // Form handling
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Checkout process
    const handleCheckout = (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }

        // Validation and order processing
        try {
            const orderDetails = {
                items: cart,
                total,
                shippingInfo: formData,
                date: new Date().toISOString()
            };

            // Clear cart and redirect
            localStorage.removeItem('cart');
            router.push('/order-confirmation');
        } catch (error) {
            console.error('Checkout error', error);
        }
    };

    // Remove item from cart
    const removeFromCart = (itemToRemove) => {
        const updatedCart = cart.filter(item => item.id !== itemToRemove.id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Loading and authentication checks
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Please Login to Checkout</h2>
                    <a 
                        href="/api/auth/login" 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                    >
                        Login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary Section */}
                <div className="bg-white shadow-xl rounded-2xl p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
                    
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty</p>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <h3 className="font-semibold">{item.title}</h3>
                                            <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Price Breakdown */}
                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between font-bold text-xl border-t pt-4">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Checkout Form Section */}
                <div className="bg-white shadow-xl rounded-2xl p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Information</h2>
                    
                    <form onSubmit={handleCheckout} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Full Name" 
                                required 
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            />
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email Address" 
                                required 
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            />
                        </div>
                        
                        <input 
                            type="text" 
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Street Address" 
                            required 
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        />
                        
                        <div className="grid md:grid-cols-3 gap-4">
                            <input 
                                type="text" 
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="City" 
                                required 
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            />
                            <input 
                                type="text" 
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                placeholder="State" 
                                required 
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            />
                            <input 
                                type="text" 
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                placeholder="Zip Code" 
                                required 
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Complete Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;