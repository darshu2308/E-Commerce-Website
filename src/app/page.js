'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const mainRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  const slides = [
    {
      title: "Summer'24",
      subtitle: "Collection",
      description: "Discover the latest trends in summer fashion",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2070&q=80",
      color: "#e11d48"
    },
    {
      title: "Street",
      subtitle: "Style",
      description: "Urban fashion for the modern lifestyle",
      image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=2070&q=80",
      color: "#7c3aed"
    },
    {
      title: "Urban",
      subtitle: "Luxe",
      description: "Premium clothing for everyday elegance",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=2070&q=80",
      color: "#0891b2"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3600);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animations
  useEffect(() => {
    if (!isLoading) {
      // Animate sections on scroll
      gsap.utils.toArray('.animate-section').forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
        });
      });
    }
  }, [isLoading]);

  // Login Modal
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Logging in with:', formData);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Implement signup logic here
    console.log('Signing up with:', formData);
  };

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

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 bg-[#0f172a] z-50 flex flex-col items-center justify-center"
        exit={{
          opacity: 0,
          scale: 0.95,
          filter: 'blur(10px)',
          transition: { duration: 0.8, ease: "easeInOut" }
        }}
      >
        <div className="relative w-48 h-48">
          {/* Multiple layered glowing circles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl"
              initial={{ scale: 0.8, rotate: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: 360,
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* SVG Pattern */}
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            initial={{ rotate: 0, scale: 0.8 }}
            animate={{
              rotate: 360,
              scale: 1
            }}
            transition={{
              rotate: {
                duration: 20,
                ease: "linear",
                repeat: Infinity
              },
              scale: {
                duration: 1,
                ease: "easeOut"
              }
            }}
          >
            {/* Outer hexagon with dash animation */}
            <motion.polygon
              points="50,10 85,30 85,70 50,90 15,70 15,30"
              className="stroke-[#a78bfa] fill-none stroke-2 geometric-lines"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="300"
              initial={{ strokeDashoffset: 300 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 2,
                ease: "easeInOut"
              }}
            />

            {/* Inner connecting lines with sequential animation */}
            <g className="geometric-lines">
              {[
                "M50,10 L50,90",
                "M15,30 L85,30",
                "M15,70 L85,70",
                "M50,10 L85,30",
                "M85,30 L85,70",
                "M85,70 L50,90",
                "M50,90 L15,70",
                "M15,70 L15,30",
                "M15,30 L50,10"
              ].map((path, index) => (
                <motion.path
                  key={index}
                  d={path}
                  className="stroke-[#a78bfa] stroke-2"
                  strokeLinecap="round"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </g>

            {/* Animated connection points */}
            {[
              [50, 10], [85, 30], [85, 70], [50, 90],
              [15, 70], [15, 30], [50, 50]
            ].map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r="2"
                className="fill-white geometric-points"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 1, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </motion.svg>

          {/* Center logo */}
          <motion.div
            className="absolute inset-[28%] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                "0 0 0 0px rgba(167, 139, 250, 0.2)",
                "0 0 0 20px rgba(167, 139, 250, 0)",
              ]
            }}
            transition={{
              duration: 1,
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }
            }}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden shadow-lg">
              <motion.img
                src="https://dynamic.brandcrowd.com/asset/logo/a9bee1a8-8450-4cde-8048-e4f87522cd72/logo-search-grid-1x?logoTemplateVersion=1&v=638463330270700000&text=Trendy+Threads&colorpalette=pink"
                alt="Trendy Threads"
                className="w-4/5 h-4/5 object-contain"
                animate={{
                  opacity: [0.9, 1, 0.9],
                  scale: [0.95, 1, 0.95]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Stylized Text Animation */}
          <motion.div
            className="absolute bottom-[-120px] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div className="flex flex-col items-center gap-1">
              <motion.div
                className="flex items-center gap-3"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
              >
                {/* TRENDY */}
                {"TRENDY".split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-3xl font-bold text-white inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.2,
                      color: "#a78bfa",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 100 }}
              >
                {/* THREADS */}
                {"THREADS".split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.2 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>

              {/* Animated underline */}
              <motion.div
                className="h-[2px] bg-gradient-to-r from-purple-400 to-pink-600"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 2,
                  duration: 0.8,
                  ease: "easeOut"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <main ref={mainRef} className="bg-[#0f172a] overflow-hidden">

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Slides */}
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              scale: currentSlide === index ? 1 : 1.2,
              opacity: currentSlide === index ? 1 : 0,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
          </motion.div>
        ))}

        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 z-50">
          <div className="max-w-[1800px] mx-auto px-8">
            <div className="flex justify-between items-center h-24">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-4xl font-bold text-white tracking-wider hover:text-[#a78bfa] transition-colors"
              >
                Trendy Threads
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden md:flex items-center space-x-12"
              >
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Shop', href: '/shop' },
                  { name: 'Collections', href: '/collections' },
                  { name: 'Virtual Try On', href: '/virtualtryon' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative text-white hover:text-[#a78bfa] transition-colors text-lg group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#a78bfa] transition-all group-hover:w-full"></span>
                  </Link>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-8"
              >
                <button
                  onClick={() => setShowModal(true)}
                  className="relative px-6 py-2 bg-[#a78bfa] text-white rounded-full hover:bg-[#8b5cf6] transition-colors text-lg"
                >
                  Login
                </button>
                <button className="p-2 text-white hover:text-[#a78bfa] transition-colors relative group">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-[#a78bfa] transition-all group-hover:w-full group-hover:left-0"></span>
                </button>
                <Link
                  href="/cart"
                  className="px-6 py-2 bg-[#a78bfa] text-white rounded-full hover:bg-[#8b5cf6] transition-colors flex items-center gap-2 relative"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>Cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative h-full max-w-[1800px] mx-auto px-8">
          <div className="h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
              {/* Left Content */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 max-w-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-[2px] bg-white" />
                  <span className="text-white text-lg tracking-wider">Featured Collection</span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-8xl md:text-9xl font-bold text-white leading-none tracking-tight">
                    {slides[currentSlide].title}
                  </h2>
                  <h3 className="text-7xl md:text-8xl font-bold leading-none tracking-tight"
                    style={{ color: slides[currentSlide].color }}>
                    {slides[currentSlide].subtitle}
                  </h3>
                </div>

                <p className="text-xl text-gray-300 max-w-lg">
                  {slides[currentSlide].description}
                </p>

                <div className="flex gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/collections'}
                    className="px-8 py-4 bg-white text-black rounded-full text-lg font-medium 
                             hover:bg-[#a78bfa] hover:text-white transition-colors duration-300"
                  >
                    Shop Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/collections'}
                    className="px-8 py-4 border-2 border-white text-white rounded-full text-lg 
                             font-medium hover:bg-white/10 transition-colors duration-300"
                  >
                    Explore More
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Content - Slide Navigation */}
              <div className="hidden lg:flex justify-end items-end pb-20">
                <div className="flex flex-col items-end gap-8">
                  <div className="flex gap-4">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-12 bg-white' : 'bg-white/40'
                          }`}
                      />
                    ))}
                  </div>
                  <div className="text-white text-7xl font-bold tracking-tight">
                    {String(currentSlide + 1).padStart(2, '0')}
                    <span className="text-white/40">
                      /{String(slides.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">New Arrivals</h2>
            <p className="text-gray-600 text-lg">Discover our latest collection</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                >
                  <source src="https://video.gumlet.io/64661d8e673536e1fe9044e2/67876526a0795ccd0d9da5e4/main.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Summer Collection</h3>
                <p className="text-white/80 mb-4">Lightweight comfort for hot days</p>
                <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-[#a78bfa] hover:text-white transition-colors">
                  <Link href="/collections">
                    Shop Now
                  </Link>
                </button>
              </div>
            </motion.div>

            {/* Product Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                >
                  <source src="https://video.gumlet.io/64661d8e673536e1fe9044e2/678b5b86f9807bdad9f63cca/main.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Urban Style</h3>
                <p className="text-white/80 mb-4">Street fashion redefined</p>
                <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-[#a78bfa] hover:text-white transition-colors">
                  <Link href="/collections">
                    Shop Now
                  </Link>
                </button>
              </div>
            </motion.div>

            {/* Product Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                >
                  <source src="https://video.gumlet.io/64661d8e673536e1fe9044e2/67481cba4b7280df4b00699c/main.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2">Evening Elegance</h3>
                <p className="text-white/80 mb-4">Sophisticated evening wear</p>
                <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-[#a78bfa] hover:text-white transition-colors">
                  <Link href="/collections">
                    Shop Now
                  </Link>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Virtual Try-On Section */}
      <section className="relative bg-[#0f172a] py-20">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video Showcase */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className="aspect-[16/9] relative overflow-hidden rounded-2xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  src="https://cdn.prod.website-files.com/6139ee313144e527fc2c2fdb/614839cc6b5ac5323de25abe_virtual_tryon6_optimised-transcode.mp4"
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>

                {/* Video Overlay with Play Button */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-6 left-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="text-white/90 text-sm font-medium">Watch Demo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technology Badges */}
              <div className="absolute top-6 right-6 flex gap-3">
                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
                  AI Powered
                </span>
                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
                  Real-time
                </span>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-white"
            >
              <h2 className="text-4xl font-bold mb-6">
                Virtual Try-On Experience
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Experience clothes shopping like never before with our AI-powered virtual try-on technology.
                See how garments fit and look on you in real-time, making online shopping more confident and enjoyable.
              </p>

              {/* Feature List */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Real-Time Visualization</h3>
                    <p className="text-gray-400">See how clothes fit and move with you instantly</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Accurate Measurements</h3>
                    <p className="text-gray-400">Advanced AI ensures perfect size recommendations</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Mobile Compatible</h3>
                    <p className="text-gray-400">Try on clothes anywhere, anytime on any device</p>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/virtualtryon'}
                className="mt-10 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium 
    hover:shadow-lg hover:shadow-purple-500/30 transition-shadow"
              >
                Try It Now
              </motion.button>
            </motion.div>

          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-b from-purple-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-t from-blue-500/20 to-transparent rounded-full blur-3xl" />
        </div>
      </section>

      {/* Trending Collections Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold mb-4">Trending Now</h2>
              <p className="text-gray-600 text-lg">Discover this week's most coveted styles</p>
            </div>
            <button className="mt-4 md:mt-0 flex items-center gap-2 text-black hover:text-gray-600 transition-colors">
              View All Collections
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Trending Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4">
                <img
                  src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1725371336_3762182.jpg?format=webp&w=480&dpr=1.3"
                  alt="Urban Essentials Collection"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium">
                    New Arrival
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Urban Essentials Collection</h3>
                <p className="text-gray-600">Modern streetwear basics</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">$129.00</span>
                  <span className="text-sm text-gray-500 line-through">$159.00</span>
                </div>
              </div>
            </motion.div>

            {/* Trending Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4">
                <img
                  src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1739009061_4669517.jpg?format=webp&w=480&dpr=1.3"
                  alt="Premium Denim Collection"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-black/90 text-white rounded-full text-sm font-medium">
                    Trending
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Premium Denim Collection</h3>
                <p className="text-gray-600">Sustainable comfort wear</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">$189.00</span>
                  <span className="text-sm text-gray-500 line-through">$229.00</span>
                </div>
              </div>
            </motion.div>

            {/* Trending Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4">
                <img
                  src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1722234500_6297243.jpg?format=webp&w=480&dpr=1.3"
                  alt="Athleisure Collection"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />    
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-red-500/90 text-white rounded-full text-sm font-medium">
                    Best Seller
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Athleisure Collection</h3>
                <p className="text-gray-600">Performance meets style</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">$149.00</span>
                  <span className="text-sm text-gray-500 line-through">$199.00</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Products Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Premium Collection</h2>
            <p className="text-gray-600 text-lg">Discover our handpicked selection</p>
          </motion.div>



          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Premium Leather Jacket',
                price: '$299',
                image: 'https://images.bewakoof.com/t640/men-s-black-red-hulk-graphic-printed-oversized-acid-wash-t-shirt-662702-1739455028-1.jpg',
                tag: 'Best Seller',
                colors: ['#000000', '#A52A2A', '#D3D3D3']
              },
              {
                name: 'Designer Denim Jacket',
                price: '$199',
                image: 'https://images.bewakoof.com/t1080/men-s-gardenia-all-over-printed-oversized-hoodies-596549-1706700688-7.jpg',
                tag: 'New',
                colors: ['#000080', '#4169E1', '#87CEEB']
              },
              {
                name: 'Casual Blazer',
                price: '$249',
                image: 'https://images.bewakoof.com/t1080/men-s-white-camo-oversized-hoodie-365022-1703689552-2.jpg',
                tag: 'Trending',
                colors: ['#1a1a1a', '#4A4A4A', '#808080']
              },
              {
                name: 'Premium Wool Coat',
                price: '$399',
                image: 'https://images.bewakoof.com/t1080/men-s-white-garfield-graphic-printed-oversized-shirt-586216-1704957983-4.jpg',
                tag: 'Limited',
                colors: ['#8B4513', '#DEB887', '#F5DEB3']
              },
              {
                name: 'Streetwear Hoodie',
                price: '$129',
                image: 'https://images.bewakoof.com/t1080/men-s-white-textured-shirt-chalk-whites-660974-1737538163-2.jpg',
                tag: 'Popular',
                colors: ['#000000', '#808080', '#C0C0C0']
              },
              {
                name: 'Designer Sweater',
                price: '$179',
                image: 'https://images.bewakoof.com/t1080/men-s-ginger-root-brown-super-loose-fit-cargo-joggers-646427-1732528197-1.jpg',
                tag: 'New',
                colors: ['#2F4F4F', '#708090', '#778899']
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={`${product.image}?auto=format&fit=crop&w=800&q=80`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Product Tag */}
                  <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                    <span className="text-sm font-semibold text-[#0f172a]">
                      {product.tag}
                    </span>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white rounded-full shadow-lg hover:bg-[#a78bfa] hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white rounded-full shadow-lg hover:bg-[#a78bfa] hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7 1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Product Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 via-black/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                        <p className="text-white/90 text-lg">{product.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href="/viewpage"
                          className="bg-white text-black px-6 py-2 rounded-full hover:bg-[#a78bfa] hover:text-white transition-colors"
                        >
                          View Details
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product)}
                          className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-[#a78bfa] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>

                    {/* Color Options */}
                    <div className="flex gap-2 mt-4">
                      {product.colors.map((color, colorIndex) => (
                        <motion.button
                          key={colorIndex}
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-[#0f172a] text-white rounded-full font-semibold text-lg hover:bg-[#1e293b] transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-[#0f172a]/20"
            >
              View All Products
            </motion.button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-black text-white animate-section">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-4xl font-bold">Join Our Fashion Community</h2>
            <p className="text-gray-300">
              Subscribe to get exclusive offers, early access to new collections,
              and style tips from our experts.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-black rounded-full font-semibold"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Trendy Threads</h3>
              <p className="text-gray-400 leading-relaxed">
                We bring you the latest fashion trends with a focus on quality and sustainability.
                Your style, our passion.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shop</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Collections</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Virtual Try On</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Information</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400">Subscribe to get updates on new arrivals and special offers.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-l-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#a78bfa] text-white rounded-r-lg hover:bg-[#8b5cf6] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TRENDY THREADS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{showSignup ? 'Create Account' : 'Welcome Back'}</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowSignup(false);
                  setError('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={showSignup ? handleSignup : handleLogin} className="space-y-4">
              {showSignup && (
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a78bfa]"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a78bfa]"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a78bfa]"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {showSignup && (
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a78bfa]"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button
                type="submit"
                className="w-full bg-[#a78bfa] text-white py-2 rounded-lg hover:bg-[#8b5cf6] transition-colors"
              >
                {showSignup ? 'Sign Up' : 'Login'}
              </button>
            </form>

            <div className="mt-4 text-center text-sm">
              {showSignup ? (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => setShowSignup(false)}
                    className="text-[#a78bfa] hover:text-[#8b5cf6] font-medium"
                  >
                    Login here
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setShowSignup(true)}
                    className="text-[#a78bfa] hover:text-[#8b5cf6] font-medium"
                  >
                    Sign up here
                  </button>
                </p>
              )}
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0 0 0 0 0 0z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.438 0-.816.378-.816.816v3.264H9.072c-.438 0-.816.378-.816.816s.378.816.816.816h2.264v3.264c0 .438.378.816.816.816s.816-.378.816-.816v-3.264h2.264c.438 0 .816-.378.816-.816s-.378-.816-.816-.816h-2.264V7.712c0-.438-.378-.816-.816-.816zM12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.438 0-.816.378-.816.816v3.264H9.072c-.438 0-.816.378-.816.816s.378.816.816.816h2.264v3.264c0 .438.378.816.816.816s.816-.378.816-.816v-3.264h2.264c.438 0 .816-.378.816-.816s-.378-.816-.816-.816h-2.264V7.712c0-.438-.378-.816-.816-.816zM12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}