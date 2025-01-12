"use client";
import { useState } from "react";
import ToggleButton from "../common/ToggleButton";
import styles from "./HongKongTable.module.scss";

const HongKongTable = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(2).fill(false)
  );

  const data = [
    {
      id: 1,
      title: "번역작업",
      category: "번역",
      date: "2024-01-01",
      amount: "500,000",
      settleDate: "2024-01-27"
    },
    {
      id: 2,
      title: "아웃도어캠페인",
      category: "홈페이지",
      date: "2024-01-01",
      amount: "500,000",
      settleDate: "2024-01-27"
    }
  ];

  const handleSelectAll = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    setCheckedItems(new Array(data.length).fill(newCheckedState));
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    if (newCheckedItems.every((item) => item)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  return (
    <div className={styles.mainTable}>
      <div className={styles.cost}>
        <div className={styles.total}> 총 금액 : 10,000원</div>
        <div className={styles.amount}>
          <div className={styles.settledAmount}> 정산 금액 : 5,000원</div>
          <div className={styles.pendingAmount}> 미정산금액 : 5,000원</div>
        </div>
      </div>
      <table className="tableList">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleSelectAll}
              />
            </th>
            <th>번호</th>
            <th>제목</th>
            <th>분류</th>
            <th>작업날짜</th>
            <th>금액</th>
            <th>정산여부</th>
            <th>정산날짜</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.date}</td>
              <td>{item.amount}</td>
              <td>
                <ToggleButton />
              </td>
              <td>{item.settleDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HongKongTable;
