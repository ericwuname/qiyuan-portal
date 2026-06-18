"use client";

import { useState } from "react";

interface FinanceCase {
  id: string;
  title: string;
  subtitle: string;
  context: string;
  objective: string;
  methodology: string[];
  metrics: { label: string; value: string; trend?: "up" | "down" | "stable"; highlight?: boolean }[];
  insight: string;
  aiNote: string;
  tags: string[];
}

const supplyChainCases: FinanceCase[] = [
  {
    id: "sc-budget", title: "年度采购预算编制与差异分析", subtitle: "基于滚动预测的动态预算管控体系",
    context: "某制造企业年采购额 2.3 亿元，供应商 87 家，原材料价格波动频繁。传统年度预算在 Q2 即出现 15% 以上偏差，导致资金计划频繁调整。",
    objective: "建立月度滚动预算机制，将预算偏差控制在 ±5% 以内，提升资金使用效率。",
    methodology: ["历史采购数据清洗：剔除异常订单，按品类/供应商/季节因子建立基准线","滚动预测模型：基于前 3 个月实际 + 后 9 个月预测，每月滚动更新","差异分析看板：实际 vs 预算按周追踪，红黄绿灯预警","弹性预算区间：关键原材料设 ±10% 弹性区间，非关键物料 ±5%"],
    metrics: [{ label: "预算偏差率", value: "3.8%", trend: "down", highlight: true },{ label: "采购成本节约", value: "¥186万", trend: "up" },{ label: "预测准确率", value: "94.2%", trend: "up" },{ label: "供应商覆盖率", value: "87家", trend: "stable" }],
    insight: "滚动预算的本质不是'预测更准'，而是'纠偏更快'。关键是建立'预测→实际→分析→调整'的短闭环，而非追求一次性准确。",
    aiNote: "AI Agent 自动抓取 ERP 采购数据，生成每周差异分析初稿。财务BP只需审核关键假设，分析效率提升 8 倍。",
    tags: ["滚动预算", "差异分析", "弹性预算", "ERP对接"],
  },
  {
    id: "sc-analysis", title: "供应商成本结构深度分析", subtitle: "穿透式成本拆解与优化方案设计",
    context: "Top 10 供应商占总采购额 62%，其中 3 家连续 2 个季度涨价。管理层要求在不更换供应商的前提下，找出成本优化空间。",
    objective: "拆解供应商报价成本结构，识别虚高项，制定谈判策略，目标降低采购成本 5-8%。",
    methodology: ["成本结构拆解：原材料/人工/制造费用/物流/利润 五层穿透","横向对标：同品类不同供应商成本结构对比，找出异常偏离","市场价格校验：大宗原材料参考期货/现货市场价格","谈判策略矩阵：按供应商依赖度×成本优化空间四象限分类"],
    metrics: [{ label: "识别虚高金额", value: "¥342万", trend: "up", highlight: true },{ label: "谈判降价率", value: "6.2%", trend: "up" },{ label: "供应商配合度", value: "8/10", trend: "stable" },{ label: "年化节约预估", value: "¥510万", trend: "up" }],
    insight: "供应商谈判不是'砍价'，是'用数据帮供应商发现自己都没意识到的成本优化点'。当你比供应商更懂他的成本结构时，谈判位置就逆转了。",
    aiNote: "AI Agent 自动爬取大宗商品价格，匹配到对应原材料品类，实时校验供应商报价合理性。人工只需做关系维护和最终谈判。",
    tags: ["成本拆解", "供应商谈判", "对标分析", "价格校验"],
  },
  {
    id: "sc-report", title: "供应链健康度月度经营报告", subtitle: "从数据到决策的标准化报告体系",
    context: "CEO 每月需要一份 15 分钟内能读完的供应链经营报告，涵盖采购、库存、物流、供应商四大维度。此前报告由各业务线分别提供，口径不统一，关键指标缺失。",
    objective: "设计标准化月度报告模板，统一数据口径，聚焦 8 个核心 KPI，支撑月度经营决策会。",
    methodology: ["指标树设计：从公司战略目标逐层分解到供应链 KPI","数据口径统一：与 IT/业务对齐数据源，消除多版本问题","可视化看板：一页总览（8 KPI）+ 四页分维度详析 + 一页行动追踪","自动化数据采集：对接 ERP/WMS/TMS 系统，减少手工汇总"],
    metrics: [{ label: "报告产出时间", value: "2小时", trend: "down", highlight: true },{ label: "数据口径一致性", value: "100%", trend: "up" },{ label: "CEO满意度", value: "9.2/10", trend: "up" },{ label: "覆盖KPI数", value: "8项", trend: "stable" }],
    insight: "好报告不是信息越多越好——是让决策者 15 分钟内看到'哪里出问题了'和'谁在解决'。其余细节留给附录。",
    aiNote: "AI Agent 每周自动抓取各系统数据，生成初版报告（含图表+文字解读）。财务BP只需做质量审核+策略建议补充。",
    tags: ["经营报告", "KPI体系", "数据可视化", "自动化"],
  },
];

