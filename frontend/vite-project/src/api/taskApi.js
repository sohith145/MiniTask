import api from "./axios.js";


export const getTasks = async (search = "", page = 1, limit = 10) => {
  const response = await api.get("/tasks", {
    params: {
      search,
      page,
      limit,
    },
  });

  return response.data;
};





export const getrecentTasks = async () => {
  const response = await api.get("/tasks?page=1&limit=3");
  return response.data;
};


export const getTaskById = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}`);

  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post(`/tasks`, taskData);

  return response.data;
};


export const updateTask = async (taskId, taskData) => {
  const response = await api.patch(`/tasks/${taskId}`, taskData);

  return response.data;
};


export const deleteTask = async (taskId) => {
   const response = await api.delete(`/tasks/${taskId}`);

  return response.data;
};



