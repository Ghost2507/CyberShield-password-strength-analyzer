"use client";

import type { AnalysisResult } from "@/lib/analyzer";
import { CheckCircle2, XCircle } from "lucide-react";

interface AnalysisCardsProps {
  result: AnalysisResult | null;
}

interface CheckItem {
  label: string;
  description: string;
  passed: boolean;
  value: string;
}

export default function AnalysisCards({ result }: AnalysisCardsProps) {
  if (!result) return null;

  const items: CheckItem[] = [
    {
      label: "Length",
      description: "Minimum 8 characters",
      passed: result.checks.length.passed,
      value: `${result.checks.length.count} chars`,
    },
    {
      label: "Uppercase",
      description: "A–Z letters included",
      passed: result.checks.uppercase.passed,
      value: `${result.checks.uppercase.count} found`,
    },
    {
      label: "Lowercase",
      description: "a–z letters included",
      passed: result.checks.lowercase.passed,
      value: `${result.checks.lowercase.count} found`,
    },
    {
      label: "Numbers",
      description: "0–9 digits included",
      passed: result.checks.numbers.passed,
      value: `${result.checks.numbers.count} found`,
    },
    {
      label: "Special Chars",
      description: "!, @, #, $ etc.",
      passed: result.checks.specialChars.passed,
      value: `${result.checks.specialChars.count} found`,
    },
    {
      label: "No Weak Patterns",
      description: "Avoids common passwords",
      passed: result.checks.noCommonPatterns.passed,
      value: result.checks.noCommonPatterns.matched
        ? `"${result.checks.noCommonPatterns.matched}" found`
        : "Clean",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className={`relative rounded-xl border p-4 transition-all duration-500 ${
            item.passed
              ? "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50"
              : "border-red-500/30 bg-red-500/5 hover:border-red-500/50"
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {item.label}
            </span>
            {item.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
          </div>
          <div
            className={`text-sm font-bold font-mono ${item.passed ? "text-emerald-400" : "text-red-400"}`}
          >
            {item.value}
          </div>
          <div className="text-xs text-slate-500 mt-1">{item.description}</div>
        </div>
      ))}
    </div>
  );
}
