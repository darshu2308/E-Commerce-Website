'use client'
import { useEffect, useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...cart, product];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert(`${product.title} has been added to your cart!`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                        <h3 className="font-bold text-lg">{product.title}</h3>
                        <img src={product.image} alt={product.title} className="h-48 w-full object-cover rounded-md" />
                        <p className="mt-2 text-xl font-semibold">${product.price}</p>
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-700"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;