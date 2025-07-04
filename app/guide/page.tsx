"use client";

import Link from "next/link";
import { ArrowLeft, Search, Plus, Shield, Wallet, CheckCircle, Clock, XCircle, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Guide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button
            variant="outline"
            className="mb-6 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </Link>

        <Card className="border-yellow-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
            <CardTitle className="text-3xl font-bold text-yellow-800">NobodySMS 使用指南</CardTitle>
            <div className="text-yellow-700">详细了解如何使用短信验证码前缀查询平台</div>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">平台介绍</h2>
              <p className="text-gray-600">
                NobodySMS 是一个基于区块链技术的短信验证码前缀查询平台。用户可以通过搜索短信前缀（如“洋葱学院”）来获取对应的项目ID，也可以提交新的短信模板申请。所有审核通过的数据都存储在 Sepolia 测试网上，确保数据的透明性和不可篡改性。
              </p>
              <div className="mt-4">
                <Image
                  src="/images/logo.png"
                  alt="NobodySMS Logo"
                  width={100}
                  height={100}
                  className="rounded-full mx-auto"
                />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">用户功能</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>搜索短信前缀获取项目ID</li>
                <li>提交新的模板申请</li>
                <li>查看最近搜索记录</li>
                <li>无需注册登录</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">管理员功能</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>审核用户提交的申请</li>
                <li>将通过的项目写入区块链</li>
                <li>管理项目ID分配</li>
                <li>查看审核统计</li>
                <li>转移管理员权限</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">用户使用流程</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-700 flex items-center">
                    <Search className="w-5 h-5 mr-2 text-yellow-500" />
                    1. 搜索现有前缀
                  </h3>
                  <p className="text-gray-600 mt-2">
                    在首页搜索框输入短信前缀（如“洋葱学院”），查看是否已有对应的项目ID。
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>示例：</strong><br />
                    搜索“洋葱学院” → 获得项目ID “12345”
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-700 flex items-center">
                    <Wallet className="w-5 h-5 mr-2 text-yellow-500" />
                    2. 连接钱包
                  </h3>
                  <p className="text-gray-600 mt-2">
                    前提条件：需要安装 MetaMask 钱包，并连接到 Sepolia 测试网络，账户中需要有测试 ETH 用于支付 Gas 费用。
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>安装 MetaMask 浏览器插件</li>
                    <li>切换到 Sepolia 测试网络</li>
                    <li>获取测试 ETH（通过水龙头或者联系管理员索要）</li>
                    <li>在首页或提交页面连接钱包</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-700 flex items-center">
                    <Plus className="w-5 h-5 mr-2 text-yellow-500" />
                    3. 提交新申请（如果搜索无结果）
                  </h3>
                  <p className="text-gray-600 mt-2">
                    如果搜索不到您需要的前缀，可以点击“提交模板申请”按钮，填写完整信息并通过 MetaMask 提交到区块链。
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>需要填写：</strong><br />
                    • 短信前缀：洋葱学院<br />
                    • 短信模板：【洋葱学院】您的验证码为：2212，请在5分钟内完成验证登录，请勿向他人泄露，如非本人操作请忽略<br />
                    • 联系方式：your@email.com（可选）<br />
                    • 用途说明：用于在线教育平台的用户登录验证（可选）
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-700 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-yellow-500" />
                    4. 等待管理员审核
                  </h3>
                  <p className="text-gray-600 mt-2">
                    提交后，管理员将在 24 小时内审核您的申请。审核通过后，项目 ID 会被写入区块链。
                  </p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-yellow-500" /> 待审核
                    </span>
                    <span className="text-gray-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-500" /> 已通过
                    </span>
                    <span className="text-gray-600 flex items-center">
                      <XCircle className="w-4 h-4 mr-1 text-red-500" /> 已拒绝
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-700 flex items-center">
                    <Search className="w-5 h-5 mr-2 text-yellow-500" />
                    5. 查询审核结果
                  </h3>
                  <p className="text-gray-600 mt-2">
                    审核通过后，您可以再次搜索该前缀，即可获得分配的项目 ID。
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>成功示例：</strong><br />
                    搜索“洋葱学院” → 显示项目 ID “12345” → 数据来源：Sepolia 测试网
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">管理员操作流程</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-700 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-purple-500" />
                    1. 审核申请
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>查看待审核申请列表</li>
                    <li>检查前缀和模板内容</li>
                    <li>为通过的申请分配项目 ID</li>
                    <li>点击“通过”写入区块链</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-700 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-purple-500" />
                    2. 转移管理员权限
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>输入新管理员的 Ethereum 地址</li>
                    <li>点击“转移权限”并通过 MetaMask 确认</li>
                    <li>新管理员获得审核和写入权限</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">常见问题</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 font-medium">Q: 为什么搜索不到我需要的前缀？</p>
                  <p className="text-gray-600">
                    A: 可能该前缀还未被添加到平台，您可以提交模板申请，等待管理员审核后添加。
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Q: 如何验证数据是否成功写入区块链？</p>
                  <p className="text-gray-600">
                    A: 可以在 Sepolia Etherscan (<a href="https://sepolia.etherscan.io" className="text-blue-500 hover:underline">sepolia.etherscan.io</a>) 上查看交易记录和合约状态。
                  </p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
