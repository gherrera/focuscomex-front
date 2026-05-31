import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { authService } from '../../services/authService'

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    empresa: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.password || !form.confirmPassword) {
      setError('Completa todos los campos obligatorios.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    setLoading(true)
    try {
      const { data } = await authService.register({
        name: form.nombre,
        username: form.email,
        company: form.empresa,
        password: form.password,
      })
      await login(data.token, data.refreshToken)
      navigate('/app/dashboard', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.detail || 'Error al crear cuenta. Intenta de nuevo.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = () => {
    try {
      authService.startGoogleAuth()
    } catch (err) {
      setError(err.message || 'No se pudo iniciar autenticación con Google.')
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12">
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
          <p className="text-white/40 mt-2 text-sm">Crea tu cuenta gratuita</p>
        </div>

        <div className="bg-dark-200 rounded-2xl border border-white/5 p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Crear cuenta</h1>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full mb-5 bg-white text-[#1f1f1f] font-medium px-4 py-3 rounded-md hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.62l6.86-6.86C35.92 2.38 30.4 0 24 0 14.62 0 6.5 5.38 2.56 13.22l7.98 6.2C12.4 13.24 17.68 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.5 24.55c0-1.64-.15-3.22-.43-4.73H24v9.03h12.7c-.55 2.96-2.2 5.47-4.68 7.17l7.58 5.88c4.43-4.08 6.9-10.1 6.9-17.35z" />
              <path fill="#FBBC05" d="M10.54 28.58A14.5 14.5 0 019.5 24c0-1.6.38-3.12 1.04-4.58l-7.98-6.2A24 24 0 000 24c0 3.87.93 7.53 2.56 10.78l7.98-6.2z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.9-5.82l-7.58-5.88c-2.1 1.4-4.8 2.2-8.32 2.2-6.32 0-11.6-3.74-13.46-9.08l-7.98 6.2C6.5 42.62 14.62 48 24 48z" />
            </svg>
            Continuar con Google
          </button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider text-white/30">
              <span className="bg-dark-200 px-3">o crea tu cuenta manualmente</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-md px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm text-white/50 mb-1.5" htmlFor="nombre">
                Nombre completo <span className="text-gold">*</span>
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className="input-dark"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1.5" htmlFor="email">
                Correo electrónico <span className="text-gold">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@empresa.com"
                className="input-dark"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1.5" htmlFor="empresa">
                Empresa <span className="text-white/20 text-xs">(opcional)</span>
              </label>
              <input
                id="empresa"
                name="empresa"
                type="text"
                autoComplete="organization"
                value={form.empresa}
                onChange={handleChange}
                placeholder="Nombre de tu empresa"
                className="input-dark"
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1.5" htmlFor="password">
                Contraseña <span className="text-gold">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
                className="input-dark"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1.5" htmlFor="confirmPassword">
                Confirmar contraseña <span className="text-gold">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                className="input-dark"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />}
              {loading ? 'Creando cuenta...' : 'Crear cuenta gratis'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-sm mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-gold hover:text-gold-light transition-colors">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
