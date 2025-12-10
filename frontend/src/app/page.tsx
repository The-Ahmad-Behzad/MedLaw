"use client";
import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/animations/FadeIn";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Prism from "@/components/effects/Prism";
import { CursorFollower } from "@/components/ui/CursorFollower";
import {
  ShieldCheck,
  FileText,
  CheckCircle,
  ArrowRight,
  Activity,
  Brain,
  Workflow,
  Shield,
  Users,
  Award,
  Clock,
  BarChart3,
} from "lucide-react";

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = React.useState(true);
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);


  const testimonials = [
    {
      quote: "MedTech Comply has revolutionized our regulatory workflow. We've cut our compliance time by 40% and the automated updates keep us ahead of changes.",
      author: "Sarah Chen",
      role: "Head of Quality, BioHealth Inc.",
      avatar: "SC"
    },
    {
      quote: "The intuitive interface and comprehensive checklists made our ISO 13485 certification process incredibly smooth. Highly recommended!",
      author: "Michael Ross",
      role: "Quality Director, BioSense Medical",
      avatar: "MR"
    },
    {
      quote: "The risk management tools are exceptional. We cut our FMEA process time in half and felt much more confident during our ISO 13485 audit.",
      author: "Dr. James Wilson",
      role: "CTO, NeuroLink Systems",
      avatar: "JW"
    },
    {
      quote: "Finally, a compliance platform that doesn't feel like legacy software. The UI is beautiful and the features are exactly what we needed.",
      author: "Elena Rodriguez",
      role: "Regulatory Affairs, OrthoGen",
      avatar: "ER"
    },
  ];

  const [itemsPerView, setItemsPerView] = React.useState(1);

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 2 : 1);
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / itemsPerView);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % totalPages);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const features = [
    {
      icon: FileText,
      title: "Document Management",
      description: "Centralized repository with version control and automated organization for all compliance documents.",
    },
    {
      icon: Brain,
      title: "AI Compliance Assistant",
      description: "Get instant, accurate answers to regulatory questions with AI-powered guidance.",
    },
    {
      icon: Activity,
      title: "Risk Management",
      description: "Comprehensive ISO 14971 risk management tools with FMEA and hazard analysis.",
    },
    {
      icon: Workflow,
      title: "Dynamic Checklists",
      description: "Pre-built checklists for FDA 21 CFR 820, ISO 13485, EU MDR, and HIPAA compliance.",
    },
    {
      icon: Shield,
      title: "Audit Trail Logging",
      description: "Complete audit trail for every action, ensuring FDA 21 CFR Part 11 compliance.",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Real-time visibility into your compliance status across all regulations.",
    },
  ];

  const stats = [
    { value: "500+", label: "Medical Device Companies" },
    { value: "99.9%", label: "Audit Success Rate" },
    { value: "10,000+", label: "Compliance Tasks Completed" },
    { value: "24/7", label: "AI Support Available" },
  ];

  const regulations = [
    "FDA 21 CFR 820",
    "FDA 21 CFR Part 11",
    "ISO 13485",
    "ISO 14971",
    "EU MDR",
    "HIPAA",
  ];



  return (
    <main className="min-h-screen bg-white cursor-none">
      <CursorFollower />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden min-h-[80vh] flex items-center bg-paleAqua">
        {/* Subtle Gradient Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-paleAqua to-paleAqua opacity-80"></div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="text-center max-w-5xl mx-auto">
            <FadeIn direction="up" delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-freshGreen animate-pulse"></span>
                <span className="text-sm font-medium text-slateGray">AI-Powered Compliance Platform</span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <h1 className="text-6xl lg:text-7xl font-bold text-forestGreen mb-8 leading-tight tracking-tight">
                Compliance made
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-deepTeal to-freshGreen">simple & intelligent</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.6}>
              <p className="text-xl lg:text-2xl text-slateGray mb-12 leading-relaxed max-w-3xl mx-auto font-light">
                The complete platform for FDA, ISO, and EU MDR compliance.
                Streamline your regulatory journey from concept to market with AI-driven automation.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.8}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-8 text-lg bg-deepTeal hover:bg-deepTeal/90 shadow-lg hover:shadow-xl transition-all rounded-full">
                    Start Free Trial <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-slate-300 hover:bg-slate-50 text-forestGreen rounded-full">
                    View Features
                  </Button>
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={1.0}>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slateGray font-light">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-freshGreen" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-freshGreen" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-freshGreen" />
                  <span>ISO 27001 Certified</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="text-4xl lg:text-5xl font-bold text-forestGreen mb-3 group-hover:text-deepTeal transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm font-light text-black  tracking-wider">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-surface-alt">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <h2 className="text-3xl lg:text-4xl font-bold text-forestGreen mb-6">
                Everything you need to stay compliant
              </h2>
              <p className="text-lg text-slateGray max-w-2xl mx-auto font-light leading-relaxed">
                A unified platform that replaces scattered spreadsheets and folders
                with intelligent compliance management.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="h-full p-8 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-paleAqua flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-deepTeal" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-forestGreen mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slateGray leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Regulations Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <h2 className="text-3xl lg:text-4xl font-bold text-forestGreen mb-6">
                All Major Regulations Covered
              </h2>
              <p className="text-lg text-slateGray font-light max-w-2xl mx-auto">
                Comprehensive support for global medical device regulations, ensuring you're always audit-ready.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {regulations.map((reg, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="p-4 rounded-xl border border-slate-100 bg-white hover:border-deepTeal/30 hover:bg-paleAqua/50 transition-all duration-300 flex flex-col items-center justify-center gap-3 group cursor-none h-32 text-center shadow-sm hover:shadow-md">
                  <div className="w-10 h-10 rounded-full bg-paleAqua/50 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm group-hover:bg-white">
                    <CheckCircle className="text-deepTeal" size={20} />
                  </div>
                  <span className="font-medium text-forestGreen text-sm group-hover:text-deepTeal transition-colors">{reg}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Carousel */}
      <section className="py-24 px-6 bg-surface-alt overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <h2 className="text-3xl lg:text-4xl font-bold text-forestGreen mb-6">
                Trusted by Industry Leaders
              </h2>
            </FadeIn>
          </div>

          <div className="relative px-4 md:px-12 ">
            <div className="overflow-hidden relative min-h-[320px] ">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * (100 / itemsPerView)}%)` }}
              >
                {testimonials.map((testimonial, i) => (
                  <div key={i} className={`flex-shrink-0 px-4 ${itemsPerView === 2 ? 'w-1/2' : 'w-full'}`}>
                    <div className="p-10 bg-white rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300">
                      <div className="mb-8 flex-grow">
                        <p className="text-forestGreen leading-relaxed text-xl font-light italic">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-3 pt-6 border-t border-slate-100 w-full">
                        <div className="w-16 h-16 rounded-full bg-deepTeal flex items-center justify-center text-white font-bold text-xl mb-2 shadow-md">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-forestGreen text-lg">{testimonial.author}</div>
                          <div className="text-sm text-slateGray">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 left-0 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-forestGreen hover:bg-deepTeal hover:text-white hover:border-deepTeal transition-all shadow-md z-10 group"
            >
              <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 right-0 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-forestGreen hover:bg-deepTeal hover:text-white hover:border-deepTeal transition-all shadow-md z-10 group"
            >
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-10">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-3 rounded-full transition-all duration-300 ${currentTestimonial === i
                    ? "bg-deepTeal w-8"
                    : "bg-slate-300 w-3 hover:bg-deepTeal/50"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl lg:text-4xl font-bold text-forestGreen mb-6">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-slateGray font-light mb-8">
                Choose the plan that fits your stage of growth
              </p>

              {/* Pricing Toggle */}
              <div className="inline-flex items-center p-1 bg-slate-100 rounded-full mb-8">
                <button
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isAnnual ? "bg-white text-forestGreen shadow-sm" : "text-slateGray hover:text-forestGreen"
                    }`}
                  onClick={() => setIsAnnual(false)}
                >
                  Monthly
                </button>
                <button
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isAnnual ? "bg-white text-forestGreen shadow-sm" : "text-slateGray hover:text-forestGreen"
                    }`}
                  onClick={() => setIsAnnual(true)}
                >
                  Yearly <span className="text-xs text-freshGreen font-bold ml-1">-20%</span>
                </button>
              </div>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Starter Plan */}
            <ScrollReveal delay={0.2}>
              <div className="p-8 bg-paleAqua/30 rounded-2xl border border-slate-200 hover:border-deepTeal/50 transition-all duration-300 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-forestGreen mb-2">Starter</h3>
                  <div className="text-4xl font-bold text-deepTeal mb-2">
                    ${isAnnual ? "159" : "199"}<span className="text-lg text-slateGray font-normal">/mo</span>
                  </div>
                  <p className="text-slateGray text-sm">For early-stage startups</p>
                </div>
                <Button variant="outline" className="w-full mb-8 border-slate-300 text-forestGreen hover:bg-slate-50 font-light">
                  Get Started
                </Button>
                <ul className="space-y-4 flex-grow">
                  {[
                    "1 User",
                    "Basic Templates",
                    "5GB Storage",
                    "Email Support",
                    "Core Checklists",
                    "Core Checklists"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slateGray">
                      <CheckCircle size={18} className="text-freshGreen flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Growth Plan */}
            <ScrollReveal delay={0.4}>
              <div className="p-8 bg-[#064E3B] rounded-2xl border border-[#064E3B] shadow-xl relative flex flex-col transform md:-translate-y-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-freshGreen text-white text-xs font-light px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
                </div>
                <div className="mb-8 pt-4">
                  <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
                  <div className="text-4xl font-bold text-white mb-2">
                    ${isAnnual ? "399" : "499"}<span className="text-lg text-white font-light">/mo</span>
                  </div>
                  <p className="text-white text-sm">For scaling teams</p>
                </div>
                <Button className="w-full mb-8 bg-freshGreen hover:bg-freshGreen/90 text-white border-none font-light">
                  Start Free Trial
                </Button>
                <ul className="space-y-4 flex-grow">
                  {[
                    "5 Users",
                    "Advanced AI Assistant",
                    "ISO 13485 & FDA Checklists",
                    "50GB Storage",
                    "Priority Support",
                    "Custom Templates",
                    "Audit Trail Export",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle size={18} className="text-freshGreen flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Enterprise Plan */}
            <ScrollReveal delay={0.6}>
              <div className="p-8 bg-paleAqua/30 rounded-2xl border border-slate-200 hover:border-deepTeal/50 transition-all duration-300 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-forestGreen mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-deepTeal mb-2">Custom</div>
                  <p className="text-slateGray text-sm">For large organizations</p>
                </div>
                <Button variant="outline" className="w-full mb-8 border-slate-300 text-forestGreen hover:bg-slate-50 font-light">
                  Contact Sales
                </Button>
                <ul className="space-y-4 flex-grow">
                  {[
                    "Unlimited Users",
                    "Custom Integrations",
                    "Dedicated Support",
                    "Unlimited Storage",
                    "SLA Guarantee",
                    "Training Sessions",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slateGray">
                      <CheckCircle size={18} className="text-freshGreen flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center p-12 lg:p-16 bg-[#064E3B] rounded-3xl text-white relative overflow-hidden">
              {/* Abstract Background Shapes */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-freshGreen rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-deepTeal rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
                  Ready to streamline your compliance?
                </h2>
                <p className="text-xl mb-10 text-white max-w-2xl mx-auto font-light">
                  Join hundreds of MedTech companies using our platform to bring safe products to market faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="h-14 px-8 text-lg bg-freshGreen text-forestGreen hover:bg-freshGreen/90 w-full sm:w-auto rounded-full font-light text-white"
                    >
                      Start Free Trial <ArrowRight size={20} className="ml-2" />
                    </Button>
                  </Link>
                  <Link href="#pricing">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 text-lg border-white text-white hover:bg-white/5 w-full sm:w-auto rounded-full font-light"
                    >
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
