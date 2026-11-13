import Navbar from './Navbar'
import Footer from './Footer'

/**
 * Root layout wrapper — wraps every page with Navbar + Footer.
 */
export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        {children}
      </main>
      <Footer />
    </div>
  )
}

