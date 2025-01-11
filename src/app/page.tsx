import Nav from "@/components/Nav";
import styles from "./page.module.scss";
import HongKongTable from "@/components/Hongkong/HongKongTable";

export default function Home() {
  return (
    <div className={styles.container}>
      <Nav />
      <main className={styles.main}>
        <HongKongTable />
      </main>
    </div>
  );
}