const storeCases: FinanceCase[] = [
  {
    id: "st-budget", title: "多门店年度运营预算模型", subtitle: "36 家门店的动态预算分配与执行管控",
    context: "连锁零售企业 36 家门店，年营收 4.8 亿。各门店面积、商圈、客流差异大，历史预算采用'同比例增长'一刀切方式，导致 A 类门店预算不足、C 类门店预算浪费。",
    objective: "建立基于门店分级+坪效基准的差异化预算模型，实现资源向高潜力门店倾斜。",
    methodology: ["门店分级：按营收/利润/坪效/增长率四维度，将 36 家门店分为 A/B/C 三级","基准预算：A 类门店按坪效 120% 配置，B 类 100%，C 类 80%","增量预算：超额完成部分按比例追加，未达标门店冻结非必要支出","月度复盘：实际 vs 预算按门店逐月追踪，季度调整预算分配"],
    metrics: [{ label: "预算利用率", value: "96.5%", trend: "up", highlight: true },{ label: "A类门店增长", value: "+18%", trend: "up" },{ label: "C类减亏", value: "¥74万", trend: "up" },{ label: "覆盖门店数", value: "36家", trend: "stable" }],
    insight: "预算不是'分钱'，是'投票'——每一分钱投给哪个门店，本质上是对'哪里能产生最大回报'的判断。要让数据替你投票。",
    aiNote: "AI Agent 自动计算各门店坪效/人效/品效，生成分级建议。异常门店自动标记，节省 70% 基础分析时间。",
    tags: ["门店分级", "坪效基准", "动态预算", "差异化配置"],
  },
  {
    id: "st-analysis", title: "门店盈亏平衡与坪效精算", subtitle: "单店盈利模型拆解与优化路径",
    context: "新开店 8 家，其中 3 家连续亏损。管理层质疑选址策略，运营团队认为是爬坡期正常现象。需要客观量化分析，区分'真亏损'和'爬坡亏损'。",
    objective: "建立单店盈亏平衡模型，明确每家店的保本点和盈利拐点，为关店/加投决策提供数据依据。",
    methodology: ["固定成本拆解：租金/人工/折旧/管理费用，按门店逐项核算","变动成本建模：商品成本率+水电+营销费用，按营收比例测算","盈亏平衡线：月均营收需达到多少才能覆盖全部成本","爬坡曲线：对比同类门店历史数据，判断当前亏损是否在正常爬坡期"],
    metrics: [{ label: "保本营收线", value: "¥28万/月", trend: "stable", highlight: true },{ label: "实际坪效", value: "¥1,860/㎡", trend: "up" },{ label: "爬坡达标率", value: "5/8家", trend: "stable" },{ label: "建议关闭", value: "1家", trend: "down" }],
    insight: "区分'爬坡亏损'和'真亏损'的关键指标是坪效增速——如果连续 3 个月坪效增速低于同类门店 50% 分位，就不是爬坡问题。",
    aiNote: "AI Agent 自动抓取 POS + 财务系统数据，生成每店每日盈亏计算，异常门店自动推送预警。",
    tags: ["盈亏平衡", "坪效分析", "爬坡模型", "关店决策"],
  },
  {
    id: "st-report", title: "门店经营分析月报模板", subtitle: "从单店到区域到总部的三层穿透报告",
    context: "区域经理、运营总监、CEO 三个层级需要的经营信息完全不同。之前一份报告发给所有人，导致信息过载或信息不足。",
    objective: "设计三层穿透式报告体系：CEO看一页（Top 10 KPI）→ 运营总监看四页（区域对比+异常）→ 区域经理看单店详情（每日经营数据）。",
    methodology: ["三层指标体系：公司级（10 KPI）→ 区域级（15 KPI）→ 门店级（20 KPI）","异常自动标记：同比/环比/预算偏差超过阈值自动标红","归因分析：异常指标自动下钻到门店/品类/时段","行动追踪：上月决策事项本月执行情况闭环"],
    metrics: [{ label: "报告层级", value: "3层", trend: "stable", highlight: true },{ label: "CEO阅读时间", value: "8分钟", trend: "down" },{ label: "异常发现率", value: "97%", trend: "up" },{ label: "决策闭环率", value: "92%", trend: "up" }],
    insight: "最好的报告是'让该看的人看到该看的东西'。CEO不需要知道某家店昨天的客流量，区域经理不需要知道集团整体的资产负债率。",
    aiNote: "AI Agent 自动生成三层报告的初稿，异常标注+归因分析+图表生成全部自动化。财务BP专注于策略建议而非数据搬运。",
    tags: ["三层报告", "穿透分析", "异常预警", "决策闭环"],
  },
];

