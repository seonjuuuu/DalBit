import styles from "./Register.module.scss";

const Register = () => {
  return (
    <div className={styles.register}>
      <h2 className={styles.title}>회원가입</h2>
      <div className={styles.inputWrap}>
        <label className={styles.inputBox}>
          <span>아이디</span>
          <input type="text" />
        </label>
        <label className={styles.inputBox}>
          <span>닉네임</span>
          <input type="text" />
        </label>
        <label className={styles.inputBox}>
          <span>비밀번호</span>
          <input type="password" />
        </label>
        <label className={styles.inputBox}>
          <span>비밀번호 확인</span>
          <input type="password" />
        </label>
      </div>
      <div className={styles.btnWrap}>
        <button className={styles.registerBtn}>회원가입</button>
        <button className={styles.loginBtn}>로그인하기</button>
      </div>
    </div>
  );
};

export default Register;
