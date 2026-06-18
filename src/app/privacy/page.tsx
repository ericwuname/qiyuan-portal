export const metadata = { title: "Privacy Policy · Qiyuan Intelligence" };

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full bg-brand-purple/5 blur-[100px]" />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-[6px] brand-gradient-text mb-2">Privacy Policy</h1>
        <p className="text-xs tracking-[3px] text-gray-600 mb-10">PRIVACY POLICY</p>
        <div className="space-y-6 text-sm leading-relaxed text-gray-400 bg-dark-card rounded-2xl border border-white/[0.06] p-8">
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">1. Information Collection</h2>
            <p>This website collects name and email you actively provide via contact form, used only to reply to your message. We do not use tracking cookies, collect browsing behavior, or embed third-party analytics.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">2. Information Storage</h2>
            <p>Contact information is stored in Turso database (deployed on Vercel edge network), accessible only by Qiyuan administrators. We do not sell, share, or use your information for any commercial purpose.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">3. Your Rights</h2>
            <p>You have the right to request viewing, correction, or deletion of your message data at any time. Contact us at contact@qiyuan.beauty.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">4. Third-Party Services</h2>
            <p>This website is hosted on Vercel (US) and Turso (edge network). These providers follow their respective privacy policies. We store no user data within China.</p>
          </section>
          <section>
            <h2 className="text-base font-bold text-white tracking-[2px] mb-2">5. Updates</h2>
            <p>This policy may update; changes will be posted on this page. Last updated: June 2026.</p>
          </section>
        </div>
        <div className="mt-12 pt-6 border-t border-dark-border">
          <a href="/" className="text-xs tracking-[2px] text-brand-gold hover:underline">← Back Home</a>
        </div>
      </div>
    </div>
  );
}