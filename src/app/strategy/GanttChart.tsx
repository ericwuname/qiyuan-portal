"use client";

import { useRef, useState, useEffect } from "react";

const VISIBLE_WEEKS = 30;
const LEFT_COL_W = 172;

interface GanttBar {
  label: string;
  startWeek: number;
  endWeek: number;
  color: string;
  status: "done" | "inprogress" | "planned";
}

const ganttBars: GanttBar[] = [
  { label: "AI-Corp 核心平台 V1→V8",     startWeek: 1,  endWeek: 4,  color: "violet",   status: "done" },
  { label: "QVC 质量验证框架 V1→V8",      startWeek: 1,  endWeek: 4,  color: "emerald",  status: "done" },
  { label: "AI Skill 体系搭建 (30+)",     startWeek: 1,  endWeek: 5,  color: "blue",     status: "done" },
  { label: "门户网站 V1 单页上线",         startWeek: 2,  endWeek: 4,  color: "green",   status: "done" },
  { label: "多页面内容框架 + MD驱动",       startWeek: 2,  endWeek: 4,  color: "cyan",    status: "done" },
  { label: "English-First 代码层改造",     startWeek: 2,  endWeek: 4,  color: "amber",   status: "done" },
  { label: "功能模块全栈上线",             startWeek: 3,  endWeek: 4,  color: "rose",    status: "done" },
  { label: "登录/注册 + 权限系统",         startWeek: 3,  endWeek: 4,  color: "orange",  status: "done" },
  { label: "门户完善 & 全站登录保护",       startWeek: 3,  endWeek: 8,  color: "indigo",  status: "inprogress" },
  { label: "组织白皮书 V1→V3",            startWeek: 3,  endWeek: 12, color: "teal",    status: "inprogress" },
  { label: "PDCA 流程管道贯穿",            startWeek: 2,  endWeek: 18, color: "sky",     status: "inprogress" },
  { label: "QVC PyPI 开源包发布",         startWeek: 5,  endWeek: 14, color: "emerald", status: "planned" },
  { label: "多语言国际化 i18n",            startWeek: 8,  endWeek: 18, color: "indigo",  status: "planned" },
  { label: "门户全模块扩展至 20 页",        startWeek: 8,  endWeek: 20, color: "cyan",    status: "planned" },
  { label: "内容矩阵：短剧/小说/模拟器",    startWeek: 4,  endWeek: 24, color: "fuchsia", status: "planned" },
  { label: "紫金花计划 · 自进化体系",       startWeek: 6,  endWeek: 22, color: "yellow",  status: "planned" },
  { label: "互动式小说开发平台",            startWeek: 8,  endWeek: 20, color: "lime",    status: "planned" },
  { label: "外部合作 & 生态伙伴拓展",       startWeek: 12, endWeek: 28, color: "amber",   status: "planned" },
  { label: "AI Agent 招聘 & 团队扩充",     startWeek: 8,  endWeek: 26, color: "rose",    status: "planned" },
];

const monthMarkers = [
  { label: "6月",  startWeek: 1,  endWeek: 5 },
  { label: "7月",  startWeek: 5,  endWeek: 9 },
  { label: "8月",  startWeek: 9,  endWeek: 14 },
  { label: "9月",  startWeek: 14, endWeek: 18 },
  { label: "10月", startWeek: 18, endWeek: 22 },
  { label: "11月", startWeek: 22, endWeek: 26 },
  { label: "12月", startWeek: 26, endWeek: 31 },
];

const quarterMarkers = [
  { label: "Q2", startWeek: 1,  endWeek: 14 },
  { label: "Q3", startWeek: 14, endWeek: 27 },
  { label: "Q4", startWeek: 27, endWeek: 31 },
];

