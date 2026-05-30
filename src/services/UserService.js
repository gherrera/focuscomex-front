import api from "../api/axiosInstance";

const UserService = {
  getUser: async() => {
    const response = await api.get("/user");
    return response.data;
  },

  updateProfile: async (data) => {
    // Ajusta el endpoint según tu backend
    const response = await api.post("/user", data);
    return response.data;
  },

  notifications: async () => {
    const response = await api.get("/user/notifications");
    return response.data;
  },

  readNotification: async (notificationId) => {
    const response = await api.get(`/user/notifications/${notificationId}/read`);
    return response.data;
  },
  
  // ✅ NUEVO: Marcar todas las notificaciones como leídas
  readAllNotifications: async () => {
    const response = await api.post("/user/notifications/read-all");
    return response.data;
  },
  
  getNovedades: async () => {
    const response = await api.get("/user/novedades");
    return response.data;
  },
  saveUser: async (data) => {
    const response = await api.post("/adm/user", data);
    return response.data;
  },

  getUsers: async () => {
    const response = await api.get("/adm/users");
    return response.data;
  },
  
  getUserById: async (userId) => {
    const response = await api.get(`/adm/user/${userId}`);
    return response.data;
  },

  addTokens: async (userId, tokens) => {
    const response = await api.post(`/adm/user/${userId}/tokens`, { tokens });
    return response.data;
  },
  createUser: async(user, planId) => {
    const response = await api.post(`/public/user/${planId}`, user);
    return response.data;
  },

};

export default UserService;
