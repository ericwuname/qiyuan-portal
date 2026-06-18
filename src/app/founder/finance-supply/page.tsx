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
    id: "sc-budget", title: "Annual Procurement Budget with Rolling Forecast",
    subtitle: "Dynamic budget control system based on rolling predictions",
    context: "Manufacturing enterprise with annual procurement of ¥230M, 87 suppliers. Raw material prices fluctuate frequently. Traditional annual budget showed >15% deviation by Q2.",
    objective: "Establish monthly rolling budget mechanism, control budget deviation within ±5%.",
    methodology: [
      "Historical data cleaning: remove outliers, establish baselines by category/supplier/seasonality",
      "Rolling forecast model: based on last 3 months actual + next 9 months forecast, updated monthly",
      "Variance dashboard: actual vs budget tracked weekly, RAG status alerts",
      "Flexible budget range: ±10% for key materials, ±5% for non-critical items"
    ],
    metrics: [
      { label: "Budget Deviation", value: "3.8%", trend: "down", highlight: true },
      { label: "Cost Saved", value: "¥1.86M", trend: "up" },
      { label: "Forecast Accuracy", value: "94.2%", trend: "up" },
      { label: "Suppliers", value: "87", trend: "stable" }
    ],
    insight: "Rolling budget essence is not 'more accurate prediction', but 'faster correction'. The key is building a short closed loop: predict → actual → analyze → adjust.",
    tags: ["Rolling Budget", "Variance Analysis", "Flex Budget", "ERP"]
  },
  {
    id: "sc-analysis", title: "Supplier Cost Structure Deep Analysis",
    subtitle: "Penetrative cost decomposition and optimization strategy design",
    context: "Top 10 suppliers account for 62% of total procurement. 3 suppliers raised prices for 2 consecutive quarters. Management required finding cost optimization without changing suppliers.",
    objective: "Decompose supplier pricing cost structure, identify inflated items, develop negotiation strategy.",
    methodology: [
      "Cost decomposition: raw materials/labor/manufacturing/logistics/profit — five-layer penetration",
      "Horizontal benchmarking: compare cost structures across suppliers for same product category",
      "Market price verification: reference futures/spot market prices for bulk materials",
      "Negotiation strategy matrix: classify by supplier dependency × cost optimization potential"
    ],
    metrics: [
      { label: "Inflated Items", value: "¥3.42M", trend: "up", highlight: true },
      { label: "Price Reduction", value: "6.2%", trend: "up" },
      { label: "Supplier Cooperation", value: "8/10", trend: "stable" },
      { label: "Annual Savings", value: "¥5.1M", trend: "up" }
    ],
    insight: "Supplier negotiation is not 'price cutting' — it is 'using data to help suppliers discover cost optimization points they themselves missed'. When you understand their cost structure better than they do, the negotiation position reverses.",
    tags: ["Cost Decomposition", "Negotiation", "Benchmarking", "Price Verification"]
  },
  {
    id: "sc-report", title: "Supply Chain Health Monthly Management Report",
    subtitle: "Standardized reporting system from data to decision",
    context: "CEO needed a 15-minute readable supply chain report monthly, covering procurement/inventory/logistics/suppliers. Previously each business line reported separately with inconsistent metrics.",
    objective: "Design standardized monthly report template, unify data口径, focus on anomalies and trends.",
    methodology: [
      "KPI system: define 12 core KPIs across four dimensions",
      "Template standardization: unified data sources + chart standards + conclusion format",
      "Automated data collection: direct ERP connection, eliminate manual aggregation",
      "Anomaly alerts: set thresholds, auto-flag indicators exceeding ±10%"
    ],
    metrics: [
      { label: "On-time Rate", value: "100%", trend: "up", highlight: true },
      { label: "Reading Time", value: "12 min", trend: "down" },
      { label: "Anomaly Detection", value: "97%", trend: "up" },
      { label: "Automation", value: "85%", trend: "up" }
    ],
    insight: "Standardized reports essence is not 'unified format' but 'unified decision language'. Let everyone converse using the same data口径.",
    tags: ["Management Report", "KPI", "Automation", "Anomaly Alerts"]
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

export default function FinanceSupplyPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[120px]" />
        <div className="absolute bottom-40 right-20 w-[400px] h-[400px] rounded-full bg-brand-purple/5 blur-[100px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/founder/resume" className="text-purple-400 hover:text-purple-300 text-sm">← {t.pageFounderResume}</Link>
          <span className="text-gray-600">/</span>
          <span className="text-cyan-400 text-sm">{t.pageFounderFinanceSupply}</span>
        </div>
        <p className="text-[10px] tracking-[4px] text-gray-600 uppercase mb-3">FINANCE BP · SUPPLY CHAIN</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="brand-gradient-text">{t.pageFounderFinanceSupply}</span></h1>
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
                    <div className="grid sm:grid-cols-2 gap-2">{c.methodology.map((m, i) => (<div key={i} className="flex items-start gap-2 text-sm text-gray-400"><span className="text-cyan-400 shrink-0 mt-0.5">◆</span><span>{m}</span></div>))}</div>
                  </div>
                  <div><p className="text-[10px] tracking-[2px] text-gray-500 mb-2 uppercase">Key Metrics</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{c.metrics.map((m, i) => (<MetricBadge key={i} metric={m} />))}</div></div>
                  <div className="rounded-lg border border-brand-gold/20 bg-brand-gold/5 p-4"><p className="text-[10px] tracking-[2px] text-brand-gold mb-1 uppercase">Core Insight</p><p className="text-sm text-gray-300 leading-relaxed italic">"{c.insight}"</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Link href="/founder/resume" className="text-sm text-gray-500 hover:text-gray-300">← {t.pageFounderResume}</Link>
          <Link href="/founder/finance-store" className="text-sm text-purple-400 hover:text-purple-300">{t.pageFounderFinanceStore} →</Link>
        </div>
      </div>
    </div>
  );
}