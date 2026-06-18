import { getContentByType } from "@/lib/content";
import { t } from "@/lib/translations";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = getContentByType("projects");
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-brand-orange/5 blur-[120px]" />
        <div className="absolute bottom-40 left-20 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[100px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <p className="text-[10px] tracking-[4px] text-gray-600 uppercase mb-3">PROJECT PORTFOLIO</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4"><span className="brand-gradient-text">{t.pageProjects}</span></h1>
        <p className="text-gray-400 text-lg mb-12">Selected projects showcasing our AI capability frontier</p>
        <div className="grid gap-6 stagger-children">
          {projects.map((p) => (
            <Link key={p.meta.slug} href={`/projects/${p.meta.slug}`}
              className="block p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-purple-500/30 transition-all hover:bg-white/[0.02] card-hover">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2 text-white">{p.meta.title}</h2>
                  <p className="text-gray-400 mb-3">{p.meta.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {p.meta.tags?.map((tag: string) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/20 whitespace-nowrap">{p.meta.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}