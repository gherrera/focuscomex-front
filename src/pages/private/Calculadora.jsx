import { useState } from 'react'
import { calculadoraService } from '../../services/comexService'

const tiposOperacion = ['Importación marítima', 'Importación aérea', 'Exportación marítima', 'Exportación aérea']
const monedas = ['USD', 'EUR', 'CLP', 'CNY']
const incoterms = ['FOB', 'CIF', 'EXW', 'DAP', 'DDP']

export default function Calculadora() {
  const [form, setForm] = useState({
    tipoOperacion: 'Importación marítima',
    valorMercancia: '',
    moneda: 'USD',
    incoterm: 'FOB',
    pesoKg: '',
    descripcion: '',
  })
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.valorMercancia || !form.pesoKg) {
      setError('Completa los campos obligatorios.')
      return
    }
    setLoading(true)
    setResultado(null)
    try {
      const { data } = await calculadoraService.calcular(form)
      setResultado(data)
    } catch {
      setError('Error al calcular. Verifica los datos e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Calculadora <span className="text-gold">inteligente</span></h1>
          <p className="text-white/40 mt-1">Simula los costos de tu operación de comercio exterior</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-dark-200 border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-5">Datos de la operación</h2>

            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-md px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/50 mb-1.5">Tipo de operación</label>
                <select name="tipoOperacion" value={form.tipoOperacion} onChange={handleChange} className="input-dark">
                  {tiposOperacion.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-white/50 mb-1.5">Valor mercancía *</label>
                  <input
                    name="valorMercancia"
                    type="number"
                    min="0"
                    value={form.valorMercancia}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="input-dark"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1.5">Moneda</label>
                  <select name="moneda" value={form.moneda} onChange={handleChange} className="input-dark">
                    {monedas.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-white/50 mb-1.5">Incoterm</label>
                  <select name="incoterm" value={form.incoterm} onChange={handleChange} className="input-dark">
                    {incoterms.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1.5">Peso (kg) *</label>
                  <input
                    name="pesoKg"
                    type="number"
                    min="0"
                    value={form.pesoKg}
                    onChange={handleChange}
                    placeholder="0"
                    className="input-dark"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-1.5">Descripción de mercancía</label>
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Ej: Maquinaria industrial, accesorios electrónicos..."
                  className="input-dark resize-none"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-gold w-full flex justify-center items-center gap-2 disabled:opacity-60">
                {loading && <span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />}
                {loading ? 'Calculando...' : 'Calcular costos'}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="bg-dark-200 border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-5">Resultado estimado</h2>
            {!resultado && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-white/20">
                <div className="text-5xl mb-4">🧮</div>
                <p className="text-sm">Completa el formulario y calcula<br />el costo de tu operación.</p>
              </div>
            )}
            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {resultado && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-dark-300 rounded-lg p-4">
                    <p className="text-white/30 text-xs mb-1">Costo total estimado</p>
                    <p className="text-white font-bold text-xl">
                      {resultado.costoTotalCLP ? `$${resultado.costoTotalCLP.toLocaleString('es-CL')} CLP` : '—'}
                    </p>
                  </div>
                  <div className="bg-dark-300 rounded-lg p-4">
                    <p className="text-white/30 text-xs mb-1">Equivalente USD</p>
                    <p className="text-white font-bold text-xl">
                      {resultado.costoTotalUSD ? `$${resultado.costoTotalUSD.toLocaleString('en-US')}` : '—'}
                    </p>
                  </div>
                </div>
                <div className="bg-dark-300 rounded-lg p-4">
                  <p className="text-white/30 text-xs mb-3">Desglose de costos</p>
                  <div className="space-y-2">
                    {(resultado.desglose || []).map((item) => (
                      <div key={item.concepto} className="flex justify-between text-sm">
                        <span className="text-white/50">{item.concepto}</span>
                        <span className="text-white">{item.valor}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {resultado.tiempoEstimado && (
                  <div className="bg-dark-300 rounded-lg p-4">
                    <p className="text-white/30 text-xs mb-1">Tiempo estimado</p>
                    <p className="text-gold font-semibold">{resultado.tiempoEstimado}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
