import styles from "./Login.module.scss";

const Login = () => {
  return (
    <div className={styles.login}>
      <h2 className={styles.title}>로그인</h2>
      <div className={styles.inputWrap}>
        <label className={styles.inputBox}>
          <span>아이디</span>
          <input type="text" />
        </label>
        <label className={styles.inputBox}>
          <span>비밀번호</span>
          <input type="password" />
        </label>
      </div>
      <div className={styles.btnWrap}>
        <button className={styles.loginBtn}>로그인</button>
        <button className={styles.registerBtn}>회원가입</button>
      </div>
    </div>
  );
};

export default Login;
