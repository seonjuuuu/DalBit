"use client";

import { useState } from "react";
import styles from "./HongKongSearch.module.scss";
import Table from "../common/table/Table";
import Horizontal from "../common/table/Horizontal";
import { useRouter } from "next/navigation";

const HongKongSearch = () => {
  const [settlement, setSettlement] = useState("total");
  const [category, setCategory] = useState("total");

  const router = useRouter();

  const handleWork = () => {
    router.push("/work-register");
  };

  return (
    <>
      <button className={styles.btn} onClick={handleWork}>
        작업 등록
      </button>
      <div className={styles.tableWrapper}>
        <Table>
          {/* "분류" 행 */}
          <Horizontal title="분류">
            <label>
              <input
                type="radio"
                name="category"
                value="total"
                checked={category === "total"}
                onChange={() => setCategory("total")}
              />
              전체
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="translate"
                checked={category === "translate"}
                onChange={() => setCategory("translate")}
              />
              번역
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="homepage"
                checked={category === "homepage"}
                onChange={() => setCategory("homepage")}
              />
              홈페이지
            </label>
          </Horizontal>

          {/* "정산여부" 행 */}
          <Horizontal title="정산여부">
            <label>
              <input
                type="radio"
                name="settlement"
                value="total"
                checked={settlement === "total"}
                onChange={() => setSettlement("total")}
              />
              전체
            </label>
            <label>
              <input
                type="radio"
                name="settlement"
                value="settled"
                checked={settlement === "settled"}
                onChange={() => setSettlement("settled")}
              />
              정산 완료
            </label>
            <label>
              <input
                type="radio"
                name="settlement"
                value="pending"
                checked={settlement === "pending"}
                onChange={() => setSettlement("pending")}
              />
              미정산
            </label>
          </Horizontal>
          <Horizontal title="작업날짜">
            <input type="date" />
          </Horizontal>
          <Horizontal title="정산날짜">
            <input type="date" />
          </Horizontal>
        </Table>
        <div className={styles.button}>
          <button className={styles.btnSearch}>검색하기</button>
        </div>
      </div>
    </>
  );
};

export default HongKongSearch;
