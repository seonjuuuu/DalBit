"use client";
import styles from "./HongKongTable.module.scss";

const HongKongTable = () => {
  return (
    <div className={styles.mainTable}>
      <div className={styles.cost}>
        <div className={styles.total}> 총 금액 : 10,000원</div>
        <div className={styles.settledAmount}> 정산 금액 : 5,000원</div>
        <div className={styles.pendingAmount}> 미정산금액 : 5,000원</div>
      </div>
      <table className="tableList">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>분류</th>
            <th>금액</th>
            <th>정산여부</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>번역작업</td>
            <td>번역</td>
            <td>500,000</td>
            <td>Y</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HongKongTable;
