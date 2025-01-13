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

export const registerUser = async (
  params: RegisterParams
): Promise<RegisterResponse> => {
  const response = await axiosClient.post<RegisterResponse>("/user", params);
  return response.data;
};

export const useRegisterUser = () => {
  return useMutation<RegisterResponse, Error, RegisterParams>({
    mutationFn: registerUser
  });
};
