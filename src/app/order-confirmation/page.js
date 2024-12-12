// src/app/order-confirmation/page.js
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const OrderConfirmation = () => {
    const router = useRouter();

    // Auto-redirect after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    duration: 1
                }}
                className="text-center"
            >
                {/* Animated Checkmark */}
                <motion.svg 
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="w-64 h-64 mx-auto"
                >
                    {/* Circular Background */}
                    <motion.circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="white"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* Animated Checkmark Path */}
                    <motion.path 
                        d="M25 50 L45 70 L75 30"
                        fill="none"
                        stroke="#4CAF50"
                        strokeWidth="6"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ 
                            duration: 0.5, 
                            delay: 1 
                        }}
                    />
                </motion.svg>

                {/* Animated Text */}
                <motion.h1 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="text-4xl font-bold text-white mt-6"
                >
                    Order Confirmed
                </motion.h1>

                {/* Subtle Subtext */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="text-xl text-white/80 mt-4"
                >
                    Thank you for your purchase
                </motion.p>
            </motion.div>
        </div>
    );
};

export default OrderConfirmation;