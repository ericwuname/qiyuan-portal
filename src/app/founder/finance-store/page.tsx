"use client";

import { t } from "@/lib/translations";
import Link from "next/link";
import { useState } from "react";

interface CaseItem {
  id: string; title: string; subtitle: string;
  context: string; objective: string;
  methodology: string[];
  metrics: { label: string; value: string; trend: "up" | "down" | "stable"; highlight?: boolean }[];
  insight: string; tags: string[];
}

const cases: CaseItem[] = [
  {
    id: "st-budget", title: "Multi-Store Annual Budget with Rolling Forecast",
    subtitle: "Aggregated budget model and variance analysis across 42 stores",
    context: "Retail chain with 42 stores, annual revenue ¥180M. Each store independently budgets, HQ aggregation difficult. Annual deviation exceeded 12%.",
    objective: "Establish standardized store budget template, achieve multi-store aggregation with rolling forecast.",
    methodology: [
      "Store classification: categorize by revenue/sqft/maturity into store types",
      "Standard budget template: revenue/cost/expense/profit four-layer structure",
      "Rolling forecast: monthly update of next 11 months, auto-aggregate",
      "Variance analysis: store-level + regional + HQ three-tier analysis"
    ],
    metrics: [
      { label: "Budget Deviation", value: "4.1%", trend: "down", highlight: true },
      { label: "Store Coverage", value: "42", trend: "stable" },
      { label: "Budget Cycle", value: "5 days", trend: "down" },
      { label: "Data Accuracy", value: "96.8%", trend: "up" }
    ],
    insight: "Store budget core is not 'control', but 'visibility'. Making every store\'s operational status visible in real-time is the foundation for management decisions.",
    tags: ["Store Budget", "Multi-Store", "Rolling Forecast", "Variance"]
  },
  {
    id: "st-analysis", title: "Store P&L Deep Analysis & Turnaround Plans",
    subtitle: "Complete chain from problem identification to turnaround design",
    context: "12 stores in consecutive 3-month losses. HQ demanded turnaround plans within 30 days. But loss causes varied: traffic/sqft/labor/structural.",
    objective: "Analyze loss root causes store-by-store, develop differentiated turnaround plans.",
    methodology: [
      "Loss classification: traffic-type/sqft-type/labor-type/structural — four categories",
      "Store-by-store analysis: revenue structure + cost structure + labor efficiency + turnover",
      "Turnaround design: short-term stop-loss + mid-term adjustment + long-term transformation",
      "ROI calculation: each plan with clear quantifiable input-output ratio"
    ],
    metrics: [
      { label: "Turnaround Success", value: "9/12", trend: "up", highlight: true },
      { label: "Monthly Loss Reduced", value: "¥870K", trend: "down" },
      { label: "Plan Cycle", value: "28 days", trend: "down" },
      { label: "ROI", value: "3.2x", trend: "up" }
    ],
    insight: "Turnaround key is not 'cost cutting' but 'precise root cause identification'. 12 losing stores may have 12 different reasons. One-size-fits-all solutions only worsen problems.",
    tags: ["P&L Analysis", "Turnaround", "ROI", "Store Diagnosis"]
  },
  {
    id: "st-report", title: "Store Operations Monthly Management Report",
    subtitle: "Multi-tier reporting from single store to group level",
    context: "Monthly 42 stores each submitted reports, formats inconsistent. HQ aggregation took 3 days. Regional managers and CEO couldn\'t see real-time data.",
    objective: "Design three-tier report system: store report → regional report → group report.",
    methodology: [
      "Report layering: store-level (detail) → regional (trend) → group (strategic)",
      "KPI system: define core KPIs per tier, avoid information overload",
      "Visualization: RAG lights + trend arrows + anomaly highlights",
      "Automation: POS + ERP direct connection, aggregation time from 3 days to 2 hours"
    ],
    metrics: [
      { label: "Aggregation Time", value: "2 hrs", trend: "down", highlight: true },
      { label: "Store Coverage", value: "42", trend: "stable" },
      { label: "Anomaly Detection", value: "95%", trend: "up" },
      { label: "Decision Speed", value: "<24h", trend: "up" }
    ],
    insight: "Management reports purpose is not 'reporting' but 'decision-making'. Every tier should answer 'what should I do?' not 'what happened?'.",
    tags: ["Management Report", "Multi-Tier", "Visualization", "Automation"]
  }
];

