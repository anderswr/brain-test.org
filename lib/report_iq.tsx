// /lib/report_iq.tsx
import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryId } from "@/lib/types";
import { IQResult } from "@/lib/scoring_iq";

interface ReportIQProps {
  result: IQResult;
}

export default function ReportIQ({ result }: ReportIQProps) {
  const iqColor =
    result.iq >= 130 ? "text-purple-600" :
    result.iq >= 115 ? "text-green-600" :
    result.iq >= 100 ? "text-blue-600" :
    result.iq >= 85  ? "text-yellow-600" :
                       "text-red-600";

  return (
    <div className="space-y-8">
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
        <div className="text-gray-500">
          Estimated IQ (95% CI {result.ci[0]}–{result.ci[1]})
        </div>
      </motion.div>

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="prose max-w-none text-gray-700"
      >
        <h2 className="text-xl font-semibold mt-6 mb-2">How this estimate is calculated</h2>
        <p>
          This IQ value is derived from standardized scoring methods aligned with modern psychometric
          theory. It converts raw accuracy (correct answers) into a norm-based score following a Gaussian
          distribution with mean 100 and standard deviation 15, as used in recognized tests such as the
          WAIS-IV and ICAR (International Cognitive Ability Resource).
        </p>
        <p>
          Each of the five domains—Reasoning, Math, Verbal, Spatial, and Memory—contributes to your total
          estimate, adjusted for category reliability and item difficulty. The algorithm also reports a
          95% confidence interval to indicate normal variation in test–retest reliability.
        </p>
      </motion.div>
    </div>
  );
}
