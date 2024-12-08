// app/page.tsx
import ProductGrid from './components/ProductGrid'

export default function Home() {
  return (
    <main className="container my-8 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Available Products
      </h2>
      <ProductGrid />
    </main>
  )
}