function MetricBadge({ metric }: { metric: FinanceCase["metrics"][0] }) {
  const trendIcon = metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "→";
  const trendColor = metric.trend === "up" ? "text-green-400" : metric.trend === "down" ? "text-red-400" : "text-gray-400";
  return (
    <div className={`rounded-xl border p-4 text-center ${metric.highlight ? "border-brand-gold/30 bg-brand-gold/5" : "border-white/5 bg-white/[0.01]"}`}>
      <p className="text-[10px] tracking-[1px] text-gray-500 mb-1">{metric.label}</p>
      <p className={`text-xl font-bold ${metric.highlight ? "text-brand-gold" : "text-white"}`}>{metric.value}<span className={`text-sm ml-1 ${trendColor}`}>{trendIcon}</span></p>
    </div>
  );
}

function CaseCard({ caseData, isOpen, onToggle }: { caseData: FinanceCase; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`rounded-xl border transition-all duration-300 ${isOpen ? "border-brand-gold/30 bg-brand-gold/[0.02]" : "border-white/10 bg-white/[0.01] hover:border-white/20"}`}>
      <button onClick={onToggle} className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-base sm:text-lg font-bold text-white truncate">{caseData.title}</h3>
            {caseData.tags.slice(0, 2).map((t, i) => (<span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 whitespace-nowrap">{t}</span>))}
          </div>
          <p className="text-xs text-gray-500">{caseData.subtitle}</p>
        </div>
        <span className={`text-lg transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}>▾</span>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-5 sm:px-6 pb-6 space-y-5 border-t border-white/5 pt-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><p className="text-[10px] tracking-[2px] text-gray-500 mb-1.5 uppercase">业务背景</p><p className="text-sm text-gray-300 leading-relaxed">{caseData.context}</p></div>
            <div><p className="text-[10px] tracking-[2px] text-gray-500 mb-1.5 uppercase">分析目标</p><p className="text-sm text-gray-300 leading-relaxed">{caseData.objective}</p></div>
          </div>
          <div><p className="text-[10px] tracking-[2px] text-gray-500 mb-2 uppercase">方法论</p>
            <div className="grid sm:grid-cols-2 gap-2">{caseData.methodology.map((m, i) => (<div key={i} className="flex items-start gap-2 text-sm text-gray-400"><span className="text-brand-gold shrink-0 mt-0.5">●</span><span>{m}</span></div>))}</div>
          </div>
          <div><p className="text-[10px] tracking-[2px] text-gray-500 mb-2 uppercase">关键指标</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{caseData.metrics.map((m, i) => (<MetricBadge key={i} metric={m} />))}</div></div>
          <div className="rounded-lg border border-brand-gold/20 bg-brand-gold/5 p-4"><p className="text-[10px] tracking-[2px] text-brand-gold mb-1 uppercase">核心洞察</p><p className="text-sm text-gray-300 leading-relaxed italic">"{caseData.insight}"</p></div>
          <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4"><p className="text-[10px] tracking-[2px] text-purple-400 mb-1 uppercase">🤖 AI Agent 增强说明</p><p className="text-sm text-gray-400 leading-relaxed">{caseData.aiNote}</p></div>
        </div>
      </div>
    </div>
  );
}

export default function FinanceShowcase() {
  const [activeTab, setActiveTab] = useState<"supplychain" | "store">("supplychain");
  const [openId, setOpenId] = useState<string | null>(null);
  const cases = activeTab === "supplychain" ? supplyChainCases : storeCases;

  return (
    <div className="mt-12">
      <div className="mb-6"><h2 className="text-2xl font-bold text-white">财务BP 能力案例</h2><p className="text-sm text-gray-500 mt-1">供应链财务BP · 门店财务BP — 6 大模块完整案例分析（点击展开查看详情）</p></div>
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-white/[0.03] border border-white/5 w-fit">
        <button onClick={() => { setActiveTab("supplychain"); setOpenId(null); }} className={`px-4 py-2 rounded-lg text-sm tracking-[1px] transition-all ${activeTab === "supplychain" ? "bg-brand-gold/10 border border-brand-gold/30 text-brand-gold" : "text-gray-500 hover:text-gray-300"}`}>供应链财务BP</button>
        <button onClick={() => { setActiveTab("store"); setOpenId(null); }} className={`px-4 py-2 rounded-lg text-sm tracking-[1px] transition-all ${activeTab === "store" ? "bg-brand-gold/10 border border-brand-gold/30 text-brand-gold" : "text-gray-500 hover:text-gray-300"}`}>门店财务BP</button>
      </div>
      <div className="space-y-4">{cases.map((c) => (<CaseCard key={c.id} caseData={c} isOpen={openId === c.id} onToggle={() => setOpenId(openId === c.id ? null : c.id)} />))}</div>
      <p className="text-[10px] text-gray-600 mt-6 text-center tracking-[1px]">以上案例均为基于真实业务场景的分析框架 · 数据已脱敏处理 · AI Agent 辅助分析为实际工作方式</p>
    </div>
  );
}