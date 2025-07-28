'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CollectionsPage() {
  const [cartItems, setCartItems] = useState([]);

  const products = [
    {
      id: 1,
      name: 'Classic Black Hoodie',
      price: 199,
      image: 'https://images.bewakoof.com/t640/men-s-salsa-red-log-off-graphic-printed-oversized-t-shirt-661990-1742392061-1.jpg',
    },
    {
      id: 2,
      name: 'Premium Grey Sweatshirt',
      price: 249,
      image: 'https://images.bewakoof.com/t640/women-s-skipper-blue-blossom-graphic-printed-top-662758-1744194890-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/women-s-pink-slim-fit-corset-top-634010-1719331288-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/men-s-vapour-blue-itachi-akatsuki-graphic-printed-oversized-t-shirt-662007-1744002486-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/women-s-apricot-orange-breaking-graphic-printed-oversized-top-662728-1744192103-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/women-s-pink-friends-gang-logo-graphic-printed-oversized-short-top-589815-1721651493-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/women-s-white-all-over-printed-short-top-659902-1743758980-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/women-s-white-all-over-printed-top-659916-1743757340-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/women-s-purple-all-over-printed-slim-fit-short-top-615017-1721131022-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/men-s-white-blue-tie-dye-oversized-shirt-586221-1722596832-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/men-s-red-checked-oversized-shirt-649868-1734503977-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/men-s-rust-orange-striped-oversized-shirt-646391-1730892436-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/men-s-indigo-blue-washed-shirt-646370-1736313365-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/men-s-gardenia-cyber-samurai-graphic-printed-oversized-hoodies-625389-1732791916-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/men-s-black-blue-wayne-color-block-oversized-hoodies-597141-1726047092-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/men-s-brown-graphic-printed-oversized-sweatshirt-644530-1735297852-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/men-s-maroon-textured-oversized-sweatshirt-596423-1726046930-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/men-s-maroon-real-slim-shady-graphic-printed-oversized-sweatshirt-625401-1719835224-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/women-aop-oversize-t-shirt-2-580367-1685446636-1.jpg',
    },
    {
      id: 3,
      name: 'Stylish Denim Jacket',
      price: 349,
      image: 'https://images.bewakoof.com/t640/women-s-blue-round-in-bugs-graphic-printed-oversized-short-top-589789-1707221362-1.jpg',
    },
    // Add 17 more manually...
  ];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-16">
          New Arrivals ✨
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-3xl p-4 bg-white/30 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-indigo-400"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="mt-5 text-center">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-1 text-lg">${product.price}</p>
              </div>

              {/* NICE BUTTON BELOW */}
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => addToCart(product)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-indigo-400/50 hover:scale-105 transition-all duration-300"
                >
                  Add to Cart 🛒
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
