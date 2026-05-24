import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { authService } from '../../services/authService'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/app/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Completa todos los campos.')
      return
    }
    setLoading(true)
    try {
      const { data } = await authService.login(form.email, form.password)
      login(data.accessToken, data.refreshToken)
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
              <label className="block text-sm text-white/50 mb-1.5" htmlFor="email">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="input-dark"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1.5" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-dark"
                required
              />
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
