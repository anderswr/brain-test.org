// /lib/report_iq.tsx
import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryId } from "@/lib/types";
import { IQResult } from "@/lib/scoring_iq";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from "recharts";

interface ReportIQProps {
  result: IQResult;
}

function generateNormalData(mean = 100, sd = 15) {
  const data = [];
  for (let x = 55; x <= 145; x += 1) {
    const y =
      (1 / (sd * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - mean) / sd, 2));
    data.push({ x, y });
  }
  return data;
}

export default function ReportIQ({ result }: ReportIQProps) {
  const data = generateNormalData();

  const iqColor =
    result.iq >= 130 ? "text-purple-600" :
    result.iq >= 115 ? "text-green-600" :
    result.iq >= 100 ? "text-blue-600" :
    result.iq >= 85  ? "text-yellow-600" :
                       "text-red-600";

  const interpret =
    result.iq >= 130 ? "Very high (Gifted range)" :
    result.iq >= 115 ? "Above average" :
    result.iq >= 100 ? "Average" :
    result.iq >= 85  ? "Below average" :
                       "Low range";

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">IQ Estimate</h1>
        <p className="text-gray-600">Based on your answers across 5 cognitive domains.</p>
      </motion.div>

      {/* Total IQ */}
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className={`text-6xl font-bold ${iqColor}`}>{result.iq}</div>
        <div className="text-gray-500 mb-2">
          Estimated IQ (95% CI {result.ci[0]}–{result.ci[1]})
        </div>
        <div className="font-medium text-gray-700">{interpret}</div>
      </motion.div>

      {/* IQ Distribution Graph */}
      <Card className="rounded-2xl shadow-sm border border-gray-200">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">IQ Distribution</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="x" type="number" domain={[55, 145]} tickCount={10} />
                <YAxis hide domain={[0, 0.03]} />
                <Tooltip
                  formatter={(val: number) => (val * 1000).toFixed(2)}
                  labelFormatter={(label: number) => `IQ ${label}`}
                />
                <Line type="monotone" dataKey="y" stroke="#4f46e5" strokeWidth={2} dot={false} />
                {/* CI area */}
                <ReferenceArea
                  x1={result.ci[0]}
                  x2={result.ci[1]}
                  fill="#93c5fd"
                  fillOpacity={0.3}
                />
                {/* User line */}
                <ReferenceLine
                  x={result.iq}
                  stroke="#1e40af"
                  strokeWidth={3}
                  label={{
                    value: `Your IQ: ${result.iq}`,
                    position: "top",
                    fill: "#1e3a8a",
                    fontSize: 12
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Bell curve showing the normal distribution (Mean = 100, SD = 15).
            The shaded area represents your 95% confidence interval.
          </p>
        </CardContent>
      </Card>

      {/* Category performance */}
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(result.perCategory).map(([cat, data]) => (
          <Card key={cat} className="rounded-2xl shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold capitalize">{cat}</span>
                <span>{data.percent.toFixed(0)}%</span>
              </div>
              <Progress value={data.percent} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Explanation */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose max-w-none text-gray-700">
        <h2 className="text-xl font-semibold mt-6 mb-2">About this estimate</h2>
        <p>
          This IQ value is derived using standardized psychometric scaling (mean = 100, SD = 15),
          with adjustments for item difficulty and reliability across cognitive domains. It represents
          an approximation of your general reasoning performance relative to a normed population.
        </p>
      </motion.div>
    </div>
  );
}
