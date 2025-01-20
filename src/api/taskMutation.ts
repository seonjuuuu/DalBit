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
  totalAmount: number;
  settledAmount: number;
  unsettledAmount: number;
};

export type TaskDetailResponse = {
  status: "success" | "error";
  task: Task;
};

export type TaskDefaultResponse = {
  status: "success" | "error";
  data: string;
};

export type TaskRegisterResponse = {
  status: "success" | "error";
  message: string;
};

export type TaskSettledUpdateParams = {
  ids: string[];
  settledDate: string;
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
  settledStart?: string;
  settledEnd?: string;
  page?: number;
  limit?: number;
}): Promise<TaskResponse> => {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.startDate) params.append("startDate", filters.startDate);
  if (filters.endDate) params.append("endDate", filters.endDate);
  if (filters.settledStart) params.append("settledStart", filters.settledStart);
  if (filters.settledEnd) params.append("settledEnd", filters.settledEnd);
  if (typeof filters.settled === "boolean") {
    params.append("settled", filters.settled.toString());
  }
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());

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
  settledEnd?: string;
  settledStart?: string;
}) => {
  return useQuery<TaskResponse, Error>({
    queryKey: ["taskListWithFilter", filters],
    queryFn: async () => await taskListWithFilter(filters),
    enabled: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  });
};

export const taskSixMonth = async (): Promise<TaskDefaultResponse> => {
  const response = await axiosClient.get<TaskDefaultResponse>("/task/recent");
  return response.data;
};

export const useTaskSixMonth = () => {
  return useQuery<TaskDefaultResponse, Error>({
    queryKey: ["taskSixMonth"],
    queryFn: async () => await taskSixMonth(),
    enabled: true
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

export const taskDelete = async (id: string): Promise<TaskRegisterResponse> => {
  const response = await axiosClient.delete<TaskRegisterResponse>(
    `/task/${id}`
  );
  return response.data;
};

export const useDeleteTask = () => {
  return useMutation<TaskRegisterResponse, Error, { id: string }>({
    mutationFn: ({ id }) => taskDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskListWithFilter"] });
    }
  });
};

export const taskSettledUpdate = async (params: TaskSettledUpdateParams) => {
  const response = await axiosClient.post<TaskRegisterResponse>(
    "/task/settled",
    params
  );
  return response.data;
};

export const useTaskSettledUpdate = () => {
  return useMutation<TaskRegisterResponse, Error, TaskSettledUpdateParams>({
    mutationFn: taskSettledUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskListWithFilter"] });
      alert("정산이 완료되었습니다.");
    },
    onError: () => {
      alert("정산에 실패했습니다. 다시 시도해주세요.");
    }
  });
};
