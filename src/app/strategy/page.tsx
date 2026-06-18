import { t } from "@/lib/translations";
import Link from "next/link";
import GanttChart from "./GanttChart";

const quadrants = [
  { title: "I: Urgent & Important", sub: "Do Now", color: "bg-red-500/10 border-red-500/30",
    items: ["门户内容框架上线","English-First 改造完成","修复导航中文乱码"] },
  { title: "II: Important, Not Urgent", sub: "Schedule", color: "bg-blue-500/10 border-blue-500/30",
    items: ["案例轮动展示页","创始人信息页上线","战略规划四象限可视化","客户成果故事完善","发展历程时间线扩展"] },
  { title: "III: Urgent, Not Important", sub: "Delegate", color: "bg-yellow-500/10 border-yellow-500/30",
    items: ["SEO 优化","Google Analytics 接入","社交媒体分享优化"] },
  { title: "IV: Not Urgent, Not Important", sub: "Eliminate / Later", color: "bg-gray-500/10 border-gray-500/30",
    items: ["动画微调","深色模式切换"] },
];

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <h1 className="text-4xl font-bold mb-4">{t.pageStrategy}</h1>
        <p className="text-gray-400 mb-12">战略优先级排序 + 甘特图进度追踪</p>

        <GanttChart />

        {/* Four Quadrants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {quadrants.map((q, i) => (
            <div key={i} className={`rounded-xl border p-6 ${q.color}`}>
              <h2 className="text-lg font-bold mb-1">{q.title}</h2>
              <p className="text-xs text-gray-400 mb-4">{q.sub}</p>
              <ul className="space-y-2">
                {q.items.map((item, j) => (
                  <li key={j} className="text-sm text-gray-300 flex items-start gap-2"><span className="text-gray-500 mt-1">▸</span>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Decision Matrix */}
        <div className="p-8 rounded-xl border border-white/10 bg-white/[0.02]">
          <h2 className="text-2xl font-bold mb-4">{t.strategyMatrix}</h2>
          <p className="text-gray-400 mb-6">Q1 是灭火，Q2 是建设。目标是将 Q1 前置到 Q2 进行规划。</p>
          <div className="grid grid-cols-2 gap-px bg-white/10 rounded-lg overflow-hidden">
            <div className="bg-red-500/20 p-4 text-center"><p className="font-bold text-sm">I: Do Now</p><p className="text-xs text-gray-400">Urgent + Important</p></div>
            <div className="bg-blue-500/20 p-4 text-center"><p className="font-bold text-sm">II: Schedule</p><p className="text-xs text-gray-400">Important + Not Urgent</p></div>
            <div className="bg-yellow-500/20 p-4 text-center"><p className="font-bold text-sm">III: Delegate</p><p className="text-xs text-gray-400">Urgent + Not Important</p></div>
            <div className="bg-gray-500/20 p-4 text-center"><p className="font-bold text-sm">IV: Eliminate</p><p className="text-xs text-gray-400">Not Urgent + Not Important</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}