function MetricBadge({ metric }: { metric: CaseItem["metrics"][0] }) {
  const trendIcon = metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "→";
  const trendColor = metric.trend === "up" ? "text-green-400" : metric.trend === "down" ? "text-red-400" : "text-gray-500";
  return (
    <div className={`p-3 rounded-lg ${metric.highlight ? "bg-brand-gold/[0.05] border border-brand-gold/20" : "bg-white/[0.02]"}`}>
      <p className="text-[10px] text-gray-500 mb-1">{metric.label}</p>
      <p className={`text-lg font-bold ${metric.highlight ? "text-brand-gold" : "text-white"}`}>
        {metric.value}<span className={`text-xs ml-1 ${trendColor}`}>{trendIcon}</span>
      </p>
    </div>
  );
}

export default function FinanceStorePage() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[120px]" />
        <div className="absolute bottom-40 left-20 w-[400px] h-[400px] rounded-full bg-brand-orange/5 blur-[100px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/founder/resume" className="text-purple-400 hover:text-purple-300 text-sm">← {t.pageFounderResume}</Link>
          <span className="text-gray-600">/</span>
          <span className="text-purple-400 text-sm">{t.pageFounderFinanceStore}</span>
        </div>
        <p className="text-[10px] tracking-[4px] text-gray-600 uppercase mb-3">FINANCE BP · STORE OPERATIONS</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="brand-gradient-text">{t.pageFounderFinanceStore}</span></h1>
        <p className="text-gray-400 text-lg mb-12">Budget Analysis · Financial Analysis · Management Reports — 3 modules, 6 complete case studies</p>
        <div className="space-y-4 mb-12">
          {cases.map((c) => (
            <div key={c.id} className={`rounded-xl border transition-all duration-300 ${openId === c.id ? "border-brand-gold/30 bg-brand-gold/[0.02]" : "border-white/10 bg-white/[0.01] hover:border-white/20"}`}>
              <button onClick={() => setOpenId(openId === c.id ? null : c.id)} className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">{c.title}</h3>
                    {c.tags.slice(0, 2).map((t, i) => (<span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 whitespace-nowrap">{t}</span>))}
                  </div>
                  <p className="text-xs text-gray-500">{c.subtitle}</p>
                </div>
                <span className={`text-lg transition-transform duration-300 shrink-0 ${openId === c.id ? "rotate-180" : ""}`}>▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${openId === c.id ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-5 sm:px-6 pb-6 space-y-5 border-t border-white/5 pt-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><p className="text-[10px] tracking-[2px] text-gray-500 mb-1.5 uppercase">Business Context</p><p className="text-sm text-gray-300 leading-relaxed">{c.context}</p></div>
                    <div><p className="text-[10px] tracking-[2px] text-gray-500 mb-1.5 uppercase">Analysis Objective</p><p className="text-sm text-gray-300 leading-relaxed">{c.objective}</p></div>
                  </div>
                  <div><p className="text-[10px] tracking-[2px] text-gray-500 mb-2 uppercase">Methodology</p>
                    <div className="grid sm:grid-cols-2 gap-2">{c.methodology.map((m, i) => (<div key={i} className="flex items-start gap-2 text-sm text-gray-400"><span className="text-purple-400 shrink-0 mt-0.5">◆</span><span>{m}</span></div>))}</div>
                  </div>
                  <div><p className="text-[10px] tracking-[2px] text-gray-500 mb-2 uppercase">Key Metrics</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{c.metrics.map((m, i) => (<MetricBadge key={i} metric={m} />))}</div></div>
                  <div className="rounded-lg border border-brand-gold/20 bg-brand-gold/5 p-4"><p className="text-[10px] tracking-[2px] text-brand-gold mb-1 uppercase">Core Insight</p><p className="text-sm text-gray-300 leading-relaxed italic">"{c.insight}"</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Link href="/founder/finance-supply" className="text-sm text-gray-500 hover:text-gray-300">← {t.pageFounderFinanceSupply}</Link>
          <Link href="/founder/resume" className="text-sm text-purple-400 hover:text-purple-300">{t.pageFounderResume} →</Link>
        </div>
      </div>
    </div>
  );
}