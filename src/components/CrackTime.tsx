"use client";

import type { AnalysisResult } from "@/lib/analyzer";
import { Clock, Zap, Shield, ShieldCheck, ShieldAlert } from "lucide-react";

interface CrackTimeProps {
  result: AnalysisResult | null;
}

const DIFFICULTY_CONFIG: Record<
  AnalysisResult["crackDifficulty"],
  { icon: React.ElementType; color: string; bg: string; border: string; label: string }
> = {
  Instantly: {
    icon: Zap,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    label: "Extremely Vulnerable",
  },
  Minutes: {
    icon: ShieldAlert,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    label: "Very Weak",
  },
  Hours: {
    icon: ShieldAlert,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    label: "Weak",
  },
  Days: {
    icon: Shield,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    label: "Moderate",
  },
  Months: {
    icon: Shield,
    color: "text-lime-400",
    bg: "bg-lime-500/10",
    border: "border-lime-500/30",
    label: "Decent",
  },
  Years: {
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    label: "Strong",
  },
  Centuries: {
    icon: ShieldCheck,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    label: "Fortress-Level",
  },
};

export default function CrackTime({ result }: CrackTimeProps) {
  if (!result) return null;

  const cfg = DIFFICULTY_CONFIG[result.crackDifficulty];
  const Icon = cfg.icon;

  return (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} p-5`}>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Estimated Crack Time
        </h3>
      </div>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${cfg.bg} border ${cfg.border}`}>
          <Icon className={`w-8 h-8 ${cfg.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-xl font-black ${cfg.color} leading-tight`}>
            {result.crackTime}
          </div>
          <div className={`text-sm font-semibold mt-0.5 ${cfg.color} opacity-70`}>
            {cfg.label}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Entropy: {result.entropy} bits · Assuming 10B guesses/sec
          </div>
        </div>
      </div>
    </div>
  );
}
