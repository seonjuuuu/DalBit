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

  return (
    <BarChart
      width={650}
      height={400}
      data={
        chartData && chartData.length > 0
          ? chartData
          : [{ month: "", totalAmount: 0 }]
      }
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" tickFormatter={(month) => `${month}월`} />
      <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} />
      <Tooltip
        formatter={(value) => `${value.toLocaleString()}원`}
        labelFormatter={(label) => `${label}월`}
      />
      <Legend />
      <Bar dataKey="totalAmount">
        {chartData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default Chart;
