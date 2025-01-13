"use client";

import { useForm } from "react-hook-form";
import styles from "./HongKongSearch.module.scss";
import Table from "../common/table/Table";
import Horizontal from "../common/table/Horizontal";
import { useRouter } from "next/navigation";
import { Filter } from "@/app/hongkong/page";

type Props = {
  onFilterChange: (filter: Filter) => void;
};

const HongKongSearch = ({ onFilterChange }: Props) => {
  const { register, handleSubmit, watch, reset } = useForm<Filter>({
    defaultValues: {
      category: "total",
      settlement: "total",
      startDate: "",
      endDate: "",
      settledStart: "",
      settledEnd: ""
    }
  });

  const router = useRouter();

  const onSubmit = (data: Filter) => {
    const cleanedFilter = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) =>
          key !== "settlement" && value !== "" && value !== "total"
      )
    );
    if (data.settlement === "settled") {
      cleanedFilter["settled"] = true;
    } else if (data.settlement === "pending") {
      cleanedFilter["settled"] = false;
    }

    onFilterChange(cleanedFilter);
  };

  const handleWork = () => {
    router.push("/work-register");
  };

  const handleInit = () => {
    reset();
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
                value="translation"
                checked={watch("category") === "translation"}
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

          {/* "전달날짜" 행 */}
          <Horizontal title="전달날짜">
            <div className={styles.dateWrap}>
              <input
                className={styles.date}
                type="date"
                {...register("startDate")}
              />
              ~
              <input
                className={styles.date}
                type="date"
                {...register("endDate")}
              />
            </div>
          </Horizontal>

          {/* "정산날짜" 행 */}
          <Horizontal title="정산날짜">
            <div className={styles.dateWrap}>
              <input
                className={styles.date}
                type="date"
                {...register("settledStart")}
              />
              ~
              <input
                className={styles.date}
                type="date"
                {...register("settledEnd")}
              />
            </div>
          </Horizontal>
        </Table>
        <div className={styles.button}>
          <button type="submit" className={styles.btnSearch}>
            검색하기
          </button>
          <button
            type="button"
            className={`${styles.btnSearch} ${styles.border}`}
            onClick={handleInit}
          >
            초기화
          </button>
        </div>
      </form>
    </>
  );
};

export default HongKongSearch;
