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
    <div className={styles.register}>
      <h1 className={styles.title}>홍콩관광청 작업 등록</h1>
      <Table>
        <Horizontal title="작업날짜">
          <input type="date" />
        </Horizontal>
        <Horizontal title="분류">
          <select>
            <option value="translation">번역</option>
            <option value="website">홈페이지</option>
          </select>
        </Horizontal>
        <Horizontal title="제목">
          <input type="text" />
        </Horizontal>
        <Horizontal title="금액">
          <input type="number" />
        </Horizontal>
        <Horizontal title="메모">
          <textarea className={styles.text} />
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
