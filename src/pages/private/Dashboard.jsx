import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const quickActions = [
  {
    title: 'Nueva Calculación',
    desc: 'Simula costos de importación/exportación',
    icon: '🧮',
    to: '/app/calculadora',
    color: 'border-gold/20 hover:border-gold/50',
  },
  {
    title: 'Tracking',
    desc: 'Consulta el estado de tus envíos',
    icon: '📦',
    to: '/app/tracking',
    color: 'border-blue-500/20 hover:border-blue-500/50',
  },
  {
    title: 'Validar Documentos',
    desc: 'Valida documentos COMEX con IA',
    icon: '📋',
    to: '/app/validacion',
    color: 'border-green-500/20 hover:border-green-500/50',
  },
]

export default function Dashboard() {
  const { user } = useAuth()
  const nombre = user?.nombre || user?.name || user?.sub || 'Usuario'

  return (
    <div className="min-h-screen bg-dark pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            Bienvenido, <span className="text-gold">{nombre}</span>
          </h1>
          <p className="text-white/40 mt-1">Panel de control de operaciones</p>
        </div>

        {/* Quick actions */}
        <h2 className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {quickActions.map((a) => (
            <Link
              key={a.title}
              to={a.to}
              className={`bg-dark-200 border rounded-xl p-6 transition-colors group ${a.color}`}
            >
              <div className="text-3xl mb-3">{a.icon}</div>
              <h3 className="text-white font-semibold mb-1 group-hover:text-gold transition-colors">{a.title}</h3>
              <p className="text-white/40 text-sm">{a.desc}</p>
            </Link>
          ))}
        </div>

        {/* Recent activity placeholder */}
        <h2 className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4">Actividad reciente</h2>
        <div className="bg-dark-200 border border-white/5 rounded-xl p-8 text-center">
          <div className="text-white/20 text-5xl mb-3">📊</div>
          <p className="text-white/30 text-sm">Aún no tienes operaciones registradas.</p>
          <p className="text-white/20 text-xs mt-1">Comienza calculando el costo de tu primera operación.</p>
          <Link to="/app/calculadora" className="btn-gold inline-block mt-6 text-sm">
            Iniciar cálculo
          </Link>
        </div>
      </div>
    </div>
  )
}
