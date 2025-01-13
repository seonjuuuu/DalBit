import { useMutation } from "@tanstack/react-query";
import axiosClient from "./axiosApi/axiosClient";

export type TaskParams = {
  title: string;
  category: "translation" | "homepage";
  memo?: string;
  workDate: string;
  amount: number;
};

export type Task = {
  _id: string;
  title: string;
  category: "translation" | "homepage";
  workDate: string;
  amount: number;
  settled: boolean;
  memo?: string;
};

export type TaskResponse = {
  status: "success" | "error";
  totalTask: number;
  currentPage: number;
  totalPage: number;
  tasks: Task[];
  settled: boolean | null;
  settledDate: string | null;
};

export const registerTask = async (
  params: TaskParams
): Promise<TaskResponse> => {
  const response = await axiosClient.post<TaskResponse>("/task", params);
  return response.data;
};

export const useRegisterTask = () => {
  return useMutation<TaskResponse, Error, TaskParams>({
    mutationFn: registerTask
  });
};
