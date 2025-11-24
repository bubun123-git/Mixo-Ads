import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-900">404</h1>
          <p className="text-2xl font-semibold text-gray-700 mt-4">
            Page Not Found
          </p>
          <p className="text-gray-600 mt-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound
