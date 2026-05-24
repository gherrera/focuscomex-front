import { useState } from 'react'
import { trackingService } from '../../services/comexService'

const statusColors = {
  'EN_TRANSITO': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'EN_PUERTO': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'EN_ADUANA': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  'ENTREGADO': 'text-green-400 bg-green-400/10 border-green-400/20',
  'DEMORADO': 'text-red-400 bg-red-400/10 border-red-400/20',
}

const statusLabels = {
  'EN_TRANSITO': 'En tránsito',
  'EN_PUERTO': 'En puerto',
  'EN_ADUANA': 'En aduana',
  'ENTREGADO': 'Entregado',
  'DEMORADO': 'Demorado',
}

export default function Tracking() {
  const [numeroGuia, setNumeroGuia] = useState('')
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    const num = numeroGuia.trim()
    if (!num) return
    setLoading(true)
    setError('')
    setResultado(null)
    try {
      const { data } = await trackingService.buscar(num)
      setResultado(data)
    } catch (err) {
      if (err.response?.status === 404) {
        setError(`No se encontró información para el número: ${num}`)
      } else {
        setError('Error al buscar. Intenta de nuevo más tarde.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Tracking de <span className="text-gold">cargas</span></h1>
          <p className="text-white/40 mt-1">Consulta el estado en tiempo real de tus envíos</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <input
            type="text"
            value={numeroGuia}
            onChange={(e) => { setNumeroGuia(e.target.value); setError('') }}
            placeholder="Ingresa número de guía, BL o AWB..."
            className="input-dark flex-1"
          />
          <button type="submit" disabled={loading || !numeroGuia.trim()} className="btn-gold px-8 disabled:opacity-60 whitespace-nowrap">
            {loading ? (
              <span className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin block" />
            ) : (
              'Rastrear'
            )}
          </button>
        </form>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-5 py-4 text-red-400 text-sm mb-6">
            {error}
          </div>
        )}

        {!resultado && !loading && !error && (
          <div className="bg-dark-200 border border-white/5 rounded-xl p-12 text-center">
            <div className="text-5xl mb-4">🚢</div>
            <p className="text-white/30 text-sm">Ingresa un número de guía para rastrear tu carga.</p>
          </div>
        )}

        {resultado && (
          <div className="bg-dark-200 border border-white/5 rounded-xl p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
              <div>
                <p className="text-white/40 text-xs mb-1">Número de guía</p>
                <p className="text-white font-bold text-xl">{resultado.numeroGuia}</p>
              </div>
              {resultado.estado && (
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[resultado.estado] || 'text-white/50 bg-white/5 border-white/10'}`}>
                  {statusLabels[resultado.estado] || resultado.estado}
                </span>
              )}
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Origen', value: resultado.origen },
                { label: 'Destino', value: resultado.destino },
                { label: 'Transportista', value: resultado.transportista },
                { label: 'Fecha de salida', value: resultado.fechaSalida },
                { label: 'ETA', value: resultado.eta },
                { label: 'Contenedor', value: resultado.contenedor },
              ].filter((d) => d.value).map((d) => (
                <div key={d.label} className="bg-dark-300 rounded-lg p-3">
                  <p className="text-white/30 text-xs mb-1">{d.label}</p>
                  <p className="text-white text-sm font-medium">{d.value}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            {resultado.eventos?.length > 0 && (
              <div>
                <h3 className="text-white/40 text-xs uppercase tracking-widest mb-4">Historial de eventos</h3>
                <div className="space-y-3">
                  {resultado.eventos.map((ev, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-0.5 ${i === 0 ? 'bg-gold' : 'bg-dark-400 border border-white/10'}`} />
                        {i < resultado.eventos.length - 1 && <div className="w-px flex-1 bg-white/5 mt-1 h-6" />}
                      </div>
                      <div>
                        <p className="text-white text-sm">{ev.descripcion}</p>
                        <p className="text-white/30 text-xs mt-0.5">{ev.fecha} · {ev.ubicacion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
