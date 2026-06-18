import { t } from "@/lib/translations";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-brand-gold">404</h1>
        <p className="text-gray-400 mb-8">{t.notFoundMessage}</p>
        <Link href="/" className="text-purple-400 hover:text-purple-300">{t.backHome}</Link>
      </div>
    </div>
  );
}