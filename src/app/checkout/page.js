'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Checkout() {
    const router = useRouter();
    const [orderDetails, setOrderDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [flipCard, setFlipCard] = useState(false);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(savedCart);
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const cardNumberRegex = /^[0-9]{16}$/;
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        const cvvRegex = /^[0-9]{3,4}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(orderDetails.email)) {
            setError('Invalid email address');
            return false;
        }
        if (!phoneRegex.test(orderDetails.phone)) {
            setError('Invalid phone number');
            return false;
        }
        if (!cardNumberRegex.test(orderDetails.cardNumber.replace(/\s/g, ''))) {
            setError('Invalid card number');
            return false;
        }
        if (!expiryDateRegex.test(orderDetails.expiryDate)) {
            setError('Invalid expiry date (MM/YY)');
            return false;
        }
        if (!cvvRegex.test(orderDetails.cvv)) {
            setError('Invalid CVV');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const orderData = {
                id: Date.now().toString(),
                ...orderDetails,
                cardNumber: `****-****-****-${orderDetails.cardNumber.slice(-4)}`,
                items: cartItems,
                totalAmount: calculateTotal(),
                status: 'pending',
                orderDate: new Date().toISOString()
            };

            const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
            const updatedOrders = [...existingOrders, orderData];
            localStorage.setItem('orders', JSON.stringify(updatedOrders));

            localStorage.removeItem('cart');
            setSuccess(true);
            setCartItems([]);

            setTimeout(() => {
                router.push('/order-sucess');
            }, 2000);

        } catch (error) {
            console.error('Checkout error:', error);
            setError('Failed to process order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Order Summary */}
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6">
                    <h3 className="text-2xl font-bold mb-4 text-indigo-600">Order Summary</h3>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500 text-center">Your cart is empty</p>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center border-b py-4">
                                    <div className="flex items-center space-x-4">
                                        {/* Display only the alt text of the image */}
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            <p className="text-sm text-gray-400">Image: {item.imageAlt}</p>
                                        </div>
                                    </div>
                                    <span className="font-semibold text-indigo-700">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                            <li className="flex justify-between font-bold text-lg text-indigo-700 border-t pt-4 mt-2">
                                <span>Total</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Payment Details */}
                <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6 text-indigo-700">Payment Details</h2>

                    {/* Credit Card Design */}
                    <div className="relative w-full h-56 mb-8">
                        <motion.div
                            animate={{ rotateY: flipCard ? 180 : 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute w-full h-full rounded-2xl bg-gradient-to-r from-blue-900 via-teal-700 to-blue-500 text-white shadow-2xl p-6 flex flex-col justify-between backface-hidden"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-semibold">SwiftPay</span>
                                <span className="text-sm">VISA</span>
                            </div>
                            <div className="text-lg tracking-widest">
                                {orderDetails.cardNumber.replace(/\d{12}(\d{4})/, "**** **** **** $1")}
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>{orderDetails.name || "CARDHOLDER"}</span>
                                <span>{orderDetails.expiryDate || "MM/YY"}</span>
                            </div>
                        </motion.div>
                    </div>

                    {success ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center"
                        >
                            <div className="text-green-500 text-6xl mb-4">✓</div>
                            <h3 className="text-2xl font-semibold mb-2">Order Confirmed!</h3>
                            <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
                            <button
                                onClick={() => router.push('/')}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                            >
                                Continue Shopping
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                required
                                className="input-field"
                                value={orderDetails.name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="input-field"
                                value={orderDetails.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                required
                                className="input-field"
                                value={orderDetails.phone}
                                onChange={handleInputChange}
                            />

                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                required
                                className="input-field"
                                value={orderDetails.address}
                                onChange={handleInputChange}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    required
                                    className="input-field"
                                    value={orderDetails.city}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    required
                                    className="input-field"
                                    value={orderDetails.state}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="zipCode"
                                    placeholder="ZIP Code"
                                    required
                                    className="input-field"
                                    value={orderDetails.zipCode}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Card Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    required
                                    maxLength="16"
                                    className="input-field"
                                    value={orderDetails.cardNumber}
                                    onChange={handleInputChange}
                                    onFocus={() => setFlipCard(false)}
                                />
                                <input
                                    type="text"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    required
                                    className="input-field"
                                    value={orderDetails.expiryDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <input
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                required
                                maxLength="4"
                                className="input-field"
                                value={orderDetails.cvv}
                                onChange={handleInputChange}
                                onFocus={() => setFlipCard(true)}
                            />

                            {error && (
                                <div className="text-red-500 text-sm">{error}</div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                            >
                                {loading ? 'Processing...' : `Pay $${calculateTotal().toFixed(2)}`}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
