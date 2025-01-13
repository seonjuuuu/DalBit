"use client";

import { useForm } from "react-hook-form";
import styles from "./HongKongSearch.module.scss";
import Table from "../common/table/Table";
import Horizontal from "../common/table/Horizontal";
import { useRouter } from "next/navigation";

type FormData = {
  category: string;
  settlement: string;
  workDate: string;
  settlementDate: string;
};

const HongKongSearch = () => {
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      category: "total",
      settlement: "total",
      workDate: "",
      settlementDate: ""
    }
  });

  const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log("검색 조건:", data);
    // 데이터를 기반으로 API 호출 또는 상태 업데이트
  };

  const handleWork = () => {
    router.push("/work-register");
  };

  return (
    <>
      <button className={styles.btn} onClick={handleWork}>
        작업 등록
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.tableWrapper}>
        <Table>
          {/* "분류" 행 */}
          <Horizontal title="분류">
            <label>
              <input
                type="radio"
                {...register("category")}
                value="total"
                checked={watch("category") === "total"}
              />
              전체
            </label>
            <label>
              <input
                type="radio"
                {...register("category")}
                value="translate"
                checked={watch("category") === "translate"}
              />
              번역
            </label>
            <label>
              <input
                type="radio"
                {...register("category")}
                value="homepage"
                checked={watch("category") === "homepage"}
              />
              홈페이지
            </label>
          </Horizontal>

          {/* "정산여부" 행 */}
          <Horizontal title="정산여부">
            <label>
              <input
                type="radio"
                {...register("settlement")}
                value="total"
                checked={watch("settlement") === "total"}
              />
              전체
            </label>
            <label>
              <input
                type="radio"
                {...register("settlement")}
                value="settled"
                checked={watch("settlement") === "settled"}
              />
              정산 완료
            </label>
            <label>
              <input
                type="radio"
                {...register("settlement")}
                value="pending"
                checked={watch("settlement") === "pending"}
              />
              미정산
            </label>
          </Horizontal>

          {/* "작업날짜" 행 */}
          <Horizontal title="작업날짜">
            <input type="date" {...register("workDate")} />
          </Horizontal>

          {/* "정산날짜" 행 */}
          <Horizontal title="정산날짜">
            <input type="date" {...register("settlementDate")} />
          </Horizontal>
        </Table>
        <div className={styles.button}>
          <button type="submit" className={styles.btnSearch}>
            검색하기
          </button>
        </div>
      </form>
    </>
  );
};

export default HongKongSearch;
