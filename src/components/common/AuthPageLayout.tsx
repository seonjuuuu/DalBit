import { ReactNode } from "react";
import styles from "./AuthPageLayout.module.scss";

type AuthPageLayoutProps = {
  children: ReactNode;
};

const AuthPageLayout = ({ children }: AuthPageLayoutProps) => {
  return (
    <div className={styles.layout}>
      <img src="/dalbit-kr.png" alt="logo" className={styles.logo} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default AuthPageLayout;
