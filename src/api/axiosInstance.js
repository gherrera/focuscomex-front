import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Attach JWT to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fc_access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle 401 — attempt token refresh, otherwise redirect to login
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const refreshToken = localStorage.getItem('fc_refresh_token')

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
          localStorage.setItem('fc_access_token', data.accessToken)
          if (data.refreshToken) localStorage.setItem('fc_refresh_token', data.refreshToken)
          original.headers.Authorization = `Bearer ${data.accessToken}`
          return axiosInstance(original)
        } catch {
          localStorage.removeItem('fc_access_token')
          localStorage.removeItem('fc_refresh_token')
          window.location.href = '/login'
        }
      } else {
        localStorage.removeItem('fc_access_token')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
