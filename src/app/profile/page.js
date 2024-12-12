// src/app/profile/page.js
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';
import { 
    FaUser, 
    FaShoppingBag, 
    FaSignOutAlt,
    FaBox,
    FaCalendar,
    FaMoneyBillWave
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProfilePage = () => {
    const { user, isLoading } = useUser();
    const [activeTab, setActiveTab] = useState('profile');
    const [orders, setOrders] = useState([]);

    // Simulated order data
    useEffect(() => {
        const mockOrders = [
            {
                id: '1',
                date: '2023-06-15',
                total: 129.99,
                status: 'Delivered',
                items: [
                    { 
                        id: 'p1', 
                        name: 'Classic White T-Shirt', 
                        price: 49.99 
                    },
                    { 
                        id: 'p2', 
                        name: 'Denim Jacket', 
                        price: 79.99 
                    }
                ]
            },
            {
                id: '2',
                date: '2023-05-20',
                total: 89.50,
                status: 'Shipped',
                items: [
                    { 
                        id: 'p3', 
                        name: 'Leather Sneakers', 
                        price: 89.50 
                    }
                ]
            }
        ];

        setOrders(mockOrders);
    }, []);

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
                <div className="animate-pulse w-24 h-24 bg-[#E1E4E8] rounded-full"></div>
            </div>
        );
    }

    // Not logged in state
    if (!user) {
        return (
            <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-[#E1E4E8]">
                    <div className="w-24 h-24 bg-[#3498DB] text-white rounded-full mx-auto mb-4 flex items-center justify-center">
                        <FaUser className="text-4xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">Please Login</h2>
                    <a 
                        href="/api/auth/login" 
                        className="bg-[#3498DB] text-white px-8 py-3 rounded-full hover:bg-[#2980B9] transition duration-300"
                    >
                        Login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F7FA] py-12 px-4 lg:px-8 font-['Inter']">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-[#E1E4E8] overflow-hidden">
                {/* Navigation */}
                <div className="flex border-b border-[#E1E4E8]">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`
                            flex items-center justify-center w-1/2 py-4 transition
                            ${activeTab === 'profile' 
                                ? 'bg-[#3498DB] text-white' 
                                : 'text-[#2C3E50] hover:bg-[#F5F7FA]'
                            }
                        `}
                    >
                        <FaUser className="mr-2" /> Personal Details
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`
                            flex items-center justify-center w-1/2 py-4 transition
                            ${activeTab === 'orders' 
                                ? 'bg-[#3498DB] text-white' 
                                : 'text-[#2C3E50] hover:bg-[#F5F7FA]'
                            }
                        `}
                    >
                        <FaShoppingBag className="mr-2" /> Orders
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-8">
                    {activeTab === 'profile' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center mb-8">
                                <div className="w-24 h-24 rounded-full mr-6 bg-[#3498DB] text-white flex items-center justify-center">
                                    {user.picture ? (
                                        <div 
                                            className="w-full h-full rounded-full bg-cover bg-center"
                                            style={{ backgroundImage: `url(${user.picture})` }}
                                        />
                                    ) : (
                                        <FaUser className="text-4xl" />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-[#2C3E50]">{user.name}</h2>
                                    <p className="text-[#7F8C8D]">{user.email}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[#2C3E50] mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={user.name} 
                                        readOnly 
                                        className="w-full p-3 bg-[#F5F7FA] rounded-lg border border-[#E1E4E8] focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#2C3E50] mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={user.email} 
                                        readOnly 
                                        className="w-full p-3 bg-[#F5F7FA] rounded-lg border border-[#E1E4E8] focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 text-right">
                                <a 
                                    href="/api/auth/logout"
                                    className="text-[#E74C3C] hover:text-[#C0392B] flex items-center justify-end"
                                >
                                    <FaSignOutAlt className="mr-2" /> Logout
                                </a>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'orders' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-[#2C3E50]">Your Orders</h2>
                            {orders.length === 0 ? (
                                <p className="text-[#7F8C8D]">No orders found.</p>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div 
                                            key={order.id} 
                                            className="bg-[#F5F7FA] rounded-lg p-4 border border-[#E1E4E8]"
                                        >
                                            <div className="flex justify-between mb-4">
                                                <div className="flex items-center">
                                                    <FaBox className="mr-2 text-[#3498DB]" />
                                                    <span className="font-semibold text-[#2C3E50]">Order #{order.id}</span>
                                                </div>
                                                <span 
                                                    className={`
                                                        px-3 py-1 rounded-full text-sm
                                                        ${order.status === 'Delivered' 
                                                            ? 'bg-[#2ECC71] text-white' 
                                                            : 'bg-[#F39C12] text-white'
                                                        }
                                                    `}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    {order.items.map((item, index) => (
                                                        <div 
                                                            key={item.id}
                                                            className={`
                                                                w-12 h-12 rounded-full bg-[#3498DB] text-white 
                                                                flex items-center justify-center
                                                                ${index > 0 ? '-ml-4' : ''}
                                                            `}
                                                        >
                                                            {item.name.charAt(0)}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center text-[#7F8C8D] mb-1">
                                                        <FaCalendar className="mr-2" />
                                                        {order.date}
                                                    </div>
                                                    <div className="flex items-center font-bold text-[#2C3E50]">
                                                        <FaMoneyBillWave className="mr-2" />
                                                        ${order.total.toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;