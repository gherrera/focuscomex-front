import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../../services/authService'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Ingresa un correo electronico valido.')
      return
    }

    setLoading(true)
    try {
      await authService.forgotPassword(email.trim())
      setSubmitted(true)
    } catch (err) {
      const message = err?.response?.data?.message || 'No se pudo procesar la solicitud. Intenta nuevamente.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src="/logo1.png" alt="Focus Comex" className="h-14 w-auto" />
          </Link>
          <p className="text-white/40 mt-2 text-sm">Recupera el acceso a tu cuenta</p>
        </div>

        <div className="bg-dark-200 rounded-2xl border border-white/5 p-8">
          <h1 className="text-2xl font-bold text-white mb-2">Olvidaste tu contraseña</h1>
          <p className="text-white/60 text-sm mb-6">
            Te enviaremos un enlace para restablecer tu contraseña.
          </p>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-md px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {submitted ? (
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-md px-4 py-3 text-green-300 text-sm">
                Si el correo existe en nuestra base, te enviamos un enlace para restablecer tu contraseña.
              </div>
              <p className="text-white/50 text-sm">
                Revisa tambien la carpeta de spam o correo no deseado.
              </p>
              <Link to="/login" className="btn-gold w-full flex justify-center items-center mt-2">
                Volver a iniciar sesion
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm text-white/50 mb-1.5" htmlFor="email">
                  Correo electronico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="tu@email.com"
                  className="input-dark"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full justify-center flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading && <span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />}
                {loading ? 'Enviando...' : 'Enviar enlace de recuperacion'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-white/30 text-sm mt-6">
          ¿Recordaste tu contraseña?{' '}
          <Link to="/login" className="text-gold hover:text-gold-light transition-colors">
            Iniciar sesion
          </Link>
        </p>
      </div>
    </div>
  )
}
