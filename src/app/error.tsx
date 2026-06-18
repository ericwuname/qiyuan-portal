"use client";
import { t } from "@/lib/translations";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t.errorTitle}</h1>
        <p className="text-gray-400 mb-8">{t.errorMessage}</p>
        <button onClick={reset} className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">Retry</button>
      </div>
    </div>
  );
}