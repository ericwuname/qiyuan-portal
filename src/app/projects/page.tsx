import { getContentByType } from "@/lib/content";
import { t } from "@/lib/translations";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = getContentByType("projects");
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <h1 className="text-4xl font-bold mb-4">{t.pageProjects}</h1>
        <p className="text-gray-400 mb-12">精选项目，展示我们的 AI 能力边界</p>
        <div className="grid gap-6">
          {projects.map((p) => (
            <Link key={p.meta.slug} href={`/projects/${p.meta.slug}`}
              className="block p-6 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all hover:bg-white/[0.02]">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">{p.meta.title}</h2>
                  <p className="text-gray-400 mb-3">{p.meta.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {p.meta.tags?.map((tag: string) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-300">{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-300 whitespace-nowrap">{p.meta.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}