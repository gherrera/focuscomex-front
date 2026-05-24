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
        nombre: form.nombre,
        email: form.email,
        empresa: form.empresa,
        password: form.password,
      })
      login(data.accessToken, data.refreshToken)
      navigate('/app/dashboard', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al crear cuenta. Intenta de nuevo.'
      setError(msg)
    } finally {
      setLoading(false)
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
