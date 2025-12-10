"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "../ui/Button";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "Solutions", href: "#solutions" },
        { name: "Pricing", href: "#pricing" },
        { name: "Resources", href: "#resources" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-deepTeal to-freshGreen rounded-xl rotate-3 group-hover:rotate-6 transition-transform duration-300 shadow-lg"></div>
                        <div className="absolute inset-0 bg-forestGreen rounded-xl -rotate-3 group-hover:-rotate-6 transition-transform duration-300 opacity-90"></div>
                        <ShieldCheck size={20} className="relative text-white z-10" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-almarai font-bold text-xl text-forestGreen tracking-tight leading-none">
                            MedTech
                        </span>
                        <span className="text-xs font-medium text-deepTeal tracking-widest uppercase">
                            Comply
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-forestGreen/70 hover:text-deepTeal font-medium transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="primary" size="sm" className="shadow-deepTeal/20">
                            Get Started
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-forestGreen"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 md:hidden shadow-xl flex flex-col gap-4 animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-forestGreen font-medium py-2 border-b border-slate-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 mt-4">
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="primary" className="w-full">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
