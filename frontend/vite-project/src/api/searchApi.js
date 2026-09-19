import api from "./axios.js";

export const searchAll = async (query) => {
  const response = await api.get(`/search?q=${query}`);
  return response.data;
};
