import { t } from "@/lib/translations";
import Link from "next/link";

const partners = [
  { name: "GitHub", role: "Code hosting & version control", url: "https://github.com", color: "#6b5cff" },
  { name: "Vercel", role: "Deployment & edge computing", url: "https://vercel.com", color: "#00d4ff" },
  { name: "Namesilo", role: "Domain registration", url: "https://namesilo.com", color: "#ffd700" },
  { name: "Turso", role: "SQLite database", url: "https://turso.tech", color: "#ff6b35" },
  { name: "OpenAI", role: "AI model & API", url: "https://openai.com", color: "#00d4ff" },
  { name: "Next.js", role: "Frontend framework", url: "https://nextjs.org", color: "#ffd700" },
  { name: "Tailwind CSS", role: "Style system", url: "https://tailwindcss.com", color: "#6b5cff" },
  { name: "Codex CLI", role: "AI Agent runtime", url: "https://github.com/openai/codex", color: "#ff6b35" },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[120px]" />
        <div className="absolute bottom-40 right-20 w-[400px] h-[400px] rounded-full bg-brand-purple/5 blur-[100px]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <p className="text-[10px] tracking-[4px] text-gray-600 uppercase mb-3">ECOSYSTEM</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4"><span className="brand-gradient-text">{t.pagePartners}</span></h1>
        <p className="text-gray-400 text-lg mb-12">Tech infrastructure powering Qiyuan Intelligence</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children">
          {partners.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
              className="block p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-white/20 transition-all text-center group card-hover">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: p.color + "15" }}>
                <span className="text-lg font-bold" style={{ color: p.color }}>{p.name[0]}</span>
              </div>
              <h3 className="font-bold mb-1 text-white">{p.name}</h3>
              <p className="text-xs text-gray-500">{p.role}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}