import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to our Store!</title>
      </head>
      <body className="bg-gray-100 font-sans leading-normal tracking-normal">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}