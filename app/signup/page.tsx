'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { Traducciones } from '../types2/types';
import es from '../translations/es.json';
import en from '../translations/en.json';

const traduccionesPorIdioma: Record<string, Traducciones> = { es, en };

const RegisterPage = () => {
  const { idioma } = useLanguage();
  const traducciones = traduccionesPorIdioma[idioma] || traduccionesPorIdioma['en'];
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [generalError, setGeneralError] = useState('');
  const [passwordError, setPasswordError] = useState(false); // Controla la alerta de superposición
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'confirmPassword') {
      setPasswordError(false); // Ocultar la alerta al cambiar el valor
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError('');
    setPasswordError(false);

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);

      // Hacer que la alerta desaparezca después de 3 segundos
      setTimeout(() => setPasswordError(false), 3000);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        const errorData = await response.json();
        setGeneralError(errorData.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error:', error);
      setGeneralError('Error en el servidor. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="container register relative">
      <h2 className="text-2xl font-bold mb-6 text-center">{traducciones.signup.crear}</h2>
      {generalError && <p className="text-red-500 mb-4">{generalError}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            {traducciones.signup.username}
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            {traducciones.signup.email}
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
            {traducciones.signup.password}
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
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
            {traducciones.signup.confirmpass}
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-300"
        >
          {traducciones.signup.register}
        </button>
      </form>

      {passwordError && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-sm rounded-md py-3 px-6 shadow-lg z-50 animate-fade-in-out">
          {traducciones.signup.errorpass}
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
