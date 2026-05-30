import api from "../api/axiosInstance";

const PlanesService = {
  getPublicPlanes: async () => {
    const response = await api.get("/public/planes");
    return response.data;
  },
  getPlanes: async () => {
    const response = await api.get("/adm/planes");
    return response.data;
  },
  save: async (data) => {
    const response = await api.post("/adm/plan", data);
    return response.data;
  },

  deletePlan: async (id) => {
    const response = await api.delete(`/adm/plan/${id}`);
    return response.data;
  }
};

export default PlanesService;