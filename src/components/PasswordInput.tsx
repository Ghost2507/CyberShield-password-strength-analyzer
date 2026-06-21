"use client";

import { useState } from "react";
import { Eye, EyeOff, Shield, Lock } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (v: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export default function PasswordInput({
  value,
  onChange,
  onAnalyze,
  isAnalyzing,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onAnalyze();
  };

  return (
    <div className="w-full">
      <label
        htmlFor="password-input"
        className="block text-sm font-semibold text-cyan-300 mb-2 tracking-wider uppercase"
      >
        <Lock className="inline-block w-4 h-4 mr-1 mb-0.5" />
        Enter Your Password
      </label>
      <div className="relative flex gap-3">
        <div className="relative flex-1">
          <input
            id="password-input"
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your password here..."
            className="w-full bg-slate-800/60 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl px-5 py-4 pr-12 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500/60 transition-all duration-300 backdrop-blur-sm"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            id="toggle-password-visibility"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 transition-colors duration-200"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <button
          id="analyze-button"
          onClick={onAnalyze}
          disabled={isAnalyzing || !value}
          className="relative px-7 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:shadow-none disabled:cursor-not-allowed group overflow-hidden"
          aria-label="Analyze password"
        >
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Shield className="w-5 h-5 relative z-10" />
          <span className="relative z-10">{isAnalyzing ? "Scanning..." : "Analyze"}</span>
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Press <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-400 text-xs">Enter</kbd> or click Analyze · Your password is never sent anywhere
      </p>
    </div>
  );
}
