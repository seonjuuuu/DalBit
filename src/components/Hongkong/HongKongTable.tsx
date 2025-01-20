"use client";
import { useEffect, useState } from "react";
import styles from "./HongKongTable.module.scss";
import { useDeleteTask, useTaskListWithFilter } from "@/api/taskMutation";
import { useRouter } from "next/navigation";
import { Filter } from "@/app/hongkong/page";

type Props = {
  filter: Omit<Filter, "category"> & {
    category?: Exclude<Filter["category"], "total">;
  };
};

const HongKongTable = ({ filter }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(2).fill(false)
  );

  console.log(filter);

  const { data, isPending, refetch } = useTaskListWithFilter(filter);

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

  const router = useRouter();
  useEffect(() => {
    refetch();
  }, [router]);

  const { mutate, isError, isSuccess } = useDeleteTask();

  const handleDelete = (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;
    mutate({ id });
  };

  return (
    <div className={styles.mainTable}>
      <div className={styles.cost}>
        <div className={styles.total}>
          총 금액 : {data ? data.totalAmount.toLocaleString() : 0}원
        </div>
        <div className={styles.amount}>
          <div className={styles.settledAmount}>
            정산 금액 : {data ? data.settledAmount.toLocaleString() : "-"}원
          </div>
          <div className={styles.pendingAmount}>
            미정산금액 : {data ? data.unsettledAmount.toLocaleString() : "-"}원
          </div>
        </div>
      </div>
      <div className={`${styles.buttonWrap} ${styles.right}`}>
        <button>일괄 정산</button>
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
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <tr>
              <td colSpan={10} className={styles.loading}>
                데이터를 로딩 중입니다...
              </td>
            </tr>
          ) : data && data.tasks.length > 0 ? (
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
                <td
                  className={styles.title}
                  onClick={(event) => {
                    event.preventDefault();
                    router.push(`/detail/${item._id}`);
                  }}
                >
                  {item.title}
                </td>
                <td>{item.category === "homepage" ? "홈페이지" : "번역"}</td>
                <td>
                  {isNaN(new Date(item.workDate).getTime())
                    ? "-"
                    : new Date(item.workDate).toISOString().split("T")[0]}
                </td>
                <td>{item.amount.toLocaleString()}</td>
                <td>{item.settled ? "Y" : "N"}</td>
                <td>
                  {item.settledDate
                    ? isNaN(new Date(item.settledDate).getTime())
                      ? "-"
                      : new Date(item.settledDate).toISOString().split("T")[0]
                    : "-"}
                </td>
                <td className={styles.field}>{item.memo}</td>
                <td>
                  <button onClick={() => handleDelete(item._id)}>삭제</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className={styles.noData}>
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HongKongTable;
