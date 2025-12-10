import React from "react";
import Link from "next/link";
import { ShieldCheck, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#064E3B] text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-freshGreen to-deepTeal flex items-center justify-center text-white">
                                <ShieldCheck size={18} />
                            </div>
                            <span className="font-almarai font-bold text-xl tracking-tight">
                                MedTechComply
                            </span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            The all-in-one compliance platform for medical device startups.
                            Streamline FDA & ISO compliance with AI-powered guidance.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-300 hover:text-freshGreen transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-slate-300 hover:text-freshGreen transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="text-slate-300 hover:text-freshGreen transition-colors">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-lg">Product</h4>
                        <ul className="space-y-4 text-slate-300 text-sm">
                            <li><Link href="#" className="hover:text-freshGreen transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-freshGreen transition-colors">Integrations</Link></li>
                            <li><Link href="#" className="hover:text-freshGreen transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-freshGreen transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-lg">Resources</h4>
                        <ul className="space-y-4 text-slate-300 text-sm">
                            <li><Link href="#" className="hover:text-freshGreen transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-freshGreen transition-colors">API Reference</Link></li>
                            <li><Link href="#" className="hover:text-freshGreen transition-colors">Community</Link></li>
                            <li><Link href="#" className="hover:text-freshGreen transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-lg">Company</h4>
                        <ul className="space-y-4 text-slate-300 text-sm">
                            <li><Link href="#" className="hover:text-freshGreen transition-colors">About</Link></li>
                            <li><Link href="#" className="hover:text-freshGreen transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-freshGreen transition-colors">Legal</Link></li>
                            <li><Link href="#" className="hover:text-freshGreen transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                    <p>© 2024 MedTech Compliance SaaS. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
