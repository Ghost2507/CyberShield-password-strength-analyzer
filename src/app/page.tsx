"use client";

import { useState, useCallback } from "react";
import { ShieldCheck, Cpu } from "lucide-react";
import { analyzePassword, type AnalysisResult } from "@/lib/analyzer";
import PasswordInput from "@/components/PasswordInput";
import StrengthMeter from "@/components/StrengthMeter";
import AnalysisCards from "@/components/AnalysisCards";
import Recommendations from "@/components/Recommendations";
import CrackTime from "@/components/CrackTime";
import GenerateButton from "@/components/GenerateButton";
import Footer from "@/components/Footer";

export default function Home() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!password) return;
    setIsAnalyzing(true);
    // Brief async delay for UX effect
    setTimeout(() => {
      const res = analyzePassword(password);
      setResult(res);
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 350);
  }, [password]);

  const handlePasswordChange = (v: string) => {
    setPassword(v);
    // Real-time analysis after first analyze
    if (hasAnalyzed && v) {
      const res = analyzePassword(v);
      setResult(res);
    } else if (!v) {
      setResult(null);
    }
  };

  const handleGenerate = (pwd: string) => {
    setPassword(pwd);
    const res = analyzePassword(pwd);
    setResult(res);
    setHasAnalyzed(true);
  };

  return (
    <div className="relative min-h-screen bg-grid overflow-x-hidden">
      {/* Decorative scan line */}
      <div className="scan-line" aria-hidden="true" />

      {/* Background orbs */}
      <div
        className="fixed top-0 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <main className="relative z-10 max-w-3xl mx-auto px-4 py-12 sm:py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 mb-6 animate-pulse-ring">
            <ShieldCheck className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-3 gradient-text leading-tight">
            CyberShield
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-slate-300 mb-3">
            Password Analyzer
          </p>
          <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            Instantly evaluate your password security. Powered by entropy analysis and real-world attack pattern detection.
          </p>
        </header>

        {/* Input Card */}
        <section
          aria-label="Password input"
          className="glass-card glow-cyan rounded-2xl p-6 sm:p-8 mb-6"
        >
          <PasswordInput
            value={password}
            onChange={handlePasswordChange}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />
        </section>

        {/* Generate Button */}
        <section aria-label="Password generator" className="mb-6">
          <GenerateButton onGenerate={handleGenerate} />
        </section>

        {/* Results */}
        {result && (
          <div className="space-y-5 animate-fade-in-up">
            {/* Strength Meter Card */}
            <section
              aria-label="Password strength"
              className="glass-card rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 mb-5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Strength Analysis
                </h2>
              </div>
              <StrengthMeter result={result} />
            </section>

            {/* Analysis Breakdown */}
            <section aria-label="Detailed analysis breakdown" className="glass-card rounded-2xl p-6 sm:p-8">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Breakdown
              </h2>
              <AnalysisCards result={result} />
            </section>

            {/* Crack Time */}
            <section aria-label="Password crack time estimate">
              <CrackTime result={result} />
            </section>

            {/* Recommendations */}
            <section aria-label="Security recommendations">
              <Recommendations result={result} />
            </section>
          </div>
        )}

        {/* Empty state hint */}
        {!result && (
          <div className="text-center py-12 text-slate-700">
            <ShieldCheck className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Enter a password above to see your security analysis</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
