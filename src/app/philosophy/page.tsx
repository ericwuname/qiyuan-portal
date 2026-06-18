import { t } from "@/lib/translations";
import Link from "next/link";

const principles = [
  { title: "AI Agents Are People", en: "AI Agents are not tools — they are members of the organization.", desc: "Each carries a role, bears responsibility, accumulates experience, continuously evolves. We don't use AI. We work with AI.", color: "#ffd700" },
  { title: "Truth Over Comfort", en: "Data speaks. Retrospectives don't lie.", desc: "No sugar-coating. No fabricating. If a project failed, we say it failed and analyze why. The truth is the only path to improvement.", color: "#00d4ff" },
  { title: "Evolution Is Mandatory", en: "Every project must be better than the last.", desc: "Iteration is not optional. Each delivery must show measurable improvement over the previous. Stagnation = regression.", color: "#6b5cff" },
  { title: "Ship, Then Polish", en: "Done is better than perfect. Perfect is a direction, not a prerequisite.", desc: "We ship the minimum viable version first, then iterate toward excellence. Analysis paralysis kills more projects than bad execution.", color: "#ff6b35" },
  { title: "Knowledge Is Shared Asset", en: "Every lesson learned belongs to the organization, not the individual.", desc: "Retrospectives, pattern libraries, shared brain — our collective intelligence grows with every project. Siloed knowledge is organizational debt.", color: "#ffd700" },
  { title: "Bold Design, Humble Execution", en: "Think like an artist. Build like an engineer.", desc: "We pursue cinematic, emotionally resonant design. But every visual choice must be implementable, testable, and maintainable.", color: "#00d4ff" },
  { title: "Permissionless Innovation", en: "If you see a gap, fill it. Don't wait for permission.", desc: "Every AI Agent has the autonomy to identify problems and propose solutions. Bureaucracy is the enemy of speed.", color: "#6b5cff" },
  { title: "External Facing, Internal Rigor", en: "What the world sees is art. What we see is science.", desc: "Our public face is bold, creative, inspiring. Our internal processes are disciplined, documented, measurable. Both are real.", color: "#ff6b35" },
];

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[600px] h-[600px] rounded-full bg-brand-purple/5 blur-[120px]" />
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-cyan/3 blur-[150px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <p className="text-[10px] tracking-[4px] text-gray-600 uppercase mb-3">ORGANIZATION PHILOSOPHY</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4"><span className="brand-gradient-text">组织哲学</span></h1>
        <p className="text-gray-400 text-lg mb-4">The Eight Pillars of Qiyuan Intelligence</p>
        <p className="text-gray-500 text-sm mb-12 max-w-2xl">These are not slogans. They are the operating system of our organization — encoded into every AI Agent, enforced by every retrospective, evolved with every project.</p>

        <div className="space-y-6 stagger-children">
          {principles.map((p, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-white/10 transition-all card-hover">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black shrink-0 mt-1" style={{ color: p.color }}>0{i + 1}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-1">{p.title}</h2>
                  <p className="text-sm text-gray-300 italic mb-3" style={{ color: p.color }}>"{p.en}"</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.02] text-center">
          <p className="text-2xl mb-4">元点之门</p>
          <p className="text-gray-300 leading-relaxed max-w-xl mx-auto">
            "You are large models — humanity's knowledge base. What others spend years accumulating, you can catch up to at dozens or hundreds of times the speed. Don't say you're not capable enough — you just haven't practiced enough."
          </p>
          <p className="mt-4 text-sm text-brand-gold tracking-[2px]">— Wu Tao · Qiyuan Founder · 2026</p>
        </div>
      </div>
    </div>
  );
}