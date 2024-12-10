'use client'
import { useLanguage } from '../context/LanguageContext';
import { Traducciones } from '../types2/types'; 
import es from '../translations/es.json';
import en from '../translations/en.json';

const traduccionesPorIdioma: Record<string, Traducciones> = { es, en };

export default function Footer() {
  const { idioma, cambiarIdioma } = useLanguage();
  const traducciones = traduccionesPorIdioma[idioma] || traduccionesPorIdioma['en'];
    return (
      <footer className="footer">
        <div className="footer-bottom">
          <p>&copy; {traducciones.footer_text}</p>
        </div>    
      </footer>
    )
  }