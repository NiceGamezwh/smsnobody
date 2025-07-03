"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Shield, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useWeb3 } from "@/hooks/use-web3";
import { searchPrefix } from "@/lib/contract";
import Notification from "@/components/ui/notification";

interface SearchResult {
  prefix: string;
  projectId: string;
  template?: string;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [notification, setNotification] = useState("");
  const { isConnected, account, connectWallet } = useWeb3();

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setNotification("请输入前缀");
      return;
    }

    setIsSearching(true);
    try {
      const result = await searchPrefix(searchQuery.trim());
      if (result.projectId) {
        setSearchResults([
          {
            prefix: searchQuery.trim(),
            projectId: result.projectId,
            template: result.template,
          },
        ]);
        const newSearches = [searchQuery.trim(), ...recentSearches.filter((s) => s !== searchQuery.trim())].slice(0, 5);
        setRecentSearches(newSearches);
        localStorage.setItem("recentSearches", JSON.stringify(newSearches));
      } else {
        setSearchResults([]);
        setNotification("未找到匹配的前缀");
      }
    } catch (error) {
      console.error("搜索失败:", error);
      setSearchResults([]);
      setNotification("搜索失败，请重试");
    }
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      <Notification message={notification} />
      <div className="relative overflow-hidden">
        <Image
          src="/images/banner.jpg"
          alt="NobodySMS Banner"
          width={1500}
          height={500}
          className="w-full h-64 object-cover opacity-80"
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
            <h1 className="text-5xl font-bold mb-2 text-shadow-lg">NobodySMS</h1>
            <p className="text-xl font-medium">Every Nobody Is Somebody</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">短信验证码前缀查询平台</h2>
          <p className="text-lg text-gray-600 mb-6">基于 Sepolia 测试网的去中心化前缀管理</p>
          <div className="flex justify-center mb-6">
            {isConnected ? (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 px-4 py-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                已连接: {account?.slice(0, 6)}...{account?.slice(-4)}
              </Badge>
            ) : (
              <Button onClick={connectWallet} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                连接钱包
              </Button>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <Card className="border-yellow-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Search className="w-5 h-5" />
                搜索短信前缀
              </CardTitle>
              <CardDescription className="text-yellow-700">
                输入短信前缀（如“洋葱学院”）查询对应的项目 ID
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Input
                  placeholder="请输入短信前缀..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-yellow-300 focus:border-yellow-500"
                />
                <Button
                  onClick={handleSearch}
                  disabled={isSearching || !searchQuery.trim()}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  {isSearching ? "搜索中..." : "搜索"}
                </Button>
              </div>
              {recentSearches.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">最近搜索:</p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-yellow-200 bg-yellow-100 text-yellow-800"
                        onClick={() => setSearchQuery(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {searchResults.length > 0 && (
          <div className="max-w-2xl mx-auto mb-12">
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                <CardTitle className="text-green-700 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  搜索结果
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {searchResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-green-50 border-green-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-green-800">【{result.prefix}】</h3>
                      <Badge className="bg-green-200 text-green-800">ID: {result.projectId}</Badge>
                    </div>
                    {result.template && <p className="text-gray-600 text-sm mb-2">模板: {result.template}</p>}
                    <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
                      <ExternalLink className="w-3 h-3" />
                      数据来源: Sepolia 测试网
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {searchQuery && searchResults.length === 0 && !isSearching && (
          <div className="max-w-2xl mx-auto mb-12">
            <Card className="border-orange-200 shadow-lg">
              <CardContent className="text-center py-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-gray-600 mb-4">未找到前缀 “{searchQuery}” 的相关记录</p>
                <p className="text-sm text-gray-500 mb-4">您可以提交模板申请，等待管理员审核后添加到平台</p>
                <Link href="/submit">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    提交模板申请
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-xl transition-all duration-300 border-yellow-200 hover:border-yellow-400">
            <CardHeader className="bg-gradient-to-br from-yellow-100 to-orange-100">
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Plus className="w-5 h-5" />
                提交模板申请
              </CardTitle>
              <CardDescription className="text-yellow-700">提交您需要的短信前缀和模板，等待管理员审核</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/submit">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">立即提交</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-purple-200 hover:border-purple-400">
            <CardHeader className="bg-gradient-to-br from-purple-100 to-pink-100">
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Shield className="w-5 h-5" />
                管理员审核
              </CardTitle>
              <CardDescription className="text-purple-700">管理员登录审核用户提交的模板申请</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                >
                  管理员入口
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-green-200 hover:border-green-400">
            <CardHeader className="bg-gradient-to-br from-green-100 to-emerald-100">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <ExternalLink className="w-5 h-5" />
                使用指南
              </CardTitle>
              <CardDescription className="text-green-700">详细了解如何使用平台的各项功能</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Link href="/guide">
                <Button
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                >
                  查看指南
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <Card className="border-yellow-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
              <CardTitle className="text-yellow-800">使用说明</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6 text-yellow-700" />
                  </div>
                  <h3 className="font-semibold mb-2 text-yellow-800">1. 搜索前缀</h3>
                  <p className="text-sm text-gray-600">输入短信前缀查询对应的项目 ID</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Plus className="w-6 h-6 text-orange-700" />
                  </div>
                  <h3 className="font-semibold mb-2 text-orange-800">2. 提交申请</h3>
                  <p className="text-sm text-gray-600">提交需要的前缀和模板申请</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-purple-700" />
                  </div>
                  <h3 className="font-semibold mb-2 text-purple-800">3. 管理员审核</h3>
                  <p className="text-sm text-gray-600">管理员审核并写入区块链</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 py-8 border-t border-yellow-200">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="NobodySMS"
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <span className="text-xl font-bold text-yellow-800">NobodySMS</span>
          </div>
          <p className="text-gray-600 text-sm">Every Nobody Is Somebody - 基于区块链的短信验证码前缀查询平台</p>
          <p className="text-gray-500 text-xs mt-2">Powered by Sepolia Testnet</p>
        </div>
      </div>
    </div>
  );
}