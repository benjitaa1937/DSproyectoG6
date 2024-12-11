'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token } = await response.json();
        // Guarda el token en localStorage (puedes usar otras soluciones como Context API si prefieres)
        localStorage.setItem('token', token);
        
        // Redirige a la página principal de productos
        router.push('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error en el login');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error en el servidor. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="container login">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-300"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
