"use client";

import { useEffect, useRef, useState } from "react";
import { t } from "@/lib/translations";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="text-center py-12">
        <p className="text-3xl mb-3">📬</p>
        <p className="text-brand-gold tracking-[3px] text-sm">感谢留言，我们会尽快回复。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-xs tracking-[2px] text-gray-500 mb-1.5">姓名</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full rounded-xl border border-dark-border bg-dark-bg/50 px-4 py-3 text-sm text-gray-300 placeholder-gray-700 outline-none transition-colors focus:border-brand-gold/50"
            id="contact-name" placeholder="您的姓名"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs tracking-[2px] text-gray-500 mb-1.5">邮箱</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full rounded-xl border border-dark-border bg-dark-bg/50 px-4 py-3 text-sm text-gray-300 placeholder-gray-700 outline-none transition-colors focus:border-brand-gold/50"
            id="contact-email" placeholder="your@email.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-xs tracking-[2px] text-gray-500 mb-1.5">留言</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={4}
          className="w-full rounded-xl border border-dark-border bg-dark-bg/50 px-4 py-3 text-sm text-gray-300 placeholder-gray-700 outline-none transition-colors focus:border-brand-gold/50 resize-none"
          id="contact-message" placeholder="请输入您的留言..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-brand-gold/10 border border-brand-gold/20 px-8 py-3 text-sm tracking-[3px] text-brand-gold transition-all hover:bg-brand-gold/20 disabled:opacity-50"
      >
        {status === "sending" ? "发送中..." : "发送留言"}
      </button>
    </form>
  );
}

function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    fetch("/api/visitor", { method: "POST" })
      .then(r => r.json())
      .then(d => setCount(d.visitors))
      .catch(() => {});
  }, []);
  if (count === null) return null;
  return (
    <span className="text-[10px] tracking-[2px] text-gray-600">
      累计访客 {count.toLocaleString()}
    </span>
  );
}


