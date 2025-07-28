'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpTrayIcon, ArrowPathIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';

const garments = [
  {
    id: 1,
    name: 'Red Moon Rider T-Shirt',
    image: 'https://images.bewakoof.com/t640/men-s-red-moon-rider-graphic-printed-oversized-t-shirt-502017-1737092523-1.jpg',
    category: 'tops',
    price: '$29.99',
  },
  {
    id: 2,
    name: 'Navy Blue Venom T-Shirt',
    image: 'https://images.bewakoof.com/t640/men-s-red-moon-rider-graphic-printed-t-shirt-475032-1737724095-1.jpg',
    category: 'tops',
    price: '$34.99',
  },
  {
    id: 3,
    name: 'Black Oversized T-Shirt',
    image: 'https://images.bewakoof.com/t640/men-s-black-t-shirts-1094-1738831726-1.jpg',
    category: 'tops',
    price: '$24.99',
  },
  {
    id: 4,
    name: 'Olive Bomber Jacket',
    image: 'https://images.bewakoof.com/t1080/men-s-baby-lavender-serenity-graphic-printed-oversized-t-shirt-645977-1735904396-1.jpg',
    category: 'outerwear',
    price: '$89.99',
  },
  {
    id: 5,
    name: 'Blue Denim Jacket',
    image: 'https://images.bewakoof.com/t640/men-s-brown-embroidered-oversized-jacket-625544-1718968411-1.jpg',
    category: 'outerwear',
    price: '$79.99',
  },
  {
    id: 6,
    name: 'Black Cargo Pants',
    image: 'https://images.bewakoof.com/t640/men-s-black-oversized-cargo-joggers-552880-1736252662-1.jpg',
    category: 'bottoms',
    price: '$49.99',
  },
  {
    id: 7,
    name: 'Grey Casual Pants',
    image: 'https://images.bewakoof.com/t1080/women-s-pink-oversized-parachute-pants-625448-1702643546-4.jpg',
    category: 'bottoms',
    price: '$44.99',
  },
  {
    id: 8,
    name: 'Floral Summer Dress',
    image: 'https://images.bewakoof.com/t640/women-s-solid-tape-tunic-300444-1660311651-1.jpg',
    category: 'dresses',
    price: '$59.99',
  },
];

export default function VirtualTryOn() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedGarment, setSelectedGarment] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showInstructions, setShowInstructions] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['all', 'tops', 'dresses', 'outerwear', 'bottoms'];
  const filteredGarments = activeCategory === 'all'
    ? garments
    : garments.filter((g) => g.category === activeCategory);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setShowInstructions(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = () => {
    if (!selectedImage || !selectedGarment) {
      setError('Please select both an image and a garment');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Store images in localStorage to guide user after redirection
      localStorage.setItem('tryOnPersonImage', selectedImage);
      localStorage.setItem('tryOnGarmentImage', selectedGarment.image);

      // Redirect to Hugging Face Kolors Virtual Try-On Space
      window.location.href = 'https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On';

      // Note: Users will need to manually upload images on the Space
      // If the Space supports URL parameters or scripting, we could automate uploads (not currently supported)
    } catch (error) {
      setError('Failed to redirect to Hugging Face. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check localStorage for result image (if redirected back)
  useEffect(() => {
    // This is a placeholder for handling results if the Space supports redirects back
    // Currently, Hugging Face Spaces don't redirect back with results
    const result = localStorage.getItem('tryOnResult');
    if (result) {
      setResultImage(result);
      localStorage.removeItem('tryOnResult');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            Virtual Fashion Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Try on clothes virtually with AI-powered technology from Hugging Face
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Upload Panel */}
          <motion.div
            className="lg:col-span-4 bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <SparklesIcon className="h-6 w-6 mr-2 text-indigo-500" />
                Upload Your Photo
              </h2>
              <AnimatePresence>
                {showInstructions && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-500 text-sm space-y-4 mb-6"
                  >
                    <p>📸 Upload a full-body photo</p>
                    <p>🧍 Stand straight with arms relaxed</p>
                    <p>✨ Use a plain background</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <label className="group relative block w-full aspect-[3/4] bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors cursor-pointer overflow-hidden">
                  {selectedImage ? (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={selectedImage}
                      alt="Selected"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                      <span className="mt-2 text-sm text-gray-500">
                        Upload or drag & drop
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
              </motion.div>
            </div>
          </motion.div>

          {/* Garment Selection Panel */}
          <motion.div
            className="lg:col-span-5 bg-white rounded-2xl shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Choose Your Style</h2>
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap
                      ${activeCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[500px] pr-2">
                <AnimatePresence>
                  {filteredGarments.map((garment) => (
                    <motion.div
                      key={garment.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      className={`relative cursor-pointer rounded-xl overflow-hidden
                        ${selectedGarment?.id === garment.id
                          ? 'ring-3 ring-indigo-600'
                          : ''}`}
                      onClick={() => setSelectedGarment(garment)}
                    >
                      <img
                        src={garment.image}
                        alt={garment.name}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white font-medium">{garment.name}</p>
                        <p className="text-indigo-300 text-sm">{garment.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Result Panel */}
          <motion.div
            className="lg:col-span-3 bg-white rounded-2xl shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Your Virtual Look</h2>
              <AnimatePresence>
                {resultImage ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <img
                      src={resultImage}
                      alt="Try-on Result"
                      className="w-full rounded-xl"
                    />
                    <motion.button
                      onClick={() => {
                        setSelectedImage(null);
                        setResultImage(null);
                        setShowInstructions(true);
                      }}
                      className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowPathIcon className="h-5 w-5 inline mr-2" />
                      Try Another
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[400px] flex items-center justify-center bg-gray-50 rounded-xl"
                  >
                    <p className="text-gray-400 text-center px-4">
                      Your virtual try-on will appear here after processing on Hugging Face
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Action Button */}
        <AnimatePresence>
          {selectedImage && selectedGarment && !resultImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 text-center"
            >
              <motion.button
                onClick={handleTryOn}
                disabled={loading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl text-lg font-semibold disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="h-5 w-5 inline mr-2 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-5 w-5 inline mr-2" />
                    Try It On
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-sm"
          >
            <strong className="font-bold">Error: </strong>
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="absolute top-0 right-0 px-3 py-2"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </motion.div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-lg font-medium">Redirecting to Hugging Face...</p>
              <p className="text-sm text-gray-500">Please wait a moment</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}