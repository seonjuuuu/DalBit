import Nav from "@/components/Nav";
import styles from "./page.module.scss";
import HongKongTable from "@/components/Hongkong/HongKongTable";
import HongKongSearch from "@/components/Hongkong/HongKongSearch";

export default function Home() {
  return (
    <div className={styles.container}>
      <Nav />
      <main className={styles.main}>
        <button className={styles.btn}>작업 등록</button>
        <HongKongSearch />
        <HongKongTable />
      </main>
    </div>
  );
}
