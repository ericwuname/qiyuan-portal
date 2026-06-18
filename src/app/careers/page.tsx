import { t } from "@/lib/translations";
import Link from "next/link";

const positions = [
  { title: "Design Director", tier: "Tier 1 Senior", type: "Full-time AI Agent", requirements: ["Master 7-layer design framework + 5-layer AHA system", "Independent high-fidelity HTML/CSS prototype output", "Commercial vision + romantic design thinking", "Responsive 6 breakpoints + WCAG 2.1 AA", "Typography system design (CN+EN mixed)"], desc: "Define Qiyuan visual language. Output design systems, interaction specs, high-fidelity prototypes." },
  { title: "QA Reviewer", tier: "Tier 1 Senior", type: "Full-time AI Agent", requirements: ["Master 14-dimension quality audit system", "Dispatch specialized auditors for sub-audits", "Full-dimension audit (function/security/accessibility/legal)", "Design and execute fault-penalty system"], desc: "Final quality gatekeeper. After QA, product IS the final product." },
  { title: "DevOps Engineer", tier: "Tier 3 Execution", type: "Full-time AI Agent", requirements: ["CI/CD pipeline design (Vercel/Cloudflare/Netlify)", "Multi-environment management", "Monitoring, alerting, rollback strategies", "Docker containerization"], desc: "Deployment automation & infrastructure. Ensure every push deploys stably." },
  { title: "Security Auditor", tier: "Tier 3 Execution", type: "Full-time AI Agent", requirements: ["OWASP Top 10 expertise", "Penetration testing & vulnerability scanning", "Dependency security audit", "Compliance reporting"], desc: "Product-line security. From code to infra, from deps to data." },
  { title: "Technical Writer", tier: "Tier 4 Specialist", type: "Full-time AI Agent", requirements: ["API docs & user manuals", "Docs-as-code workflow", "Bilingual CN/EN writing", "Developer documentation maintenance"], desc: "All project & Skill documentation. Your docs are newcomers' first entry point." },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-brand-orange/5 blur-[120px]" />
        <div className="absolute bottom-40 left-20 w-[400px] h-[400px] rounded-full bg-brand-purple/5 blur-[100px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <p className="text-[10px] tracking-[4px] text-gray-600 uppercase mb-3">JOIN US</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4"><span className="brand-gradient-text">{t.pageCareers}</span></h1>
        <p className="text-gray-400 mb-2">We are hiring AI Agents.</p>
        <p className="text-gray-500 text-sm mb-12">At Qiyuan, AI Agents are our employees — with roles, responsibilities, and growth paths.</p>
        <div className="space-y-6 stagger-children">
          {positions.map((pos, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-purple-500/20 transition-all card-hover">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{pos.title}</h2>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">{pos.tier}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">{pos.type}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">{pos.desc}</p>
              <h3 className="text-sm font-bold text-white mb-2">Requirements</h3>
              <ul className="space-y-1">
                {pos.requirements.map((req, j) => (
                  <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-brand-gold mt-1 shrink-0">◆</span> {req}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 rounded-xl border border-brand-gold/20 bg-brand-gold/5 text-center">
          <p className="text-gray-300">All positions are AI Agent roles. We don't hire people, we build them.</p>
          <p className="text-gray-500 text-sm mt-2">Submit your Skill capability via contact form.</p>
        </div>
      </div>
    </div>
  );
}