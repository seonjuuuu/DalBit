"use client";
import { useEffect, useState } from "react";
import styles from "./Calculate.module.scss";

const Calculate = () => {
  const [inputData, setInputData] = useState<string>("");
  const [parsedData, setParsedData] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  const handleParse = () => {
    const rows = inputData.split("\n").filter((row) => row.trim() !== "");
    const parsed = rows.flatMap((row) => row.split("\t"));

    setParsedData(parsed);
  };

  const calculateCost = (count: string): number => {
    const changeNum = Number(count);
    if (isNaN(changeNum)) {
      return 0;
    } else if (changeNum < 34) {
      return 5000;
    } else {
      return changeNum * 150;
    }
  };

  useEffect(() => {
    const total = parsedData.reduce((acc, item) => {
      const cost = calculateCost(item);
      return acc + (isNaN(cost) ? 0 : cost);
    }, 0);
    setTotalCost(total);
  }, [parsedData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <textarea
          placeholder="계산값을 넣어주세요 (엑셀 복사 가능, 엔터로 입력)"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          rows={10}
          className={styles.textarea}
        />
        <button type="button" className={styles.btn} onClick={handleParse}>
          계산하기
        </button>
        <p className={styles.totalCount}>
          총 금액 : {totalCost.toLocaleString()} 원
        </p>
      </div>
      <div className={styles.result}>
        {parsedData.length > 0 ? (
          <div className={styles.resultData}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px" }}>단어수</th>
                  <th style={{ textAlign: "right", padding: "8px" }}>금액</th>
                </tr>
              </thead>
              <tbody>
                {parsedData.map((item, index) => {
                  return (
                    <tr key={index} className={styles.tableList}>
                      <td className={styles.tableLeft}>{item}</td>
                      <td className={styles.tableRight}>
                        {calculateCost(item).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>계산된 값이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Calculate;
