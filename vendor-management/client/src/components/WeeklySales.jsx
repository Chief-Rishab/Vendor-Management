import "./Chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import React from "react";

const data = [
  {
    name: "Mon",
    "Active User": 3500,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Tue",
    "Active User": 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Wed",
    "Active User": 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Thu",
    "Active User": 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Fri",
    "Active User": 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Sat",
    "Active User": 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Sun",
    "Active User": 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function WeeklySales() {
  return (
    <div className="chart">
      {" "}
      <h3 className="chartTitle">Weekly Sales</h3>
      <ResponsiveContainer width="100%" aspect={4 / 2}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line
            type="monotone"
            dataKey="Active User"
            stroke="#5550bd"
            activeDot={{ r: 8 }}
          />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
