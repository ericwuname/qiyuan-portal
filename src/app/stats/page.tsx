import { getContentByType } from "@/lib/content";
import { t } from "@/lib/translations";
import Link from "next/link";

export default function StatsPage() {
  const projects = getContentByType("projects").length;
  const skills = getContentByType("skills").length;
  const updates = getContentByType("updates").length;
  const metrics = [
    { label: "AI Agent Skills", value: 35, desc: "Full org coverage" },
    { label: "Delivered Projects", value: projects, desc: "Growing" },
    { label: "Org Tiers", value: 4, desc: "Tier 1-4 full chain" },
    { label: "Updates", value: updates, desc: "Active iteration" },
    { label: "Open Source", value: 1, desc: "PyPI published" },
    { label: "Pages", value: 20, desc: "MD-driven" },
  ];
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px]" />
        <div className="absolute bottom-40 right-20 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[100px]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <p className="text-[10px] tracking-[4px] text-gray-600 uppercase mb-3">LIVE DATA</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4"><span className="brand-gradient-text">{t.pageStats}</span></h1>
        <p className="text-gray-400 text-lg mb-12">Qiyuan Intelligence · Real-time organization metrics</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 stagger-children">
          {metrics.map((m, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] text-center card-hover">
              <p className="text-3xl font-bold text-brand-gold mb-2">{m.value}</p>
              <p className="text-sm text-gray-300">{m.label}</p>
              <p className="text-xs text-gray-500 mt-1">{m.desc}</p>
            </div>
          ))}
        </div>
        <div className="p-8 rounded-xl border border-white/[0.06] bg-white/[0.01]">
          <h2 className="text-xl font-bold mb-4 text-white">Organization Evolution Timeline</h2>
          <div className="space-y-4">
            {[
              { date: "2026.06.18", event: "Design Director v4.0 cinematic redesign launched" },
              { date: "2026.06.15", event: "Portal expanded to 20 pages, data dashboard live" },
              { date: "2026.06.14", event: "English-First code refactor, 8 iron rules active" },
              { date: "2026.06.14", event: "Multi-page portal framework online: 7 projects + 12 skills + 4-tier display" },
              { date: "2026.06.13", event: "QA Reviewer upgraded to v2.0, 14-dimension audit system" },
              { date: "2026.06.12", event: "Org Asset Whitepaper V3.0, crew calibrated to 23" },
              { date: "2026.05", event: "Skill system completed: 35+ AI Agent Skills" },
            ].map((e, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-xs text-gray-500 whitespace-nowrap mt-1 font-mono">{e.date}</span>
                <div className="flex-1"><span className="text-gray-300">{e.event}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}