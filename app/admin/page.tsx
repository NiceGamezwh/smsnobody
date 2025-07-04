"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Check, X, ExternalLink, Wallet, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
import { useWeb3 } from "@/hooks/use-web3";
import { addProjectToContract, approveApplication, rejectApplication, getAllApplications, transferAdmin } from "@/lib/contract";
import Notification from "@/components/ui/notification";
import { ethers } from "ethers";

interface Submission {
  id: number;
  prefix: string;
  template: string;
  contact: string;
  description: string;
  submitter: string;
  status: string;
  projectId: string;
  timestamp: number;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [projectId, setProjectId] = useState("");
  const [newAdminAddress, setNewAdminAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notification, setNotification] = useState("");
  const { isConnected, account, connectWallet } = useWeb3();

  useEffect(() => {
    if (isAuthenticated && isConnected) {
      fetchApplications();
    }
  }, [isAuthenticated, isConnected]);

  const fetchApplications = async () => {
    try {
      const apps = await getAllApplications();
      setSubmissions(apps);
    } catch (error) {
      console.error("获取申请失败:", error);
      setNotification("获取申请失败，请重试");
    }
  };

  const handleLogin = () => {
    if (password === "Zwh200102281057$") {
      setIsAuthenticated(true);
      setNotification("管理员登录成功");
    } else {
      setNotification("密码错误");
    }
  };

  const handleApprove = async (submission: Submission) => {
    if (!projectId.trim()) {
      setNotification("请输入项目 ID");
      return;
    }

    if (!isConnected) {
      setNotification("请先连接 MetaMask");
      return;
    }

    setIsProcessing(true);
    try {
      // 写入原合约
      await addProjectToContract(submission.prefix, projectId);
      // 更新申请状态
      await approveApplication(submission.id, projectId);
      setNotification(`前缀 ${submission.prefix} 已写入区块链`);
      setProjectId("");
      setSelectedSubmission(null);
      await fetchApplications();
    } catch (error) {
      console.error("审批失败:", error);
      setNotification("写入区块链失败，请检查网络或 Gas 费用");
    }
    setIsProcessing(false);
  };

  const handleReject = async (submission: Submission) => {
    setIsProcessing(true);
    try {
      await rejectApplication(submission.id);
      setNotification(`前缀 ${submission.prefix} 已拒绝`);
      await fetchApplications();
    } catch (error) {
      console.error("拒绝失败:", error);
      setNotification("拒绝失败，请重试");
    }
    setIsProcessing(false);
  };

  const handleTransferAdmin = async () => {
    if (!ethers.isAddress(newAdminAddress)) {
      setNotification("请输入有效的 Ethereum 地址");
      return;
    }
    setIsProcessing(true);
    try {
      await transferAdmin(newAdminAddress);
      setNotification(`管理员权限已转移到 ${newAdminAddress}`);
      setNewAdminAddress("");
    } catch (error) {
      console.error("转移管理员失败:", error);
      setNotification("转移管理员失败，请检查网络或 Gas 费用");
    }
    setIsProcessing(false);
  };

  const pendingSubmissions = submissions.filter((sub) => sub.status === "pending");
  const processedSubmissions = submissions.filter((sub) => sub.status !== "pending");

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
            <h1 className="text-5xl font-bold mb-2 text-shadow-lg">管理员审核中心</h1>
            <p className="text-xl font-medium">审核用户提交的短信模板申请</p>
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
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="NobodySMS"
                width={60}
                height={60}
                className="rounded-full mr-4"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">管理员审核中心</h1>
                <p className="text-gray-600">审核用户提交的短信模板申请并写入区块链</p>
              </div>
            </div>
            <div className="text-right">
              {isConnected ? (
                <div className="space-y-2">
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">
                    <Wallet className="w-3 h-3 mr-1" />
                    已连接钱包
                  </Badge>
                  <p className="text-xs text-gray-500">
                    {account?.slice(0, 6)}...{account?.slice(-4)}
                  </p>
                </div>
              ) : (
                <Button onClick={connectWallet} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Wallet className="w-4 h-4 mr-2" />
                  连接钱包
                </Button>
              )}
            </div>
          </div>
        </div>

