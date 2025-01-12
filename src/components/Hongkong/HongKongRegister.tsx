"use client";

import { useRouter } from "next/navigation";
import Horizontal from "../common/table/Horizontal";
import Table from "../common/table/Table";
import styles from "./HongKongRegister.module.scss";

const HongKongRegister = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/hongkong");
  };
  return (
    <div>
      <h1 className={styles.title}>홍콩관광청 작업 등록</h1>
      <Table>
        <Horizontal title="작업날짜">
          <input></input>
        </Horizontal>
        <Horizontal title="분류">
          <input></input>
        </Horizontal>
        <Horizontal title="금액">
          <input></input>
        </Horizontal>
      </Table>
      <div className={styles.btnWrap}>
        <button>등록</button>
        <button className="border" onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default HongKongRegister;
