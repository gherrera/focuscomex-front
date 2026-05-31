import axiosInstance from '../api/axiosInstance'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
const GOOGLE_AUTH_URL = `${API_URL.replace(/\/+$/, '')}/auth/google`

export const authService = {
  login: (username, password) =>
    axiosInstance.post('/auth/login', { username, password }),

  forgotPassword: (email) =>
    axiosInstance.post('/auth/forgot-password', { email }),

  validateResetToken: (token) =>
    axiosInstance.get(`/auth/reset-password/${token}/validate`),

  resetPassword: (token, password) =>
    axiosInstance.post(`/auth/reset-password/${token}`, { password }),

  register: (data) =>
    axiosInstance.post('/auth/register', data),

  refreshToken: (refreshToken) =>
    axiosInstance.post('/auth/refresh', { refreshToken }),

  logout: () =>
    axiosInstance.post('/auth/logout'),

  me: () =>
    axiosInstance.get('/auth/me'),

  getGoogleAuthUrl: () => GOOGLE_AUTH_URL,

  startGoogleAuth: () => {
    if (!GOOGLE_AUTH_URL) {
      throw new Error('No se pudo construir la URL de autenticación Google desde VITE_API_URL.')
    }

    window.location.href = GOOGLE_AUTH_URL
  },
}