const todayWeek = 3.2;
const todayPct = ((todayWeek - 1) / VISIBLE_WEEKS) * 100;

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  emerald:  { bg: "bg-emerald-500/70",  border: "border-emerald-400/40",  text: "text-emerald-400" },
  violet:   { bg: "bg-violet-500/70",   border: "border-violet-400/40",   text: "text-violet-400" },
  blue:     { bg: "bg-blue-500/70",     border: "border-blue-400/40",     text: "text-blue-400" },
  green:    { bg: "bg-green-500/70",    border: "border-green-400/40",    text: "text-green-400" },
  cyan:     { bg: "bg-cyan-500/70",     border: "border-cyan-400/40",     text: "text-cyan-400" },
  amber:    { bg: "bg-amber-500/70",    border: "border-amber-400/40",    text: "text-amber-400" },
  rose:     { bg: "bg-rose-500/70",     border: "border-rose-400/40",     text: "text-rose-400" },
  indigo:   { bg: "bg-indigo-500/70",   border: "border-indigo-400/40",   text: "text-indigo-400" },
  teal:     { bg: "bg-teal-500/70",     border: "border-teal-400/40",     text: "text-teal-400" },
  fuchsia:  { bg: "bg-fuchsia-500/70",  border: "border-fuchsia-400/40",  text: "text-fuchsia-400" },
  yellow:   { bg: "bg-yellow-500/60",   border: "border-yellow-400/40",   text: "text-yellow-400" },
  orange:   { bg: "bg-orange-500/70",   border: "border-orange-400/40",   text: "text-orange-400" },
  sky:      { bg: "bg-sky-500/70",      border: "border-sky-400/40",      text: "text-sky-400" },
  lime:     { bg: "bg-lime-500/60",     border: "border-lime-400/40",     text: "text-lime-400" },
};

