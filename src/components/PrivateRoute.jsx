import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" state={{ from: location }} replace />
}
