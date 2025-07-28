'use client';
import { useState, useEffect } from 'react';
import { AiOutlineLogin, AiOutlineLogout, AiOutlineExport, AiOutlineBarChart, AiOutlineShoppingCart } from 'react-icons/ai';
import { motion } from 'framer-motion';

export default function AdminPanel() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuth');
        if (adminAuth === 'true') {
            setIsAuthenticated(true);
            loadOrders();
        }
    }, []);

    const loadOrders = () => {
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(savedOrders);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.username === 'admin' && loginData.password === 'admin123') {
            setIsAuthenticated(true);
            localStorage.setItem('adminAuth', 'true');
            loadOrders();
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('adminAuth');
    };

    const updateOrderStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    const removeOrder = (orderId) => {
        if (window.confirm('Are you sure you want to remove this order?')) {
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            if (selectedOrder?.id === orderId) {
                setSelectedOrder(null);
            }
        }
    };

    const exportToCSV = () => {
        const headers = ['Order ID', 'Customer', 'Date', 'Total', 'Status', 'Email', 'Phone', 'Address', 'City', 'State', 'Zip Code'];
        const rows = orders.map(order => [
            order.id,
            order.name,
            new Date(order.orderDate).toLocaleDateString(),
            order.totalAmount.toFixed(2),
            order.status,
            order.email,
            order.phone,
            order.address,
            order.city,
            order.state,
            order.zipCode
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'orders_export.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    if (!isAuthenticated) {
        return (
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-500 to-purple-600'} min-h-screen flex items-center justify-center`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg w-96 max-w-md`}
                >
                    <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <button
                            type="submit"
                            className={`${darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'} w-full py-2 font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300`}
                        >
                            Login
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-100 to-purple-100'} min-h-screen p-8`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Panel</h1>
                    <div className="space-x-4">
                        <button
                            onClick={exportToCSV}
                            className={`${darkMode ? 'bg-green-600' : 'bg-green-600'} text-white px-4 py-2 rounded-xl hover:bg-green-700 transition duration-300`}
                        >
                            <AiOutlineExport className="inline-block mr-2" />
                            Export to CSV
                        </button>
                        <button
                            onClick={handleLogout}
                            className={`${darkMode ? 'bg-red-600' : 'bg-red-600'} text-white px-4 py-2 rounded-xl hover:bg-red-700 transition duration-300`}
                        >
                            <AiOutlineLogout className="inline-block mr-2" />
                            Logout
                        </button>
                        <button
                            onClick={toggleDarkMode}
                            className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition duration-300`}
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-md text-center transition duration-300 transform hover:scale-105 hover:shadow-lg">
                        <AiOutlineShoppingCart className="text-4xl text-indigo-600 mb-4" />
                        <h3 className="text-xl font-bold">Total Orders</h3>
                        <p className="text-2xl font-semibold text-indigo-600">{orders.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md text-center transition duration-300 transform hover:scale-105 hover:shadow-lg">
                        <AiOutlineBarChart className="text-4xl text-indigo-600 mb-4" />
                        <h3 className="text-xl font-bold">Total Revenue</h3>
                        <p className="text-2xl font-semibold text-indigo-600">${orders.reduce((total, order) => total + order.totalAmount, 0).toFixed(2)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md text-center transition duration-300 transform hover:scale-105 hover:shadow-lg">
                        <AiOutlineBarChart className="text-4xl text-indigo-600 mb-4" />
                        <h3 className="text-xl font-bold">Pending Orders</h3>
                        <p className="text-2xl font-semibold text-indigo-600">{orders.filter(order => order.status === 'pending').length}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-gray-600">Order ID</th>
                                    <th className="px-6 py-3 text-left text-gray-600">Customer</th>
                                    <th className="px-6 py-3 text-left text-gray-600">Date</th>
                                    <th className="px-6 py-3 text-left text-gray-600">Total</th>
                                    <th className="px-6 py-3 text-left text-gray-600">Status</th>
                                    <th className="px-6 py-3 text-left text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b hover:bg-gray-50 transition-all duration-200"
                                    >
                                        <td className="px-6 py-4 text-gray-800">{order.id}</td>
                                        <td className="px-6 py-4 text-gray-800">{order.name}</td>
                                        <td className="px-6 py-4 text-gray-800">{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-gray-800">${order.totalAmount.toFixed(2)}</td>
                                        <td className="px-6 py-3">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                className="border rounded p-2 focus:outline-none"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 space-x-2">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => removeOrder(order.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
