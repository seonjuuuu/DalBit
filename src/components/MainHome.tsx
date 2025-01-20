"use client";
import { useTaskCurrentList, useTaskListWithFilter } from "@/api/taskMutation";
import Chart from "./charts/Chart";
import ComboChart from "./charts/ComboChart";
import StackedBarChart from "./charts/CustomPieChart";
import styles from "./MainHome.module.scss";

const MainHome = () => {
  const { data, isPending, refetch } = useTaskCurrentList();

  return (
    <>
      <div>
        <div className={styles.wrap}>
          <div className={styles.container}>
            <div>
              <h3 className={styles.text}> 작업 금액 차트</h3>
              <div className={styles.containerTop}>
                <StackedBarChart />
                <Chart />
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.text}>최근 작업 내용</h3>
              <ul className={styles.currentList}>
                {data &&
                  Array.isArray(data.data) &&
                  data.data.map((item, index) => (
                    <li key={index} className={styles.currentListItem}>
                      <div className={styles.currentInfo}>
                        <span className={styles.currentTag}>
                          {item.client === "hongkong" ? "홍콩관광청" : ""}
                        </span>
                        <span>{item.title}</span>
                      </div>
                      <span>
                        {new Date(item.workDate).toISOString().split("T")[0]}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.containerMid}>
        <div className={styles.text}>년도별 정산금액</div>
        <ComboChart />
      </div>
    </>
  );
};
export default MainHome;
