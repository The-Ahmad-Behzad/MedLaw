"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { FadeIn } from "@/components/animations/FadeIn";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  FileText,
  FolderOpen,
  Upload,
  Search,
  Filter,
  Grid3x3,
  List,
  Download,
  Share2,
  MoreVertical,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Trash2,
  Edit,
  File,
  FileCheck,
  FileClock,
  Plus,
  TrendingUp,
  ChevronDown,
  Box
} from "lucide-react";
import { useProject, Document } from "@/context/ProjectContext";
import Link from "next/link";

export default function DocumentsPage() {
  const { currentProject, addDocument } = useProject();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFolder, setSelectedFolder] = useState("All Documents");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Auto-select first product
  useEffect(() => {
    if (currentProject?.products.length && !selectedProductId) {
      setSelectedProductId(currentProject.products[0].id);
    }
  }, [currentProject, selectedProductId]);

  if (!currentProject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
          <FileText className="text-slate-400" size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">No Project Selected</h2>
          <p className="text-slate-500 mt-2">Select a project to manage its documents.</p>
        </div>
      </div>
    );
  }

  const selectedProduct = currentProject.products.find(p => p.id === selectedProductId);
  const documents = selectedProduct?.documents || [];

  const folders = [
    { name: "All Documents", icon: FileText, count: documents.length, color: "text-blue-600" },
    { name: "Design History File", icon: FolderOpen, count: documents.filter(d => d.folder === "Design History File").length, color: "text-purple-600" },
    { name: "Risk Management", icon: AlertCircle, count: documents.filter(d => d.folder === "Risk Management").length, color: "text-orange-600" },
    { name: "SOPs", icon: FileCheck, count: documents.filter(d => d.folder === "SOPs").length, color: "text-freshGreen" },
    { name: "CAPA", icon: FileClock, count: documents.filter(d => d.folder === "CAPA").length, color: "text-deepTeal" },
    { name: "Validation", icon: CheckCircle, count: documents.filter(d => d.folder === "Validation").length, color: "text-green-600" },
  ];

  const filteredDocuments = selectedFolder === "All Documents"
    ? documents
    : documents.filter(d => d.folder === selectedFolder);

  const handleUpload = () => {
    if (!selectedProductId) return;
    // Mock upload
    const newDoc: Omit<Document, "id" | "lastModified"> = {
      name: `New Document ${documents.length + 1}.pdf`,
      type: "PDF",
      size: "1.2 MB",
      status: "Draft",
      version: "v0.1",
      modifiedBy: "You",
      folder: selectedFolder === "All Documents" ? "Uncategorized" : selectedFolder,
      starred: false
    };
    addDocument(currentProject.id, selectedProductId, newDoc);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "success";
      case "In Review": return "info";
      case "Draft": return "warning";
      case "Rejected": return "error";
      default: return "default";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 font-semibold text-xs border border-red-100">PDF</div>;
      case "Word":
        return <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-semibold text-xs border border-blue-100">DOC</div>;
      case "Excel":
        return <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 font-semibold text-xs border border-green-100">XLS</div>;
      default:
        return <File className="text-slateGray" size={24} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-forestGreen mb-2">
            Document Manager
          </h1>
          <p className="text-slateGray">
            {currentProject.name} • Organize compliance documents
          </p>
        </div>
        <div className="flex gap-3">
          {currentProject.products.length > 0 ? (
            <div className="relative">
              <select
                className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-[#064E3B] cursor-pointer h-10"
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
          <Button variant="outline" size="sm">
            <Share2 size={18} className="mr-2" /> Share
          </Button>
          <Button
            size="sm"
            className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white"
            onClick={handleUpload}
            disabled={!selectedProductId}
          >
            <Upload size={18} className="mr-2" /> Upload
          </Button>
        </div>
      </div>

      {!selectedProductId ? (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <Box className="mx-auto text-slate-300 mb-3" size={48} />
          <p className="text-slate-500">Select a product to view its documents</p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FadeIn delay={0}>
              <Card className="p-6 border border-slateGray/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slateGray font-medium mb-1">Total Documents</p>
                    <h3 className="text-2xl font-bold text-forestGreen">{documents.length}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <FileText size={20} />
                  </div>
                </div>
              </Card>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card className="p-6 border border-slateGray/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slateGray font-medium mb-1">Pending Approval</p>
                    <h3 className="text-2xl font-bold text-forestGreen">{documents.filter(d => d.status === "In Review").length}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                    <FileClock size={20} />
                  </div>
                </div>
              </Card>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Card className="p-6 border border-slateGray/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slateGray font-medium mb-1">Approved</p>
                    <h3 className="text-2xl font-bold text-forestGreen">{documents.filter(d => d.status === "Approved").length}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                    <FileCheck size={20} />
                  </div>
                </div>
              </Card>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Card className="p-6 border border-slateGray/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slateGray font-medium mb-1">Storage Used</p>
                    <h3 className="text-2xl font-bold text-forestGreen">124 MB</h3>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                    <TrendingUp size={20} />
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar - Folders */}
            <div className="lg:col-span-1">
              <ScrollReveal>
                <Card className="p-4 border border-slateGray/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-forestGreen">Folders</h3>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Plus size={18} />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {folders.map((folder, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${selectedFolder === folder.name
                            ? "bg-deepTeal/5 text-deepTeal font-semibold border border-deepTeal/20"
                            : "hover:bg-slate-50 text-slateGray border border-transparent"
                          }`}
                        onClick={() => setSelectedFolder(folder.name)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <folder.icon
                            size={18}
                            className={`${selectedFolder === folder.name
                                ? "text-deepTeal"
                                : folder.color
                              } flex-shrink-0`}
                          />
                          <span className="text-sm truncate">{folder.name}</span>
                        </div>
                        <Badge size="sm" variant="default" className="flex-shrink-0">
                          {folder.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            </div>

            {/* Main Area - Documents */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and View Controls */}
              <Card className="p-4 border border-slateGray/10">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slateGray"
                      size={20}
                    />
                    <Input placeholder="Search documents..." className="pl-10" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter size={18} className="mr-2" /> Filter
                    </Button>
                    <div className="flex gap-1 border border-slateGray/20 rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "primary" : "ghost"}
                        size="sm"
                        className="h-8 px-3"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3x3 size={16} />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "primary" : "ghost"}
                        size="sm"
                        className="h-8 px-3"
                        onClick={() => setViewMode("list")}
                      >
                        <List size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Documents Grid/List */}
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-400 italic">No documents found in this folder.</p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDocuments.map((doc, i) => (
                    <ScrollReveal key={doc.id} delay={i * 0.05}>
                      <Card className="p-4 border border-slateGray/10 hover:border-deepTeal/30 transition-colors cursor-pointer group">
                        {doc.starred && (
                          <Star
                            className="absolute top-4 right-4 text-amber-500 fill-amber-500"
                            size={16}
                          />
                        )}
                        <div className="flex items-start gap-3 mb-4">
                          {getFileIcon(doc.type)}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-forestGreen text-sm mb-1 truncate group-hover:text-deepTeal transition-colors">
                              {doc.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <Badge variant={getStatusColor(doc.status)} size="sm">
                                {doc.status}
                              </Badge>
                              <span className="text-xs text-slateGray">
                                {doc.version}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs text-slateGray mb-4">
                          <div className="flex items-center gap-2">
                            <Clock size={12} />
                            <span>{doc.lastModified}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{doc.modifiedBy}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{doc.size}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-slateGray/10">
                          <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                            <Eye size={14} className="mr-1" /> View
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download size={14} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical size={14} />
                          </Button>
                        </div>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <Card className="border border-slateGray/10">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slateGray/10">
                          <th className="text-left p-4 text-sm font-semibold text-forestGreen">
                            Name
                          </th>
                          <th className="text-left p-4 text-sm font-semibold text-forestGreen">
                            Status
                          </th>
                          <th className="text-left p-4 text-sm font-semibold text-forestGreen">
                            Modified
                          </th>
                          <th className="text-left p-4 text-sm font-semibold text-forestGreen">
                            Size
                          </th>
                          <th className="text-left p-4 text-sm font-semibold text-forestGreen">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDocuments.map((doc, i) => (
                          <tr
                            key={doc.id}
                            className="border-b border-slateGray/5 last:border-0 hover:bg-slate-50 transition-colors group"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                {getFileIcon(doc.type)}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-forestGreen truncate">
                                      {doc.name}
                                    </span>
                                    {doc.starred && (
                                      <Star
                                        className="text-amber-500 fill-amber-500 flex-shrink-0"
                                        size={14}
                                      />
                                    )}
                                  </div>
                                  <span className="text-xs text-slateGray">
                                    {doc.version} • {doc.modifiedBy}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge variant={getStatusColor(doc.status)} size="sm">
                                {doc.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-sm text-slateGray">
                              {doc.lastModified}
                            </td>
                            <td className="p-4 text-sm text-slateGray">
                              {doc.size}
                            </td>
                            <td className="p-4">
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Eye size={16} />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Download size={16} />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit size={16} />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Trash2 size={16} className="text-red-500" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
