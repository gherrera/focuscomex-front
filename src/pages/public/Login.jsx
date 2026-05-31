import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const googleToken = params.get('googleToken')
    const googleError = params.get('googleError')

    if (googleError) {
      setError(`Google: ${googleError}`)
      return
    }

    if (!googleToken) return

    const completeGoogleLogin = async () => {
      setLoading(true)
      try {
        await login(googleToken)
        navigate('/app/dashboard', { replace: true })
      } catch {
        setError('No se pudo completar el acceso con Google.')
      } finally {
        setLoading(false)
      }
    }

    completeGoogleLogin()
  }, [location.search, login, navigate])

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

  const handleGoogleAuth = () => {
    try {
      authService.startGoogleAuth()
    } catch (err) {
      setError(err.message || 'No se pudo iniciar autenticación con Google.')
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
              <span className="bg-dark-200 px-3">o con correo y contraseña</span>
            </div>
          </div>

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
