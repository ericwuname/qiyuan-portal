import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://qiyuan.beauty"),
  title: "启元智能 QIYUAN INTELLIGENCE · 元点之门",
  description: "让 AI 成为可管理、可进化、可传承的组织能力。AI 元年起源之地。",
  keywords: ["启元智能", "QIYUAN INTELLIGENCE", "AI原生组织", "AI Skill", "元点之门", "qiyuan.beauty"],
  icons: {
    icon: "/logo-icon.svg",
    apple: "/logo-icon.svg",
  },
  openGraph: {
    title: "启元智能 QIYUAN INTELLIGENCE",
    description: "让 AI 成为可管理、可进化、可传承的组织能力",
    images: ["/og-image.png"],
    url: "https://qiyuan.beauty",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo-icon.svg" />
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
