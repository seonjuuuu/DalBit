import Login from "@/components/Login";
import styles from "./page.module.scss";

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <img src="/dalbit-kr.png" alt="logo" className={styles.logo} />
      <div className={styles.content}>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
