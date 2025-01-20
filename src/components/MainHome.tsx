"use client";
import Chart from "./charts/Chart";
import ComboChart from "./charts/ComboChart";
import StackedBarChart from "./charts/CustomPieChart";
import styles from "./MainHome.module.scss";

const MainHome = () => {
  return (
    <div className={styles.container}>
      <Chart />
      <StackedBarChart />
      <ComboChart />
    </div>
  );
};
export default MainHome;
