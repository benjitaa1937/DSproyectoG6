import { useEffect, useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import Swal from 'sweetalert2';
import Layout from './components/Layout';
import es from './translations/es.json';
import en from './translations/en.json';

const API_URL = 'https://fakestoreapi.com/products';

const traduccionesPorIdioma = { es, en };

export default function Home() {
  const { idioma } = useLanguage();
  const [productos, setProductos] = useState([]);
  const traducciones = traduccionesPorIdioma[idioma];

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const agregarAlCarrito = (producto) => {
    Swal.fire({
      title: traducciones.alert_title,
      text: `${traducciones.alert_text} "${producto.title}"!`,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <div key={producto.id} className="border p-4 rounded bg-white shadow">
            <img
              src={producto.image}
              alt={producto.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-bold mb-2">
              {traducciones.product_names?.[producto.id] || producto.title}
            </h3>
            <p className="text-gray-700 mb-4">
              {traducciones.product_descriptions?.[producto.id] || producto.description}
            </p>
            <p className="text-gray-900 font-bold">${producto.price}</p>
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-2"
              onClick={() => agregarAlCarrito(producto)}
            >
              {traducciones.add_to_cart}
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
