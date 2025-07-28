'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - In a real app, this would come from an API
  useEffect(() => {
    // Simulating API call
    const mockProduct = {
      id: parseInt(id),
      name: 'Premium Product',
      price: 199.99,
      description: 'High-quality product with premium materials and craftsmanship.',
      image: 'https://picsum.photos/id/1/800/800',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['#000000', '#A52A2A', '#D3D3D3'],
      details: [
        'Premium quality materials',
        'Comfortable fit',
        'Easy to maintain',
        'Durable construction'
      ],
      reviews: [
        { user: 'John D.', rating: 5, comment: 'Great product, highly recommended!' },
        { user: 'Sarah M.', rating: 4, comment: 'Good quality but runs a bit small.' }
      ]
    };
    setProduct(mockProduct);
    setSelectedColor(mockProduct.colors[0]);
  }, [id]);

  const addToCart = () => {
    // Add to cart logic here
    alert('Product added to cart!');
  };

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-semibold text-[#a78bfa]">${product.price}</p>
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Size</h3>
              <div className="flex gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-[#a78bfa] bg-[#a78bfa] text-white shadow-lg shadow-[#a78bfa]/30'
                        : 'border-gray-300 hover:border-[#a78bfa] hover:bg-[#a78bfa]/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Color</h3>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 transform hover:scale-110 ${
                      selectedColor === color 
                        ? 'border-[#a78bfa] shadow-lg shadow-[#a78bfa]/30' 
                        : 'border-gray-300 hover:border-[#a78bfa]'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300 hover:border-[#a78bfa] hover:bg-[#a78bfa]/10 transition-all duration-300 text-xl font-semibold"
                >
                  -
                </button>
                <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300 hover:border-[#a78bfa] hover:bg-[#a78bfa]/10 transition-all duration-300 text-xl font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              className="w-full py-4 bg-[#a78bfa] text-white rounded-full font-semibold text-lg hover:bg-[#8b5cf6] transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#a78bfa]/30 active:scale-[0.98]"
            >
              Add to Cart
            </button>

            {/* Product Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{review.user}</span>
                      <div className="flex text-yellow-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 