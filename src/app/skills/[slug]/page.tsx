import { getContentBySlug } from "@/lib/content";
import { t } from "@/lib/translations";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getContentBySlug("skills", slug);
  if (!doc) notFound();
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/skills" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backSkills}</Link>
        <h1 className="text-4xl font-bold mb-2">{doc.meta.title}</h1>
        {doc.meta.tier && <p className="text-blue-300 text-sm mb-6">{doc.meta.tier}</p>}
        {doc.meta.description && <p className="text-xl text-gray-400 mb-8">{doc.meta.description}</p>}
        <article className="text-gray-300 leading-relaxed space-y-4">
          {doc.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-white border-b border-white/10 pb-2">{line.slice(3)}</h2>;
            if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-bold mt-8 mb-3 text-white">{line.slice(4)}</h3>;
            if (line.startsWith("- ")) return <li key={i} className="ml-6 mb-1">{line.slice(2)}</li>;
            if (line.trim() === "") return <br key={i} />;
            return <p key={i} className="mb-3">{line}</p>;
          })}
        </article>
      </div>
    </div>
  );
}