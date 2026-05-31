import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { authService } from '../../services/authService'

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [validating, setValidating] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const canSubmit = useMemo(() => {
    return password.length >= 8 && confirmPassword.length >= 8 && password === confirmPassword
  }, [password, confirmPassword])

  useEffect(() => {
    const validateToken = async () => {
      setValidating(true)
      setError('')
      try {
        await authService.validateResetToken(token)
        setTokenValid(true)
      } catch {
        setTokenValid(false)
        setError('El enlace de recuperacion es invalido o expirado.')
      } finally {
        setValidating(false)
      }
    }

    if (!token) {
      setTokenValid(false)
      setValidating(false)
      setError('Token de recuperacion no proporcionado.')
      return
    }

    validateToken()
  }, [token])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!canSubmit) {
      if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.')
        return
      }
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    try {
      await authService.resetPassword(token, password)
      setSuccess('Contraseña actualizada correctamente. Ahora puedes iniciar sesion.')
      setTimeout(() => navigate('/login', { replace: true }), 1500)
    } catch (err) {
      const message = err?.response?.data?.message || 'No se pudo actualizar la contraseña.'
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
          <p className="text-white/40 mt-2 text-sm">Restablece tu contraseña</p>
        </div>

        <div className="bg-dark-200 rounded-2xl border border-white/5 p-8">
          <h1 className="text-2xl font-bold text-white mb-2">Crear nueva contraseña</h1>
          <p className="text-white/60 text-sm mb-6">
            Ingresa una nueva contraseña segura para tu cuenta.
          </p>

          {validating ? (
            <div className="text-white/70 text-sm">Validando enlace...</div>
          ) : (
            <>
              {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-md px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 bg-green-500/10 border border-green-500/20 rounded-md px-4 py-3 text-green-300 text-sm">
                  {success}
                </div>
              )}

              {!tokenValid ? (
                <div className="space-y-4">
                  <Link to="/olvide-clave" className="btn-gold w-full justify-center">
                    Solicitar nuevo enlace
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-sm text-white/50 mb-1.5" htmlFor="password">
                      Nueva contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Minimo 8 caracteres"
                      className="input-dark"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-1.5" htmlFor="confirmPassword">
                      Confirmar contraseña
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="Repite tu contraseña"
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
                    {loading ? 'Actualizando...' : 'Actualizar contraseña'}
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        <p className="text-center text-white/30 text-sm mt-6">
          <Link to="/login" className="text-gold hover:text-gold-light transition-colors">
            Volver a iniciar sesion
          </Link>
        </p>
      </div>
    </div>
  )
}
