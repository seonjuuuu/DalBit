"use client";
import { useRouter } from "next/navigation";
import styles from "./Nav.module.scss";
import Cookies from "js-cookie";

const Nav = () => {
  const router = useRouter();

  const handleHongKong = () => {
    router.push("/hongkong");
  };

  const handleLogo = () => {
    router.push("/");
  };

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    router.push("/login");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navWrap}>
        <img
          className={styles.logo}
          src="/dalbit-kr.png"
          alt="logo"
          onClick={handleLogo}
        />
        <ul className={styles.navList}>
          <li onClick={handleHongKong}>홍콩관광청</li>
        </ul>
      </div>
      <button className={styles.logout} onClick={handleLogout}>
        로그아웃
      </button>
    </nav>
  );
};

export default Nav;
