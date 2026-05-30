import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

// Public pages
import Home from './pages/public/Home'
import Login from './pages/public/Login'
import Register from './pages/public/Register'

// Private pages
import Dashboard from './pages/private/Dashboard'
import Calculadora from './pages/private/Calculadora'
import Tracking from './pages/private/Tracking'
import ValidacionDocumental from './pages/private/ValidacionDocumental'
import Usuarios from './pages/private/Usuarios'
import Planes from './pages/private/Planes'

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

function PrivateLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private routes */}
          <Route
            path="/app"
            element={
              <PrivateLayout>
                <PrivateRoute />
              </PrivateLayout>
            }
          >
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="calculadora" element={<Calculadora />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="validacion" element={<ValidacionDocumental />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="planes" element={<Planes />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
