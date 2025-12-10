"use client";
import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { FadeIn } from "@/components/animations/FadeIn";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import gsap from "gsap";
import {
  CheckCircle,
  AlertCircle,
  FileText,
  Clock,
  ArrowUpRight,
  Plus,
  Search,
  TrendingUp,
  CheckSquare,
  AlertTriangle,
  FileCheck,
  Users,
  Target,
  MessageSquare,
  Calendar,
  BarChart3,
  Activity,
  Shield,
  Download,
  Zap,
  Box,
  Layers,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useProject } from "@/context/ProjectContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { currentProject, projects, switchProject } = useProject();
  const chartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  // --- GENERAL DASHBOARD VIEW (No Project Selected) ---
  if (!currentProject) {
    return (
      <div className="space-y-8 pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#064E3B]">Welcome back, Dr. Smith</h1>
            <p className="text-slate-500 font-light">
              Here is an overview of all your active projects.
            </p>
          </div>
          <Link href="/dashboard/new-project">
            <Button className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white shadow-md">
              <Plus size={18} className="mr-2" /> Create New Project
            </Button>
          </Link>
        </div>

        {/* Aggregate Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn delay={0.1}>
            <Card className="p-6 border-none shadow-sm bg-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#064E3B]/10 flex items-center justify-center text-[#064E3B]">
                  <Layers size={24} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#064E3B]">{projects.length}</div>
                  <div className="text-sm text-slate-500">Active Projects</div>
                </div>
              </div>
            </Card>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Card className="p-6 border-none shadow-sm bg-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Box size={24} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#064E3B]">
                    {projects.reduce((acc, p) => acc + (p.products?.length || 0), 0)}
                  </div>
                  <div className="text-sm text-slate-500">Total Products</div>
                </div>
              </div>
            </Card>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Card className="p-6 border-none shadow-sm bg-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#064E3B]">5</div>
                  <div className="text-sm text-slate-500">Critical Alerts</div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* Projects Grid */}
        <div>
          <h2 className="text-xl font-bold text-[#064E3B] mb-4">Your Projects</h2>
          {projects.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <Box className="mx-auto text-slate-300 mb-4" size={48} />
              <h3 className="text-lg font-medium text-slate-700">No projects yet</h3>
              <p className="text-slate-500 mb-6">Create your first project to get started.</p>
              <Link href="/dashboard/new-project">
                <Button variant="outline">Create Project</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <FadeIn key={project.id} delay={i * 0.1}>
                  <Card
                    className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-all cursor-pointer group h-full flex flex-col"
                    onClick={() => switchProject(project.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#064E3B]/5 flex items-center justify-center text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                        <Box size={20} />
                      </div>
                      <Badge variant="outline" className="text-xs border-slate-200">
                        {project.classification === "class1" ? "Class I" : project.classification === "class2" ? "Class II" : "Class III"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-[#064E3B] mb-2 group-hover:text-freshGreen transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 flex-1 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                      <div className="text-xs text-slate-400">
                        {project.products?.length || 0} Products
                      </div>
                      <div className="flex items-center text-xs font-medium text-[#064E3B]">
                        View Dashboard <ChevronRight size={14} className="ml-1" />
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- PROJECT DASHBOARD VIEW (Project Selected) ---
  const recentActivities = [
    {
      action: "Document Approved",
      item: "Design History File v2.3",
      user: "Sarah Chen",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-freshGreen bg-freshGreen/5",
    },
    {
      action: "New Risk Identified",
      item: "Battery Overheating - High Severity",
      user: "Michael Rodriguez",
      time: "4 hours ago",
      icon: AlertCircle,
      color: "text-red-600 bg-red-50",
    },
    {
      action: "Checklist Updated",
      item: "ISO 13485: Section 7.3 Complete",
      user: "Emily Watson",
      time: "5 hours ago",
      icon: CheckSquare,
      color: "text-blue-600 bg-blue-50",
    },
    {
      action: "Document Uploaded",
      item: "Clinical Evaluation Report.pdf",
      user: "Sarah Chen",
      time: "Yesterday",
      icon: FileText,
      color: "text-slateGray bg-slateGray/5",
    },
    {
      action: "CAPA Created",
      item: "Sterilization Process Improvement",
      user: "John Doe",
      time: "Yesterday",
      icon: Target,
      color: "text-orange-600 bg-orange-50",
    },
  ];

  const upcomingDeadlines = [
    {
      title: "QMS Internal Audit",
      date: "Dec 15, 2025",
      days: 15,
      urgent: true,
      progress: 75,
    },
    {
      title: "FDA 510(k) Submission",
      date: "Jan 10, 2026",
      days: 41,
      urgent: false,
      progress: 62,
    },
    {
      title: "Supplier Re-evaluation",
      date: "Jan 25, 2026",
      days: 56,
      urgent: false,
      progress: 40,
    },
    {
      title: "Design Review Meeting",
      date: "Dec 08, 2025",
      days: 8,
      urgent: true,
      progress: 90,
    },
  ];

  const regulationProgress = [
    { name: "FDA 21 CFR 820", progress: 87, status: "On Track", color: "bg-freshGreen" },
    { name: "ISO 13485", progress: 92, status: "Ahead", color: "bg-blue-600" },
    { name: "ISO 14971", progress: 78, status: "On Track", color: "bg-deepTeal" },
    { name: "EU MDR", progress: 65, status: "Needs Attention", color: "bg-orange-500" },
    { name: "HIPAA", progress: 94, status: "Complete", color: "bg-purple-600" },
  ];

  const teamMembers = [
    { name: "Sarah Chen", role: "QA Manager", avatar: "SC", status: "online" },
    { name: "Michael R.", role: "Engineer", avatar: "MR", status: "online" },
    { name: "Emily Watson", role: "RA Specialist", avatar: "EW", status: "away" },
    { name: "John Doe", role: "Quality Lead", avatar: "JD", status: "offline" },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-[#064E3B]">
              {currentProject.name}
            </h1>
            <Badge variant="info" className="bg-blue-50 text-blue-600 border-none">
              {currentProject.classification === "class1" ? "Class I" :
                currentProject.classification === "class2" ? "Class II" : "Class III"}
            </Badge>
          </div>
          <p className="text-slate-500 font-light">
            Compliance Dashboard • {currentProject.markets.map(m => m.toUpperCase()).join(", ")}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">
            <Download size={18} className="mr-2" /> Export Report
          </Button>
          <Link href="/dashboard/products">
            <Button size="sm" className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white border-none shadow-md">
              <Plus size={18} className="mr-2" /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FadeIn delay={0.1}>
          <Card className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#064E3B]/5 flex items-center justify-center">
                <BarChart3 className="text-[#064E3B]" size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#064E3B] mb-1">87%</div>
            <div className="text-sm text-slate-500 font-light">Compliance Score</div>
            <div className="mt-3 flex items-center gap-2 text-xs text-freshGreen font-medium">
              <TrendingUp size={14} /> +5.2% from last month
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Box className="text-blue-600" size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#064E3B] mb-1">{currentProject.products?.length || 0}</div>
            <div className="text-sm text-slate-500 font-light">Products</div>
            <div className="mt-3 text-xs text-slate-400">In development</div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <FileText className="text-purple-600" size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#064E3B] mb-1">248</div>
            <div className="text-sm text-slate-500 font-light">Documents</div>
            <div className="mt-3 text-xs text-slate-400">24 awaiting approval</div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Card className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <AlertTriangle className="text-orange-600" size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#064E3B] mb-1">7</div>
            <div className="text-sm text-slate-500 font-light">Open Risks</div>
            <div className="mt-3 text-xs text-red-500 font-medium">3 require attention</div>
          </Card>
        </FadeIn>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {/* Regulation Progress */}
          <FadeIn delay={0.5}>
            <Card className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-[#064E3B] mb-1">
                    Regulation Progress
                  </h2>
                  <p className="text-sm text-slate-500 font-light">
                    Track your compliance across all standards
                  </p>
                </div>
                <Badge variant="info" size="sm" className="bg-blue-50 text-blue-600 border-none">Updated Today</Badge>
              </div>

              <div className="space-y-5">
                {regulationProgress.map((reg, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-[#064E3B] text-sm">
                          {reg.name}
                        </span>
                        <Badge
                          size="sm"
                          variant={
                            reg.status === "Complete" || reg.status === "Ahead"
                              ? "success"
                              : reg.status === "Needs Attention"
                                ? "warning"
                                : "info"
                          }
                          className="text-[10px] h-5 px-2"
                        >
                          {reg.status}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold text-deepTeal">
                        {reg.progress}%
                      </span>
                    </div>
                    <ProgressBar
                      value={reg.progress}
                      animated={true}
                      color={
                        reg.progress >= 90
                          ? "success"
                          : reg.progress >= 70
                            ? "default"
                            : "warning"
                      }
                      className="h-1.5 bg-slate-100"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Activity size={16} className="text-freshGreen" />
                  <span>Average progress: 83.2%</span>
                </div>
                <Button variant="ghost" size="sm" className="text-[#064E3B] hover:bg-[#064E3B]/5 hover:text-[#064E3B]">
                  View Details <ArrowUpRight size={16} className="ml-1" />
                </Button>
              </div>
            </Card>
          </FadeIn>

          {/* Recent Activity */}
          <FadeIn delay={0.6}>
            <Card className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#064E3B]">
                  Recent Activity
                </h2>
                <Button variant="ghost" size="sm" className="text-[#064E3B] hover:bg-[#064E3B]/5 hover:text-[#064E3B]">
                  View All <ArrowUpRight size={16} className="ml-1" />
                </Button>
              </div>

              <div className="space-y-1">
                {recentActivities.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.color}`}
                    >
                      <activity.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#064E3B] mb-0.5">
                        {activity.action}
                      </p>
                      <p className="text-sm text-slate-500 truncate font-light">
                        {activity.item}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-slate-300 group-hover:text-[#064E3B] transition-colors flex-shrink-0 mt-1"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>

          {/* Weekly Activity Chart */}
          <FadeIn delay={0.7}>
            <Card className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-[#064E3B] mb-1">
                    Weekly Activity
                  </h2>
                  <p className="text-sm text-slate-500 font-light">
                    Tasks completed this week
                  </p>
                </div>
                <Badge variant="info" size="sm" className="bg-blue-50 text-blue-600 border-none">Last 7 Days</Badge>
              </div>

              <div ref={chartRef} className="flex items-end justify-between gap-3 h-48">
                {[45, 62, 38, 71, 55, 82, 68].map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-[#064E3B]/80 rounded-t-sm chart-bar relative group cursor-pointer hover:bg-freshGreen transition-colors"
                      style={{ height: `${value}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#064E3B] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {value} tasks
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#064E3B]">421</div>
                  <div className="text-xs text-slate-500">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-freshGreen">389</div>
                  <div className="text-xs text-slate-500">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">32</div>
                  <div className="text-xs text-slate-500">Pending</div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <FadeIn delay={0.8}>
            <Card className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-[#064E3B]" size={20} />
                <h2 className="text-lg font-bold text-[#064E3B]">
                  Upcoming Deadlines
                </h2>
              </div>

              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#064E3B] mb-1">
                          {deadline.title}
                        </p>
                        <p className="text-xs text-slate-500 font-light">{deadline.date}</p>
                      </div>
                      <Badge
                        size="sm"
                        variant={deadline.urgent ? "error" : "default"}
                        className="text-[10px] h-5 px-2"
                      >
                        {deadline.days}d
                      </Badge>
                    </div>
                    <ProgressBar
                      value={deadline.progress}
                      animated={false}
                      color={deadline.urgent ? "warning" : "success"}
                      className="mt-3 h-1.5"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>

          {/* Team Members */}
          <FadeIn delay={0.9}>
            <Card className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Users className="text-[#064E3B]" size={20} />
                  <h2 className="text-lg font-bold text-[#064E3B]">Team</h2>
                </div>
                <Badge variant="info" size="sm" className="bg-blue-50 text-blue-600 border-none">
                  {teamMembers.filter((m) => m.status === "online").length} Online
                </Badge>
              </div>

              <div className="space-y-3">
                {teamMembers.map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-[#064E3B] flex items-center justify-center text-white font-semibold text-sm">
                        {member.avatar}
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${member.status === "online"
                          ? "bg-freshGreen"
                          : member.status === "away"
                            ? "bg-orange-500"
                            : "bg-slate-300"
                          }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#064E3B] truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate font-light">
                        {member.role}
                      </p>
                    </div>
                    <MessageSquare
                      size={16}
                      className="text-slate-300 group-hover:text-[#064E3B] transition-colors flex-shrink-0"
                    />
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 border-slate-200 text-slate-600 hover:bg-slate-50" size="sm">
                <Plus size={16} className="mr-2" /> Invite Member
              </Button>
            </Card>
          </FadeIn>

          {/* AI Assistant CTA */}
          <FadeIn delay={1.0}>
            <Card className="p-6 border-none bg-[#064E3B] text-white shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <MessageSquare className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">AI Assistant</h3>
                  <p className="text-xs text-white/80 font-light">Always Ready</p>
                </div>
              </div>

              <p className="text-sm text-white/90 mb-4 leading-relaxed font-light">
                Get instant answers to regulatory questions and compliance guidance.
              </p>

              <Button variant="primary" size="sm" className="w-full bg-white text-[#064E3B] hover:bg-white/90 border-none font-medium">
                Ask a Question
                <ArrowUpRight size={16} className="ml-2" />
              </Button>
            </Card>
          </FadeIn>

          {/* Critical Alerts */}
          <FadeIn delay={1.1}>
            <Card className="p-6 border border-red-100 bg-red-50/30 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#064E3B]">Critical Alerts</h3>
                  <p className="text-xs text-slate-500 font-light">Requires action</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-red-100 shadow-sm">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm font-medium text-[#064E3B]">
                        High-risk FMEA requires review
                      </p>
                      <p className="text-xs text-slate-500 mt-1 font-light">Due in 2 days</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-orange-100 shadow-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm font-medium text-[#064E3B]">
                        Document approval overdue
                      </p>
                      <p className="text-xs text-slate-500 mt-1 font-light">3 pending signatures</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 border-red-200 text-red-600 hover:bg-red-50"
                size="sm"
              >
                View All Alerts
              </Button>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
