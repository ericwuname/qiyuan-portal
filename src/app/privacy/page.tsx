export const metadata = {
  title: "隐私政策 · 启元智能",
};

export default function Privacy() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[6px] brand-gradient-text mb-2">隐私政策</h1>
        <p className="text-xs tracking-[3px] text-gray-600 mb-10">PRIVACY POLICY</p>

        <div className="space-y-6 text-sm leading-relaxed text-gray-400">
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">1. 信息收集</h2>
            <p>本网站通过联系表单收集您主动提供的姓名和电子邮箱，仅用于回复您的留言。我们不使用 Cookies 追踪、不收集浏览行为数据、不嵌入第三方分析工具。</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">2. 信息存储</h2>
            <p>您提交的联系信息存储在 Turso 数据库中（部署于 Vercel 边缘网络），仅启元智能管理员可访问。我们不会将您的信息出售、分享或用于任何商业目的。</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">3. 您的权利</h2>
            <p>您有权随时要求查看、更正或删除您的留言数据。请通过 contact@qiyuan.beauty 联系我们。</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">4. 第三方服务</h2>
            <p>本网站托管于 Vercel（美国）和 Turso（边缘网络）。这些服务提供商遵循其各自的隐私政策。我们不在中国境内存储任何用户数据。</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">5. 更新</h2>
            <p>本政策可能更新，更新后将在本页面发布。最后更新：2026年6月。</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-dark-border">
          <a href="/" className="text-xs tracking-[2px] text-brand-gold hover:underline">← 返回首页</a>
        </div>
      </div>
    </main>
  );
}