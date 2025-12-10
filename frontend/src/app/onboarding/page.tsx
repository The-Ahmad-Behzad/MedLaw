"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/animations/FadeIn";
import {
    ShieldCheck,
    CheckCircle,
    ArrowRight,
    ArrowLeft,
    Building2,
    Stethoscope,
    FileText,
    Check,
} from "lucide-react";
import { cn } from "@/components/ui/Button";

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        companyName: "",
        industry: "",
        companySize: "",
        country: "",
        productName: "",
        productCategory: [] as string[],
        productDescription: "",
        markets: [] as string[],
        regulations: [] as string[],
    });

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
        else router.push("/dashboard");
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const toggleSelection = (field: "productCategory" | "markets" | "regulations", value: string) => {
        setFormData((prev) => {
            const current = prev[field];
            const updated = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];
            return { ...prev, [field]: updated };
        });
    };

    const steps = [
        { id: 1, title: "Company Info", icon: Building2 },
        { id: 2, title: "Product Details", icon: Stethoscope },
        { id: 3, title: "Regulations", icon: FileText },
        { id: 4, title: "Summary", icon: CheckCircle },
    ];

    return (
        <div className="min-h-screen bg-paleAqua flex flex-col">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-freshGreen to-deepTeal flex items-center justify-center text-white">
                            <ShieldCheck size={18} />
                        </div>
                        <span className="font-almarai font-bold text-lg text-forestGreen">
                            MedTechComply
                        </span>
                    </div>
                    <div className="text-sm text-slateGray">
                        Step {step} of 4
                    </div>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-1">
                <div
                    className="bg-deepTeal h-full transition-all duration-500 ease-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                />
            </div>

            <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-freshGreen/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-deepTeal/5 rounded-full blur-3xl" />
                </div>

                <div className="w-full max-w-3xl">
                    <FadeIn key={step} direction="up" className="w-full">
                        <Card className="p-8 md:p-12 border-white/60 shadow-xl bg-white/80">
                            {/* Step 1: Company Info */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-bold text-forestGreen mb-2">Tell us about your company</h2>
                                        <p className="text-slateGray">We'll customize your compliance experience based on your profile.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Company Name"
                                            placeholder="e.g. BioTech Innovations"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        />
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-forestGreen/80 ml-1">Industry</label>
                                            <select
                                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slateGray/20 focus:outline-none focus:ring-2 focus:ring-deepTeal/20 focus:border-deepTeal text-forestGreen"
                                                value={formData.industry}
                                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                            >
                                                <option value="">Select Industry</option>
                                                <option value="Medical Device">Medical Device</option>
                                                <option value="SaMD">Software as a Medical Device (SaMD)</option>
                                                <option value="Digital Health">Digital Health</option>
                                                <option value="Pharma">Pharmaceutical</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-forestGreen/80 ml-1">Company Size</label>
                                            <select
                                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slateGray/20 focus:outline-none focus:ring-2 focus:ring-deepTeal/20 focus:border-deepTeal text-forestGreen"
                                                value={formData.companySize}
                                                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                                            >
                                                <option value="">Select Size</option>
                                                <option value="1-10">1-10 Employees</option>
                                                <option value="11-50">11-50 Employees</option>
                                                <option value="51-200">51-200 Employees</option>
                                                <option value="200+">200+ Employees</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-forestGreen/80 ml-1">Country/Region</label>
                                            <select
                                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slateGray/20 focus:outline-none focus:ring-2 focus:ring-deepTeal/20 focus:border-deepTeal text-forestGreen"
                                                value={formData.country}
                                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                            >
                                                <option value="">Select Country</option>
                                                <option value="US">United States</option>
                                                <option value="EU">European Union</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="CA">Canada</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Product Details */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-bold text-forestGreen mb-2">Describe your product</h2>
                                        <p className="text-slateGray">This helps us identify the relevant regulations.</p>
                                    </div>

                                    <Input
                                        label="Product Name"
                                        placeholder="e.g. CardioMonitor X1"
                                        value={formData.productName}
                                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                    />

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-forestGreen/80 ml-1">Product Category</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {["Class I Device", "Class II Device", "Class III Device", "SaMD", "IVD", "Wellness Tool"].map((cat) => (
                                                <div
                                                    key={cat}
                                                    onClick={() => toggleSelection("productCategory", cat)}
                                                    className={cn(
                                                        "p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3",
                                                        formData.productCategory.includes(cat)
                                                            ? "border-deepTeal bg-deepTeal/5 text-deepTeal"
                                                            : "border-slateGray/20 hover:border-deepTeal/50"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border flex items-center justify-center",
                                                        formData.productCategory.includes(cat) ? "border-deepTeal bg-deepTeal" : "border-slate-300"
                                                    )}>
                                                        {formData.productCategory.includes(cat) && <Check size={12} className="text-white" />}
                                                    </div>
                                                    <span className="text-sm font-medium">{cat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-forestGreen/80 ml-1">Intended Markets</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["United States (FDA)", "Europe (MDR)", "Canada (Health Canada)", "UK (MHRA)", "Australia (TGA)"].map((market) => (
                                                <button
                                                    key={market}
                                                    onClick={() => toggleSelection("markets", market)}
                                                    className={cn(
                                                        "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                                                        formData.markets.includes(market)
                                                            ? "bg-deepTeal text-white border-deepTeal"
                                                            : "bg-white border-slateGray/20 text-slateGray hover:border-deepTeal/50"
                                                    )}
                                                >
                                                    {market}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Regulations */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-bold text-forestGreen mb-2">Select Regulations</h2>
                                        <p className="text-slateGray">Based on your inputs, we recommend the following frameworks.</p>
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            { id: "FDA 21 CFR 820", name: "FDA 21 CFR Part 820", desc: "Quality System Regulation for Medical Devices" },
                                            { id: "ISO 13485", name: "ISO 13485:2016", desc: "Medical devices — Quality management systems" },
                                            { id: "ISO 14971", name: "ISO 14971:2019", desc: "Application of risk management to medical devices" },
                                            { id: "EU MDR", name: "EU MDR 2017/745", desc: "European Medical Device Regulation" },
                                            { id: "IEC 62304", name: "IEC 62304", desc: "Medical device software — Software life cycle processes" },
                                            { id: "HIPAA", name: "HIPAA", desc: "Health Insurance Portability and Accountability Act" },
                                        ].map((reg) => (
                                            <div
                                                key={reg.id}
                                                onClick={() => toggleSelection("regulations", reg.id)}
                                                className={cn(
                                                    "p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4",
                                                    formData.regulations.includes(reg.id)
                                                        ? "border-deepTeal bg-deepTeal/5"
                                                        : "border-slateGray/20 hover:border-deepTeal/50"
                                                )}
                                            >
                                                <div className={cn(
                                                    "mt-1 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0",
                                                    formData.regulations.includes(reg.id) ? "border-deepTeal bg-deepTeal" : "border-slate-300"
                                                )}>
                                                    {formData.regulations.includes(reg.id) && <Check size={14} className="text-white" />}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-forestGreen">{reg.name}</h3>
                                                    <p className="text-sm text-slateGray">{reg.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Summary */}
                            {step === 4 && (
                                <div className="space-y-8">
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-freshGreen/20 rounded-full flex items-center justify-center text-freshGreen mx-auto mb-4">
                                            <CheckCircle size={32} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-forestGreen mb-2">You're all set!</h2>
                                        <p className="text-slateGray">We've generated your compliance plan.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="text-3xl font-bold text-deepTeal mb-1">12</div>
                                            <div className="text-xs text-slateGray uppercase tracking-wide">Checklists Generated</div>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="text-3xl font-bold text-deepTeal mb-1">45</div>
                                            <div className="text-xs text-slateGray uppercase tracking-wide">Required Documents</div>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="text-3xl font-bold text-deepTeal mb-1">3 mo</div>
                                            <div className="text-xs text-slateGray uppercase tracking-wide">Est. Timeline</div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                                        <div className="flex justify-between border-b border-slate-100 pb-4">
                                            <span className="text-slateGray">Company</span>
                                            <span className="font-medium text-forestGreen">{formData.companyName || "Not specified"}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 pb-4">
                                            <span className="text-slateGray">Product</span>
                                            <span className="font-medium text-forestGreen">{formData.productName || "Not specified"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slateGray">Regulations</span>
                                            <span className="font-medium text-forestGreen text-right">
                                                {formData.regulations.length > 0 ? formData.regulations.join(", ") : "None selected"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    disabled={step === 1}
                                    className={step === 1 ? "invisible" : ""}
                                >
                                    <ArrowLeft size={18} className="mr-2" /> Back
                                </Button>
                                <Button onClick={handleNext} className="shadow-deepTeal/20">
                                    {step === 4 ? "Go to Dashboard" : "Next Step"}
                                    {step !== 4 && <ArrowRight size={18} className="ml-2" />}
                                </Button>
                            </div>
                        </Card>
                    </FadeIn>
                </div>
            </main>
        </div>
    );
}
