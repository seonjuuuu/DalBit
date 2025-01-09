import Nav from "@/components/Nav";
import styles from "./page.module.scss";
import Login from "@/components/Login";

export default function Home() {
  return (
    <div className={styles.container}>
      <Login />
      {/* <Nav /> */}
    </div>
  );
}
