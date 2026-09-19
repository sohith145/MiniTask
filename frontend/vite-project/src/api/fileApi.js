import api from "./axios.js";

export const getRecentFiles = async () => {
  const response = await api.get("/files?page=1&limit=3");
  return response.data;
};



export const getFilebyId = async (id) => {
  const response = await api.get(`/files/${id}`);
  return response.data;
};



export const downloadFile = async (id) => {
  const response = await api.get(`/files/${id}/download`, {
    responseType: "blob",
  });

  return response.data;
};


export const deleteFile = async (id) => {
  const response = await api.delete(`/files/${id}`);
  return response.data;
};

export const getFiles = async (search = "", page = 1, limit = 100) => {
  const response = await api.get("/files", {
    params: {
      search,
      page,
      limit,
    },
  });

  return response.data;
};


export const uploadFile = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/files/upload", formData);

  return response.data;
};