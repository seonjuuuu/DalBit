import Nav from "@/components/Nav";
import styles from "./page.module.scss";
import HongKongRegister from "@/components/Hongkong/HongKongRegister";

export default function Home() {
  return (
    <div className={styles.container}>
      <Nav />
      <main className={styles.main}>
        <HongKongRegister />
      </main>
    </div>
  );
}
