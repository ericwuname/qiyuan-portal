import { getContentBySlug } from "@/lib/content";
import { t } from "@/lib/translations";
import Link from "next/link";

export default function VisionPage() {
  const doc = getContentBySlug("updates", "vision");
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[120px]" />
        <div className="absolute bottom-40 left-20 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[100px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <p className="text-[10px] tracking-[4px] text-gray-600 uppercase mb-3">VISION & ROADMAP</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4"><span className="brand-gradient-text">{t.pageVision}</span></h1>
        <p className="text-gray-400 text-lg mb-12">Where we are headed · What we are building</p>
        <article className="text-gray-300 leading-relaxed space-y-4 bg-dark-card rounded-2xl border border-white/[0.06] p-8">
          {doc?.content.split("\n").map((line, i) => {
            if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-bold mt-8 mb-3 text-white">{line.slice(4)}</h3>;
            if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-white border-b border-white/10 pb-2">{line.slice(3)}</h2>;
            if (line.startsWith("- ")) return <li key={i} className="ml-6 mb-1">{line.slice(2)}</li>;
            if (line.trim() === "") return <br key={i} />;
            return <p key={i} className="mb-3">{line}</p>;
          })}
        </article>
      </div>
    </div>
  );
}