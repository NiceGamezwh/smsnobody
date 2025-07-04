"use client";

import { useState } from "react";
import { ArrowLeft, Send, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";
import Notification from "@/components/ui/notification";
import { useWeb3 } from "@/hooks/use-web3";
import { submitApplicationToContract } from "@/lib/contract";

interface SubmissionData {
  prefix: string;
  template: string;
  contact: string;
  description: string;
}

export default function SubmitPage() {
  const [formData, setFormData] = useState<SubmissionData>({
    prefix: "",
    template: "",
    contact: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState("");
  const { isConnected, connectWallet } = useWeb3();

  const handleInputChange = (field: keyof SubmissionData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      setNotification("请先连接 MetaMask");
      return;
    }
    if (!formData.prefix.trim() || !formData.template.trim()) {
      setNotification("请填写前缀和模板");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitApplicationToContract(
        formData.prefix,
        formData.template,
        formData.contact,
        formData.description
      );
      setSubmitted(true);
      setNotification("模板已提交，等待管理员审核");
    } catch (error) {
      console.error("提交失败:", error);
      setNotification("提交失败，请检查网络或 Gas 费用");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.prefix.trim() && formData.template.trim();

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
        <Notification message={notification} />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-200 shadow-xl">
              <CardContent className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">提交成功！</h2>
                <p className="text-gray-600 mb-6">您的模板申请已提交，管理员将在24小时内进行审核。</p>
                <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
                  <div className="space-y-2 text-left">
                    <p className="text-sm">
                      <strong className="text-green-800">前缀:</strong> 【{formData.prefix}】
                    </p>
                    <p className="text-sm">
                      <strong className="text-green-800">模板:</strong> {formData.template}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <Link href="/">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">返回首页</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-transparent"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        prefix: "",
                        template: "",
                        contact: "",
                        description: "",
                      });
                      setNotification("");
                    }}
                  >
                    继续提交
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-5xl font-bold mb-2 text-shadow-lg">提交模板申请</h1>
            <p className="text-xl font-medium">请填写您需要的短信前缀和模板信息</p>
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
            <Image
              src="/images/logo.png"
              alt="NobodySMS"
              width={50}
              height={50}
              className="rounded-full mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">提交模板申请</h1>
              <p className="text-gray-600">请填写您需要的短信前缀和模板信息，我们将尽快审核</p>
            </div>
          </div>
          {!isConnected && (
            <Button onClick={connectWallet} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              连接 MetaMask
            </Button>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-yellow-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
              <CardTitle className="text-yellow-800 flex items-center gap-2">
                <Star className="w-5 h-5" />
                模板申请表单
              </CardTitle>
              <CardDescription className="text-yellow-700">请准确填写短信前缀和完整的模板内容</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    短信前缀 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="例如: 洋葱学院"
                    value={formData.prefix}
                    onChange={(e) => handleInputChange("prefix", e.target.value)}
                    className="border-yellow-300 focus:border-yellow-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">请输入短信中【】内的前缀名称</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    短信模板 <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="例如: 【洋葱学院】您的验证码为：2212，请在5分钟内完成验证登录，请勿向他人泄露，如非本人操作请忽略"
                    value={formData.template}
                    onChange={(e) => handleInputChange("template", e.target.value)}
                    rows={4}
                    className="border-yellow-300 focus:border-yellow-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">请提供完整的短信模板</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">联系方式（可选）</label>
                  <Input
                    placeholder="邮箱或电话"
                    value={formData.contact}
                    onChange={(e) => handleInputChange("contact", e.target.value)}
                    className="border-yellow-300 focus:border-yellow-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">便于我们在需要时联系您</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">补充说明（可选）</label>
                  <Textarea
                    placeholder="请描述该前缀的用途或其他需要说明的信息"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                    className="border-yellow-300 focus:border-yellow-500"
                  />
                </div>

                <Alert className="border-yellow-300 bg-yellow-50">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>审核说明:</strong>
                    <br />• 我们将在24小时内审核您的申请
                    <br />• 审核通过后，项目ID将写入Sepolia测试网
                    <br />• 您可以通过搜索功能查询审核结果
                  </AlertDescription>
                </Alert>

                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                  disabled={!isFormValid || isSubmitting || !isConnected}
                >
                  {isSubmitting ? (
                    "提交中..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      提交申请
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6 border-green-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
              <CardTitle className="text-lg text-green-800">填写示例</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-sm text-green-800">短信前缀:</p>
                  <p className="text-sm text-gray-600">洋葱学院</p>
                </div>
                <div>
 slippers                  <p className="font-medium text-sm text-green-800">短信模板:</p>
                  <p className="text-sm text-gray-600">
                    【洋葱学院】您的验证码为：2212，请在5分钟内完成验证登录，请勿向他人泄露，如非本人操作请忽略
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm text-green-800">说明:</p>
                  <p className="text-sm text-gray-600">用于在线教育平台的用户登录验证</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}