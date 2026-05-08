import api from "./api";

export const createTaskRequest = async (payload) => {
  const response = await api.post("/tasks", payload);
  return response.data;
};

export const getTasksRequest = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const getTaskByIdRequest = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const updateTaskRequest = async (id, payload) => {
  const response = await api.put(`/tasks/${id}`, payload);
  return response.data;
};

export const deleteTaskRequest = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
