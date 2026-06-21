"use client";

import { useEffect, useState } from "react";
import type { AnalysisResult } from "@/lib/analyzer";

interface StrengthMeterProps {
  result: AnalysisResult | null;
}

const LEVEL_CONFIG = {
  Weak: {
    gradient: "from-red-500 via-red-400 to-orange-400",
    glow: "shadow-red-500/40",
    bg: "bg-red-500/20",
    text: "text-red-400",
    segments: 1,
  },
  Medium: {
    gradient: "from-yellow-500 via-amber-400 to-orange-400",
    glow: "shadow-amber-500/40",
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    segments: 2,
  },
  Strong: {
    gradient: "from-emerald-500 via-cyan-400 to-teal-400",
    glow: "shadow-emerald-500/40",
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    segments: 3,
  },
};

export default function StrengthMeter({ result }: StrengthMeterProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    if (!result) {
      setAnimatedScore(0);
      setAnimatedWidth(0);
      return;
    }
    // Animate score counter
    const target = result.score;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setAnimatedScore(current);
      setAnimatedWidth(current);
      if (current >= target) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [result]);

  const level = result?.level ?? "Weak";
  const config = LEVEL_CONFIG[level];

  return (
    <div className="w-full space-y-4">
      {/* Score + Level Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`text-5xl font-black tabular-nums ${result ? config.text : "text-slate-600"} transition-colors duration-500`}
          >
            {animatedScore}
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Score</div>
            <div className="text-xs text-slate-500">/ 100</div>
          </div>
        </div>
        {result && (
          <div
            className={`px-5 py-2 rounded-full ${config.bg} border border-current ${config.text} font-bold text-sm tracking-wider uppercase transition-all duration-500`}
          >
            {level}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
          <div
            className={`h-full bg-gradient-to-r ${config.gradient} rounded-full transition-all duration-700 ease-out shadow-lg ${result ? config.glow : ""}`}
            style={{ width: `${animatedWidth}%` }}
          />
        </div>
        {/* Segment markers */}
        <div className="absolute inset-0 flex pointer-events-none">
          {[33, 66].map((pct) => (
            <div
              key={pct}
              className="absolute top-0 bottom-0 w-px bg-slate-600/70"
              style={{ left: `${pct}%` }}
            />
          ))}
        </div>
      </div>

      {/* Segment Labels */}
      <div className="flex justify-between text-xs text-slate-600 px-0.5">
        <span>Weak</span>
        <span>Medium</span>
        <span>Strong</span>
      </div>
    </div>
  );
}
