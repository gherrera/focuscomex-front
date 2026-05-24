import axiosInstance from '../api/axiosInstance'

export const calculadoraService = {
  calcular: (data) => axiosInstance.post('/calculadora/calcular', data),
  historial: () => axiosInstance.get('/calculadora/historial'),
  getById: (id) => axiosInstance.get(`/calculadora/${id}`),
}

export const trackingService = {
  buscar: (numero) => axiosInstance.get(`/tracking/${numero}`),
  listar: () => axiosInstance.get('/tracking'),
}

export const validacionService = {
  validar: (formData) =>
    axiosInstance.post('/validacion/validar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  historial: () => axiosInstance.get('/validacion/historial'),
}
