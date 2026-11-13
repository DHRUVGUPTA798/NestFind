import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center page-enter">
      <p className="text-8xl font-bold text-brand-100 mb-2">404</p>
      <h1 className="text-2xl font-bold text-neutral-900 mb-3">Page Not Found</h1>
      <p className="text-neutral-500 max-w-sm text-sm mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} />
          Go Back
        </Button>
        <Link to="/">
          <Button variant="primary">
            <Home size={16} />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

