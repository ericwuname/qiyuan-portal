// Translation map: English keys -> Chinese display text
// WARNING: NEVER edit this file with Get-Content + -replace in PowerShell.
// Always use [System.IO.File]::WriteAllText for writes.

export const t = {
  brandName: "启元智能",
  brandSubtitle: "元点之门",

  navHome: "首页",
  navProjects: "项目总览",
  navShowcase: "案例展示",
  navStats: "数据看板",
  navPartners: "合作伙伴",
  navCareers: "招聘",
  navUpdates: "动态",
  navSkills: "AI Skill",
  navStrategy: "战略规划",
  navVision: "愿景",
  navOrigin: "元点",
  navFounder: "创始人",
  navLogin: "登录",
  navProducts: "产品服务",
  navPhilosophy: "组织哲学",
  navContact: "联系我们",
  navDashboard: "运营看板",
  navPillarAbout: "关于启元",
  navPillarCapability: "能力矩阵",
  navPillarStrategy: "战略布局",
  navPillarUpdates: "动态",

  pageAbout: "关于我们",
  pageProjects: "项目总览",
  pageSkills: "AI Skill 产品矩阵",
  pageVision: "愿景路线",
  pageUpdates: "动态",
  pagePrivacy: "隐私政策",
  pageTerms: "服务条款",
  pageShowcase: "案例展示",
  pageStats: "数据看板",
  pagePartners: "合作伙伴与生态",
  pageCareers: "加入我们",
  pageFounder: "创始人",
  pageStrategy: "战略规划",
  pageLogin: "登录",

  backHome: "← 返回首页",
  backProjects: "← 项目总览",
  backSkills: "← Skill 列表",

  homeHeroTitle: "让 AI 成为可管理、可进化、可传承的组织能力",
  showcaseAllProjects: "全部项目",
  showcaseFeatured: "精选案例",

  strategyMatrix: "四象限决策矩阵",

  footerCopyright: "© 2026 启元智能",
  footerUpdated: "最近更新 2026.06.15",
  footerPrivacy: "隐私政策",
  footerTerms: "服务条款",

  mobileMenu: "菜单",

  description: "AI 元年起源之地 · AI Agent 原生组织",
  notFoundMessage: "你访问的页面不存在。",
  errorTitle: "出错了",
  errorMessage: "请刷新页面重试。",

  navFounderTab: "创始人",
  navFounderResume: "个人简历",
  navFounderFinanceSupply: "供应链财务BP",
  navFounderFinanceStore: "门店财务BP",

  pageFounderResume: "个人简历",
  pageFounderFinanceSupply: "供应链财务BP",
  pageFounderFinanceStore: "门店财务BP",

  founderSummary: "启元智能创始人 · 吴涛",
  founderDownloadResume: "下载简历 PDF",
  founderViewResume: "查看完整简历",
  founderViewSupply: "供应链财务BP案例",
  founderViewStore: "门店财务BP案例",
  founderPassRequired: "此页面需要联系创始人获取访问密码",
  founderEnterPassword: "请输入访问密码",
  founderConfirm: "确定",
  founderCancel: "取消",
  founderWrongPass: "密码错误，请重新输入",
  founderContactFirst: "请联系创始人",
} as const;

export type TranslationKey = keyof typeof t;