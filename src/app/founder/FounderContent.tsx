import { t } from "@/lib/translations";
import Link from "next/link";

export default function FounderContent() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <h1 className="text-4xl font-bold mb-4">{t.pageFounder}</h1>

        <div className="mb-12 p-4 rounded-lg border border-brand-gold/20 bg-brand-gold/5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-300 font-medium">简历下载</p>
            <p className="text-xs text-gray-500">吴涛 · 启元智能创始人</p>
          </div>
          <a href="/resume.pdf" download
            className="px-4 py-2 rounded-lg bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-sm hover:bg-brand-gold/30 transition-colors">
            下载 PDF
          </a>
        </div>

        <article className="text-gray-300 leading-relaxed space-y-6">
          <h2 className="text-2xl font-bold mt-10 mb-4 text-white border-b border-white/10 pb-2">吴涛</h2>
          <p className="mb-3">启元智能创始人 &amp; CEO。</p>

          <h3 className="text-xl font-bold mt-8 mb-3 text-white">核心能力</h3>
          <ul className="space-y-1">
            <li className="ml-6 mb-1">AI Agent 组织设计：构建了 35 个 AI Agent Skill 的四层组织架构</li>
            <li className="ml-6 mb-1">全栈技术：Next.js / React / Python / TypeScript / Tailwind CSS</li>
            <li className="ml-6 mb-1">产品方法论：PDCA 全链路 + 七层质量模型 + 需求六维框架</li>
            <li className="ml-6 mb-1">叙事设计：星舰舰桥隐喻体系 / 伤痕叙事模式 / 矛盾场域头脑风暴法</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-3 text-white">代表项目</h3>
          <ul className="space-y-1">
            <li className="ml-6 mb-1">启元智能门户 (qiyuan.beauty) — Markdown 驱动多页面网站，AI Agent 可自主更新</li>
            <li className="ml-6 mb-1">AI-Corp — 全栈企业智能平台，V1-V7.1 七个大版本</li>
            <li className="ml-6 mb-1">项羽穿越模拟器 — AI 历史叙事引擎，Codex Skill 架构</li>
            <li className="ml-6 mb-1">QVC — Python 代码质量工具，PyPI 开源发布</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-3 text-white">组织理念</h3>
          <p className="mb-3">不是让人使用 AI 工具，而是让 AI Agent 成为组织的一员——承载角色、承担责任、积累经验、持续进化。</p>

          <h3 className="text-xl font-bold mt-8 mb-3 text-white">联系方式</h3>
          <ul className="space-y-1">
            <li className="ml-6 mb-1"><a href="https://github.com/ericwuname" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">GitHub</a></li>
            <li className="ml-6 mb-1"><a href="https://qiyuan.beauty" className="text-purple-400 hover:text-purple-300">qiyuan.beauty</a></li>
          </ul>
        </article>
      </div>
    </div>
  );
}