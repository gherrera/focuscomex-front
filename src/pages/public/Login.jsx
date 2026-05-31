import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { authService } from '../../services/authService'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/app/dashboard'

  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.password) {
      setError('Completa todos los campos.')
      return
    }
    setLoading(true)
    try {
      const { data } = await authService.login(form.username, form.password)
      await login(data.token, data.refreshToken)
      navigate(from, { replace: true })
    } catch (err) {
      const msg = err.response?.data?.message || 'Credenciales incorrectas. Intenta de nuevo.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center">
              <span className="text-gold font-bold">FC</span>
            </div>
            <span className="text-white font-bold text-lg tracking-widest uppercase">
              Focus<span className="text-gold">Comex</span>
            </span>
          </Link>
          <p className="text-white/40 mt-2 text-sm">Accede a tu cuenta</p>
        </div>

        {/* Card */}
        <div className="bg-dark-200 rounded-2xl border border-white/5 p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Iniciar sesión</h1>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-md px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm text-white/50 mb-1.5" htmlFor="username">
                Correo electrónico
              </label>
              <input
                id="username"
                name="username"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                value={form.username}
                onChange={handleChange}
                className="input-dark"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1.5" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-dark pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-white/40 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-7.5 0-10-7-10-7a18.627 18.627 0 014.135-5.368m3.42-2.143A9.956 9.956 0 0112 5c7.5 0 10 7 10 7a18.17 18.17 0 01-2.404 3.697M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 9L3 3" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-gold/70 hover:text-gold text-xs transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading && <span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />}
              {loading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-sm mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-gold hover:text-gold-light transition-colors">
            Crear cuenta gratis
          </Link>
        </p>
      </div>
    </div>
  )
}
