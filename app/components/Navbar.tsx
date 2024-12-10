'use client';
import { useLanguage } from '../context/LanguageContext';
import { Traducciones } from '../types2/types'; 
import es from '../translations/es.json';
import en from '../translations/en.json';
import Link from 'next/link';

const traduccionesPorIdioma: Record<string, Traducciones> = { es, en };

export default function Navbar() {
  const { idioma, cambiarIdioma } = useLanguage();
  const traducciones = traduccionesPorIdioma[idioma] || traduccionesPorIdioma['en'];

  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="text-3xl font-bold">{traducciones.title}</h1>
        <div className="menu">
          <Link href="/" className="text-gray-200 hover:text-white px-5">
            {traducciones.nav.home}
          </Link>
          <Link href="/login" className="text-gray-200 hover:text-white px-5">
            {traducciones.nav.login}
          </Link>
          <Link href="/signup" className="text-gray-200 hover:text-white px-5">
            {traducciones.nav.signup}
          </Link>
        </div>
        <select
          className="languageSelector"
          value={idioma}
          onChange={(e) => cambiarIdioma(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </nav>
  );
}
