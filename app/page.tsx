"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Wallet, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import Notification from "@/components/ui/notification";
import { useWeb3 } from "@/hooks/use-web3";
import { searchPrefix } from "@/lib/contract";

interface SearchResult {
  prefix: string;
  projectId: string;
  template: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [notification, setNotification] = useState("");
  const { isConnected, connectWallet } = useWeb3();

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(storedSearches);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setNotification("请输入前缀");
      return;
    }

    try {
      const result = await searchPrefix(searchQuery);
      setSearchResult({
        prefix: searchQuery,
        projectId: result.projectId,
        template: result.template,
      });

      if (result.projectId) {
        const updatedSearches = [
          searchQuery,
          ...recentSearches.filter((s) => s !== searchQuery).slice(0, 4),
        ];
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      } else {
        setNotification(`未找到前缀 "${searchQuery}" 的匹配结果`);
      }
    } catch (error) {
      console.error("搜索失败:", error);
      setNotification("搜索失败，请检查网络或合约数据");
    }
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
            <h1 className="text-5xl font-bold mb-2 text-shadow-lg">NobodySMS</h1>
            <p className="text-xl font-medium">基于区块链的短信验证码前缀查询平台</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Image src="/images/logo.png" alt="NobodySMS" width={60} height={60} className="rounded-full mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">欢迎使用 NobodySMS</h1>
              <p className="text-gray-600">搜索短信前缀或提交新的模板申请</p>
            </div>
          </div>
          {!isConnected && (
            <Button onClick={connectWallet} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              <Wallet className="w-4 h-4 mr-2" />
              连接钱包
            </Button>
          )}
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <Card className="border-yellow-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
              <CardTitle className="text-yellow-800">搜索前缀</CardTitle>
              <CardDescription className="text-yellow-700">输入短信前缀以查询对应的项目ID</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Input
                  placeholder="请输入前缀（例如：抖音）"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-yellow-300 focus:border-yellow-500"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  搜索
                </Button>
              </div>
            </CardContent>
          </Card>

          {searchResult && (
            <Card className="mt-6 border-green-200 shadow-lg">
              <CardContent className="pt-6">
                {searchResult.projectId ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">前缀:</p>
                      <p className="text-lg font-semibold text-green-800">【{searchResult.prefix}】</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">项目ID:</p>
                      <p className="text-lg font-semibold text-green-800">{searchResult.projectId}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">未找到前缀【{searchResult.prefix}】的匹配结果</p>
                    <Link href="/submit">
                      <Button
                        variant="outline"
                        className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        提交新模板申请
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {recentSearches.length > 0 && (
            <Card className="mt-6 border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">最近搜索</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        setSearchQuery(search);
                        handleSearch();
                      }}
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100 border-yellow-300 shadow-xl">
          <CardHeader>
            <CardTitle className="text-yellow-800">快速开始</CardTitle>
            <CardDescription className="text-yellow-700">立即体验NobodySMS平台功能</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
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
              <Link href="/guide">
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  <Star className="w-4 h-4 mr-2" />
                  使用指南
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}