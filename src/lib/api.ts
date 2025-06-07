import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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
