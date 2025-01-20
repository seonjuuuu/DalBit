import { useTaskSettledSixMonth } from "@/api/taskMutation";
import dynamic from "next/dynamic";

import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const ComposedChart = dynamic(
  () => import("recharts").then((recharts) => recharts.ComposedChart),
  {
    ssr: false
  }
);

const months = [
  { key: "1월", color: "#fad97b" },
  { key: "2월", color: "#ffab91" },
  { key: "3월", color: "#a5d6a7" },
  { key: "4월", color: "#ffcc80" },
  { key: "5월", color: "#ce93d8" },
  { key: "6월", color: "#ffab91" },
  { key: "7월", color: "#80deea" },
  { key: "8월", color: "#d4e157" },
  { key: "9월", color: "#ff8a65" },
  { key: "10월", color: "#90caf9" },
  { key: "11월", color: "#f06292" },
  { key: "12월", color: "#ba68c8" }
];

const ComboChart = () => {
  const { data, isPending, refetch } = useTaskSettledSixMonth();
  const chartData = Array.isArray(data?.data) ? data.data : [];
  return (
    <ComposedChart
      width={650}
      height={400}
      data={chartData}
      margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis tickFormatter={(value) => `${value.toLocaleString()}원`} />
      <Tooltip formatter={(value) => `${value.toLocaleString()}원`} />
      <Legend />
      {months.map(
        (month) =>
          chartData.some((data) => data[month.key]) && (
            <Bar key={month.key} dataKey={month.key} fill={month.color} />
          )
      )}
      <Line type="monotone" dataKey="total" stroke="#000" name="총 정산 금액" />
    </ComposedChart>
  );
};

export default ComboChart;
