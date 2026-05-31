import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const navLinks = [
  { label: 'Calculadora', to: '/app/calculadora' },
  { label: 'Tracking', to: '/app/tracking' },
  { label: 'Validación Documental', to: '/app/validacion' },
]

const adminLinks = [
  { label: 'Dashboard', to: '/app/dashboard' },
  { label: 'Usuarios', to: '/app/usuarios' },
  { label: 'Planes', to: '/app/planes' },
]

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const isAdmin = user?.type === 'ADMIN'
  const privateLinks = isAdmin ? adminLinks : navLinks

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const closeAllMenus = () => {
    setMenuOpen(false)
    setProfileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-100/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="Focus Comex" className="h-16 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            {isAuthenticated ? (
              privateLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    isActive ? 'text-gold' : 'hover:text-white transition-colors'
                  }
                >
                  {l.label}
                </NavLink>
              ))
            ) : (
              <>
                <a href="#features" className="hover:text-white transition-colors">Servicios</a>
                <a href="#stats" className="hover:text-white transition-colors">Nosotros</a>
              </>
            )}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((current) => !current)}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  aria-haspopup="menu"
                  aria-expanded={profileMenuOpen}
                >
                  <span className="text-sm">{user?.name || user?.sub}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 rounded-xl border border-white/10 bg-dark-200 shadow-xl overflow-hidden z-50">
                    <Link
                      to="/app/profile"
                      onClick={closeAllMenus}
                      className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5"
                    >
                      Perfil
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm text-white/70 hover:text-white transition-colors">
                  Iniciar sesión
                </Link>
                <Link to="/register" className="btn-gold text-sm py-1.5 px-5">
                  Crear cuenta
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/5 py-4 space-y-3">
            {isAuthenticated ? (
              privateLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="block text-sm text-white/70 hover:text-white px-2 py-1"
                  onClick={closeAllMenus}
                >
                  {l.label}
                </Link>
              ))
            ) : (
              <>
                <a href="#features" className="block text-sm text-white/70 hover:text-white px-2 py-1">Servicios</a>
                <a href="#stats" className="block text-sm text-white/70 hover:text-white px-2 py-1">Nosotros</a>
              </>
            )}
            <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link to="/app/profile" onClick={closeAllMenus} className="btn-outline text-sm text-center">
                    Perfil
                  </Link>
                  <button onClick={handleLogout} className="btn-outline text-sm w-full">
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-outline text-sm text-center">
                    Iniciar sesión
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-gold text-sm text-center">
                    Crear cuenta
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
