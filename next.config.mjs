/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'picsum.photos',
        'source.unsplash.com',
        'images.bewakoof.com', // For placeholder images
        'images.unsplash.com', // For Unsplash images (if needed in the future)
        'res.cloudinary.com', // For Cloudinary images (if needed in the future)
        'lh3.googleusercontent.com', // For Google user profile images (if needed)
        'avatars.githubusercontent.com',
        'assets.grok.com',
        'img.theloom.in',// For GitHub avatars (if needed)
      ],
      formats: ['image/webp'], // Optimize images to WebP format
      deviceSizes: [320, 420, 768, 1024, 1200], // Default device sizes for responsive images
      imageSizes: [16, 32, 48, 64, 96], // Default image sizes for srcset
      minimumCacheTTL: 60, // Minimum cache TTL in seconds
    },
    reactStrictMode: true, // Enable React Strict Mode
    swcMinify: true, // Use SWC for minification
    compress: true, // Enable compression for better performance
    poweredByHeader: false, // Remove the "X-Powered-By" header for security
  };
  
  // Use ES module syntax for .mjs files
  export default nextConfig;