'use client'
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types'
import Swal from "sweetalert2"

const API_URL = 'https://fakestoreapi.com/products'

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = (product: Product) => {
    setCart([...cart, product])
    // Usando SweetAlert2
    Swal.fire({
      title: 'Product added',
      text: `"${product.title}" has been added to cart!`,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={addToCart}
        />
      ))}
    </div>
  )
}