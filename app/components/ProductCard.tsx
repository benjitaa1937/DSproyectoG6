
import { Product } from "../types2/types"
import Swal from "sweetalert2"
import { useLanguage } from '../context/LanguageContext';
import { Traducciones } from '../types2/types'; 
import es from '../translations/es.json';
import en from '../translations/en.json';


const traduccionesPorIdioma: Record<string, Traducciones> = { es, en };


interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { idioma, cambiarIdioma } = useLanguage();
  const traducciones = traduccionesPorIdioma[idioma] || traduccionesPorIdioma['en'];
  return (
    <div className="border p-4 rounded bg-white shadow">
      <img 
        src={product.image} 
        alt={product.title} 
        className="product-image"
      />
      <h3 
        data-product-name={product.id}
        className="text-lg font-bold mb-2"
      >
        {product.title}
      </h3>
      <p 
        data-product-description={product.id}
        className="text-gray-700 mb-4"
      >
        {product.description}
      </p>
      <p className="text-gray-900 font-bold">
        ${product.price}
      </p>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full mt-4"
      >
        {traducciones.add_to_cart}
      </button>
    </div>
  )
}