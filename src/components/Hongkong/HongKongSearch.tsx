"use client";
import { useState } from "react";
import styles from "./HongKongSearch.module.scss";

const HongKongSearch = () => {
  const [settlement, setSettlement] = useState("settled");
  const [category, setCategory] = useState("category1");

  return (
    <div className={styles.tableWrapper}>
      <table className="tableList">
        <tbody>
          <tr>
            <th>분류</th>
            <td>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="category1"
                  checked={category === "category1"}
                  onChange={() => setCategory("category1")}
                />
                Category 1
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
            </td>
          </tr>
          <tr>
            <th>정산여부</th>
            <td>
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HongKongSearch;
