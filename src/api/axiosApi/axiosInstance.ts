import axios, { AxiosInstance } from "axios";

export const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
};
