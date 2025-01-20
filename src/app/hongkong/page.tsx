"use client";
import styles from "./page.module.scss";
import HongKongTable from "@/components/Hongkong/HongKongTable";
import HongKongSearch from "@/components/Hongkong/HongKongSearch";
import { useState } from "react";

export type Filter = {
  category?: "total" | "translation" | "homepage";
  settled?: boolean;
  startDate?: string;
  endDate?: string;
  settledStart?: string;
  settledEnd?: string;
  settlement?: "total" | "settled" | "pending";
  page?: number;
  limit?: number;
};

const HongKong = () => {
  const [filter, setFilter] = useState({});
  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  return (
    <div className={styles.container}>
      <HongKongSearch onFilterChange={handleFilterChange} />
      <HongKongTable filter={filter} />
    </div>
  );
};

export default HongKong;
