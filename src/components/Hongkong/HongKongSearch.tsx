"use client";
import { useState } from "react";
import styles from "./HongKongSearch.module.scss";
import Table from "../common/table/Table";
import Horizontal from "../common/table/Horizontal";

const HongKongSearch = () => {
  const [settlement, setSettlement] = useState("total");
  const [category, setCategory] = useState("total");

  return (
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
              value="category2"
              checked={category === "category2"}
              onChange={() => setCategory("category2")}
            />
            Category 2
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="category3"
              checked={category === "category3"}
              onChange={() => setCategory("category3")}
            />
            Category 3
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
      </Table>
      <div className={styles.button}>
        <button className={styles.btnSearch}>검색하기</button>
      </div>
    </div>
  );
};

export default HongKongSearch;
