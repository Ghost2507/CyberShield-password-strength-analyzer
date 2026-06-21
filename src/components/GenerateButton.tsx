"use client";

import { useState } from "react";
import { RefreshCw, Copy, Check } from "lucide-react";
import { generateStrongPassword } from "@/lib/generator";

interface GenerateButtonProps {
  onGenerate: (password: string) => void;
}

export default function GenerateButton({ onGenerate }: GenerateButtonProps) {
  const [copied, setCopied] = useState(false);
  const [lastGenerated, setLastGenerated] = useState("");
  const [spinning, setSpinning] = useState(false);

  const handleGenerate = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 600);
    const pwd = generateStrongPassword(18);
    setLastGenerated(pwd);
    onGenerate(pwd);
  };

  const handleCopy = async () => {
    if (!lastGenerated) return;
    await navigator.clipboard.writeText(lastGenerated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        id="generate-password-button"
        onClick={handleGenerate}
        className="flex-1 relative flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 group overflow-hidden"
        aria-label="Generate strong password"
      >
        <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <RefreshCw
          className={`w-4 h-4 relative z-10 transition-transform duration-600 ${spinning ? "animate-spin" : ""}`}
        />
        <span className="relative z-10">Generate Strong Password</span>
      </button>
      {lastGenerated && (
        <button
          id="copy-password-button"
          onClick={handleCopy}
          className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 border ${
            copied
              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
              : "bg-slate-800/60 border-slate-600/50 text-slate-300 hover:border-slate-400/50 hover:text-white"
          }`}
          aria-label="Copy generated password"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      )}
    </div>
  );
}
