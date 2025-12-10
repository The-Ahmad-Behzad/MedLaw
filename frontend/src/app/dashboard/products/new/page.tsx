"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/animations/FadeIn";
import { useProject } from "@/context/ProjectContext";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Check,
    ChevronRight,
    Globe,
    Shield,
    FileText,
    Box,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function NewProductPage() {
    const { currentProject, addProduct } = useProject();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        markets: [] as string[],
        classification: "",
        regulations: [] as string[]
    });

    if (!currentProject) {
        router.push("/dashboard");
        return null;
    }

    const steps = [
        { id: 1, title: "Basics", icon: Box },
        { id: 2, title: "Markets", icon: Globe },
        { id: 3, title: "Compliance", icon: Shield },
        { id: 4, title: "Review", icon: FileText },
    ];

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        addProduct(currentProject.id, {
            name: formData.name,
            description: formData.description,
            status: "development",
            complianceScore: 0,
            markets: formData.markets,
            classification: formData.classification,
            regulations: formData.regulations
        });
        router.push("/dashboard/products");
    };

    const toggleSelection = (field: "markets" | "regulations", value: string) => {
        setFormData(prev => {
            const current = prev[field];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [field]: updated };
        });
    };

    return (
        <div className="max-w-3xl mx-auto pb-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard/products" className="text-slate-400 hover:text-[#064E3B] transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[#064E3B]">Add New Product</h1>
                    <p className="text-slate-500 font-light">
                        Register a new product for {currentProject.name}
                    </p>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10" />
                    {steps.map((s) => (
                        <div key={s.id} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${step >= s.id
                                        ? "bg-[#064E3B] text-white"
                                        : "bg-slate-200 text-slate-400"
                                    }`}
                            >
                                {step > s.id ? <Check size={20} /> : <s.icon size={20} />}
                            </div>
                            <span
                                className={`text-xs font-medium transition-colors duration-300 ${step >= s.id ? "text-[#064E3B]" : "text-slate-400"
                                    }`}
                            >
                                {s.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <Card className="p-8 border-none shadow-lg bg-white min-h-[400px] flex flex-col">
                <div className="flex-1">
                    {step === 1 && (
                        <FadeIn>
                            <h2 className="text-xl font-bold text-[#064E3B] mb-6">Product Details</h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Product Name</label>
                                    <Input
                                        placeholder="e.g., Advanced Patient Monitor"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="h-12 text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Description</label>
                                    <textarea
                                        placeholder="Describe the product's intended use and key features..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full p-3 rounded-lg border border-slate-200 focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] outline-none min-h-[120px] resize-none text-slate-600 font-light"
                                    />
                                </div>
                            </div>
                        </FadeIn>
                    )}

                    {step === 2 && (
                        <FadeIn>
                            <h2 className="text-xl font-bold text-[#064E3B] mb-6">Target Markets</h2>
                            <p className="text-slate-500 mb-6 font-light">Select the regions where this product will be marketed.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: "usa", label: "United States (FDA)", desc: "21 CFR Part 820" },
                                    { id: "eu", label: "European Union (MDR)", desc: "EU MDR 2017/745" },
                                    { id: "uk", label: "United Kingdom (UKCA)", desc: "UK MDR 2002" },
                                    { id: "canada", label: "Canada (Health Canada)", desc: "SOR/98-282" },
                                ].map((market) => (
                                    <div
                                        key={market.id}
                                        onClick={() => toggleSelection("markets", market.id)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.markets.includes(market.id)
                                                ? "border-[#064E3B] bg-[#064E3B]/5"
                                                : "border-slate-100 hover:border-[#064E3B]/30"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`font-bold ${formData.markets.includes(market.id) ? "text-[#064E3B]" : "text-slate-700"}`}>
                                                {market.label}
                                            </span>
                                            {formData.markets.includes(market.id) && <Check size={18} className="text-[#064E3B]" />}
                                        </div>
                                        <span className="text-xs text-slate-500">{market.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    )}

                    {step === 3 && (
                        <FadeIn>
                            <h2 className="text-xl font-bold text-[#064E3B] mb-6">Classification & Standards</h2>

                            <div className="mb-8">
                                <label className="text-sm font-medium text-slate-700 mb-3 block">Risk Classification</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { id: "class1", label: "Class I", desc: "Low Risk" },
                                        { id: "class2", label: "Class II", desc: "Moderate Risk" },
                                        { id: "class3", label: "Class III", desc: "High Risk" },
                                    ].map((cls) => (
                                        <div
                                            key={cls.id}
                                            onClick={() => setFormData({ ...formData, classification: cls.id })}
                                            className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${formData.classification === cls.id
                                                    ? "border-[#064E3B] bg-[#064E3B]/5"
                                                    : "border-slate-100 hover:border-[#064E3B]/30"
                                                }`}
                                        >
                                            <div className={`font-bold mb-1 ${formData.classification === cls.id ? "text-[#064E3B]" : "text-slate-700"}`}>
                                                {cls.label}
                                            </div>
                                            <div className="text-xs text-slate-500">{cls.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-3 block">Applicable Standards</label>
                                <div className="space-y-3">
                                    {[
                                        { id: "iso13485", label: "ISO 13485:2016", desc: "Quality Management Systems" },
                                        { id: "iso14971", label: "ISO 14971:2019", desc: "Risk Management" },
                                        { id: "iec60601", label: "IEC 60601-1", desc: "Medical Electrical Equipment" },
                                        { id: "iec62304", label: "IEC 62304", desc: "Medical Device Software" },
                                    ].map((std) => (
                                        <div
                                            key={std.id}
                                            onClick={() => toggleSelection("regulations", std.id)}
                                            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${formData.regulations.includes(std.id)
                                                    ? "border-[#064E3B] bg-[#064E3B]/5"
                                                    : "border-slate-100 hover:border-[#064E3B]/30"
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${formData.regulations.includes(std.id) ? "bg-[#064E3B] border-[#064E3B]" : "border-slate-300"
                                                }`}>
                                                {formData.regulations.includes(std.id) && <Check size={14} className="text-white" />}
                                            </div>
                                            <div>
                                                <div className={`text-sm font-medium ${formData.regulations.includes(std.id) ? "text-[#064E3B]" : "text-slate-700"}`}>
                                                    {std.label}
                                                </div>
                                                <div className="text-xs text-slate-500">{std.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    )}

                    {step === 4 && (
                        <FadeIn>
                            <h2 className="text-xl font-bold text-[#064E3B] mb-6">Review & Create</h2>

                            <div className="bg-slate-50 rounded-xl p-6 space-y-6 border border-slate-100">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#064E3B]/10 flex items-center justify-center text-[#064E3B] flex-shrink-0">
                                        <Box size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#064E3B] text-lg">{formData.name}</h3>
                                        <p className="text-slate-500 font-light mt-1">{formData.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                                    <div>
                                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Markets</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {formData.markets.map(m => (
                                                <Badge key={m} variant="outline" className="uppercase">{m}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Classification</span>
                                        <div className="mt-2">
                                            <Badge variant="info" className="uppercase">{formData.classification}</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Standards</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.regulations.map(r => (
                                            <Badge key={r} variant="default" className="bg-slate-200 text-slate-700 border-none">{r}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 text-blue-700 rounded-lg text-sm">
                                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                                <p>
                                    Based on your selection, we will automatically generate a compliance checklist for
                                    <strong> {formData.classification === "class1" ? "Class I" : formData.classification === "class2" ? "Class II" : "Class III"} </strong>
                                    devices in <strong>{formData.markets.join(", ").toUpperCase()}</strong>.
                                </p>
                            </div>
                        </FadeIn>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between pt-8 mt-4 border-t border-slate-100">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={step === 1}
                        className={step === 1 ? "invisible" : ""}
                    >
                        Back
                    </Button>

                    {step < 4 ? (
                        <Button
                            onClick={handleNext}
                            className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white"
                            disabled={
                                (step === 1 && !formData.name) ||
                                (step === 2 && formData.markets.length === 0) ||
                                (step === 3 && !formData.classification)
                            }
                        >
                            Next Step <ChevronRight size={16} className="ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white shadow-lg shadow-[#064E3B]/20"
                        >
                            Create Product <Check size={16} className="ml-2" />
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    );
}