        {!isAuthenticated ? (
          <Card className="max-w-md mx-auto border-yellow-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
              <CardTitle className="text-yellow-800">管理员登录</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入管理员密码"
                className="border-yellow-300 focus:border-yellow-500 mb-4"
              />
              <Button
                onClick={handleLogin}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                登录
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-orange-200 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-3xl font-bold text-orange-600">{pendingSubmissions.length}</div>
                    <p className="text-sm text-gray-600">待审核</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-200 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      {processedSubmissions.filter((s) => s.status === "approved").length}
                    </div>
                    <p className="text-sm text-gray-600">已通过</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-red-200 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <X className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-3xl font-bold text-red-600">
                      {processedSubmissions.filter((s) => s.status === "rejected").length}
                    </div>
                    <p className="text-sm text-gray-600">已拒绝</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {!isConnected && (
              <Alert className="mb-6 border-yellow-300 bg-yellow-50">
                <Shield className="w-4 h-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>注意:</strong> 需要连接 MetaMask 钱包才能将审核通过的项目写入Sepolia测试网。
                  请确保钱包已切换到Sepolia测试网络。
                </AlertDescription>
              </Alert>
            )}

            <div className="mb-8">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                  <CardTitle className="text-purple-800">转移管理员权限</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="输入新管理员地址"
                      value={newAdminAddress}
                      onChange={(e) => setNewAdminAddress(e.target.value)}
                      className="border-purple-300 focus:border-purple-500"
                    />
                    <Button
                      onClick={handleTransferAdmin}
                      disabled={!newAdminAddress || isProcessing || !isConnected}
                      className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      {isProcessing ? "处理中..." : "转移权限"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-yellow-800">待审核申请 ({pendingSubmissions.length})</h2>
              {pendingSubmissions.length === 0 ? (
                <Card className="border-gray-200 shadow-lg">
                  <CardContent className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">暂无待审核的申请</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pendingSubmissions.map((submission) => (
                    <Card key={submission.id} className="border-orange-200 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg text-orange-800">【{submission.prefix}】</CardTitle>
                            <CardDescription className="text-orange-700">
                              提交时间: {new Date(submission.timestamp * 1000).toLocaleString()}
                            </CardDescription>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800">待审核</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-700">短信模板:</p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border">{submission.template}</p>
                          </div>
                          {submission.description && (
                            <div>
                              <p className="text-sm font-medium text-gray-700">说明:</p>
                              <p className="text-sm text-gray-600">{submission.description}</p>
                            </div>
                          )}
                          {submission.contact && (
                            <div>
                              <p className="text-sm font-medium text-gray-700">联系方式:</p>
                              <p className="text-sm text-gray-600">{submission.contact}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-700">提交者:</p>
                            <p className="text-sm text-gray-600">{submission.submitter}</p>
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  onClick={() => setSelectedSubmission(submission)}
                                  disabled={!isConnected}
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  通过
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="text-green-800">审核通过</DialogTitle>
                                  <DialogDescription>请为该前缀分配一个唯一的项目 ID，将写入区块链</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <p className="text-sm font-medium mb-2">前缀: 【{selectedSubmission?.prefix}】</p>
                                    <Input
                                      placeholder="请输入项目 ID (如: 12345)"
                                      value={projectId}
                                      onChange={(e) => setProjectId(e.target.value)}
                                      className="border-green-300 focus:border-green-500"
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      onClick={() => selectedSubmission && handleApprove(selectedSubmission)}
                                      disabled={!projectId.trim() || isProcessing}
                                      className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                                    >
                                      {isProcessing ? "写入区块链中..." : "确认通过"}
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setSelectedSubmission(null);
                                        setProjectId("");
                                      }}
                                      className="border-gray-300"
                                    >
                                      取消
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleReject(submission)}
                              className="bg-red-500 hover:bg-red-600"
                              disabled={isProcessing || !isConnected}
                            >
                              <X className="w-4 h-4 mr-1" />
                              拒绝
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {processedSubmissions.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-yellow-800">已处理申请 ({processedSubmissions.length})</h2>
                <div className="space-y-4">
                  {processedSubmissions.map((submission) => (
                    <Card
                      key={submission.id}
                      className={`shadow-lg ${
                        submission.status === "approved" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">【{submission.prefix}】</CardTitle>
                            <CardDescription>处理时间: {new Date(submission.timestamp * 1000).toLocaleString()}</CardDescription>
                          </div>
                          <Badge
                            className={
                              submission.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }
                          >
                            {submission.status === "approved" ? "已通过" : "已拒绝"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-2">{submission.template}</p>
                        {submission.status === "approved" && (
                          <div className="flex items-center gap-2 text-xs text-green-600">
                            <ExternalLink className="w-3 h-3" />
                            项目ID: {submission.projectId} | 已写入 Sepolia 测试网
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}