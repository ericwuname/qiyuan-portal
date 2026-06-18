"use client";

import { useState, useEffect, useCallback } from "react";
import { t } from "@/lib/translations";
import Link from "next/link";

interface ShowcaseItem {
  title: string;
  tag: string;
  desc: string;
  src: string;
  type: "html" | "image" | "link";
  link?: string;
  color: string;
}

const showcases: ShowcaseItem[] = [
  {
    title: "短剧 · 规则怪谈职场",
    tag: "商业提案书",
    desc: "30 集规则怪谈职场短剧完整商业提案。世界观架构、人物设计、分集大纲、市场分析、变现路径全链路展示。AI 驱动的叙事工业化能力。",
    src: "/showcase/短剧_规则怪谈职场_商业提案书.html",
    type: "html",
    color: "from-fuchsia-500/10 to-rose-500/5",
  },
  {
    title: "项羽穿越模拟器",
    tag: "AI 历史叙事引擎",
    desc: "49 章大纲 + 五维局势系统 + QA 审计。AI 驱动的楚汉历史互动叙事，认知暗线贯穿。本项目是 AI 叙事能力的最完整验证。",
    src: "",
    type: "link",
    link: "/projects/xiangyu-simulator",
    color: "from-amber-500/10 to-orange-500/5",
  },
  {
    title: "紫金花计划 · 自进化体系",
    tag: "前沿实验",
    desc: "AI 自进化体系设计文档 + TTRPG 验证实验。探索 AI Agent 自我迭代的边界，是公司技术愿景的核心载体。",
    src: "",
    type: "link",
    link: "/projects/zijinhua",
    color: "from-purple-500/10 to-indigo-500/5",
  },
  {
    title: "AI-Corp 企业 AI 平台",
    tag: "旗舰产品",
    desc: "全栈 AI 企业管理平台 V7.1。10 个 AI Agent 角色（CEO/CTO/CFO 等），SSE 流式对话，多轮任务协作。公司核心产品。",
    src: "",
    type: "link",
    link: "/projects/ai-corp",
    color: "from-blue-500/10 to-cyan-500/5",
  },
  {
    title: "出师 · 写作工坊",
    tag: "创作工具",
    desc: "三段教学法：代笔→反馈→放手。梯度消退式写作教学引擎，支持轻松智斗/严肃文学多风格切换。",
    src: "",
    type: "link",
    link: "/projects/chushi",
    color: "from-emerald-500/10 to-teal-500/5",
  },
];

export default function ShowcasePage() {
  const [active, setActive] = useState(0);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const totalSlides = showcases.length;

  const next = useCallback(() => setActive((prev) => (prev + 1) % totalSlides), [totalSlides]);
  const prev = useCallback(() => setActive((prev) => (prev - 1 + totalSlides) % totalSlides), [totalSlides]);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const openPreview = async (item: ShowcaseItem) => {
    if (item.type === "html") {
      try {
        const res = await fetch(item.src);
        if (res.ok) {
          const html = await res.text();
          setPreviewHtml(html);
          setShowPreview(true);
          return;
        }
      } catch {}
    }
    if (item.link) {
      window.open(item.link, "_blank");
    }
  };

  const current = showcases[active];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{t.pageShowcase}</h1>
            <p className="text-gray-400">精选项目轮动展示 · 全面呈现 AI 能力边界</p>
          </div>
          <span className="text-xs text-gray-600">{active + 1} / {totalSlides}</span>
        </div>

        {/* Carousel */}
        <div className="relative mb-12 rounded-2xl border border-white/[0.06] overflow-hidden min-h-[420px]">
          {/* Slide */}
          <div className={`relative p-8 md:p-12 bg-gradient-to-br ${current.color} min-h-[420px] flex flex-col justify-center transition-all duration-500`}>
            <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 mb-6 inline-block w-fit">
              {current.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-[2px]">{current.title}</h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed mb-8">{current.desc}</p>
            <button
              onClick={() => openPreview(current)}
              className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all w-fit text-sm tracking-[2px]"
            >
              {current.type === "html" ? "查看完整提案 →" : "查看详情 →"}
            </button>
          </div>

          {/* Nav arrows */}
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10">
            ←
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10">
            →
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {showcases.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-white w-6" : "bg-white/30 hover:bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-16">
          {showcases.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-left p-3 rounded-xl border transition-all text-xs ${
                i === active
                  ? "border-brand-gold/50 bg-brand-gold/5"
                  : "border-white/5 bg-white/[0.01] hover:border-white/20"
              }`}
            >
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${i === active ? "bg-brand-gold/20 text-brand-gold" : "bg-white/5 text-gray-500"} mb-1.5 inline-block`}>
                {item.tag}
              </span>
              <p className={`truncate ${i === active ? "text-white" : "text-gray-500"}`}>{item.title}</p>
            </button>
          ))}
        </div>

        {/* All projects link */}
        <div className="text-center">
          <Link href="/projects" className="text-brand-gold hover:text-brand-gold/80 text-sm tracking-[2px] transition-colors">
            {t.showcaseAllProjects} →
          </Link>
        </div>
      </div>

      {/* HTML Preview Modal */}
      {showPreview && previewHtml && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col" onClick={() => setShowPreview(false)}>
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 shrink-0">
            <h3 className="text-sm font-bold truncate">{current.title} · {current.tag}</h3>
            <button onClick={() => setShowPreview(false)} className="px-4 py-2 rounded-lg border border-white/20 text-gray-300 hover:text-white transition-colors text-sm">
              关闭 ✕
            </button>
          </div>
          <iframe
            srcDoc={previewHtml}
            className="flex-1 w-full border-0"
            title={current.title}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}