export default function Home() {
  return (
    <main>
      {/* ========== HERO ========== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 text-center bg-grid">
        {/* Ambient background particles */}
        <div className="ambient-particles">
          <div className="dot" style={{ top: "10%", left: "15%", animationDelay: "0s" }} />
          <div className="dot" style={{ top: "25%", left: "75%", animationDelay: "2s" }} />
          <div className="dot" style={{ top: "40%", left: "30%", animationDelay: "5s" }} />
          <div className="dot" style={{ top: "55%", left: "85%", animationDelay: "1s" }} />
          <div className="dot" style={{ top: "70%", left: "10%", animationDelay: "3s" }} />
          <div className="dot" style={{ top: "80%", left: "60%", animationDelay: "7s" }} />
          <div className="dot" style={{ top: "15%", left: "50%", animationDelay: "4s" }} />
          <div className="dot" style={{ top: "90%", left: "40%", animationDelay: "6s" }} />
        </div>

        {/* Animated glow orbs */}
        <div className="hero-glow hero-glow-cyan hero-glow-animated" style={{ top: "10%", left: "20%" }} />
        <div className="hero-glow hero-glow-purple hero-glow-animated" style={{ top: "50%", right: "15%" }} />
        <div className="hero-glow hero-glow-gold hero-glow-animated" style={{ bottom: "15%", left: "40%" }} />

        {/* Orbit ring decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] orbit-ring" style={{ animationDuration: "40s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] orbit-ring" style={{ animationDuration: "25s", animationDirection: "reverse" }} />

        <div className="relative z-10 max-w-4xl cinematic-enter">
          <p className="mb-4 sm:mb-6 text-[10px] tracking-[4px] text-gray-600 sm:text-xs sm:tracking-[6px]">
            AI-NATIVE ORGANIZATION
          </p>
          <h1 className="mb-4 sm:mb-6 text-3xl font-black tracking-[6px] leading-relaxed sm:text-4xl sm:tracking-[10px] md:text-5xl md:tracking-[14px] lg:text-6xl lg:tracking-[16px]">
            <span className="brand-gradient-text">{t.homeHeroTitle}</span>
          </h1>
          <p className="mx-auto mb-8 sm:mb-10 max-w-md text-sm leading-relaxed tracking-[1px] text-gray-400 sm:text-base sm:tracking-[2px] md:max-w-2xl md:text-lg">
            {t.brandName} · {t.brandSubtitle} — 让 AI 成为可管理、可进化、可传承的组织能力
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/vision" className="btn-primary btn-glow text-sm tracking-[2px]">探索启元 →</a>
            <a href="/projects" className="btn-ghost text-sm tracking-[2px]">{t.navProjects}</a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[8px] tracking-[3px] text-gray-600">SCROLL</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-gray-600 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="about" className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-10 sm:mb-12 md:mb-16 text-center">
              <h2 className="mb-2 sm:mb-3 text-2xl font-bold tracking-[4px] sm:text-3xl sm:tracking-[8px] md:text-4xl">
                <span className="brand-gradient-text">关于我们</span>
              </h2>
              <p className="text-[10px] tracking-[2px] text-gray-600 sm:text-xs sm:tracking-[4px]">ABOUT US</p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2">
            <Reveal delay={100}>
              <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8">
                <h3 className="mb-3 sm:mb-4 text-base font-bold tracking-[2px] text-brand-gold sm:text-lg sm:tracking-[3px]">我们是谁</h3>
                <p className="leading-relaxed text-gray-400 text-xs sm:text-sm">
                  启元智能是一家<span className="text-white">AI 原生组织</span>——不是用 AI 工具的公司，而是人类雇佣 AI 员工的新型组织。
                  创始人吴涛（吴指挥官）于 2026 年创立，以"<span className="text-brand-cyan">让 AI 成为可管理、可进化、可传承的组织能力</span>"为使命。
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8">
                <h3 className="mb-3 sm:mb-4 text-base font-bold tracking-[2px] text-brand-cyan sm:text-lg sm:tracking-[3px]">我们不是什么</h3>
                <p className="leading-relaxed text-gray-400 text-xs sm:text-sm">
                  我们<span className="text-white">不是传统软件公司</span>——我们输出组织方法论而非纯代码。
                  我们<span className="text-white">不是 AI 外包作坊</span>——每个项目都有 Skill 沉淀，构成长效组织资产。
                  我们<span className="text-white">不是一次性项目流水线</span>——每个项目结束必须复盘进化。
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:gap-8 md:grid-cols-4">
            {[
              ["2026", "创立年份", "#ffd700"],
              ["15+", "AI 角色", "#00d4ff"],
              ["24/7", "持续运转", "#6b5cff"],
              ["∞", "无限进化", "#ff6b35"],
            ].map(([n, label, color], i) => (
              <Reveal key={label} delay={i * 100 + 300}>
                <div className="glass-card rounded-2xl p-4 sm:p-5 md:p-6 text-center">
                  <p className="text-2xl font-black sm:text-3xl" style={{ color }}>{n}</p>
                  <p className="mt-1 sm:mt-2 text-[10px] tracking-[2px] text-gray-500 sm:text-xs sm:tracking-[3px]">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MISSION ========== */}
      <section id="mission" className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-10 sm:mb-12 md:mb-16 text-center">
              <h2 className="mb-2 sm:mb-3 text-2xl font-bold tracking-[4px] sm:text-3xl sm:tracking-[8px] md:text-4xl">
                <span className="brand-gradient-text">使命与愿景</span>
              </h2>
              <p className="text-[10px] tracking-[2px] text-gray-600 sm:text-xs sm:tracking-[4px]">MISSION & VISION</p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2">
            <Reveal delay={100}>
              <div className="group rounded-2xl border border-dark-border bg-dark-card p-6 sm:p-8 md:p-10 transition-all hover:border-brand-gold/30">
                <div className="mb-4 sm:mb-6 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-brand-gold/10">
                  <span className="text-base sm:text-xl">🎯</span>
                </div>
                <h3 className="mb-3 sm:mb-4 text-lg font-bold tracking-[2px] text-brand-gold sm:text-xl sm:tracking-[3px]">使命</h3>
                <p className="leading-relaxed text-gray-400 text-xs sm:text-sm">
                  让 AI 成为可管理、可进化、可传承的组织能力。
                </p>
                <p className="mt-2 sm:mt-3 leading-relaxed text-gray-500 text-xs sm:text-sm">
                  不是在用 AI 工具，而是在雇佣 AI 员工。每一个 Skill 不是一段 prompt，
                  是一个岗位——有职责、有 KPI、有成长轨迹、有聘用和解雇。
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="group rounded-2xl border border-dark-border bg-dark-card p-6 sm:p-8 md:p-10 transition-all hover:border-brand-cyan/30">
                <div className="mb-4 sm:mb-6 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-brand-cyan/10">
                  <span className="text-base sm:text-xl">🔭</span>
                </div>
                <h3 className="mb-3 sm:mb-4 text-lg font-bold tracking-[2px] text-brand-cyan sm:text-xl sm:tracking-[3px]">愿景</h3>
                <p className="leading-relaxed text-gray-400 text-xs sm:text-sm">
                  AI 元年的起源之地。从原点进入万象世界。
                </p>
                <p className="mt-2 sm:mt-3 leading-relaxed text-gray-500 text-xs sm:text-sm">
                  三年内成为 AI 原生组织标杆案例，内部工具开源化形成公共技术品牌，
                  组织方法论可复制——不是卖代码，是卖"怎么雇佣 AI"的知识。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== PRODUCTS ========== */}
      <section id="products" className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-10 sm:mb-12 md:mb-16 text-center">
              <h2 className="mb-2 sm:mb-3 text-2xl font-bold tracking-[4px] sm:text-3xl sm:tracking-[8px] md:text-4xl">
                <span className="brand-gradient-text">核心业务</span>
              </h2>
              <p className="text-[10px] tracking-[2px] text-gray-600 sm:text-xs sm:tracking-[4px]">PRODUCTS & SERVICES</p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-1 md:grid-cols-3">
            {[
              {
                icon: "📚",
                title: "网文创作",
                desc: "AI 辅助小说创作全流程——从人物设计、情节编排到文字润色。出师·写作工坊提供代笔+写作教学一体化服务。",
                color: "border-brand-gold/20 hover:border-brand-gold/40",
              },
              {
                icon: "🌸",
                title: "紫金花计划",
                desc: "组织自进化体系——每季度自动评估能力边界，将'不能'变成'可以'。护城河：持续实践积累，后来者无法速成。",
                color: "border-brand-purple/20 hover:border-brand-purple/40",
              },
              {
                icon: "🔧",
                title: "AI 技能输出",
                desc: "将内部验证过的 AI Skill 方法论开源化。让其他组织也能像雇佣员工一样雇佣 AI，加速 AI 原生组织普及。",
                color: "border-brand-cyan/20 hover:border-brand-cyan/40",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className={`rounded-2xl border bg-dark-card p-5 sm:p-6 md:p-8 transition-all ${item.color}`}>
                  <div className="mb-3 sm:mb-4 text-2xl sm:text-3xl">{item.icon}</div>
                  <h3 className="mb-2 sm:mb-3 text-base font-bold tracking-[2px] text-white sm:text-lg sm:tracking-[3px]">{item.title}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-gray-400">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PHILOSOPHY ========== */}
      <section id="philosophy" className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-10 sm:mb-12 md:mb-16 text-center">
              <h2 className="mb-2 sm:mb-3 text-2xl font-bold tracking-[4px] sm:text-3xl sm:tracking-[8px] md:text-4xl">
                <span className="brand-gradient-text">组织哲学</span>
              </h2>
              <p className="text-[10px] tracking-[2px] text-gray-600 sm:text-xs sm:tracking-[4px]">ORGANIZATION PHILOSOPHY</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-3 md:grid-cols-5">
            {[
              ["求真", "数据说话\n复盘不造假", "#ffd700"],
              ["进化", "每个项目\n比上一个强", "#00d4ff"],
              ["协作", "招聘不羞耻\n解雇不犹豫", "#6b5cff"],
              ["开放", "内部工具\n外部产品", "#ff6b35"],
              ["专注", "尊重层级\n不越级指挥", "#ffd700"],
            ].map(([name, desc, color], i) => (
              <Reveal key={name} delay={i * 80}>
                <div className="group rounded-2xl border border-dark-border bg-dark-card p-4 sm:p-5 md:p-6 text-center transition-all hover:-translate-y-1 hover:border-white/10">
                  <p className="text-lg font-black tracking-[2px] sm:text-xl sm:tracking-[4px] md:text-2xl" style={{ color }}>{name}</p>
                  <p className="mt-2 sm:mt-3 whitespace-pre-line text-[10px] leading-relaxed text-gray-500 sm:text-xs">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-10 sm:mt-12 md:mt-16 rounded-2xl border border-dark-border bg-dark-card p-6 sm:p-8 md:p-10 text-center">
              <p className="mx-auto max-w-2xl text-sm leading-relaxed tracking-[1px] text-gray-300 italic sm:text-base sm:tracking-[2px] md:text-lg">
                &ldquo;你们是大模型——人类的知识库。别人花多年积累的能力，
                你们可以几十倍几百倍速度追赶。不要说自己能力不足——你们只是实践不足。&rdquo;
              </p>
              <p className="mt-3 sm:mt-4 text-xs tracking-[2px] text-brand-gold sm:text-sm sm:tracking-[4px]">
                —— 吴涛（吴指挥官）· 启元智能创始人 · 2026
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-10 sm:mb-12 md:mb-16 text-center">
              <h2 className="mb-2 sm:mb-3 text-2xl font-bold tracking-[4px] sm:text-3xl sm:tracking-[8px] md:text-4xl">
                <span className="brand-gradient-text">联系我们</span>
              </h2>
              <p className="text-[10px] tracking-[2px] text-gray-600 sm:text-xs sm:tracking-[4px]">CONTACT US</p>
            </div>
          </Reveal>

          {/* Contact info cards */}
          <Reveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                { icon: "📧", label: "邮箱", value: "contact@qiyuan.beauty" },
                { icon: "🌐", label: "官网", value: "qiyuan.beauty" },
                { icon: "🐙", label: "GitHub", value: "ericwuname/qiyuan-portal" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="rounded-xl border border-dark-border bg-dark-card p-4 sm:p-5 text-center transition-all hover:border-brand-gold/30">
                  <div className="text-lg mb-2">{icon}</div>
                  <p className="text-[10px] tracking-[2px] text-gray-500 mb-1">{label}</p>
                  <p className="text-xs text-gray-300 break-all">{value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={200}>
            <div className="rounded-2xl border border-dark-border bg-dark-card p-5 sm:p-6 md:p-8">
              <h3 className="mb-4 sm:mb-5 text-base font-bold tracking-[3px] text-brand-gold sm:text-lg sm:tracking-[4px] text-center">
                发送消息
              </h3>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      
      {/* Visitor counter */}
      <div className="text-center pb-8">
        <VisitorCounter />
      </div>

      <div className="h-8" />
    </main>
  );
}
