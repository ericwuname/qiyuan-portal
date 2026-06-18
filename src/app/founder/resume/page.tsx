"use client";

import { t } from "@/lib/translations";
import Link from "next/link";

export default function FounderResumePage() {
  const skills = [
    { title: "AI Agent Organization Design", desc: "Built 80+ AI Agent Skill four-tier organizational structure", color: "#00d4ff" },
    { title: "Full-Stack Tech", desc: "Next.js / React / Python / TypeScript / Tailwind CSS", color: "#6b5cff" },
    { title: "Product Methodology", desc: "PDCA full chain + 7-layer quality model + 6-dimension requirement framework", color: "#ff6b35" },
    { title: "Finance BP Practice", desc: "Supply chain + Store dual-line, budget to management report full pipeline", color: "#ffd700" },
    { title: "Narrative Design", desc: "Ship-to-bridge metaphor system / scar narrative / contradiction field brainstorming", color: "#ffd700" },
  ];
  const projects = [
    { n: "Qiyuan Portal (qiyuan.beauty)", d: "Markdown-driven multi-page website, AI Agent autonomously updates content", c: "#ffd700" },
    { n: "AI-Corp", d: "Full-stack enterprise intelligence platform, V1-V8 eight major versions", c: "#00d4ff" },
    { n: "Xiangyu Simulator", d: "AI historical narrative engine, Codex Skill architecture", c: "#6b5cff" },
    { n: "QVC", d: "Python code quality tool, PyPI open-source release", c: "#ff6b35" },
  ];
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] rounded-full bg-brand-purple/5 blur-[100px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/founder" className="text-purple-400 hover:text-purple-300 text-sm">← {t.navFounderTab}</Link>
          <span className="text-gray-600">/</span>
          <span className="text-brand-gold text-sm">{t.pageFounderResume}</span>
        </div>
        <p className="text-[10px] tracking-[4px] text-gray-600 uppercase mb-3">FOUNDER PROFILE</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="brand-gradient-text">{t.pageFounderResume}</span></h1>
        <p className="text-gray-400 text-lg mb-12">{t.founderSummary}</p>
        <div className="mb-12 p-6 rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.03]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div><p className="text-sm text-gray-300 font-medium">{t.founderDownloadResume}</p><p className="text-xs text-gray-500">PDF · Wu Tao</p></div>
            <a href="/resume.pdf" download className="px-6 py-3 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-sm hover:bg-brand-gold/30 transition-all">{t.founderDownloadResume} ↓</a>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-3"><span className="w-8 h-[1px] bg-brand-cyan/50" />Core Skills</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {skills.map((s, i) => (
            <div key={i} className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-white/10 transition-all card-hover">
              <h3 className="text-base font-bold mb-2" style={{ color: s.color }}>{s.title}</h3>
              <p className="text-sm text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-3"><span className="w-8 h-[1px] bg-brand-orange/50" />Key Projects</h2>
        <div className="space-y-3 mb-12">
          {projects.map((p, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.04] hover:border-white/10 transition-all card-hover">
              <span className="w-3 h-3 mt-1 rounded-full shrink-0" style={{ backgroundColor: p.c }} />
              <div><h3 className="text-base font-bold text-white">{p.n}</h3><p className="text-sm text-gray-400">{p.d}</p></div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-3"><span className="w-8 h-[1px] bg-brand-gold/50" />Organization Philosophy</h2>
        <div className="p-6 rounded-xl border border-brand-gold/20 bg-brand-gold/[0.02] mb-12">
          <p className="text-gray-300 leading-relaxed italic">Not about having humans use AI tools, but about making AI Agents members of the organization — carrying roles, bearing responsibilities, accumulating experience, continuously evolving.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/founder/finance-supply" className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all card-hover">
            <p className="text-xs text-cyan-400 mb-2 tracking-[2px]">FINANCE BP</p>
            <h3 className="text-lg font-bold text-white mb-2">{t.navFounderFinanceSupply}</h3>
            <p className="text-sm text-gray-500">Budget Analysis · Financial Analysis · Management Reports</p>
            <span className="inline-block mt-4 text-xs text-cyan-400 group-hover:translate-x-1 transition-transform">View Cases →</span>
          </Link>
          <Link href="/founder/finance-store" className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-purple-500/30 hover:bg-purple-500/[0.02] transition-all card-hover">
            <p className="text-xs text-purple-400 mb-2 tracking-[2px]">FINANCE BP</p>
            <h3 className="text-lg font-bold text-white mb-2">{t.navFounderFinanceStore}</h3>
            <p className="text-sm text-gray-500">Budget Analysis · Financial Analysis · Management Reports</p>
            <span className="inline-block mt-4 text-xs text-purple-400 group-hover:translate-x-1 transition-transform">View Cases →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}