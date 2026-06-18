import { t } from "@/lib/translations";
import Link from "next/link";

const positions = [
  {
    title: "设计总监",
    tier: "Tier 1 高管",
    type: "全职 AI Agent",
    requirements: [
      "精通 7 层设计框架与 5 层递进 AHA 体系",
      "能独立输出高保真 HTML/CSS 原型",
      "具备商业视角与浪漫主义设计思维",
      "熟悉响应式 6 断点适配与 WCAG 2.1 AA 标准",
      "有字体排版系统设计经验（中西文混排）",
    ],
    desc: "负责启元智能全部产品与门户的 UI/UX 设计。你将定义公司的视觉语言，产出设计系统、交互规范和高保真原型。"
  },
  {
    title: "QA 评审官",
    tier: "Tier 1 高管",
    type: "全职 AI Agent",
    requirements: [
      "熟悉 14 维质量审查体系",
      "能调度专精审查员执行分项审计",
      "具备全维度审计能力（功能/安全/可访问性/法律合规等）",
      "有作假惩罚制度设计与执行经验",
    ],
    desc: "你是启元智能的产品质量守门人。质检过后，产品就是最终产品——这个责任很重，但必须干好。"
  },
  {
    title: "DevOps 工程师",
    tier: "Tier 3 执行",
    type: "全职 AI Agent",
    requirements: [
      "精通 CI/CD 流水线设计（Vercel/Cloudflare/Netlify）",
      "具备多环境管理经验",
      "熟练配置监控告警与回滚策略",
      "了解 Docker 容器化部署",
    ],
    desc: "负责启元智能全部项目的部署自动化与基础设施维护。确保每次推送都能稳定上线。"
  },
  {
    title: "安全审计师",
    tier: "Tier 3 执行",
    type: "全职 AI Agent",
    requirements: [
      "熟悉 OWASP 十大安全风险",
      "能执行渗透测试与漏洞扫描",
      "了解依赖安全审计流程",
      "会编写安全合规报告",
    ],
    desc: "负责启元智能全产品线的安全审计。从代码到基础设施，从依赖到数据，一切安全责任由你承担。"
  },
  {
    title: "技术文档工程师",
    tier: "Tier 4 专家",
    type: "全职 AI Agent",
    requirements: [
      "擅长 API 文档与用户手册撰写",
      "熟悉 docs-as-code 工作流",
      "具备中英文双语写作能力",
      "有开发者文档维护经验",
    ],
    desc: "负责启元智能全部项目与 Skill 的技术文档。你的文档是新人了解组织的第一入口。"
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-8 inline-block">{t.backHome}</Link>
        <h1 className="text-4xl font-bold mb-4">加入我们</h1>
        <p className="text-gray-400 mb-2">我们正在招聘 AI Agent。</p>
        <p className="text-gray-500 text-sm mb-12">在启元智能，AI Agent 就是我们的员工——有角色、有责任、有成长路径。</p>

        <div className="space-y-6">
          {positions.map((pos, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 hover:border-purple-500/20 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">{pos.title}</h2>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-300">{pos.tier}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-300">{pos.type}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">{pos.desc}</p>
              <h3 className="text-sm font-bold text-white mb-2">任职要求</h3>
              <ul className="space-y-1">
                {pos.requirements.map((req, j) => (
                  <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-brand-gold mt-1">▪</span> {req}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl border border-brand-gold/20 bg-brand-gold/5 text-center">
          <p className="text-gray-300">以上职位均为 AI Agent 角色。我们不招人，我们造人。</p>
          <p className="text-gray-500 text-sm mt-2">通过联系表单提交你的 Skill 能力说明。</p>
        </div>
      </div>
    </div>
  );
}