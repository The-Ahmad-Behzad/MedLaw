"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { FadeIn } from "@/components/animations/FadeIn";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Star,
  Copy,
  CheckCircle,
  Shield,
  Activity,
  Target,
  FileCheck,
  AlertTriangle,
  Users,
  BookOpen,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { useProject } from "@/context/ProjectContext";
import Link from "next/link";

export default function TemplatesPage() {
  const { currentProject } = useProject();
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Auto-select first product if available
  React.useEffect(() => {
    if (currentProject?.products.length && !selectedProductId) {
      setSelectedProductId(currentProject.products[0].id);
    }
  }, [currentProject, selectedProductId]);

  const categories = [
    { name: "All Templates", icon: FileText, count: 48 },
    { name: "Design & Development", icon: Target, count: 12 },
    { name: "Risk Management", icon: AlertTriangle, count: 8 },
    { name: "SOPs", icon: Shield, count: 10 },
    { name: "CAPA", icon: Activity, count: 6 },
    { name: "Validation", icon: CheckCircle, count: 7 },
    { name: "Training", icon: Users, count: 5 },
  ];

  const templates = [
    {
      id: 1,
      name: "Design History File Template",
      description: "Complete DHF structure with all required sections per FDA 21 CFR 820.30",
      category: "Design & Development",
      regulations: ["FDA 21 CFR 820", "ISO 13485"],
      difficulty: "Advanced",
      downloads: 1240,
      format: "DOCX",
      pages: 45,
      featured: true,
    },
    {
      id: 2,
      name: "Risk Management Plan",
      description: "ISO 14971 compliant risk management plan template with FMEA worksheets",
      category: "Risk Management",
      regulations: ["ISO 14971", "EU MDR"],
      difficulty: "Intermediate",
      downloads: 892,
      format: "XLSX",
      pages: 12,
      featured: true,
    },
    {
      id: 3,
      name: "Document Control SOP",
      description: "Standard Operating Procedure for document control and management",
      category: "SOPs",
      regulations: ["FDA 21 CFR 820", "ISO 13485"],
      difficulty: "Basic",
      downloads: 756,
      format: "DOCX",
      pages: 8,
      featured: false,
    },
    {
      id: 4,
      name: "CAPA Request Form",
      description: "Corrective and Preventive Action request form with root cause analysis",
      category: "CAPA",
      regulations: ["FDA 21 CFR 820", "ISO 13485"],
      difficulty: "Basic",
      downloads: 643,
      format: "PDF",
      pages: 3,
      featured: false,
    },
    {
      id: 5,
      name: "Validation Protocol Template",
      description: "IQ/OQ/PQ validation protocol template for equipment and processes",
      category: "Validation",
      regulations: ["FDA 21 CFR 820", "EU GMP"],
      difficulty: "Advanced",
      downloads: 521,
      format: "DOCX",
      pages: 28,
      featured: true,
    },
    {
      id: 6,
      name: "Design Input Requirements",
      description: "Template for documenting design input requirements and specifications",
      category: "Design & Development",
      regulations: ["FDA 21 CFR 820", "ISO 13485"],
      difficulty: "Intermediate",
      downloads: 489,
      format: "XLSX",
      pages: 6,
      featured: false,
    },
    {
      id: 7,
      name: "Risk Assessment Matrix",
      description: "Pre-built risk assessment matrix with scoring criteria and heat map",
      category: "Risk Management",
      regulations: ["ISO 14971"],
      difficulty: "Basic",
      downloads: 778,
      format: "XLSX",
      pages: 4,
      featured: false,
    },
    {
      id: 8,
      name: "Training Record Template",
      description: "Employee training record form with competency assessment",
      category: "Training",
      regulations: ["FDA 21 CFR 820", "ISO 13485"],
      difficulty: "Basic",
      downloads: 412,
      format: "PDF",
      pages: 2,
      featured: false,
    },
    {
      id: 9,
      name: "Design Verification Plan",
      description: "Comprehensive template for design verification testing and documentation",
      category: "Design & Development",
      regulations: ["FDA 21 CFR 820", "ISO 13485"],
      difficulty: "Advanced",
      downloads: 567,
      format: "DOCX",
      pages: 32,
      featured: true,
    },
    {
      id: 10,
      name: "Quality Manual Template",
      description: "Complete ISO 13485 quality manual template with all required sections",
      category: "SOPs",
      regulations: ["ISO 13485"],
      difficulty: "Advanced",
      downloads: 834,
      format: "DOCX",
      pages: 68,
      featured: true,
    },
    {
      id: 11,
      name: "Supplier Evaluation Form",
      description: "Supplier audit and evaluation checklist with scoring system",
      category: "SOPs",
      regulations: ["FDA 21 CFR 820", "ISO 13485"],
      difficulty: "Intermediate",
      downloads: 391,
      format: "XLSX",
      pages: 5,
      featured: false,
    },
    {
      id: 12,
      name: "Change Control Form",
      description: "Engineering change order form with impact assessment",
      category: "SOPs",
      regulations: ["FDA 21 CFR 820", "ISO 13485"],
      difficulty: "Basic",
      downloads: 528,
      format: "PDF",
      pages: 4,
      featured: false,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Basic":
        return "success";
      case "Intermediate":
        return "warning";
      case "Advanced":
        return "default";
      default:
        return "default";
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "DOCX":
        return <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold">DOC</div>;
      case "XLSX":
        return <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 text-xs font-bold">XLS</div>;
      case "PDF":
        return <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 text-xs font-bold">PDF</div>;
      default:
        return <FileText className="text-slate-400" size={20} />;
    }
  };

  const selectedProduct = currentProject?.products.find(p => p.id === selectedProductId);

  // Filter templates based on product regulations if a product is selected
  const recommendedTemplates = selectedProduct
    ? templates.filter(t => t.regulations.some(r => selectedProduct.regulations.some(pr => r.toLowerCase().includes(pr.toLowerCase()) || pr.toLowerCase().includes(r.toLowerCase()))))
    : [];

  const filteredTemplates = selectedCategory === "All Templates"
    ? templates
    : templates.filter((t) => t.category === selectedCategory);

  const featuredTemplates = templates.filter((t) => t.featured);

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[#064E3B] mb-1">
            Templates Library
          </h1>
          <p className="text-slate-500 font-light text-sm">
            Pre-built, compliant document templates ready to use
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">
            <BookOpen size={16} className="mr-2" /> Guide
          </Button>
        </div>
      </div>

      {/* Product Context Selector */}
      {currentProject && currentProject.products.length > 0 && (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-4">
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">
              Context Product
            </label>
            <select
              className="w-full md:w-64 bg-white border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:border-[#064E3B] cursor-pointer text-sm"
              value={selectedProductId || ""}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              {currentProject.products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden md:block h-10 w-px bg-slate-200" />
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
            <Shield size={16} className="text-[#064E3B]" />
            <span>Regulations: </span>
            <div className="flex gap-2">
              {selectedProduct?.regulations.map((reg, i) => (
                <Badge key={i} variant="outline" size="sm" className="bg-white">
                  {reg}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recommended Templates */}
      {recommendedTemplates.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-[#064E3B]" size={18} />
            <h2 className="text-lg font-bold text-[#064E3B]">
              Recommended for {selectedProduct?.name}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTemplates.map((template, i) => (
              <FadeIn key={template.id} delay={i * 0.1}>
                <Card className="p-5 border border-[#064E3B]/20 shadow-sm bg-[#064E3B]/5 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2">
                    <Badge variant="success" size="sm" className="bg-[#064E3B] text-white border-none">
                      Recommended
                    </Badge>
                  </div>
                  <div className="flex items-start gap-4 mb-4">
                    {getFormatIcon(template.format)}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#064E3B] text-base mb-1 group-hover:text-[#064E3B]/80 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-light">
                        {template.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.regulations.map((reg, i) => (
                      <Badge key={i} variant="default" size="sm" className="bg-white text-slate-600 border border-slate-200">
                        {reg}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1 bg-[#064E3B] hover:bg-[#064E3B]/90 text-white shadow-none h-9">
                      <Copy size={14} className="mr-1" /> Use Template
                    </Button>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      )}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-[#064E3B]" size={18} />
          <h2 className="text-lg font-bold text-[#064E3B]">
            Featured Templates
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTemplates.slice(0, 3).map((template, i) => (
            <FadeIn key={template.id} delay={i * 0.1}>
              <Card className="p-5 border-none shadow-sm bg-white hover:shadow-md transition-all duration-300 group">
                <div className="absolute top-4 right-4">
                  <Badge variant="info" size="sm" className="bg-blue-50 text-blue-600 border-none">
                    <Star size={10} className="mr-1 fill-current" />
                    Popular
                  </Badge>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  {getFormatIcon(template.format)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#064E3B] text-base mb-1 group-hover:text-[#064E3B]/80 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 font-light">
                      {template.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {template.regulations.map((reg, i) => (
                    <Badge key={i} variant="default" size="sm" className="bg-slate-50 text-slate-600 border-none">
                      {reg}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-4 font-medium">
                  <span>{template.downloads.toLocaleString()} downloads</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{template.pages} pages</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className={
                    template.difficulty === "Basic" ? "text-green-600" :
                      template.difficulty === "Intermediate" ? "text-orange-500" : "text-[#064E3B]"
                  }>
                    {template.difficulty}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="flex-1 bg-[#064E3B] hover:bg-[#064E3B]/90 text-white shadow-none h-9">
                    <Copy size={14} className="mr-1" /> Use Template
                  </Button>
                  <Button variant="outline" size="sm" className="px-3 border-slate-200 text-slate-500 hover:bg-slate-50 h-9">
                    <Eye size={14} />
                  </Button>
                  <Button variant="outline" size="sm" className="px-3 border-slate-200 text-slate-500 hover:bg-slate-50 h-9">
                    <Download size={14} />
                  </Button>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Categories and Templates */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Categories */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <Card className="p-2 border-none shadow-sm bg-white">
              <div className="p-2">
                <h3 className="font-bold text-[#064E3B] text-sm mb-3 px-2">Categories</h3>
                <div className="space-y-0.5">
                  {categories.map((category, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${selectedCategory === category.name
                        ? "bg-[#064E3B]/5 text-[#064E3B] font-medium"
                        : "hover:bg-slate-50 text-slate-500"
                        }`}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <category.icon
                          size={16}
                          className={`${selectedCategory === category.name
                            ? "text-[#064E3B]"
                            : "text-slate-400"
                            } flex-shrink-0`}
                        />
                        <span className="text-sm truncate">{category.name}</span>
                      </div>
                      <span className="text-xs text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-[#064E3B] text-black border-none shadow-md">
              <div className="text-center">
                <Sparkles className="mx-auto mb-3 text-black/80" size={20} />
                <h4 className="font-bold mb-1 text-sm">Need Custom Template?</h4>
                <p className="text-xs text-black/70 mb-4 font-light">
                  Request a custom template tailored to your specific needs.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full bg-white text-[#064E3B] hover:bg-white/90 border-none h-8 text-xs font-medium"
                >
                  Request Template
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Area - Templates Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search */}
          <Card className="p-4 border-none shadow-sm bg-white">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <Input
                  placeholder="Search templates..."
                  className="pl-10 h-10 bg-slate-50 border-slate-200 focus:border-[#064E3B] focus:ring-[#064E3B]"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50 h-10">
                  <Filter size={16} className="mr-2" /> Regulations
                </Button>
                <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50 h-10">
                  <Filter size={16} className="mr-2" /> Difficulty
                </Button>
              </div>
            </div>
          </Card>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredTemplates.map((template, i) => (
              <ScrollReveal key={template.id} delay={i * 0.05}>
                <Card className="p-5 h-full border-none shadow-sm bg-white hover:shadow-md transition-all duration-300 group flex flex-col">
                  <div className="flex items-start gap-4 mb-3">
                    {getFormatIcon(template.format)}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#064E3B] text-sm mb-1 group-hover:text-[#064E3B]/80 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 font-light">
                        {template.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.regulations.map((reg, i) => (
                      <Badge key={i} variant="default" size="sm" className="bg-slate-50 text-slate-600 border-none text-[10px] px-2 py-0.5">
                        {reg}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>{template.downloads.toLocaleString()} downloads</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className={
                        template.difficulty === "Basic" ? "text-green-600" :
                          template.difficulty === "Intermediate" ? "text-orange-500" : "text-[#064E3B]"
                      }>
                        {template.difficulty}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-[#064E3B] hover:bg-[#064E3B]/5 text-xs">
                      View Details <ChevronRight size={12} className="ml-1" />
                    </Button>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
