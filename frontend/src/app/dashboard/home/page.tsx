"use client";
import React, { useState } from "react";
import { Search, ArrowRight, FileText, CheckSquare, AlertTriangle, Users } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/animations/FadeIn";

export default function DashboardHomePage() {
    const [searchQuery, setSearchQuery] = useState("");

    const quickLinks = [
        { icon: CheckSquare, label: "My Tasks", href: "/dashboard/checklist", color: "text-blue-600", bg: "bg-blue-50" },
        { icon: FileText, label: "Documents", href: "/dashboard/documents", color: "text-purple-600", bg: "bg-purple-50" },
        { icon: AlertTriangle, label: "Risks", href: "/dashboard/alerts", color: "text-orange-600", bg: "bg-orange-50" },
        { icon: Users, label: "Team", href: "/dashboard/team", color: "text-[#064E3B]", bg: "bg-[#064E3B]/10" },
    ];

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
            <FadeIn>
                <div className="w-full max-w-2xl text-center space-y-8">
                    {/* Logo / Title */}
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#064E3B] tracking-tight">
                            What are you looking for?
                        </h1>
                        <p className="text-slate-500 font-light text-lg">
                            Search across documents, tasks, regulations, and more.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="text-slate-400 group-focus-within:text-[#064E3B] transition-colors" size={24} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for anything..."
                            className="w-full h-16 pl-14 pr-4 rounded-full border border-slate-200 shadow-sm text-lg focus:outline-none focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/20 transition-all placeholder:text-slate-300 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="absolute inset-y-2 right-2">
                            <Button
                                size="sm"
                                className="h-12 px-6 rounded-full bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-medium transition-all"
                            >
                                Search
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="pt-8">
                        <p className="text-sm text-slate-400 font-light mb-4 uppercase tracking-wider">Quick Access</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {quickLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group"
                                >
                                    <div className={`w-8 h-8 rounded-lg ${link.bg} flex items-center justify-center ${link.color}`}>
                                        <link.icon size={18} />
                                    </div>
                                    <span className="text-slate-600 font-medium group-hover:text-[#064E3B] transition-colors">
                                        {link.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
