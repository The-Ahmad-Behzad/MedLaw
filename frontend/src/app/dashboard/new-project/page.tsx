"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/animations/FadeIn";
import {
    ChevronRight,
    ChevronLeft,
    Check,
    Globe,
    Shield,
    Activity,
    Zap,
    FileText,
    Stethoscope,
    Cpu,
    Box,
} from "lucide-react";
import Link from "next/link";
import { useProject } from "@/context/ProjectContext";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
    const { addProject } = useProject();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "",
        markets: [] as string[],
        classification: "",
        standards: [] as string[],
    });

    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            // Create Project
            addProject({
                name: formData.name,
                description: formData.description,
                type: formData.type,
                markets: formData.markets,
                classification: formData.classification,
                standards: formData.standards,
            });
            router.push("/dashboard");
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const toggleMarket = (market: string) => {
        setFormData((prev) => ({
            ...prev,
            markets: prev.markets.includes(market)
                ? prev.markets.filter((m) => m !== market)
                : [...prev.markets, market],
        }));
    };

    const toggleStandard = (standard: string) => {
        setFormData((prev) => ({
            ...prev,
            standards: prev.standards.includes(standard)
                ? prev.standards.filter((s) => s !== standard)
                : [...prev.standards, standard],
        }));
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
                    <Input
                        placeholder="e.g., Apollo X-Ray System"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white border-slate-200 focus:border-[#064E3B] focus:ring-[#064E3B]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description & Intended Use</label>
                    <textarea
                        className="w-full p-3 rounded-lg border border-slate-200 focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] outline-none min-h-[100px] text-sm"
                        placeholder="Describe the device and its medical purpose..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Device Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { id: "hardware", label: "Hardware / Physical", icon: Box },
                            { id: "software", label: "SaMD (Software)", icon: Cpu },
                            { id: "hybrid", label: "Hybrid System", icon: Activity },
                        ].map((type) => (
                            <div
                                key={type.id}
                                onClick={() => setFormData({ ...formData, type: type.id })}
                                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center gap-3 ${formData.type === type.id
                                    ? "border-[#064E3B] bg-[#064E3B]/5 text-[#064E3B]"
                                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                                    }`}
                            >
                                <type.icon size={24} />
                                <span className="font-medium text-sm">{type.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-[#064E3B] mb-4">Target Markets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { id: "usa", label: "United States (FDA)", icon: Globe },
                        { id: "eu", label: "European Union (MDR)", icon: Globe },
                        { id: "canada", label: "Canada (Health Canada)", icon: Globe },
                        { id: "uk", label: "United Kingdom (UKCA)", icon: Globe },
                    ].map((market) => (
                        <div
                            key={market.id}
                            onClick={() => toggleMarket(market.id)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${formData.markets.includes(market.id)
                                ? "border-[#064E3B] bg-[#064E3B]/5 text-[#064E3B]"
                                : "border-slate-200 hover:border-slate-300 text-slate-600"
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.markets.includes(market.id) ? "bg-[#064E3B] text-white" : "bg-slate-100 text-slate-400"
                                }`}>
                                <market.icon size={20} />
                            </div>
                            <span className="font-medium">{market.label}</span>
                            {formData.markets.includes(market.id) && <Check size={18} className="ml-auto" />}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-[#064E3B] mb-4">Risk Classification</h3>
                <p className="text-sm text-slate-500 mb-4">Based on your device type, please select the estimated risk class.</p>
                <div className="space-y-3">
                    {[
                        { id: "class1", label: "Class I (Low Risk)", desc: "Non-invasive, low impact (e.g., bandages)" },
                        { id: "class2", label: "Class II / IIa / IIb (Moderate Risk)", desc: "X-Ray, MRI, Infusion pumps" },
                        { id: "class3", label: "Class III (High Risk)", desc: "Implants, Life-sustaining devices" },
                    ].map((cls) => (
                        <div
                            key={cls.id}
                            onClick={() => setFormData({ ...formData, classification: cls.id })}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.classification === cls.id
                                ? "border-[#064E3B] bg-[#064E3B]/5"
                                : "border-slate-200 hover:border-slate-300"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className={`font-bold ${formData.classification === cls.id ? "text-[#064E3B]" : "text-slate-700"}`}>
                                    {cls.label}
                                </span>
                                {formData.classification === cls.id && <Check size={18} className="text-[#064E3B]" />}
                            </div>
                            <p className="text-sm text-slate-500">{cls.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-[#064E3B] mb-2">Recommended Standards</h3>
                <p className="text-sm text-slate-500 mb-6">
                    Based on your selection (X-Ray / Class II), we recommend the following compliance framework.
                </p>

                <div className="grid grid-cols-1 gap-4">
                    {[
                        { id: "iso13485", label: "ISO 13485:2016", desc: "Quality Management Systems", required: true },
                        { id: "iso14971", label: "ISO 14971:2019", desc: "Risk Management", required: true },
                        { id: "iec62304", label: "IEC 62304", desc: "Medical Device Software", required: formData.type !== "hardware" },
                        { id: "iec60601", label: "IEC 60601-1", desc: "Basic Safety & Essential Performance", required: formData.type !== "software" },
                        { id: "fda820", label: "FDA 21 CFR Part 820", desc: "Quality System Regulation", required: formData.markets.includes("usa") },
                        { id: "mdr", label: "EU MDR 2017/745", desc: "Medical Device Regulation", required: formData.markets.includes("eu") },
                    ].map((std) => (
                        <div
                            key={std.id}
                            onClick={() => toggleStandard(std.id)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${formData.standards.includes(std.id) || std.required
                                ? "border-[#064E3B] bg-white shadow-sm"
                                : "border-slate-200 opacity-60"
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${formData.standards.includes(std.id) || std.required ? "bg-[#064E3B]/10 text-[#064E3B]" : "bg-slate-100 text-slate-400"
                                }`}>
                                <Shield size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-800">{std.label}</span>
                                    {std.required && <Badge variant="default" size="sm" className="bg-amber-50 text-amber-600 border-none">Recommended</Badge>}
                                </div>
                                <p className="text-sm text-slate-500">{std.desc}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${formData.standards.includes(std.id) || std.required
                                ? "bg-[#064E3B] border-[#064E3B] text-white"
                                : "border-slate-300"
                                }`}>
                                {(formData.standards.includes(std.id) || std.required) && <Check size={14} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="text-[#064E3B]" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-[#064E3B]">Ready to Launch!</h2>
            <p className="text-slate-500 max-w-md mx-auto">
                We've configured your workspace for <strong>{formData.name}</strong>.
                Your compliance roadmap includes <strong>{formData.standards.length + 4} standards</strong> and
                targets <strong>{formData.markets.length} markets</strong>.
            </p>

            <div className="flex justify-center gap-4 pt-4">
                <Button variant="outline" className="border-slate-200 text-slate-600" onClick={() => router.push("/dashboard")}>
                    Back to Dashboard
                </Button>
                <Button className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white px-8" onClick={handleNext}>
                    Go to Project Workspace
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-3xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[#064E3B] mb-2">New Project Setup</h1>
                    <p className="text-slate-500">Let's configure your compliance workspace</p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between items-center mb-8 px-12">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex flex-col items-center relative z-10">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step >= s
                                    ? "bg-[#064E3B] text-white shadow-lg scale-110"
                                    : "bg-white text-slate-300 border-2 border-slate-200"
                                    }`}
                            >
                                {step > s ? <Check size={20} /> : s}
                            </div>
                            <span className={`text-xs mt-2 font-medium ${step >= s ? "text-[#064E3B]" : "text-slate-300"}`}>
                                {s === 1 ? "Basics" : s === 2 ? "Market" : s === 3 ? "Compliance" : "Launch"}
                            </span>
                        </div>
                    ))}
                    {/* Progress Bar Background */}
                    <div className="absolute left-0 w-full h-0.5 bg-slate-200 top-5 -z-0 hidden md:block" />
                    {/* Active Progress Bar */}
                    <div
                        className="absolute left-0 h-0.5 bg-[#064E3B] top-5 -z-0 transition-all duration-500 hidden md:block"
                        style={{ width: `${((step - 1) / 3) * 100}%` }}
                    />
                </div>

                <FadeIn>
                    <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        {step === 4 && renderStep4()}

                        {/* Navigation Buttons */}
                        {step < 4 && (
                            <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    disabled={step === 1}
                                    className={`${step === 1 ? "invisible" : ""} text-slate-500 hover:text-slate-800`}
                                >
                                    <ChevronLeft size={18} className="mr-2" /> Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white px-8 shadow-lg shadow-[#064E3B]/20"
                                >
                                    {step === 3 ? "Finish Setup" : "Continue"} <ChevronRight size={18} className="ml-2" />
                                </Button>
                            </div>
                        )}
                    </Card>
                </FadeIn>
            </div>
        </div>
    );
}
