import { useEffect, useState } from 'react'
import UserService from '../../services/UserService'

const subscriptionStatusMap = {
  active: 'Activa',
  trialing: 'Prueba',
  paused: 'Pausada',
  pending: 'Pendiente',
  expired: 'Expirada',
  cancelled: 'Cancelada',
  unknown: 'Desconocida',
}

function getSubscriptionStatus(user) {
  const status = user?.currentSubscription?.status
  if (!status) return 'Sin suscripción'

  const normalized = String(status).toLowerCase()
  return subscriptionStatusMap[normalized] || status
}

export default function Usuarios() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await UserService.getUsers()
        setUsers(Array.isArray(response) ? response : [])
      } catch (err) {
        const message = err?.response?.data?.message || 'No se pudo obtener el listado de usuarios.'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <section className="min-h-screen bg-dark pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Usuarios</h1>
          <p className="mt-2 text-white/60">Gestión de usuarios operativos.</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-md px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="bg-dark-200 border border-white/5 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 flex items-center justify-center gap-3 text-white/60">
              <span className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              Cargando usuarios...
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-white/40">No hay usuarios para mostrar.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5 text-white/60 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="text-left px-4 py-3">Nombre</th>
                    <th className="text-left px-4 py-3">Email</th>
                    <th className="text-left px-4 py-3">Plan</th>
                    <th className="text-left px-4 py-3">Estado Usuario</th>
                    <th className="text-left px-4 py-3">Estado Suscripción</th>
                    <th className="text-left px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    const planName = u?.currentSubscription?.plan?.nombre || 'Sin plan'
                    const userStatus = u?.enabled ? 'Activo' : 'Inactivo'
                    const subscriptionStatus = getSubscriptionStatus(u)

                    return (
                      <tr key={u.id || u.username} className="border-t border-white/5 text-white/80">
                        <td className="px-4 py-3">{u.name || '-'}</td>
                        <td className="px-4 py-3">{u.username || '-'}</td>
                        <td className="px-4 py-3">{planName}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ${u?.enabled ? 'bg-green-500/15 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>
                            {userStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs bg-blue-500/15 text-blue-300">
                            {subscriptionStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button className="btn-outline text-xs py-1 px-3" type="button">
                              Ver
                            </button>
                            <button className="btn-outline text-xs py-1 px-3" type="button">
                              Editar
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
