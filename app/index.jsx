import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';
import { useState } from 'react';
import es from '../translations/es.json';

const cargarTraduccion = (idioma) => {
  if (idioma === 'es') return es;
  return {}; // Añade más idiomas aquí
};

export default function Home() {
  const [idioma, setIdioma] = useState('es');
  const traducciones = cargarTraduccion(idioma);

  // Cambiar idioma
  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
  };

  // Usa traducciones para productos
  productos.map((producto) => {
    producto.title = traducciones.product_names[producto.id] || producto.title;
    producto.description =
      traducciones.product_descriptions[producto.id] || producto.description;
  });

  return (
    <>
      <select
        value={idioma}
        onChange={(e) => cambiarIdioma(e.target.value)}
        className="mb-4"
      >
        <option value="es">Español</option>
        <option value="en">Inglés</option>
      </select>
      {/* Resto del código */}
    </>
  );
}

const API_URL = 'https://fakestoreapi.com/products';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  // Cargar productos al inicio
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

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    Swal.fire({
      title: 'Producto agregado',
      text: `¡"${producto.title}" ha sido agregado al carrito!`,
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
            <h3 className="text-lg font-bold mb-2">{producto.title}</h3>
            <p className="text-gray-700 mb-4">{producto.description}</p>
            <p className="text-gray-900 font-bold">${producto.price}</p>
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-2"
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
