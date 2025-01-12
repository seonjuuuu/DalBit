import { ReactNode } from "react";

type HorizontalProps = {
  title: string;
  children: ReactNode;
};

const Horizontal = ({ title, children }: HorizontalProps) => {
  return (
    <tr>
      <th>{title}</th>
      <td>{children}</td>
    </tr>
  );
};

export default Horizontal;
