"use client";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./HongKongTable.module.scss";
import {
  useDeleteTask,
  useTaskListWithFilter,
  useTaskSettledUpdate
} from "@/api/taskMutation";
import { useRouter } from "next/navigation";
import { Filter } from "@/app/hongkong/page";
import Pagination from "react-js-pagination";

type Props = {
  filter: Omit<Filter, "category"> & {
    category?: Exclude<Filter["category"], "total">;
  };
};

const HongKongTable = ({ filter }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [checkedItemsId, setCheckedItemsId] = useState<string[]>([]);
  const [settledDate, setSettledDate] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 30;

  const newFilter = {
    ...filter,
    page: currentPage,
    limit: itemsPerPage
  };

  const { data, isPending, refetch } = useTaskListWithFilter(newFilter);

  const handleSelectAll = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    data && setCheckedItems(new Array(data.tasks.length).fill(newCheckedState));

    const allCheckedIds = newCheckedState
      ? data && data.tasks.map((task) => task._id)
      : [];
    setCheckedItemsId(allCheckedIds || []);
  };

  const handleCheckboxChange = (index: number, id: string) => {
    toggleCheckId(id);
    toggleItem(index);
  };

  const toggleCheckId = (id: string) => {
    const newCheckedIds = [...checkedItemsId];
    if (newCheckedIds.includes(id)) {
      newCheckedIds.splice(newCheckedIds.indexOf(id), 1);
    } else {
      newCheckedIds.push(id);
    }
    setCheckedItemsId(newCheckedIds);
  };

  const toggleItem = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    if (newCheckedItems.every((item) => item)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  useEffect(() => {
    if (data) {
      setCheckedItems(new Array(data.tasks.length).fill(false));
    }
  }, [data]);

  const router = useRouter();
  useEffect(() => {
    refetch();
  }, [router]);

  const { mutate, isError, isSuccess } = useDeleteTask();
  const { mutate: updateSettled } = useTaskSettledUpdate();

  const handleDelete = (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;
    mutate({ id });
  };

  const handleSettled = () => {
    if (!settledDate) {
      alert("정산 날짜를 선택해주세요.");
      return;
    }

    if (checkedItemsId.length === 0) {
      alert("선택된 작업이 없습니다.");
      return;
    }

    const params = {
      settledDate: new Date(settledDate).toISOString(),
      ids: checkedItemsId
    };
    updateSettled(params, {
      onSuccess: () => {
        setIsChecked(false);
        setCheckedItems([]);
        setCheckedItemsId([]);
        refetch();
      }
    });
  };

  const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
    setSettledDate(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
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
      <div className={`${styles.secondWrap} ${styles.right}`}>
        <input type="date" onChange={handleDate} />
        <button type="button" onClick={handleSettled}>
          정산 완료
        </button>
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
                    checked={checkedItems[index] || false}
                    onChange={() => handleCheckboxChange(index, item._id)}
                  />
                </td>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
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
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={data?.totalTask || 0}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default HongKongTable;
