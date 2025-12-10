"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { FadeIn } from "@/components/animations/FadeIn";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronRight,
  Search,
  Filter,
  Download,
  Plus,
  FileText,
  AlertCircle,
  Clock,
  User,
  Paperclip,
  MessageSquare,
  Star,
  CheckSquare,
  Box
} from "lucide-react";
import { useProject, ChecklistItem } from "@/context/ProjectContext";
import Link from "next/link";

export default function ChecklistPage() {
  const { currentProject, addChecklistItem } = useProject();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["Design & Development"]));
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    dueDate: "",
    assignee: "",
    section: "Design & Development"
  });

  // Auto-select first product if available
  useEffect(() => {
    if (currentProject?.products.length && !selectedProductId) {
      setSelectedProductId(currentProject.products[0].id);
    }
  }, [currentProject, selectedProductId]);

  if (!currentProject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
          <CheckSquare className="text-slate-400" size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">No Project Selected</h2>
          <p className="text-slate-500 mt-2">Select a project to view its compliance checklists.</p>
        </div>
      </div>
    );
  }

  const selectedProduct = currentProject.products.find(p => p.id === selectedProductId);
  const checklistItems = selectedProduct?.checklistItems || [];

  // Group items by section
  const sections = ["Design & Development", "Risk Management", "Document Control", "CAPA"];
  const groupedItems = sections.map(section => ({
    title: section,
    items: checklistItems.filter(item => item.section === section)
  }));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !newItem.title) return;

    addChecklistItem(currentProject.id, selectedProductId, {
      ...newItem,
      status: "pending"
    });
    setIsAdding(false);
    setNewItem({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      assignee: "",
      section: "Design & Development"
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "error";
      case "medium": return "warning";
      case "low": return "success";
      default: return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "success";
      case "in-progress": return "info";
      default: return "default";
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#064E3B] mb-1">
            Compliance Checklists
          </h1>
          <p className="text-slate-500 font-light text-sm">
            {currentProject.name} • Track regulatory requirements
          </p>
        </div>
        <div className="flex gap-3">
          {currentProject.products.length > 0 ? (
            <div className="relative">
              <select
                className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-[#064E3B] cursor-pointer"
                value={selectedProductId || ""}
                onChange={(e) => setSelectedProductId(e.target.value)}
              >
                {currentProject.products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          ) : (
            <Link href="/dashboard/products/new">
              <Button variant="outline" className="border-dashed">Create Product First</Button>
            </Link>
          )}
          <Button
            size="sm"
            className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white border-none shadow-md"
            onClick={() => setIsAdding(true)}
            disabled={!selectedProductId}
          >
            <Plus size={16} className="mr-2" /> Add Item
          </Button>
        </div>
      </div>

      {/* Global Summary Card */}
      {selectedProduct && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Progress</p>
                <h3 className="text-2xl font-bold text-[#064E3B] mt-1">
                  {checklistItems.length > 0
                    ? Math.round((checklistItems.filter(i => i.status === "complete").length / checklistItems.length) * 100)
                    : 0}%
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <CheckCircle size={20} />
              </div>
            </div>
            <ProgressBar
              value={checklistItems.length > 0
                ? Math.round((checklistItems.filter(i => i.status === "complete").length / checklistItems.length) * 100)
                : 0}
              className="mt-3 h-1.5"
            />
          </Card>

          <Card className="p-4 border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Tasks</p>
                <h3 className="text-2xl font-bold text-slate-700 mt-1">{checklistItems.length}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <CheckSquare size={20} />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Across {sections.length} sections</p>
          </Card>

          <Card className="p-4 border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Pending</p>
                <h3 className="text-2xl font-bold text-amber-600 mt-1">
                  {checklistItems.filter(i => i.status !== "complete").length}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <Clock size={20} />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">
              {checklistItems.filter(i => i.priority === "high" && i.status !== "complete").length} High Priority
            </p>
          </Card>

          <Card className="p-4 border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Compliance</p>
                <h3 className="text-2xl font-bold text-purple-600 mt-1">
                  {selectedProduct.complianceScore}%
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Star size={20} />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Based on current progress</p>
          </Card>
        </div>
      )}

      {/* Add Item Form */}
      {isAdding && (
        <FadeIn>
          <Card className="p-6 border border-[#064E3B]/10 bg-[#064E3B]/5 mb-8">
            <h3 className="text-lg font-bold text-[#064E3B] mb-4">Add Checklist Item</h3>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Title</label>
                  <Input
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    placeholder="e.g., Risk Analysis Report"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Section</label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20"
                    value={newItem.section}
                    onChange={(e) => setNewItem({ ...newItem, section: e.target.value })}
                  >
                    {sections.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <Input
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Description of the task..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Priority</label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20"
                    value={newItem.priority}
                    onChange={(e) => setNewItem({ ...newItem, priority: e.target.value as any })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Input
                    type="date"
                    value={newItem.dueDate}
                    onChange={(e) => setNewItem({ ...newItem, dueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Assignee</label>
                  <Input
                    value={newItem.assignee}
                    onChange={(e) => setNewItem({ ...newItem, assignee: e.target.value })}
                    placeholder="e.g. Sarah Chen"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#064E3B] text-white hover:bg-[#064E3B]/90">Add Task</Button>
              </div>
            </form>
          </Card>
        </FadeIn>
      )}

      {/* Checklist Sections */}
      {!selectedProductId ? (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <Box className="mx-auto text-slate-300 mb-3" size={48} />
          <p className="text-slate-500">Select a product to view its checklist</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groupedItems.map((section, sectionIndex) => {
            const completedCount = section.items.filter(i => i.status === "complete").length;
            const totalCount = section.items.length;
            const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

            return (
              <ScrollReveal key={section.title} delay={sectionIndex * 0.1}>
                <Card className="border border-slate-200 overflow-hidden shadow-sm">
                  {/* Section Header */}
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100"
                    onClick={() => toggleSection(section.title)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {expandedSections.has(section.title) ? (
                        <ChevronDown className="text-[#064E3B]" size={20} />
                      ) : (
                        <ChevronRight className="text-slate-400" size={20} />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-[#064E3B]">
                            {section.title}
                          </h3>
                          <Badge variant="info" size="sm">
                            {completedCount}/{totalCount}
                          </Badge>
                        </div>
                        <ProgressBar value={progress} animated={false} className="max-w-md h-1.5" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#064E3B] mb-1">
                        {progress}%
                      </div>
                      <div className="text-xs text-slate-400">Complete</div>
                    </div>
                  </div>

                  {/* Section Items */}
                  {expandedSections.has(section.title) && (
                    <div className="bg-white">
                      {section.items.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 text-sm italic">
                          No tasks in this section yet.
                        </div>
                      ) : (
                        section.items.map((item) => (
                          <div
                            key={item.id}
                            className="p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors group"
                          >
                            <div className="flex items-start gap-4">
                              {/* Checkbox */}
                              <div className="flex-shrink-0 mt-1 cursor-pointer">
                                {item.status === "complete" ? (
                                  <CheckCircle className="text-freshGreen" size={22} />
                                ) : (
                                  <Circle className="text-slate-300 hover:text-[#064E3B]" size={22} />
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-semibold text-slate-700 group-hover:text-[#064E3B] transition-colors">
                                        {item.title}
                                      </h4>
                                      <Badge variant={getPriorityColor(item.priority)} size="sm" className="h-5 px-1.5 text-[10px] uppercase">
                                        {item.priority}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                      {item.description}
                                    </p>
                                  </div>
                                  <Badge variant={getStatusColor(item.status)} size="sm" className="flex-shrink-0 capitalize">
                                    {item.status.replace("-", " ")}
                                  </Badge>
                                </div>

                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-3">
                                  {item.assignee && (
                                    <div className="flex items-center gap-1.5">
                                      <User size={14} />
                                      <span>{item.assignee}</span>
                                    </div>
                                  )}
                                  {item.dueDate && (
                                    <div className="flex items-center gap-1.5">
                                      <Clock size={14} />
                                      <span>Due: {item.dueDate}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
