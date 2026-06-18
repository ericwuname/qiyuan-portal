import { getContentByType } from "@/lib/content";
import { t } from "@/lib/translations";
import Link from "next/link";

export default function SkillsPage() {
  const skills = getContentByType("skills");
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <h1 className="text-4xl font-bold mb-4">{t.pageSkills}</h1>
        <p className="text-gray-400 mb-12">30+ AI Agent Skill，覆盖战略到执行完整链路</p>
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((s) => (
            <Link key={s.meta.slug} href={`/skills/${s.meta.slug}`}
              className="block p-6 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all hover:bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-lg font-bold">{s.meta.title}</h2>
                {s.meta.tier && <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300">{s.meta.tier}</span>}
              </div>
              <p className="text-gray-400 text-sm">{s.meta.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}