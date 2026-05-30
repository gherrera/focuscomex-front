import axiosInstance from '../api/axiosInstance'

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
}
