import styles from "./Nav.module.scss";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <img className={styles.logo} src="/dalbit-kr.png" alt="logo" />
      <ul className={styles.navList}>
        <li>홍콩관광청</li>
      </ul>
    </nav>
  );
};

export default Nav;
