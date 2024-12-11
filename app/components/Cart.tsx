'use client';

import { useState, useEffect } from 'react';
import { Product } from '../types2/types'; 
import { useLanguage } from '../context/LanguageContext';
import { Traducciones } from '../types2/types'; 
import es from '../translations/es.json';
import en from '../translations/en.json';

interface CartItem extends Product {
  quantity: number; 
}

const traduccionesPorIdioma: Record<string, Traducciones> = { es, en };

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { idioma, cambiarIdioma } = useLanguage();
  const traducciones = traduccionesPorIdioma[idioma] || traduccionesPorIdioma['en'];
  useEffect(() => {
    
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const uniqueCart = aggregateCartItems(storedCart);
    setCartItems(uniqueCart);
  }, []);

  
  const aggregateCartItems = (items: Product[]): CartItem[] => {
    const aggregated: Record<number, CartItem> = {};

    items.forEach((item) => {
      if (aggregated[item.id]) {
        aggregated[item.id].quantity += 1;
      } else {
        aggregated[item.id] = { ...item, quantity: 1 };
      }
    });

    return Object.values(aggregated);
  };

  const removeItem = (productId: number) => {
    const updatedCart = cartItems.filter((product) => product.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{traducciones.cart.title}</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">{traducciones.cart.empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border p-2 rounded bg-white shadow"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <div>
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p className="text-gray-700">${product.price}</p>
                  <p className="text-gray-500">{traducciones.cart.cantidad} {product.quantity}</p>
                </div>
              </div>
              <button
                className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                onClick={() => removeItem(product.id)}
              >
                {traducciones.cart.eliminar}
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        <p className="text-lg font-bold">{traducciones.cart.precio} ${calculateTotal()}</p>
      </div>
    </div>
  );
};

export default Cart;
