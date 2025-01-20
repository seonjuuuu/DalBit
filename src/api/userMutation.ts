import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosClient from "./axiosApi/axiosClient";

export type RegisterParams = {
  loginId: string;
  name: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
  userId: number;
};

export type LoginParams = Omit<RegisterParams, "name">;

export type User = {
  _id: string;
  loginId: string;
  name: string;
};

export type LoginResponse = {
  status: "success" | "error";
  user: User;
  token: string;
};

export const registerUser = async (
  params: RegisterParams
): Promise<RegisterResponse> => {
  const response = await axiosClient.post<RegisterResponse>("/user", params);
  return response.data;
};

export const loginUser = async (
  params: LoginParams
): Promise<LoginResponse> => {
  const response = await axiosClient.post<LoginResponse>("/auth/login", params);
  return response.data;
};

export const useRegisterUser = () => {
  return useMutation<RegisterResponse, Error, RegisterParams>({
    mutationFn: registerUser
  });
};

export const useLoginUser = () => {
  return useMutation<LoginResponse, Error, LoginParams>({
    mutationFn: loginUser
  });
};
