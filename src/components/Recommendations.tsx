"use client";

import type { AnalysisResult } from "@/lib/analyzer";
import { Lightbulb, CheckCircle2 } from "lucide-react";

interface RecommendationsProps {
  result: AnalysisResult | null;
}

export default function Recommendations({ result }: RecommendationsProps) {
  if (!result || result.recommendations.length === 0) return null;

  const allGood =
    result.recommendations.length === 1 &&
    (result.recommendations[0].includes("Excellent") ||
      result.recommendations[0].includes("Strong password"));

  return (
    <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
          Security Recommendations
        </h3>
      </div>
      <ul className="space-y-2">
        {result.recommendations.map((rec, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            {allGood ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <span className="w-4 h-4 rounded-full bg-blue-500/30 border border-blue-400/50 flex-shrink-0 mt-0.5 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </span>
            )}
            <span className={allGood ? "text-emerald-300" : "text-slate-300"}>{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
