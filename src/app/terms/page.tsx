export const metadata = {
  title: "服务条款 · 启元智能",
};

export default function Terms() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[6px] brand-gradient-text mb-2">服务条款</h1>
        <p className="text-xs tracking-[3px] text-gray-600 mb-10">TERMS OF SERVICE</p>

        <div className="space-y-6 text-sm leading-relaxed text-gray-400">
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">1. 服务性质</h2>
            <p>本网站为启元智能（QIYUAN INTELLIGENCE）企业门户，提供公司介绍、业务展示和联系方式。网站内容仅供参考，不构成任何商业承诺或合同要约。</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">2. 知识产权</h2>
            <p>本网站所有内容（包括文字、Logo、设计、代码）均为启元智能所有。Logo 及品牌标识为启元智能注册商标，未经书面授权不得使用。</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">3. 免责声明</h2>
            <p>本网站按"现状"提供，不保证信息的完整性、准确性或时效性。启元智能不对因使用本网站信息而产生的任何损失承担责任。</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">4. 适用法律</h2>
            <p>本条款适用中华人民共和国法律。因本网站产生的争议，双方应友好协商解决。</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-dark-border">
          <a href="/" className="text-xs tracking-[2px] text-brand-gold hover:underline">← 返回首页</a>
        </div>
      </div>
    </main>
  );
}