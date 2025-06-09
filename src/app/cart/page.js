'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from local storage on page load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <Link
              href="/collections"
              className="px-6 py-3 bg-[#a78bfa] text-white rounded-full hover:bg-[#8b5cf6] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-6"
                >
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                    <p className="text-gray-600 mb-4">${item.price}</p>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a78bfa]"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-semibold">${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-semibold">Free</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax</p>
                  <p className="font-semibold">$0.00</p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">Total</p>
                    <p className="text-lg font-semibold">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="w-full px-6 py-3 bg-[#a78bfa] text-white rounded-full hover:bg-[#8b5cf6] transition-colors text-center block"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}