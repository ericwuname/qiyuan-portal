import { t } from "@/lib/translations";
import Link from "next/link";

const partners = [
  { name: "GitHub", role: "代码托管与版本控制", url: "https://github.com" },
  { name: "Vercel", role: "部署与边缘计算", url: "https://vercel.com" },
  { name: "Namesilo", role: "域名注册服务", url: "https://namesilo.com" },
  { name: "Turso", role: "SQLite 数据库", url: "https://turso.tech" },
  { name: "OpenAI", role: "AI 模型与 API", url: "https://openai.com" },
  { name: "Next.js", role: "前端框架", url: "https://nextjs.org" },
  { name: "Tailwind CSS", role: "样式系统", url: "https://tailwindcss.com" },
  { name: "Codex CLI", role: "AI Agent 运行环境", url: "https://github.com/openai/codex" },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <h1 className="text-4xl font-bold mb-4">合作伙伴与生态</h1>
        <p className="text-gray-400 mb-12">支撑启元智能运行的技术基础设施与合作伙伴</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
              className="block p-6 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all hover:bg-white/[0.02] text-center group">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/10 transition-colors">
                <span className="text-lg font-bold text-brand-gold">{p.name[0]}</span>
              </div>
              <h3 className="font-bold mb-1">{p.name}</h3>
              <p className="text-xs text-gray-500">{p.role}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}