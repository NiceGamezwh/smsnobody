import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NobodySMS - 短信验证码前缀查询平台",
  description: "Every Nobody Is Somebody - 基于区块链的短信前缀项目ID查询系统",
  keywords: "短信验证码,前缀查询,区块链,NobodySMS,项目ID",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
