"use client";
import { useState } from "react";
import ToggleButton from "../common/ToggleButton";
import styles from "./HongKongTable.module.scss";
import { useTaskListWithFilter } from "@/api/taskMutation";

const HongKongTable = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(2).fill(false)
  );

  const filter = {};

  const { data, isPending, error } = useTaskListWithFilter(filter);

  const handleSelectAll = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    data && setCheckedItems(new Array(data.tasks.length).fill(newCheckedState));
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
            <th>전달날짜</th>
            <th>금액</th>
            <th>정산여부</th>
            <th>정산날짜</th>
            <th>메모</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.tasks.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={checkedItems[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>{index + 1}</td>
                <td className={styles.field}>{item.title}</td>
                <td>{item.category === "homepage" ? "홈페이지" : "번역"}</td>
                <td>
                  {isNaN(new Date(item.workDate).getTime())
                    ? "-"
                    : new Date(item.workDate).toISOString().split("T")[0]}
                </td>
                <td>{item.amount.toLocaleString()}</td>
                <td>{item.settled ? "Y" : "N"}</td>
                <td>
                  {item.settledDate &&
                  isNaN(new Date(item.settledDate).getTime())
                    ? "-"
                    : item.settledDate &&
                      new Date(item.settledDate).toISOString().split("T")[0]}
                </td>
                <td className={styles.field}>{item.memo}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HongKongTable;
