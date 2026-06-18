"use client";

import { useState } from "react";
import { t } from "@/lib/translations";
import FounderContent from "./FounderContent";

function getDailyPassword(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return yy + mm + dd;
}

export default function FounderPage() {
  const [showModal, setShowModal] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const dailyPassword = getDailyPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === dailyPassword) {
      setAuthenticated(true);
      setShowModal(false);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  const handleCancel = () => {
    window.location.href = "/";
  };

  if (authenticated) {
    return <FounderContent />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background overlay */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t.pageFounder}</h1>
          <p className="text-gray-400 mb-12">启元智能创始人 · 吴涛</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
            <h2 className="text-xl font-bold mb-2">请联系创始人</h2>
            <p className="text-gray-400 text-sm mb-6">此页面需要密码才能访问</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="请输入访问密码"
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white text-center focus:outline-none focus:border-brand-gold transition-colors"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-sm text-center">密码错误，请重新输入</p>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-lg bg-brand-gold/20 border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/30 transition-colors font-medium"
                >
                  确定
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}