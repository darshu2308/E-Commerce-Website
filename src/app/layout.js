// src/app/layout.js
import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { FaShoppingCart, FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function RootLayout({ children }) {
    return (
        <UserProvider>
            <html lang="en">
                <body className="flex flex-col min-h-screen font-sans bg-gray-50">
                    {/* Navbar */}
                    <nav className="bg-[#1F4529] text-[#E8ECD7] shadow-md">
                        <div className="container mx-auto flex justify-between items-center p-4">
                            <a href="/" className="text-2xl font-bold">QuickCart</a>
                            <div className="flex items-center space-x-6">
                                <a href="/products" className="hover:text-[#EED3B1] transition duration-300">Products</a>
                                <a href="/login" className="flex items-center hover:text-[#EED3B1] transition duration-300">
                                    <FaSignInAlt className="mr-1" /> Login
                                </a>
                                <a href="/signup" className="flex items-center hover:text-[#EED3B1] transition duration-300">
                                    <FaUserPlus className="mr-1" /> Sign Up
                                </a>
                                <a href="/checkout" className="flex items-center hover:text-[#EED3B1] transition duration-300">
                                    <FaShoppingCart className="mr-1" /> Checkout
                                </a>
                                <a href="/profile" className="flex items-center hover:text-[#EED3B1] transition duration-300">
                                    <FaUser className="mr-1" /> Profile
                                </a>
                            </div>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="flex-grow container mx-auto p-4">
                        {children}
                    </main>

                    {/* Footer */}
                    <footer className="bg-[#47663B] text-[#E8ECD7] p-8 mt-8 shadow-md">
                        <div className="container mx-auto text-center">
                            <h2 className="text-xl font-bold mb-4">Stay Connected</h2>
                            <p className="mb-4">Subscribe to our newsletter for the latest updates and offers!</p>
                            <div className="flex justify-center mb-4">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="p-2 rounded-l-md border border-gray-300"
                                />
                                <button className="bg-[#EED3B1] text-[#1F4529] px-4 rounded-r-md hover:bg-[#E8ECD7] transition duration-300">
                                    Subscribe
                                </button>
                            </div>
                            <p>&copy; 2023 MyStore. All rights reserved.</p>
                            <p className="mt-2">Follow us on social media!</p>
                            <div className="flex justify-center mt-2">
                                <a href="#" className="text-[#EED3B1] mx-2 hover:text-[#E8ECD7] transition duration-300">Facebook</a>
                                <a href="#" className="text-[#EED3B1] mx-2 hover:text-[#E8ECD7] transition duration-300">Twitter</a>
                                <a href="#" className="text-[#EED3B1] mx-2 hover:text-[#E8ECD7] transition duration-300">Instagram</a>
                            </div>
                            <div className="mt-4">
                                <a href="#" className="text-[#EED3B1] mx-2 hover:text-[#E8ECD7] transition duration-300">Privacy Policy</a>
                                <a href="#" className="text-[#EED3B1] mx-2 hover:text-[#E8ECD7] transition duration-300">Terms of Service</a>
                            </div>
                        </div>
                    </footer>
                </body>
            </html>
        </UserProvider>
    );
}