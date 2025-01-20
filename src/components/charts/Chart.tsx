"use client";
import dynamic from "next/dynamic";
import { useTaskSixMonth } from "@/api/taskMutation";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts";
import { useEffect } from "react";

type ChartData = {
  month: string;
  total: number;
};
const BarChart = dynamic(
  () => import("recharts").then((recharts) => recharts.BarChart),
  {
    ssr: false
  }
);

const COLORS = [
  "#fad97b",
  "#81d4fa",
  "#ffab91",
  "#a5d6a7",
  "#ce93d8",
  "#ffe082"
];

const Chart = () => {
  const { data, isPending, refetch } = useTaskSixMonth();
  const chartData: ChartData[] = Array.isArray(data?.data) ? data.data : [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <BarChart
      width={450}
      height={400}
      data={
        chartData && chartData.length > 0
          ? chartData
          : [{ month: "", totalAmount: 0 }]
      }
      margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" tickFormatter={(month) => `${month}월`} />
      <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} />
      <Tooltip
        formatter={(value) => [`${value.toLocaleString()}원`, "작업금액"]}
        labelFormatter={(label) => `${label}월`}
      />
      <Legend formatter={() => "홍콩 관광청 작업금액"} />
      <Bar dataKey="totalAmount">
        {chartData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default Chart;
