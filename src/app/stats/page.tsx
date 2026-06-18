import { getContentByType } from "@/lib/content";
import { t } from "@/lib/translations";
import Link from "next/link";

export default function StatsPage() {
  const projects = getContentByType("projects").length;
  const skills = getContentByType("skills").length;
  const updates = getContentByType("updates").length;

  const metrics = [
    { label: "AI Agent Skills", value: 35, desc: "覆盖全部职能" },
    { label: "已交付项目", value: projects, desc: "持续增长中" },
    { label: "组织层级", value: 4, desc: "Tier 1-4 全链路" },
    { label: "动态更新", value: updates, desc: "活跃迭代" },
    { label: "开源项目", value: 1, desc: "PyPI 发布" },
    { label: "页面数", value: 16, desc: "MD 驱动" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <h1 className="text-4xl font-bold mb-4">数据看板</h1>
        <p className="text-gray-400 mb-12">启元智能 · 实时组织数据</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {metrics.map((m, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.02] text-center">
              <p className="text-3xl font-bold text-brand-gold mb-2">{m.value}</p>
              <p className="text-sm text-gray-300">{m.label}</p>
              <p className="text-xs text-gray-500 mt-1">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-xl border border-white/10 bg-white/[0.02]">
          <h2 className="text-xl font-bold mb-4">组织进化趋势</h2>
          <div className="space-y-4">
            {[
              { date: "2026.06.15", event: "门户扩展至 16 页面，数据看板上线" },
              { date: "2026.06.14", event: "English-First 代码改造完成，铁律8生效" },
              { date: "2026.06.14", event: "动态模块 + 项目成果故事 + 发展历程时间线上线" },
              { date: "2026.06.14", event: "多页面门户框架上线，7项目+12Skill+4层架构展示" },
              { date: "2026.06.13", event: "QA评审官升级 v2.0，14维审查体系上线" },
              { date: "2026.06.12", event: "组织资产白皮书 V3.0 发布，船员校准至23人" },
              { date: "2026.05", event: "Skill 体系建成，35个 AI Agent Skill" },
            ].map((e, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-xs text-gray-500 whitespace-nowrap mt-1">{e.date}</span>
                <span className="text-gray-300">{e.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}