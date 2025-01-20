import { useTaskSettledTotal } from "@/api/taskMutation";
import dynamic from "next/dynamic";
import { Pie, Cell, Tooltip, Legend } from "recharts";

const PieChart = dynamic(
  () => import("recharts").then((recharts) => recharts.PieChart),
  {
    ssr: false
  }
);

const COLORS = ["#81d4fa", "#fad97b"];

type PieData = {
  name: string;
  value: number;
};

const CustomPieChart = () => {
  const { data, isPending, refetch } = useTaskSettledTotal();
  const chartData: PieData[] = Array.isArray(data?.data) ? data.data : [];

  return (
    <PieChart width={650} height={400}>
      <Tooltip
        formatter={(value, name) => [`${value.toLocaleString()}원`, name]}
      />
      <Legend />
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={({ name, value }) => `${name}: ${value.toLocaleString()}원`}
      >
        {chartData &&
          chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
      </Pie>
    </PieChart>
  );
};

export default CustomPieChart;
