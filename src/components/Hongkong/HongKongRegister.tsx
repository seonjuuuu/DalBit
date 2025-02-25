"use client";

import { useController, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Horizontal from "../common/table/Horizontal";
import Table from "../common/table/Table";
import styles from "./HongKongRegister.module.scss";
import { useRegisterTask, useTaskUpdate } from "@/api/taskMutation";
import ToggleButton from "../common/ToggleButton";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Calculate from "../common/Calculate";

type FormData = {
  workDate: string;
  category: "translation" | "homepage";
  title: string;
  amount: number;
  memo: string;
  settled: boolean;
  settledDate: string | null;
  _id?: string;
};

type Props = {
  initialValues?: Partial<FormData>;
};

const HongKongRegister = ({ initialValues }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      workDate: "",
      category: "translation",
      title: "",
      amount: 0,
      memo: "",
      settled: false,
      settledDate: ""
    }
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: registerTask } = useRegisterTask();
  const { mutate: updateTask } = useTaskUpdate();

  const category = watch("category");

  const { field } = useController({
    name: "settled",
    control,
    defaultValue: false
  });

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        settled: initialValues.settled || false
      });
    }
  }, [initialValues, reset]);

  if (category === "homepage") {
    setValue("amount", 500000);
  }

  const handleCancel = () => {
    router.push("/hongkong");
  };

  const onSubmit = (data: FormData) => {
    if (data.settled && !data.settledDate) {
      setError("settledDate", {
        type: "required",
        message: "정산 날짜를 입력해주세요."
      });
      return;
    }
    const taskData = {
      title: data.title,
      memo: data.memo,
      category: data.category,
      amount: Number(data.amount),
      workDate: data.workDate,
      settled: data.settled,
      settledDate: data.settledDate || null,
      client: "hongkong"
    };
    //수정
    if (initialValues && initialValues._id) {
      updateTask(
        { id: initialValues._id, params: taskData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["taskListWithFilter", {}]
            });
            queryClient
              .invalidateQueries({
                queryKey: ["getDetail", initialValues._id]
              })
              .then(() => {
                reset(taskData);
                alert("수정에 성공하였습니다.");
                router.push("/hongkong");
              });
          },
          onError: (error) => {
            console.error(error);
            alert("수정에 실패하였습니다.");
          }
        }
      );
    } else {
      // 등록
      registerTask(taskData, {
        onSuccess: () => {
          alert("등록에 성공하였습니다.");
          router.push("/hongkong");
          queryClient.invalidateQueries({
            queryKey: ["taskListWithFilter", {}]
          });
          reset();
        },
        onError: (error) => {
          console.error(error);
          alert("등록에 실패하였습니다.");
        }
      });
    }
  };

  const handleDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    setValue("workDate", today);
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.title}>홍콩관광청 작업 등록</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrap}>
        <Table>
          <Horizontal title="전달날짜">
            <input
              type="date"
              {...register("workDate", {
                required: "작업 날짜를 선택해주세요."
              })}
            />
            <button className={styles.button} onClick={handleDate}>
              오늘 날짜
            </button>
            {errors.workDate && (
              <p className={styles.error}>{errors.workDate.message}</p>
            )}
          </Horizontal>
          <Horizontal title="분류">
            <select {...register("category", { required: true })}>
              <option value="translation">번역</option>
              <option value="homepage">홈페이지</option>
            </select>
            {errors.category && (
              <p className={styles.error}>분류를 선택해주세요.</p>
            )}
          </Horizontal>
          <Horizontal title="제목">
            <input
              type="text"
              {...register("title", {
                required: "제목을 입력해주세요.",
                minLength: {
                  value: 3,
                  message: "제목은 최소 3자 이상이어야 합니다."
                }
              })}
            />
            {errors.title && (
              <p className={styles.error}>{errors.title.message}</p>
            )}
          </Horizontal>
          {category === "translation" && (
            <Horizontal title="번역 계산기">
              <Calculate
                onTotalCostChange={(total) => {
                  setValue("amount", total);
                }}
                onMemoChange={(memo) => {
                  setValue("memo", memo);
                }}
              />
            </Horizontal>
          )}
          <Horizontal title="금액">
            <input
              type="number"
              {...register("amount", {
                required: "금액을 입력해주세요.",
                min: { value: 1, message: "금액은 1 이상이어야 합니다." }
              })}
              disabled={category === "homepage"}
            />
            {errors.amount && (
              <p className={styles.error}>{errors.amount.message}</p>
            )}
          </Horizontal>
          <Horizontal title="메모">
            <textarea
              className={styles.text}
              {...register("memo", {
                maxLength: {
                  value: 200,
                  message: "메모는 최대 200자까지 입력 가능합니다."
                }
              })}
            />
            {errors.memo && (
              <p className={styles.error}>{errors.memo.message}</p>
            )}
          </Horizontal>
          <Horizontal title="정산 여부">
            <ToggleButton
              checked={field.value}
              onChange={(checked) => {
                field.onChange(checked);
                if (!checked) {
                  setValue("settledDate", "");
                  clearErrors("settledDate");
                }
              }}
            />
          </Horizontal>
          <Horizontal title="정산 날짜">
            <input
              type="date"
              {...register("settledDate", {})}
              disabled={!field.value}
            />
            {errors.settledDate && (
              <p className={styles.error}>{errors.settledDate.message}</p>
            )}
          </Horizontal>
        </Table>
        <div className={styles.btnWrap}>
          <button type="submit">{initialValues ? "수정" : "등록"}</button>
          <button type="button" className="border" onClick={handleCancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default HongKongRegister;
