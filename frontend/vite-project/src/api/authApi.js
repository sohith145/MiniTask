
import api from './axios.js';

export const registerUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/users/login', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};


export const logoutUser = async () => {
  const response = await api.post('/users/logout');
  return response.data;
};

     
export const updateUserProfile = async (id, updates) => {
const response = await api.patch(`/users/${id}`, updates);

return response.data;
};

