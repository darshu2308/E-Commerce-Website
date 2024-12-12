// src/app/signup/page.js
'use client';

import { motion } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';

const Signup = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Sign Up
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Create your account quickly and easily
                    </p>
                </div>

                <motion.a 
                    href="/api/auth/login"
                    whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 15px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center 
                        bg-blue-600 text-white 
                        px-6 py-3 rounded-lg 
                        transition duration-300 
                        hover:bg-blue-700 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500 
                        focus:ring-opacity-50"
                >
                    <FaUserPlus className="mr-3 text-xl" />
                    Sign Up with Auth0
                </motion.a>

                <div className="text-center text-sm text-gray-500 mt-4">
                    Already have an account? 
                    <a href="/login" className="ml-1 text-blue-600 hover:underline">
                        Log in
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signup;