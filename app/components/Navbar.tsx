// app/components/Navbar.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container">
        <div 
          className="hamburger" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776;
        </div>
        <h1 className="text-3xl font-bold">Welcome to My Store</h1>
        <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/" className="text-gray-200 hover:text-white px-5">
            Home
          </Link>
          <Link href="/products" className="text-gray-200 hover:text-white px-5">
            Products
          </Link>
          <Link href="/login" className="text-gray-200 hover:text-white px-5">
            Log in
          </Link>
          <Link href="/signup" className="text-gray-200 hover:text-white px-5">
            Sign up
          </Link>
        </div>
        <select className="languageSelector">
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </nav>
  )
}