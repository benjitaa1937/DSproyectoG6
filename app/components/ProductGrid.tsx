'use client'
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { Product } from '../types2/types'
import Swal from "sweetalert2"
import { useLanguage } from '../context/LanguageContext';
import { Traducciones } from '../types2/types'; 
import es from '../translations/es.json';
import en from '../translations/en.json';

const API_URL = 'https://fakestoreapi.com/products';


const traduccionesPorIdioma: Record<string, Traducciones> = { es, en };

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const { idioma } = useLanguage(); 
  const traducciones = traduccionesPorIdioma[idioma] || traduccionesPorIdioma['en'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        
        const translatedProducts = data.map((product: Product) => ({
          ...product,
          title: traducciones.product_names[product.id] || product.title,
          description: traducciones.product_descriptions[product.id] || product.description,
        }));

        setProducts(translatedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    fetchProducts();
  }, [idioma]); 

  const addToCart = (product: Product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...currentCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    
    Swal.fire({
      title: traducciones.alert_title,
      text: traducciones.alert_text.replace('{product}', product.title),
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={addToCart}
        />
      ))}
    </div>
  );
}