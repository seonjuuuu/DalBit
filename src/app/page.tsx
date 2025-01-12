import styles from "./page.module.scss";
import HongKongTable from "@/components/Hongkong/HongKongTable";
import HongKongSearch from "@/components/Hongkong/HongKongSearch";

const Home = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HongKongSearch />
        <HongKongTable />
      </main>
    </div>
  );
};

export default Home;
