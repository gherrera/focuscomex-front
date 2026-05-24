import axiosInstance from '../api/axiosInstance'

export const authService = {
  login: (email, password) =>
    axiosInstance.post('/auth/login', { email, password }),

  register: (data) =>
    axiosInstance.post('/auth/register', data),

  refreshToken: (refreshToken) =>
    axiosInstance.post('/auth/refresh', { refreshToken }),

  logout: () =>
    axiosInstance.post('/auth/logout'),

  me: () =>
    axiosInstance.get('/auth/me'),
}
