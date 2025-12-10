"use client";
import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { ProjectProvider } from "@/context/ProjectContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProjectProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="primary"
            size="sm"
            className="shadow-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-forestGreen/20 backdrop-blur-sm z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="lg:pl-64">
          <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </ProjectProvider>
  );
}
