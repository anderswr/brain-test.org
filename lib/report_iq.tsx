// /lib/report_iq.tsx
import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ComputedResult } from "@/lib/scoring_iq";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

interface ReportIQProps {
  result: ComputedResult;
}

function generateNormalData(mean = 100, sd = 15) {
  const data = [];
  for (let x = 55; x <= 145; x++) {
    const y =
      (1 / (sd * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - mean) / sd, 2));
    data.push({ x, y });
  }
  return data;
}

export default function ReportIQ({ result }: ReportIQProps) {
  const iq = result.iqEstimate;
  const ci: [number, number] = [
    Math.max(55, iq - 10),
    Math.min(145, iq + 10),
  ];

  const byCategory = result.categoryScores;
  const data = generateNormalData();

  const iqColor =
    iq >= 130
      ? "text-purple-600"
      : iq >= 115
      ? "text-green-600"
      : iq >= 100
      ? "text-blue-600"
      : iq >= 85
      ? "text-yellow-600"
      : "text-red-600";

  const interpret =
    iq >= 130
      ? "Very high (Gifted range)"
      : iq >= 115
      ? "Above average"
      : iq >= 100
      ? "Average"
      : iq >= 85
      ? "Below average"
      : "Low range";

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">IQ Estimate</h1>
        <p className="text-gray-600">
          Based on your performance across five cognitive domains.
        </p>
      </motion.div>

      {/* Total IQ */}
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className={`text-6xl font-bold ${iqColor}`}>{iq}</div>
        <div className="font-medium text-gray-700">{interpret}</div>
        <div className="text-sm text-gray-500 mt-1">
          95% CI: {ci[0]}–{ci[1]}
        </div>
      </motion.div>

      {/* IQ Distribution Graph */}
      <Card className="rounded-2xl shadow-sm border border-gray-200">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">IQ Distribution</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="x" type="number" domain={[55, 145]} tickCount={10} />
                <YAxis hide domain={[0, "auto"]} />
                <Tooltip
                  formatter={(val: number) =>
                    `Density ${(val * 1000).toFixed(3)}`
                  }
                  labelFormatter={(label: number) => `IQ ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={false}
                />
                <ReferenceArea x1={ci[0]} x2={ci[1]} fill="#60a5fa" fillOpacity={0.15} />
                <ReferenceLine
                  x={iq}
                  stroke="#1e40af"
                  strokeWidth={3}
                  label={{
                    value: `Your IQ: ${iq}`,
                    position: "top",
                    fill: "#1e3a8a",
                    fontSize: 12,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Normal curve (Mean = 100, SD = 15) showing your estimated position.
          </p>
        </CardContent>
      </Card>

      {/* Category performance */}
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(byCategory).map(([cat, percent]) => (
          <Card key={cat} className="rounded-2xl shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold capitalize">{cat}</span>
                <span>{percent.toFixed(0)}%</span>
              </div>
              <Progress value={percent} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="prose max-w-none text-gray-700"
      >
        <h2 className="text-xl font-semibold mt-6 mb-2">About this estimate</h2>
        <p>
          This IQ value is derived using standardized psychometric scaling
          (mean = 100, SD = 15), with adjustments for item difficulty and
          reliability across cognitive domains. It represents an approximation
          of your general reasoning performance relative to a normed population.
        </p>
      </motion.div>
    </div>
  );
}
