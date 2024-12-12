'use client';
import { createContext, useContext, useState, useEffect } from 'react';


const LanguageContext = createContext();


export function LanguageProvider({ children }) {
  const [idioma, setIdioma] = useState('es');

  
  useEffect(() => {
    const storedIdioma = localStorage.getItem('idiomaSeleccionado');
    if (storedIdioma) {
      setIdioma(storedIdioma);
    }
  }, []);

  
  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
    localStorage.setItem('idiomaSeleccionado', nuevoIdioma); 
  };

  return (
    <LanguageContext.Provider value={{ idioma, cambiarIdioma }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');
  }
  return context;
}
