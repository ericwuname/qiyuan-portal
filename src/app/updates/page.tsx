import { getContentByType } from "@/lib/content";
import { t } from "@/lib/translations";
import Link from "next/link";

export default function UpdatesPage() {
  const updates = getContentByType("updates");
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px]" />
        <div className="absolute bottom-40 left-20 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[100px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <p className="text-[10px] tracking-[4px] text-gray-600 uppercase mb-3">LATEST UPDATES</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4"><span className="brand-gradient-text">{t.pageUpdates}</span></h1>
        <p className="text-gray-400 text-lg mb-12">Qiyuan Intelligence latest progress and update log</p>
        <div className="space-y-6 stagger-children">
          {updates.map((u) => (
            <div key={u.meta.slug} className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-white/10 transition-all card-hover">
              <p className="text-xs text-gray-500 mb-2">{u.meta.date}</p>
              <h2 className="text-xl font-bold mb-2 text-white">{u.meta.title}</h2>
              <p className="text-gray-400 text-sm">{u.meta.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}