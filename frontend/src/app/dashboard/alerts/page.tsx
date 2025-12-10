"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/animations/FadeIn";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { useProject } from "@/context/ProjectContext";
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  X,
  Eye,
  Archive,
  Settings,
  Box,
  ChevronDown
} from "lucide-react";

export default function AlertsPage() {
  const { currentProject } = useProject();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Auto-select first product if available
  useEffect(() => {
    if (currentProject?.products.length && !selectedProductId) {
      setSelectedProductId(currentProject.products[0].id);
    }
  }, [currentProject, selectedProductId]);

  const filters = [
    { name: "All", count: 24, color: "text-blue-600" },
    { name: "Regulatory Updates", count: 8, color: "text-purple-600" },
    { name: "Deadlines", count: 5, color: "text-orange-600" },
    { name: "Team Activity", count: 7, color: "text-green-600" },
    { name: "System", count: 4, color: "text-slate-500" },
  ];

  // Mock alerts with productId association
  const alerts = [
    {
      id: 1,
      type: "regulatory",
      priority: "high",
      title: "FDA 21 CFR Part 820 Amendment",
      description: "New guidance document released for Design Control requirements. Effective date: January 15, 2026. Review Section 820.30 for updates to design verification protocols.",
      date: "2 hours ago",
      read: false,
      regulation: "FDA 21 CFR 820",
      impact: "Medium Impact",
      affectedItems: ["Design Control SOP", "DHF Template", "Verification Protocol"],
      productId: currentProject?.products[0]?.id // Associate with first product
    },
    {
      id: 2,
      type: "deadline",
      priority: "high",
      title: "QMS Internal Audit Due in 3 Days",
      description: "Annual Quality Management System audit scheduled for December 15, 2025. Ensure all documentation is current and accessible.",
      date: "4 hours ago",
      read: false,
      daysRemaining: 3,
      assignee: "Sarah Chen",
      progress: 75,
      productId: currentProject?.products[0]?.id
    },
    {
      id: 3,
      type: "team",
      priority: "medium",
      title: "Design Review Meeting Completed",
      description: "Design review for CardioMonitor v2.0 completed. 3 action items assigned requiring follow-up by December 10.",
      date: "5 hours ago",
      read: true,
      user: "Michael Rodriguez",
      actionItems: 3,
      productId: currentProject?.products[1]?.id
    },
    {
      id: 4,
      type: "regulatory",
      priority: "high",
      title: "ISO 14971:2019 Risk Management Update",
      description: "Clarification issued on residual risk evaluation criteria. All active risk assessments should be reviewed for compliance.",
      date: "Yesterday",
      read: false,
      regulation: "ISO 14971",
      impact: "High Impact",
      affectedItems: ["Risk Management Plan", "FMEA Templates", "Risk Assessment Forms"],
      productId: currentProject?.products[0]?.id
    },
    {
      id: 5,
      type: "deadline",
      priority: "medium",
      title: "Supplier Re-evaluation Upcoming",
      description: "Annual supplier evaluation for 5 critical vendors due by December 20, 2025.",
      date: "Yesterday",
      read: true,
      daysRemaining: 20,
      assignee: "Emily Watson",
      progress: 40,
      productId: currentProject?.products[1]?.id
    },
    {
      id: 6,
      type: "system",
      priority: "low",
      title: "Storage Limit Approaching",
      description: "You've used 8.4 GB of your 50 GB storage limit. Consider archiving old documents or upgrading your plan.",
      date: "2 days ago",
      read: true,
      currentUsage: "8.4 GB",
      totalStorage: "50 GB",
      productId: null // System alert
    },
    {
      id: 7,
      type: "team",
      priority: "medium",
      title: "Document Approval Pending",
      description: "3 documents are awaiting your approval: DHF v2.3, Risk Assessment Matrix, CAPA-2025-001",
      date: "2 days ago",
      read: false,
      user: "John Doe",
      documentsCount: 3,
      productId: currentProject?.products[0]?.id
    },
    {
      id: 8,
      type: "regulatory",
      priority: "medium",
      title: "EU MDR Clinical Evaluation Guidance",
      description: "Updated guidance on clinical evaluation reports under EU MDR. New template requirements for post-market clinical follow-up.",
      date: "3 days ago",
      read: true,
      regulation: "EU MDR",
      impact: "Medium Impact",
      affectedItems: ["Clinical Evaluation Report", "PMCF Plan"],
      productId: currentProject?.products[1]?.id
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "regulatory":
        return <Shield className="text-purple-600" size={18} />;
      case "deadline":
        return <Clock className="text-orange-600" size={18} />;
      case "team":
        return <CheckCircle className="text-green-600" size={18} />;
      case "system":
        return <Info className="text-blue-600" size={18} />;
      default:
        return <Bell className="text-slate-400" size={18} />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="error" size="sm">High Priority</Badge>;
      case "medium":
        return <Badge variant="warning" size="sm">Medium</Badge>;
      case "low":
        return <Badge variant="default" size="sm">Low</Badge>;
      default:
        return null;
    }
  };

  // Filter alerts by product AND type
  const filteredAlerts = alerts.filter(alert => {
    const matchesProduct = !selectedProductId || !alert.productId || alert.productId === selectedProductId;
    const matchesType = selectedFilter === "All" || (() => {
      const typeMap: { [key: string]: string } = {
        "Regulatory Updates": "regulatory",
        "Deadlines": "deadline",
        "Team Activity": "team",
        "System": "system",
      };
      return alert.type === typeMap[selectedFilter];
    })();
    return matchesProduct && matchesType;
  });

  const unreadCount = filteredAlerts.filter((a) => !a.read).length;

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-[#064E3B]">
              Alerts & Notifications
            </h1>
            {unreadCount > 0 && (
              <Badge variant="error" className="animate-pulse">
                {unreadCount} New
              </Badge>
            )}
          </div>
          <p className="text-slate-500 font-light text-sm">
            Stay updated on regulatory changes and deadlines
          </p>
        </div>
        <div className="flex gap-3">
          {currentProject && currentProject.products.length > 0 && (
            <div className="relative">
              <select
                className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-[#064E3B] cursor-pointer text-sm h-9"
                value={selectedProductId || ""}
                onChange={(e) => setSelectedProductId(e.target.value)}
              >
                <option value="">All Products</option>
                {currentProject.products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          )}
          <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50 h-9">
            <Settings size={16} className="mr-2" /> Preferences
          </Button>
          <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50 h-9">
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FadeIn delay={0.1}>
          <Card className="p-4 text-center border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Shield className="text-purple-600" size={20} />
              </div>
              <div className="text-2xl font-bold text-[#064E3B]">
                {filteredAlerts.filter(a => a.type === "regulatory").length}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Regulatory</div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card className="p-4 text-center border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <Clock className="text-orange-600" size={20} />
              </div>
              <div className="text-2xl font-bold text-[#064E3B]">
                {filteredAlerts.filter(a => a.type === "deadline").length}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Deadlines</div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card className="p-4 text-center border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div className="text-2xl font-bold text-[#064E3B]">
                {filteredAlerts.filter(a => a.type === "team").length}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Team Updates</div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Card className="p-4 text-center border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Info className="text-blue-600" size={20} />
              </div>
              <div className="text-2xl font-bold text-[#064E3B]">
                {filteredAlerts.filter(a => a.type === "system").length}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">System</div>
            </div>
          </Card>
        </FadeIn>
      </div>

      {/* Filters */}
      <Card className="p-2 border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, i) => (
            <button
              key={i}
              onClick={() => setSelectedFilter(filter.name)}
              className={`px-3 py-1.5 rounded-md text-sm transition-all flex items-center gap-2 ${selectedFilter === filter.name
                  ? "bg-[#064E3B] text-white shadow-sm font-medium"
                  : "text-slate-600 hover:bg-slate-50"
                }`}
            >
              {filter.name}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedFilter === filter.name ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="text-slate-300" size={32} />
            </div>
            <h3 className="text-lg font-medium text-slate-700">No alerts found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          filteredAlerts.map((alert, i) => (
            <ScrollReveal key={alert.id} delay={i * 0.05}>
              <Card
                className={`p-6 cursor-pointer transition-all border group hover:shadow-md ${!alert.read
                    ? "border-l-4 border-l-[#064E3B] bg-[#064E3B]/5 border-y-slate-200 border-r-slate-200"
                    : "border-slate-200 hover:border-[#064E3B]/30 bg-white"
                  }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${!alert.read ? "bg-white shadow-sm" : "bg-slate-50"
                      }`}>
                      {getAlertIcon(alert.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-base font-bold ${!alert.read ? "text-[#064E3B]" : "text-slate-700"}`}>
                            {alert.title}
                          </h3>
                          {getPriorityBadge(alert.priority)}
                          {!alert.read && (
                            <div className="w-2 h-2 rounded-full bg-[#064E3B]" />
                          )}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed mb-3 font-light">
                          {alert.description}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {alert.date}
                          </span>

                          {alert.regulation && (
                            <Badge variant="info" size="sm" className="bg-blue-50 text-blue-600 border-none">
                              {alert.regulation}
                            </Badge>
                          )}

                          {alert.impact && (
                            <Badge
                              variant={alert.impact.includes("High") ? "error" : "warning"}
                              size="sm"
                              className="border-none"
                            >
                              {alert.impact}
                            </Badge>
                          )}

                          {alert.daysRemaining && (
                            <Badge variant="warning" size="sm" className="bg-orange-50 text-orange-600 border-none">
                              {alert.daysRemaining} days remaining
                            </Badge>
                          )}

                          {alert.assignee && (
                            <span className="flex items-center gap-1">
                              Assigned to: <strong className="font-medium text-slate-600">{alert.assignee}</strong>
                            </span>
                          )}
                        </div>

                        {/* Additional Details */}
                        {alert.affectedItems && (
                          <div className="mt-4 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2">
                              Affected Documents:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {alert.affectedItems.map((item, i) => (
                                <Badge key={i} variant="outline" size="sm" className="bg-slate-50 text-slate-600 border-slate-200">
                                  <FileText size={12} className="mr-1" />
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-[#064E3B] hover:bg-[#064E3B]/5">
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-[#064E3B] hover:bg-[#064E3B]/5">
                            <Archive size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50">
                            <X size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))
        )}
      </div>

      {/* Load More */}
      <div className="text-center pt-4">
        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-[#064E3B]">
          Load More Alerts
        </Button>
      </div>
    </div>
  );
}
