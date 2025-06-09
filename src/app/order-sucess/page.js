'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderSuccess() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Simulate confetti after load
    const timer = setTimeout(() => setShowConfetti(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className="bg-green-100 rounded-full p-6 shadow-lg mb-6"
      >
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.h1
        className="text-3xl md:text-4xl font-bold text-green-700 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Order Confirmed!
      </motion.h1>

      <motion.p
        className="text-gray-600 text-lg mb-6 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Thank you for your purchase! Your order has been placed successfully and is on its way.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition"
      >
        Continue Shopping
      </motion.button>

      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -100,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#f87171', '#facc15', '#4ade80', '#60a5fa', '#c084fc'][Math.floor(Math.random() * 5)],
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
