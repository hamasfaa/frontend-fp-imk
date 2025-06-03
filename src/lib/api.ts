import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/v1/api",
  withCredentials: true,
});

export const jsonRequest = (url: string, method: string, data?: any) => {
  return api({
    url,
    method,
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const formRequest = (url: string, method: string, data?: FormData) => {
  return api({
    url,
    method,
    data,
  });
};

export default api;
