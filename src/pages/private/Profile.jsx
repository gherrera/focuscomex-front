import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import UserService from '../../services/UserService'

export default function Profile() {
  const { user, refreshUser } = useAuth()
  const [form, setForm] = useState({
    name: '',
    company: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setForm((current) => ({
      ...current,
      name: user?.name || '',
      company: user?.company || '',
    }))
  }, [user])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!form.name.trim()) {
      setError('El nombre es obligatorio.')
      return
    }

    if ((form.password || form.confirmPassword) && form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        name: form.name.trim(),
        company: form.company.trim() || null,
      }

      if (form.password) {
        payload.password = form.password
      }

      await UserService.updateProfile(payload)
      await refreshUser()
      setForm((current) => ({
        ...current,
        password: '',
        confirmPassword: '',
      }))
      setSuccess('Perfil actualizado correctamente.')
    } catch (err) {
      const message = err?.response?.data?.message || 'No se pudo actualizar el perfil.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-dark pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Perfil</h1>
          <p className="mt-2 text-white/60">Actualiza tus datos personales y contraseña.</p>
        </div>

        <div className="bg-dark-200 border border-white/5 rounded-2xl p-6 sm:p-8">
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-white/50 mb-1.5" htmlFor="username">
                Email
              </label>
              <input
                id="username"
                name="username"
                value={user?.username || ''}
                className="input-dark opacity-70 cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm text-white/50 mb-1.5" htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-dark"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white/50 mb-1.5" htmlFor="company">
                Empresa (opcional)
              </label>
              <input
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="input-dark"
                placeholder="Nombre de tu empresa"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/50 mb-1.5" htmlFor="password">
                  Nueva contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="input-dark"
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label className="block text-sm text-white/50 mb-1.5" htmlFor="confirmPassword">
                  Repetir contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="input-dark"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button type="submit" className="btn-gold text-sm disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