function BarBlock({ bar, leftPct, widthPct }: { bar: GanttBar; leftPct: number; widthPct: number }) {
  const c = colorMap[bar.color];
  const minW = 1.8;
  const wp = Math.max(widthPct, minW);

  if (bar.status === "done") {
    return (
      <div className={`absolute h-full rounded-full ${c.bg} backdrop-blur-sm shadow-[0_0_8px_rgba(255,255,255,0.05)]`}
        style={{ left: `${leftPct}%`, width: `${wp}%` }}>
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white/90 tracking-wider">{wp > 2.5 ? "✓" : ""}</span>
      </div>
    );
  }
  if (bar.status === "inprogress") {
    return (
      <div className={`absolute h-full rounded-full ${c.bg} backdrop-blur-sm overflow-hidden`}
        style={{ left: `${leftPct}%`, width: `${wp}%` }}>
        <div className="absolute inset-0 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.12) 55%, transparent 100%)`, backgroundSize: "200% 100%", animation: "shimmer 2.5s ease-in-out infinite" }} />
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white/80 tracking-wider">{wp > 4 ? "◈" : ""}</span>
      </div>
    );
  }
  return (
    <div className={`absolute h-full rounded-full border ${c.border} bg-white/[0.03]`}
      style={{ left: `${leftPct}%`, width: `${wp}%` }}>
      <div className="absolute inset-0 rounded-full opacity-25"
        style={{ backgroundImage: `radial-gradient(circle, currentColor 0.5px, transparent 0.5px)`, backgroundSize: "4px 4px" }} />
      <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-medium ${c.text}`}>{wp > 5 ? "→ 计划" : ""}</span>
    </div>
  );
}

export default function GanttChart() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [syncScroll, setSyncScroll] = useState(0);

  // Calculate timeline total width (px) based on weeks
  const weekPx = 36;
  const timelineWidth = VISIBLE_WEEKS * weekPx;

  const handleScroll = () => {
    if (scrollRef.current) {
      setSyncScroll(scrollRef.current.scrollLeft);
    }
  };

  return (
    <div className="mb-16 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-3 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-[2px] text-white/90">2026 项目甘特图</h2>
          <p className="text-[10px] tracking-[2px] text-gray-600 mt-0.5">← 左列冻结不动 · 右列横向滚动 → · 19 个关键项目</p>
        </div>
        <div className="hidden sm:flex gap-4 text-[10px] tracking-[1px] text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" /> 已完成</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500/70 inline-block relative"><span className="absolute inset-0 rounded-full animate-pulse bg-white/20" /></span> 进行中</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block bg-white/[0.02]" /> 计划中</span>
        </div>
      </div>

      {/* === TWO-COLUMN LAYOUT === */}
      <div className="flex border-b border-white/[0.05]">
        {/* LEFT: Frozen labels column */}
        <div className="shrink-0 border-r border-white/[0.08] bg-black/60 z-30" style={{ width: `${LEFT_COL_W}px` }}>
          {/* Spacer for quarter header */}
          <div className="h-[22px]" />
          {/* Spacer for month header */}
          <div className="h-[20px] border-b border-white/[0.05]" />
          {/* Row labels */}
          <div className="py-4 space-y-[9px]">
            {ganttBars.map((bar, i) => (
              <div key={i} className="h-[22px] flex items-center px-3 group">
                <span className="text-[11px] text-gray-400 truncate tracking-[1px] group-hover:text-white/80 transition-colors w-full text-right">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-[24px]" />
        </div>

        {/* RIGHT: Scrollable timeline */}
        <div className="flex-1 overflow-x-auto" ref={scrollRef} onScroll={handleScroll}>
          <div style={{ width: `${timelineWidth}px`, minWidth: "100%" }}>
            {/* Quarter headers */}
            <div className="flex h-[22px]">
              {quarterMarkers.map((q, i) => (
                <div key={i} className="text-center text-[11px] text-gray-500 font-semibold tracking-[3px] border-l border-white/[0.04] first:border-l-0 py-0.5"
                  style={{ width: `${((q.endWeek - q.startWeek) / VISIBLE_WEEKS) * 100}%` }}>{q.label}</div>
              ))}
            </div>

            {/* Month headers */}
            <div className="flex h-[20px] border-b border-white/[0.05]">
              {monthMarkers.map((m, i) => (
                <div key={i} className="text-center text-[10px] text-gray-600 tracking-[2px]"
                  style={{ width: `${((m.endWeek - m.startWeek) / VISIBLE_WEEKS) * 100}%` }}>{m.label}</div>
              ))}
            </div>

            {/* Chart body */}
            <div className="relative" style={{ paddingBottom: "28px" }}>
              {/* Quarter bg */}
              {quarterMarkers.map((q, i) => (
                <div key={i} className={`absolute top-0 bottom-0 ${i % 2 === 0 ? "bg-white/[0.008]" : ""}`}
                  style={{ left: `${((q.startWeek - 1) / VISIBLE_WEEKS) * 100}%`, width: `${((q.endWeek - q.startWeek) / VISIBLE_WEEKS) * 100}%` }} />
              ))}
              {/* Month grid */}
              {monthMarkers.slice(1).map((m, i) => (
                <div key={i} className="absolute top-0 bottom-0 border-l border-white/[0.03]"
                  style={{ left: `${((m.startWeek - 1) / VISIBLE_WEEKS) * 100}%` }} />
              ))}
              {/* Today line */}
              <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-red-400/80 via-red-400/40 to-transparent z-20"
                style={{ left: `${todayPct}%` }}>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-[1px] text-red-400 whitespace-nowrap bg-black px-1.5 py-0.5 rounded">今天</div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.5)]" />
              </div>

              {/* Bars */}
              <div className="space-y-[9px] py-4">
                {ganttBars.map((bar, i) => {
                  const leftPct = ((bar.startWeek - 1) / VISIBLE_WEEKS) * 100;
                  const widthPct = ((bar.endWeek - bar.startWeek) / VISIBLE_WEEKS) * 100;
                  return (
                    <div key={i} className="h-[22px] relative">
                      <BarBlock bar={bar} leftPct={leftPct} widthPct={widthPct} />
                    </div>
                  );
                })}
              </div>

              {/* Week scale */}
              <div className="flex absolute bottom-0 w-full">
                {Array.from({ length: VISIBLE_WEEKS }, (_, i) => {
                  const d = new Date(2026, 5, 1 + i * 7);
                  return <div key={i} className="text-center text-[7px] text-gray-700" style={{ width: `${100 / VISIBLE_WEEKS}%` }}>{i % 2 === 0 ? `${d.getMonth() + 1}/${d.getDate()}` : ""}</div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-2.5 flex items-center justify-between text-[10px] text-gray-600">
        <span>横轴：2026年6月→12月（按周） · 纵轴：19个关键项目 · 红色竖线 = 今日进度</span>
        <span className="hidden sm:inline">已完成 8 · 进行中 3 · 计划中 8</span>
      </div>
    </div>
  );
}