// src/app/login/page.js
'use client';

import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
    FaUser, 
    FaLock, 
    FaGoogle, 
    FaGithub 
} from 'react-icons/fa';

const LoginPage = () => {
    const { user, isLoading } = useUser();
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push('/profile');
        }
    }, [user]);

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-pulse w-16 h-16 bg-indigo-500 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                }}
                className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-100"
            >
                {/* Header Section */}
                <div className="text-center">
                    <div className="mx-auto h-20 w-20 bg-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                        <FaUser className="text-white text-3xl" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                        Welcome
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Sign in to continue
                    </p>
                </div>

                {/* Social Login Section */}
                <div className="space-y-4">
                    {/* Google Login */}
                    <motion.a
                        href="/api/auth/login?returnTo=/profile"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex items-center justify-center 
                            bg-white border border-gray-200 
                            text-gray-700 p-4 rounded-xl 
                            hover:bg-gray-50 transition 
                            shadow-sm hover:shadow-md"
                    >
                        <FaGoogle className="mr-3 text-red-500 text-xl" />
                        Continue with Google
                    </motion.a>

                    {/* GitHub Login */}
                    <motion.a
                        href="/api/auth/login?connection=github&returnTo=/profile"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex items-center justify-center 
                            bg-white border border-gray-200 
                            text-gray-700 p-4 rounded-xl 
                            hover:bg-gray-50 transition 
                            shadow-sm hover:shadow-md"
                    >
                        <FaGithub className="mr-3 text-xl" />
                        Continue with GitHub
                    </motion.a>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center my-6">
                    <div className="w-full border-t border-gray-200"></div>
                    <span className="px-4 text-gray-500 bg-white">or</span>
                    <div className="w-full border-t border-gray-200"></div>
                </div>

                {/* Email Login */}
                <motion.a
                    href="/api/auth/login?returnTo=/profile"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center 
                        bg-indigo-500 text-white p-4 rounded-xl 
                        hover:bg-indigo-600 transition 
                        shadow-lg hover:shadow-xl"
                >
                    <FaLock className="mr-3 text-xl" />
                    Continue with Email
                </motion.a>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 mt-6">
                    By continuing, you agree to our 
                    <a href="#" className="ml-1 text-indigo-500 hover:underline">
                        Terms of Service
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;