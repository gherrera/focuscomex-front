import { useState, useRef } from 'react'
import { validacionService } from '../../services/comexService'

const tiposDocumento = [
  'Factura Comercial',
  'Packing List',
  'Bill of Lading (BL)',
  'Air Waybill (AWB)',
  'Certificado de Origen',
  'DUS / DAI',
  'Otro',
]

export default function ValidacionDocumental() {
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({ tipoDocumento: tiposDocumento[0] })
  const [archivo, setArchivo] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)

  const handleFile = (file) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowed.includes(file.type)) {
      setError('Solo se aceptan archivos PDF, JPG o PNG.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('El archivo no puede superar los 10 MB.')
      return
    }
    setArchivo(file)
    setError('')
    setResultado(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!archivo) {
      setError('Selecciona un documento para validar.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('archivo', archivo)
      fd.append('tipoDocumento', form.tipoDocumento)
      const { data } = await validacionService.validar(fd)
      setResultado(data)
    } catch {
      setError('Error al validar el documento. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Validación <span className="text-gold">documental</span></h1>
          <p className="text-white/40 mt-1">Valida tus documentos de comercio exterior con inteligencia artificial</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload form */}
          <div className="bg-dark-200 border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-5">Subir documento</h2>

            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-md px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/50 mb-1.5">Tipo de documento</label>
                <select
                  value={form.tipoDocumento}
                  onChange={(e) => setForm({ tipoDocumento: e.target.value })}
                  className="input-dark"
                >
                  {tiposDocumento.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                  ${dragging ? 'border-gold/60 bg-gold/5' : 'border-white/10 hover:border-white/20'}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]) }}
                />
                {archivo ? (
                  <div>
                    <div className="text-gold text-3xl mb-2">📄</div>
                    <p className="text-white font-medium text-sm">{archivo.name}</p>
                    <p className="text-white/30 text-xs mt-1">{(archivo.size / 1024).toFixed(1)} KB</p>
                    <button
                      type="button"
                      className="text-xs text-white/30 hover:text-red-400 mt-2 transition-colors"
                      onClick={(e) => { e.stopPropagation(); setArchivo(null); setResultado(null) }}
                    >
                      Eliminar
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-white/20 text-3xl mb-2">⬆️</div>
                    <p className="text-white/50 text-sm">Arrastra tu documento aquí</p>
                    <p className="text-white/20 text-xs mt-1">o haz clic para seleccionar</p>
                    <p className="text-white/20 text-xs mt-2">PDF, JPG, PNG — máx. 10 MB</p>
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading || !archivo} className="btn-gold w-full flex justify-center items-center gap-2 disabled:opacity-60">
                {loading && <span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />}
                {loading ? 'Validando con IA...' : 'Validar documento'}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="bg-dark-200 border border-white/5 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-5">Resultado de validación</h2>
            {!resultado && !loading && (
              <div className="flex flex-col items-center justify-center text-center py-12 text-white/20">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-sm">Sube un documento para validarlo.</p>
              </div>
            )}
            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {resultado && (
              <div className="space-y-4">
                <div className={`flex items-center gap-3 p-4 rounded-lg border ${resultado.valido ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  <span className="text-2xl">{resultado.valido ? '✅' : '❌'}</span>
                  <div>
                    <p className={`font-semibold ${resultado.valido ? 'text-green-400' : 'text-red-400'}`}>
                      {resultado.valido ? 'Documento válido' : 'Documento con observaciones'}
                    </p>
                    <p className="text-white/40 text-xs">{resultado.mensaje}</p>
                  </div>
                </div>

                {resultado.observaciones?.length > 0 && (
                  <div>
                    <h3 className="text-white/40 text-xs uppercase tracking-widest mb-3">Observaciones</h3>
                    <ul className="space-y-2">
                      {resultado.observaciones.map((obs, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <span className={obs.tipo === 'error' ? 'text-red-400' : 'text-yellow-400'}>
                            {obs.tipo === 'error' ? '●' : '○'}
                          </span>
                          <span className="text-white/60">{obs.descripcion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {resultado.datosExtraidos && (
                  <div>
                    <h3 className="text-white/40 text-xs uppercase tracking-widest mb-3">Datos extraídos</h3>
                    <div className="space-y-2">
                      {Object.entries(resultado.datosExtraidos).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-sm bg-dark-300 rounded px-3 py-2">
                          <span className="text-white/40">{k}</span>
                          <span className="text-white">{String(v)}</span>
                        </div>
                      ))}
                    </div>
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
