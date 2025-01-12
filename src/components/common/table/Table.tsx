import { ReactNode } from "react";

type TableProps = {
  children: ReactNode;
};

const Table = ({ children }: TableProps) => {
  return (
    <table className="tableList">
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
