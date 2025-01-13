"use client";
import { useTaskDetail } from "@/api/taskMutation";
import HongKongRegister from "./HongKongRegister";
import { useQueryClient } from "@tanstack/react-query";

type ModifyProps = {
  id: string;
};

const HongKongModify = ({ id }: ModifyProps) => {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useTaskDetail(id);

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  if (!data || !data.task) {
    return <div>작업 정보를 불러오지 못했습니다.</div>;
  }

  const task = data.task;
  const formatDate = (isoDate: string) => isoDate.split("T")[0];

  const initialValues = {
    workDate: task.workDate ? formatDate(task.workDate) : "",
    category: task.category,
    title: task.title,
    amount: task.amount,
    memo: task.memo || "",
    settled: task.settled,
    settledDate: task.settledDate ? formatDate(task.settledDate) : "",
    _id: task._id
  };

  return (
    <div>
      <HongKongRegister initialValues={initialValues} />
    </div>
  );
};

export default HongKongModify;
