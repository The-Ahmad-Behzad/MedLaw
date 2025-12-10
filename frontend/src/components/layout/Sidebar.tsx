"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  AlertTriangle,
  Sparkles,
  Box,
  Search,
  Layers,
  Users
} from "lucide-react";
import { useProject } from "@/context/ProjectContext";
import { cn } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const { currentProject, projects, switchProject } = useProject();
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitchProject = (projectId: string | null) => {
    switchProject(projectId);
    setIsProjectMenuOpen(false);
    router.push("/dashboard");
  };

  const links = [
    { name: "Home", href: "/dashboard/home", icon: LayoutDashboard },
    ...(currentProject ? [
      { name: "Overview", href: "/dashboard", icon: Layers },
      { name: "Products", href: "/dashboard/products", icon: Box },
      { name: "Checklists", href: "/dashboard/checklist", icon: CheckSquare },
      { name: "Documents", href: "/dashboard/documents", icon: FileText },
      { name: "Templates", href: "/dashboard/templates", icon: FileText },
      { name: "Alerts", href: "/dashboard/alerts", icon: AlertTriangle },
      { name: "Team", href: "/dashboard/team", icon: Users },
    ] : []),
    { name: "AI Assistant", href: "/dashboard/ai-assistant", icon: Sparkles },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="h-screen w-64 bg-slate-50 border-r border-slate-200 flex flex-col fixed left-0 top-0 z-50">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2 text-[#064E3B]">
          <div className="w-8 h-8 rounded-lg bg-[#064E3B] flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <span className="text-xl font-light tracking-tight">MedTech<span className="font-semibold">Flow</span></span>
        </div>
      </div>

      {/* Project Switcher */}
      <div className="px-4 py-4">
        <div className="relative">
          <button
            onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-[#064E3B]/30 hover:shadow-sm transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-[#064E3B]/5 flex items-center justify-center text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                {currentProject ? <Box size={16} /> : <Layers size={16} />}
              </div>
              <div className="text-left truncate">
                <div className="text-xs text-slate-400 font-light uppercase tracking-wider">Current Workspace</div>
                <div className="text-sm font-medium text-slate-700 truncate group-hover:text-[#064E3B] transition-colors">
                  {currentProject ? currentProject.name : "All Projects"}
                </div>
              </div>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isProjectMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {isProjectMenuOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl border border-slate-100 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-2 space-y-1 max-h-64 overflow-y-auto">
                <button
                  onClick={() => handleSwitchProject(null)}
                  className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-lg text-sm transition-colors",
                    !currentProject ? "bg-[#064E3B]/5 text-[#064E3B]" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Layers size={16} />
                  <span className="font-medium">All Projects</span>
                </button>

                <div className="h-px bg-slate-100 my-1" />

                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleSwitchProject(project.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-2 rounded-lg text-sm transition-colors",
                      currentProject?.id === project.id ? "bg-[#064E3B]/5 text-[#064E3B]" : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <Box size={16} />
                    <span className="truncate font-light">{project.name}</span>
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-slate-100 bg-slate-50">
                <Link href="/dashboard/new-project">
                  <button className="w-full flex items-center justify-center gap-2 p-2 rounded-lg text-xs font-medium text-[#064E3B] hover:bg-[#064E3B]/10 transition-colors">
                    <Plus size={14} /> Create New Project
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-2 overflow-y-auto">
        <div className="text-xs font-medium text-slate-400 mb-4 px-2 uppercase tracking-wider">
          {currentProject ? "Project Menu" : "Main Menu"}
        </div>
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-[#064E3B] text-white shadow-md"
                    : "text-slate-600 hover:bg-white hover:shadow-sm hover:text-[#064E3B]"
                )}
              >
                <Icon size={18} className={cn(
                  "transition-colors",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-[#064E3B]"
                )} />
                <span className={cn("text-sm", isActive ? "font-medium" : "font-light")}>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Compliance Score (Only if project selected) */}
      {currentProject && (
        <div className="px-6 py-4 border-t border-slate-100">
          <div className="bg-[#064E3B] p-4 rounded-xl shadow-lg shadow-green-900/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-green-100/80">Compliance Score</span>
              <Badge variant="default" size="sm" className="text-[10px] px-1.5 h-5 bg-white/20 text-white border-none backdrop-blur-sm">
                On Track
              </Badge>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-2xl font-bold text-white">87%</span>
              <span className="text-xs text-green-300 mb-1">+2.4%</span>
            </div>
            <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full" style={{ width: "87%" }} />
            </div>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#064E3B] flex items-center justify-center text-white text-sm font-medium shadow-sm">
            DS
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-700 truncate">Dr. Smith</div>
            <div className="text-xs text-slate-400 truncate font-light">Lead QA Engineer</div>
          </div>
          <button className="text-slate-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
