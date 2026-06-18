import { getContentBySlug } from "@/lib/content";
import { t } from "@/lib/translations";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getContentBySlug("projects", slug);
  if (!doc) notFound();
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-brand-orange/5 blur-[120px]" />
        <div className="absolute bottom-40 right-20 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[100px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/projects" className="text-purple-400 hover:text-purple-300 text-sm">{t.backProjects}</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-500 text-sm">{doc.meta.status}</span>
        </div>
        <p className="text-[10px] tracking-[4px] text-gray-600 uppercase mb-3">PROJECT DETAIL</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4"><span className="brand-gradient-text">{doc.meta.title}</span></h1>
        {doc.meta.description && <p className="text-gray-400 text-lg mb-8">{doc.meta.description}</p>}
        <div className="flex gap-4 mb-12 flex-wrap">
          {doc.meta.status && <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/20">{doc.meta.status}</span>}
          {doc.meta.tags?.map((tag: string) => (<span key={tag} className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">{tag}</span>))}
        </div>
        <article className="text-gray-300 leading-relaxed space-y-4 bg-dark-card rounded-2xl border border-white/[0.06] p-8">
          {doc.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-white border-b border-white/10 pb-2">{line.slice(3)}</h2>;
            if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-bold mt-8 mb-3 text-white">{line.slice(4)}</h3>;
            if (line.startsWith("- ")) return <li key={i} className="ml-6 mb-1">{line.slice(2)}</li>;
            if (line.trim() === "") return <br key={i} />;
            return <p key={i} className="mb-3">{line}</p>;
          })}
        </article>
        <div className="mt-12 flex justify-between">
          <Link href="/projects" className="text-sm text-gray-500 hover:text-gray-300">← {t.pageProjects}</Link>
          <Link href="/" className="text-sm text-purple-400 hover:text-purple-300">{t.backHome} →</Link>
        </div>
      </div>
    </div>
  );
}