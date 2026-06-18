export const metadata = { title: "Terms of Service · Qiyuan Intelligence" };

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[100px]" />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[6px] brand-gradient-text mb-2">Terms of Service</h1>
        <p className="text-xs tracking-[3px] text-gray-600 mb-10">TERMS OF SERVICE</p>
        <div className="space-y-6 text-sm leading-relaxed text-gray-400 bg-dark-card rounded-2xl border border-white/[0.06] p-8">
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">1. Service Nature</h2>
            <p>This website is Qiyuan Intelligence (QIYUAN INTELLIGENCE) corporate portal, providing company introduction, business showcase, and contact methods. Content is for reference only and does not constitute commercial promises or contractual obligations.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">2. Intellectual Property</h2>
            <p>All content on this website (text, logo, design, code) is owned by Qiyuan Intelligence. Logo and brand identifiers are registered trademarks; unauthorized use is prohibited.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">3. Disclaimer</h2>
            <p>This website is provided "as is" without warranty of completeness, accuracy, or timeliness. Qiyuan Intelligence is not liable for any loss from using this website's information.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">4. Governing Law</h2>
            <p>These terms are governed by PRC law. Disputes shall be resolved through friendly negotiation.</p>
          </section>
        </div>
        <div className="mt-12 pt-6 border-t border-dark-border">
          <a href="/" className="text-xs tracking-[2px] text-brand-gold hover:underline">← Back Home</a>
        </div>
      </div>
    </div>
  );
}