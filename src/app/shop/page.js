 'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Generate 40+ products with static image URLs for consistent rendering
const products = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (Math.random() * 100 + 20).toFixed(2), // Random price between $20 and $1
  image: `https://picsum.photos/800/800?random=${i + 1}`, // Use i+1 instead of Math.random()
  category: ['Jackets', 'Pants', 'Sweaters', 'Shirts', 'Accessories'][Math.floor(Math.random() * 5)],
  colors: ['black', 'white', 'gray', 'navy', 'olive'].slice(0, Math.floor(Math.random() * 3) + 1),
  sizes: ['S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 3) + 1),
  rating: (Math.random() * 5).toFixed(1), // Random rating between 0 and 5
  reviews: Math.floor(Math.random() * 100), // Random number of reviews
}));

export default function ShopPage() {
  const [showAll, setShowAll] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isClient, setIsClient] = useState(false); // State to handle client-side rendering

  // Check if the component is rendered on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load cart items from local storage on page load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  // Save cart items to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === product.id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === product.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
    alert(`${product.name} added to cart!`); // Show pop-up message
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Shop</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isClient && products.slice(0, showAll ? products.length : 12).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-square">
                {/* Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800} // Specify width
                  height={800} // Specify height
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.category}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold">${product.price}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>{product.rating} ({product.reviews} reviews)</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full px-4 py-2 bg-[#a78bfa] text-white rounded-full hover:bg-[#8b5cf6] transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-[#a78bfa] text-white rounded-full hover:bg-[#8b5cf6] transition-colors"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
