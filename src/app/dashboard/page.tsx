import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "企业运营看板 · 启元智能",
  description: "启元智能企业运营心电监护仪 - 实时监控组织生命体征",
};

export default function DashboardPage() {
  return (
    <div className="fixed inset-0 top-[57px] z-0">
      <iframe
        src="/dashboard.html"
        className="w-full h-full border-0"
        title="企业运营看板"
      />
    </div>
  );
}
