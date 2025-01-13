import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosApi/axiosClient";
import { queryClient } from "./queryClient";

export type TaskParams = {
  title: string;
  category: "translation" | "homepage";
  memo?: string;
  workDate: string;
  amount: number;
  settled: boolean;
  settledDate: string | null;
};

export type Task = {
  _id: string;
  title: string;
  category: "translation" | "homepage";
  workDate: string;
  amount: number;
  settled: boolean;
  memo?: string;
  settledDate: string | null;
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

export type TaskDetailResponse = {
  status: "success" | "error";
  task: Task;
};

export type TaskRegisterResponse = {
  status: "success" | "error";
  message: string;
};

export const registerTask = async (
  params: TaskParams
): Promise<TaskRegisterResponse> => {
  const response = await axiosClient.post<TaskRegisterResponse>(
    "/task",
    params
  );
  return response.data;
};

export const useRegisterTask = () => {
  return useMutation<TaskRegisterResponse, Error, TaskParams>({
    mutationFn: registerTask
  });
};

export const taskListWithFilter = async (filters: {
  category?: "translation" | "homepage";
  startDate?: string;
  endDate?: string;
  settled?: boolean;
}): Promise<TaskResponse> => {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.startDate) params.append("startDate", filters.startDate);
  if (filters.endDate) params.append("endDate", filters.endDate);
  if (typeof filters.settled === "boolean") {
    params.append("settled", filters.settled.toString());
  }

  const response = await axiosClient.get<TaskResponse>(
    `/task?${params.toString()}`
  );
  return response.data;
};

export const useTaskListWithFilter = (filters: {
  category?: "translation" | "homepage";
  startDate?: string;
  endDate?: string;
  settled?: boolean;
}) => {
  return useQuery<TaskResponse, Error>({
    queryKey: ["taskListWithFilter", filters],
    queryFn: async () => await taskListWithFilter(filters),
    enabled: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  });
};

export const getDetail = async (id: string): Promise<TaskDetailResponse> => {
  const response = await axiosClient.get<TaskDetailResponse>(`/task/${id}`);
  return response.data;
};

export const useTaskDetail = (id: string) => {
  return useQuery<TaskDetailResponse, Error>({
    queryKey: ["getDetail", id],
    queryFn: async () => await getDetail(id),
    enabled: true
  });
};

export const taskUpdate = async (
  id: string,
  params: TaskParams
): Promise<TaskRegisterResponse> => {
  const response = await axiosClient.put<TaskRegisterResponse>(
    `/task/${id}`,
    params
  );
  return response.data;
};

export const useTaskUpdate = () => {
  return useMutation<
    TaskRegisterResponse,
    Error,
    { id: string; params: TaskParams }
  >({
    mutationFn: ({ id, params }) => taskUpdate(id, params),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["taskListWithFilter", {}] });
      queryClient.invalidateQueries({ queryKey: ["getDetail", id] });
    }
  });
};
