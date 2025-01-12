import { ReactNode } from "react";
import styles from "./Horizontal.module.scss";

type HorizontalProps = {
  title: string;
  children: ReactNode;
};

const Horizontal = ({ title, children }: HorizontalProps) => {
  return (
    <tr className={styles.tr}>
      <th className={styles.th}>{title}</th>
      <td className={styles.td}>{children}</td>
    </tr>
  );
};

export default Horizontal;
