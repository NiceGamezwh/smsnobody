"use client";

import {
  ArrowLeft,
  Search,
  Plus,
  Shield,
  Wallet,
  CheckCircle,
  Clock,
  XCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      <div className="relative overflow-hidden">
        <Image
          src="/images/banner.jpg"
          alt="NobodySMS Banner"
          width={1500}
          height={500}
          className="w-full h-64 object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/images/logo.png"
                alt="NobodySMS"
                width={80}
                height={80}
                className="rounded-full border-4 border-yellow-400 shadow-lg"
              />
            </div>
            <h1 className="text-5xl font-bold mb-2 text-shadow-lg">NobodySMS 使用指南</h1>
            <p className="text-xl font-medium">详细了解如何使用短信验证码前缀查询平台</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-yellow-700 hover:bg-yellow-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
          <div className="flex items-center mb-4">
            <Image src="/images/logo.png" alt="NobodySMS" width={60} height={60} className="rounded-full mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">NobodySMS 使用指南</h1>
              <p className="text-gray-600">详细了解如何使用短信验证码前缀查询平台</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-yellow-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-700" />
                </div>
                平台介绍
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-gray-700">
                <strong>NobodySMS</strong>{" "}
                是一个基于区块链技术的短信验证码前缀查询平台。用户可以通过搜索短信前缀（如"洋葱学院"）来获取对应的项目ID，
                也可以提交新的短信模板申请。所有审核通过的数据都存储在Sepolia测试网上，确保数据的透明性和不可篡改性。
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">用户功能</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• 搜索短信前缀获取项目ID</li>
                    <li>• 提交新的模板申请</li>
                    <li>• 查看最近搜索记录</li>
                    <li>• 无需注册登录</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">管理员功能</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• 审核用户提交的申请</li>
                    <li>• 将通过的项目写入区块链</li>
                    <li>• 管理项目ID分配</li>
                    <li>• 查看审核统计</li>
                    <li>• 转移管理员权限</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-green-700" />
                </div>
                用户使用流程
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-yellow-800">搜索现有前缀</h4>
                    <p className="text-gray-600 mb-3">
                      在首页搜索框输入短信前缀（如"洋葱学院"），查看是否已有对应的项目ID。
                    </p>
                    <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                      <p className="text-sm">
                        <strong>示例：</strong>
                      </p>
                      <p className="text-sm text-gray-600">搜索"洋葱学院" → 获得项目ID "12345"</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-blue-800">连接钱包</h4>
                    <p className="text-gray-600 mb-3">
                      提交模板申请需要使用 MetaMask 钱包连接到 Sepolia 测试网络，并确保账户中有足够的 Sepolia ETH。
                    </p>
                    <ul className="text-sm text-blue-800 space-y-1 mb-3">
                      <li>• 安装 MetaMask 浏览器插件</li>
                      <li>• 切换到 Sepolia 测试网络</li>
                      <li>• 获取 Sepolia ETH（通过水龙头或联系管理员索要，邮箱：nobodysms@polkagame.cn）</li>
                      <li>• 在提交页面连接钱包</li>
                    </ul>
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                      <p className="text-sm">
                        <strong>提示：</strong> 您可以通过{" "}
                        <a
                          href="https://sepoliafaucet.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Sepolia Faucet
                        </a>{" "}
                        获取免费的 Sepolia ETH，或联系管理员（nobodysms@polkagame.cn）。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-green-800">提交新申请</h4>
                    <p className="text-gray-600 mb-3">
                      如果搜索不到您需要的前缀，可以点击"提交模板申请"按钮，填写完整信息并通过 MetaMask 提交到区块链。
                    </p>
                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                      <p className="text-sm">
                        <strong>需要填写：</strong>
                      </p>
                      <ul className="text-sm text-gray-600 mt-1 space-y-1">
                        <li>• 短信前缀：洋葱学院</li>
                        <li>
                          •
                          短信模板：【洋葱学院】您的验证码为：2212，请在5分钟内完成验证登录，请勿向他人泄露，如非本人操作请忽略
                        </li>
                        <li>• 联系方式：your@email.com（可选）</li>
                        <li>• 用途说明：用于在线教育平台的用户登录验证（可选）</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-orange-800">等待管理员审核</h4>
                    <p className="text-gray-600 mb-3">
                      提交后，管理员将在24小时内审核您的申请。审核通过后，项目ID会被写入区块链。
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-orange-100 text-orange-800">
                        <Clock className="w-3 h-3 mr-1" />
                        待审核
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        已通过
                      </Badge>
                      <Badge className="bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3 mr-1" />
                        已拒绝
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-purple-800">查询审核结果</h4>
                    <p className="text-gray-600 mb-3">审核通过后，您可以再次搜索该前缀，即可获得分配的项目ID。</p>
                    <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                      <p className="text-sm">
                        <strong>成功示例：</strong>
                      </p>
                      <p className="text-sm text-gray-600">
                        搜索"洋葱学院" → 显示项目ID "12345" → 数据来源：Sepolia测试网
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-purple-700" />
                </div>
                管理员操作流程
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Alert className="mb-4 border-yellow-300 bg-yellow-50">
                <Wallet className="w-4 h-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>前提条件：</strong>
                  需要使用管理员账户（Ethereum 地址）登录，并确保账户中有足够的 Sepolia ETH 用于支付 Gas 费用。
                  可通过水龙头或联系管理员（nobodysms@polkagame.cn）获取 Sepolia ETH。
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">1. 审核申请</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• 查看待审核申请列表</li>
                      <li>• 检查前缀和模板内容</li>
                      <li>• 为通过的申请分配项目ID</li>
                      <li>• 点击"通过"写入区块链</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">2. 转移管理员权限</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• 输入新管理员的 Ethereum 地址</li>
                      <li>• 点击"转移权限"并通过 MetaMask 确认</li>
                      <li>• 新管理员获得审核和写入权限</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100">
              <CardTitle className="text-red-800">常见问题</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-red-800">Q: 为什么搜索不到我需要的前缀？</h4>
                  <p className="text-gray-600 text-sm">
                    A: 可能该前缀还未被添加到平台，您可以提交模板申请，等待管理员审核后添加。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-800">Q: 如何验证数据是否成功写入区块链？</h4>
                  <p className="text-sm text-gray-600">
                    A: 可以在{" "}
                    <a
                      href="https://sepolia.etherscan.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:underline"
                    >
                      Sepolia Etherscan
                    </a>{" "}
                    上查看交易记录和合约状态（合约地址：0xa4f46cbBF01b034512d2DbC3d7228C9b68945A9B）。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-800">Q: 如何获取 Sepolia ETH？</h4>
                  <p className="text-sm text-gray-600">
                    A: 您可以通过{" "}
                    <a
                      href="https://sepoliafaucet.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:underline"
                    >
                      Sepolia Faucet
                    </a>{" "}
                    获取免费的 Sepolia ETH，或联系管理员（nobodysms@polkagame.cn）索要。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100 border-yellow-300 shadow-xl">
            <CardHeader>
              <CardTitle className="text-yellow-800">快速开始</CardTitle>
              <CardDescription className="text-yellow-700">立即体验 NobodySMS 平台功能</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link href="/">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    <Search className="w-4 h-4 mr-2" />
                    搜索前缀
                  </Button>
                </Link>
                <Link href="/submit">
                  <Button
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    提交申请
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    管理员入口
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
