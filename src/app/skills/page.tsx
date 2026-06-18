import { getContentByType } from "@/lib/content";
import { t } from "@/lib/translations";
import Link from "next/link";

export default function SkillsPage() {
  const skills = getContentByType("skills");
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[120px]" />
        <div className="absolute bottom-40 right-20 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[100px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <p className="text-[10px] tracking-[4px] text-gray-600 uppercase mb-3">AI SKILL MATRIX</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4"><span className="brand-gradient-text">{t.pageSkills}</span></h1>
        <p className="text-gray-400 text-lg mb-12">30+ AI Agent Skills covering strategy to execution full chain</p>
        <div className="grid gap-6 md:grid-cols-2 stagger-children">
          {skills.map((s) => (
            <Link key={s.meta.slug} href={`/skills/${s.meta.slug}`}
              className="block p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-purple-500/30 transition-all hover:bg-white/[0.02] card-hover">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-lg font-bold text-white">{s.meta.title}</h2>
                {s.meta.tier && <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">{s.meta.tier}</span>}
              </div>
              <p className="text-gray-400 text-sm">{s.meta.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}