"use client";
import { useRouter } from "next/navigation";
import styles from "./Nav.module.scss";

const Nav = () => {
  const router = useRouter();

  const handleHongKong = () => {
    router.push("/hongkong");
  };

  const handleLogo = () => {
    router.push("/");
  };

  return (
    <nav className={styles.nav}>
      <img
        className={styles.logo}
        src="/dalbit-kr.png"
        alt="logo"
        onClick={handleLogo}
      />
      <ul className={styles.navList}>
        <li onClick={handleHongKong}>홍콩관광청</li>
      </ul>
    </nav>
  );
};

export default Nav;
