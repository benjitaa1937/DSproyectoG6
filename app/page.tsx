'use client'

import { useLanguage } from './context/LanguageContext';
import { Traducciones } from './types2/types'; 
import es from './translations/es.json';
import en from './translations/en.json';
import ProductGrid from './components/ProductGrid'

const traduccionesPorIdioma: Record<string, Traducciones> = { es, en };

export default function Home() {
  const { idioma, cambiarIdioma } = useLanguage();
  const traducciones = traduccionesPorIdioma[idioma] || traduccionesPorIdioma['en'];
  return (
    <main className="container my-8 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {traducciones.products_available}
      </h2>
      <ProductGrid />
    </main>
  )
}