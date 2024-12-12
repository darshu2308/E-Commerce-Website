// src/app/page.js
'use client';

import { useEffect, useState } from 'react';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    // Array of images for the slider
    const images = [
        {
            src: "https://i.pinimg.com/originals/75/1d/2b/751d2b30f041d6a7ec336dbdef797311.jpg",
        },
        {
            src: "https://thumbs.dreamstime.com/z/concept-holiday-shopping-advertising-big-sale-banner-background-marketing-poster-web-page-102874907.jpg",
        },
        {
            src: "https://img.freepik.com/free-vector/abstract-fashion-monsoon-sale-banner-offer-discount-business-background-free-vector_1340-22460.jpg"
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="bg-gray-50 font-sans">
            {/* Promotional Slider */}
            <section className="relative">
                <div className="bg-cover bg-center h-[80vh]" style={{ backgroundImage: `url(${images[currentIndex].src})` }}>
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-center text-white z-10">
                        <h2 className="text-4xl md:text-5xl font-bold">{images[currentIndex].title}</h2>
                        <p className="mt-2 text-lg">{images[currentIndex].description}</p>
                        <a href="/products" className="mt-4 inline-block bg-[#EED3B1] text-[#1F4529] px-6 py-3 rounded-lg hover:bg-[#D0B8A8] transition duration-300">
                            Shop Now
                        </a>
                    </div>
                </div>
                {/* Navigation Buttons */}
                <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-3 shadow-lg hover:bg-gray-200 transition duration-300">
                    &#10094; {/* Left Arrow */}
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-3 shadow-lg hover:bg-gray-200 transition duration-300">
                    &#10095; {/* Right Arrow */}
                </button>
            </section>

           <section className="bg-gray-100 text-center p-8 mt-8">
                <h2 className="text-3xl font-bold">Why Shop With Us?</h2>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Quality Products</h3>
                        <p className="mt-2">We offer a wide range of high-quality products that meet your needs.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Fast Shipping</h3>
                        <p className="mt-2">Get your orders delivered quickly and efficiently.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Customer Support</h3>
                        <p className="mt-2">Our dedicated support team is here to help you with any inquiries.</p>
                    </div>
                </div>
            </section>
            {/* Featured Products Section */}
            <main className="container mx-auto p-8">
                <h2 className="text-4xl font-bold text-center mb-6">Featured Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg border border-gray-300 transition-transform duration-300 hover:scale-105">
                            <img src={product.image} alt={product.title} className="h-48 w-full object-cover rounded-t-lg" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
                                <p className="mt-2 text-xl font-semibold text-gray-800">${product.price}</p>
                                <button className="mt-4 bg-[#1F4529] text-white px-4 py-2 rounded transition duration-300 hover:bg-[#C5705D]">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
             

            {/* Additional Content Section */}
             <section className="bg-gray-200 text-center p-8 mt-8">
                <h2 className="text-3xl font-bold">Explore Our Collections</h2>
                <p className="mt-2">From casual wear to formal attire, we have something for everyone.</p>
                <p className="mt-2">Shop now and elevate your wardrobe with our latest styles!</p>
                <a href="/products" className="mt-4 inline-block bg-[#EED3B1] text-[#1F4529] px-6 py-3 rounded-lg hover:bg-[#D0B8A8] transition duration-300">
                    Shop Now
                </a>
            </section>

            {/* Newsletter Section */}
            <section className="bg-gray-200 text-center p-8 mt-8">
                <h2 className="text-3xl font-bold">Subscribe to Our Newsletter</h2>
                <p className="mt-2">Get the latest updates and exclusive offers.</p>
                <input type="email" placeholder="Enter your email" className="mt-4 p-2 rounded border border-gray-300" />
                <button className="ml-2 bg-[#1F4529] text-white px-4 py-2 rounded transition duration-300 hover:bg-[#C5705D]">
                    Subscribe
                </button>
            </section>
        </div>
    );
};

export default HomePage;