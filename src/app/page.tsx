"use client";
import MainHome from "@/components/MainHome";
import styles from "./page.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <MainHome />
      </main>
    </div>
  );
};

export default Home;
