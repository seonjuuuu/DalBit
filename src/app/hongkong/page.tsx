import styles from "./page.module.scss";
import HongKongTable from "@/components/Hongkong/HongKongTable";
import HongKongSearch from "@/components/Hongkong/HongKongSearch";

const HongKong = () => {
  return (
    <div className={styles.container}>
      <HongKongSearch />
      <HongKongTable />
    </div>
  );
};

export default HongKong;
