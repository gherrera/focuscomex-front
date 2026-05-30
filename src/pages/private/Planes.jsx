import { useEffect, useState } from 'react'
import PlanesService from '../../services/PlanesService'

const defaultForm = {
  id: null,
  nombre: '',
  nombreGrupo: '',
  price: 0,
  tokensIncluded: 0,
  active: true,
  privatePlan: false,
  trial: false,
}

function formatPrice(price) {
  if (price == null) return '-'

  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function Planes() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState(defaultForm)

  const fetchPlans = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await PlanesService.getPlanes()
      setPlans(Array.isArray(response) ? response : [])
    } catch (err) {
      const message = err?.response?.data?.message || 'No se pudo obtener el listado de planes.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  const openCreateModal = () => {
    setForm(defaultForm)
    setSubmitError('')
    setSuccessMessage('')
    setIsModalOpen(true)
  }

  const openEditModal = (plan) => {
    setForm({
      id: plan.id ?? null,
      nombre: plan.nombre || '',
      nombreGrupo: plan.nombreGrupo || '',
      price: plan.price ?? 0,
      tokensIncluded: plan.tokensIncluded ?? 0,
      active: Boolean(plan.active),
      privatePlan: Boolean(plan.privatePlan),
      trial: Boolean(plan.trial),
    })
    setSubmitError('')
    setSuccessMessage('')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    if (isSaving) return
    setIsModalOpen(false)
    setForm(defaultForm)
    setSubmitError('')
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')
    setSuccessMessage('')

    if (!form.nombre.trim() || !form.nombreGrupo.trim()) {
      setSubmitError('Nombre y nombre de grupo son obligatorios.')
      return
    }

    if (Number(form.price) < 0) {
      setSubmitError('El precio debe ser mayor o igual a 0.')
      return
    }

    if (Number(form.tokensIncluded) < 0) {
      setSubmitError('Los tokens incluidos deben ser mayor o igual a 0.')
      return
    }

    setIsSaving(true)

    try {
      await PlanesService.save({
        id: form.id,
        nombre: form.nombre.trim(),
        nombreGrupo: form.nombreGrupo.trim(),
        price: Number(form.price),
        tokensIncluded: Number(form.tokensIncluded),
        active: form.active,
        privatePlan: form.privatePlan,
        trial: form.trial,
      })

      await fetchPlans()
      setIsModalOpen(false)
      setForm(defaultForm)
      setSuccessMessage(form.id ? 'Plan actualizado correctamente.' : 'Plan creado correctamente.')
    } catch (err) {
      const message = err?.response?.data?.message || 'No se pudo guardar el plan.'
      setSubmitError(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="min-h-screen bg-dark pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Planes</h1>
            <p className="mt-2 text-white/60">Gestión de planes comerciales y vigencias.</p>
          </div>
          <button type="button" className="btn-gold text-sm" onClick={openCreateModal}>
            Nuevo plan
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-md px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 bg-green-500/10 border border-green-500/20 rounded-md px-4 py-3 text-green-300 text-sm">
            {successMessage}
          </div>
        )}

        <div className="bg-dark-200 border border-white/5 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 flex items-center justify-center gap-3 text-white/60">
              <span className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              Cargando planes...
            </div>
          ) : plans.length === 0 ? (
            <div className="p-8 text-center text-white/40">No hay planes para mostrar.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5 text-white/60 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="text-left px-4 py-3">Nombre</th>
                    <th className="text-left px-4 py-3">Grupo</th>
                    <th className="text-left px-4 py-3">Precio</th>
                    <th className="text-left px-4 py-3">Tokens</th>
                    <th className="text-left px-4 py-3">Público</th>
                    <th className="text-left px-4 py-3">Estado</th>
                    <th className="text-left px-4 py-3">Versión</th>
                    <th className="text-left px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id || plan.nombre} className="border-t border-white/5 text-white/80">
                      <td className="px-4 py-3">{plan.nombre || '-'}</td>
                      <td className="px-4 py-3">{plan.nombreGrupo || '-'}</td>
                      <td className="px-4 py-3">{formatPrice(plan.price)}</td>
                      <td className="px-4 py-3">{plan.tokensIncluded ?? '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ${!plan.privatePlan ? 'bg-sky-500/15 text-sky-300' : 'bg-amber-500/15 text-amber-300'}`}>
                          {!plan.privatePlan ? 'Sí' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ${plan.active ? 'bg-green-500/15 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>
                          {plan.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-4 py-3">{plan.versionNumber ?? '-'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="btn-outline text-xs py-1 px-3" type="button" onClick={() => openEditModal(plan)}>
                            Editar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-dark-200 border border-white/10 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {form.id ? 'Editar plan' : 'Nuevo plan'}
                  </h2>
                  <p className="text-sm text-white/40 mt-1">No se consideran Max causas ni Detalle de causas.</p>
                </div>
                <button type="button" onClick={closeModal} className="text-white/50 hover:text-white" aria-label="Cerrar modal">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-md px-4 py-3 text-red-400 text-sm">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-white/50 mb-1.5" htmlFor="nombre">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      className="input-dark"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm text-white/50 mb-1.5" htmlFor="nombreGrupo">
                      Nombre Grupo
                    </label>
                    <input
                      id="nombreGrupo"
                      name="nombreGrupo"
                      value={form.nombreGrupo}
                      onChange={handleChange}
                      className="input-dark"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-1.5" htmlFor="price">
                      Precio mensual
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={handleChange}
                      className="input-dark"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-1.5" htmlFor="tokensIncluded">
                      Tokens incluidos
                    </label>
                    <input
                      id="tokensIncluded"
                      name="tokensIncluded"
                      type="number"
                      min="0"
                      value={form.tokensIncluded}
                      onChange={handleChange}
                      className="input-dark"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-3 text-white/80">
                    <input
                      type="checkbox"
                      name="active"
                      checked={form.active}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-white/20 bg-transparent"
                    />
                    Plan activo
                  </label>

                  <label className="flex items-center gap-3 text-white/80">
                    <input
                      type="checkbox"
                      name="privatePlan"
                      checked={form.privatePlan}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-white/20 bg-transparent"
                    />
                    Plan privado
                  </label>

                  <label className="flex items-center gap-3 text-white/80">
                    <input
                      type="checkbox"
                      name="trial"
                      checked={form.trial}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-white/20 bg-transparent"
                    />
                    Es plan trial
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button type="button" onClick={closeModal} className="text-white/60 hover:text-white" disabled={isSaving}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-gold text-sm disabled:opacity-60 disabled:cursor-not-allowed" disabled={isSaving}>
                    {isSaving ? 'Guardando...' : form.id ? 'Guardar cambios' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}