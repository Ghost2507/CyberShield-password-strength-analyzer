"use client";

import { Mail, User, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800/60 py-8 px-4">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Author Info */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <User className="w-3.5 h-3.5 text-cyan-500" />
            <span className="font-medium text-slate-300">Arnav Singh Rawat</span>
          </div>
          <a
            href="mailto:arnav.singh.rawat07@gmail.com"
            className="flex items-center gap-2 text-slate-500 text-sm hover:text-cyan-400 transition-colors duration-200"
          >
            <Mail className="w-3.5 h-3.5" />
            arnav.singh.rawat07@gmail.com
          </a>
        </div>

        {/* Digital Heroes Button */}
        <a
          id="digital-heroes-button"
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300 hover:text-cyan-200 font-semibold rounded-xl transition-all duration-300 group text-sm"
        >
          <Heart className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 text-cyan-400" />
          Built for Digital Heroes
          <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>

      {/* Bottom line */}
      <div className="mt-6 text-center text-xs text-slate-700">
        CyberShield Password Analyzer · All analysis is performed client-side · Your passwords are never stored or transmitted
      </div>
    </footer>
  );
}
