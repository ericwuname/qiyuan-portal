import { getContentByType } from "@/lib/content";
import { t } from "@/lib/translations";
import Link from "next/link";

export default function UpdatesPage() {
  const updates = getContentByType("updates");
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <h1 className="text-4xl font-bold mb-4">{t.pageUpdates}</h1>
        <p className="text-gray-400 mb-12">启元智能的最新进展与更新日志</p>
        <div className="space-y-6">
          {updates.map((u) => (
            <div key={u.meta.slug} className="p-6 rounded-xl border border-white/10">
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