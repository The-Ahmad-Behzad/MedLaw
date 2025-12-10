"use client";
import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { FadeIn } from "@/components/animations/FadeIn";
import { useProject } from "@/context/ProjectContext";
import { useRouter } from "next/navigation";
import {
    Plus,
    Box,
    CheckCircle,
    MoreVertical,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
    const { currentProject } = useProject();
    const router = useRouter();

    if (!currentProject) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                    <Box className="text-slate-400" size={40} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">No Project Selected</h2>
                    <p className="text-slate-500 mt-2">Please select a project to view its products.</p>
                </div>
                <Link href="/dashboard">
                    <Button variant="outline">Go to Dashboard</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Link href="/dashboard" className="text-slate-400 hover:text-[#064E3B] transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-bold text-[#064E3B]">Products</h1>
                    </div>
                    <p className="text-slate-500 font-light ml-7">
                        Manage products for {currentProject.name}
                    </p>
                </div>
                <Link href="/dashboard/products/new">
                    <Button
                        className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white shadow-md"
                    >
                        <Plus size={18} className="mr-2" /> Add Product
                    </Button>
                </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProject.products.map((product, i) => (
                    <FadeIn key={product.id} delay={i * 0.1}>
                        <Card className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Box size={20} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant={
                                            product.status === "market" ? "success" :
                                                product.status === "compliance" ? "warning" : "info"
                                        }
                                        className="capitalize"
                                    >
                                        {product.status}
                                    </Badge>
                                    <button className="text-slate-400 hover:text-slate-600">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-[#064E3B] mb-2">{product.name}</h3>
                            <p className="text-sm text-slate-500 mb-4 line-clamp-2 min-h-[40px]">
                                {product.description || "No description provided."}
                            </p>

                            <div className="space-y-3 pt-4 border-t border-slate-50">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Compliance Score</span>
                                    <span className="font-bold text-[#064E3B]">{product.complianceScore}%</span>
                                </div>
                                <ProgressBar
                                    value={product.complianceScore}
                                    color={product.complianceScore > 80 ? "success" : product.complianceScore > 50 ? "warning" : "error"}
                                    className="h-1.5"
                                />

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-1 text-xs text-slate-400">
                                        <CheckCircle size={12} /> Updated {new Date(product.lastUpdated).toLocaleDateString()}
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-[#064E3B] hover:bg-[#064E3B]/5 h-8 px-2 text-xs">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </FadeIn>
                ))}

                {/* Empty State / Add New Card */}
                {currentProject.products.length === 0 && (
                    <Link href="/dashboard/products/new" className="block h-full">
                        <div
                            className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#064E3B]/30 hover:bg-[#064E3B]/5 transition-all min-h-[280px] h-full"
                        >
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-white group-hover:text-[#064E3B]">
                                <Plus size={24} />
                            </div>
                            <h3 className="font-bold text-slate-700 mb-1">Add First Product</h3>
                            <p className="text-sm text-slate-500">Register a product to track compliance</p>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}
