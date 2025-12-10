"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  User,
  Building,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Upload,
  Key,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Company Profile", icon: Building },
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "regulations", label: "Regulations", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  const regulations = [
    { name: "FDA 21 CFR 820", enabled: true },
    { name: "FDA 21 CFR Part 11", enabled: true },
    { name: "ISO 13485", enabled: true },
    { name: "ISO 14971", enabled: true },
    { name: "EU MDR", enabled: true },
    { name: "HIPAA", enabled: false },
    { name: "GDPR", enabled: false },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[#064E3B] mb-1">Settings</h1>
          <p className="text-slate-500 font-light text-sm">
            Manage your account and company preferences
          </p>
        </div>
        <Badge variant="info" className="bg-blue-50 text-blue-600 border-none">
          Growth Plan
        </Badge>
      </div>

      {/* Tabs */}
      <Card className="p-2 border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${activeTab === tab.id
                  ? "bg-[#064E3B] text-white font-medium shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
                }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <>
            <div className="lg:col-span-2 space-y-6">
              <FadeIn>
                <Card className="p-6 border border-slate-200 bg-white shadow-sm">
                  <h3 className="text-lg font-bold text-[#064E3B] mb-6">
                    Company Information
                  </h3>
                  <div className="space-y-4">
                    <Input label="Company Name" defaultValue="MedTech Innovations Inc." />
                    <Input label="Industry" defaultValue="Medical Devices" />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="Company Size" defaultValue="11-50 employees" />
                      <Input label="Country" defaultValue="United States" />
                    </div>
                    <Input label="Address" defaultValue="123 Innovation Drive" />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="City" defaultValue="San Francisco" />
                      <Input label="State" defaultValue="California" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="ZIP Code" defaultValue="94105" />
                      <Input label="Phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <Input label="Website" defaultValue="www.medtechinnovations.com" />
                  </div>
                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-100">
                    <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                    <Button size="sm" className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white">
                      <Save size={16} className="mr-2" /> Save Changes
                    </Button>
                  </div>
                </Card>
              </FadeIn>

              <FadeIn delay={0.1}>
                <Card className="p-6 border border-slate-200 bg-white shadow-sm">
                  <h3 className="text-lg font-bold text-[#064E3B] mb-6">
                    Company Logo
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-lg bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center">
                      <Building className="text-slate-400" size={32} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500 mb-3 font-light">
                        Upload your company logo. Recommended size: 256x256px. Max file size: 2MB.
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                          <Upload size={16} className="mr-2" /> Upload Logo
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>

            <div className="space-y-6">
              <FadeIn delay={0.2}>
                <Card className="p-6 border border-slate-200 bg-white shadow-sm">
                  <h3 className="text-base font-bold text-[#064E3B] mb-4">
                    Quick Stats
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Team Members</p>
                      <p className="text-2xl font-bold text-[#064E3B]">12</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Documents</p>
                      <p className="text-2xl font-bold text-[#064E3B]">248</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Compliance Score</p>
                      <p className="text-2xl font-bold text-green-600">87%</p>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>
          </>
        )}

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="lg:col-span-2 space-y-6">
            <FadeIn>
              <Card className="p-6 border border-slate-200 bg-white shadow-sm">
                <h3 className="text-lg font-bold text-[#064E3B] mb-6">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="First Name" defaultValue="John" />
                    <Input label="Last Name" defaultValue="Doe" />
                  </div>
                  <Input label="Email" type="email" defaultValue="john.doe@medtechinnovations.com" />
                  <Input label="Phone" defaultValue="+1 (555) 123-4567" />
                  <Input label="Job Title" defaultValue="Quality Manager" />
                  <Input label="Department" defaultValue="Quality Assurance" />
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-100">
                  <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                  <Button size="sm" className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white">
                    <Save size={16} className="mr-2" /> Save Changes
                  </Button>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="p-6 border border-slate-200 bg-white shadow-sm">
                <h3 className="text-lg font-bold text-[#064E3B] mb-6">
                  Change Password
                </h3>
                <div className="space-y-4">
                  <Input label="Current Password" type="password" />
                  <Input label="New Password" type="password" />
                  <Input label="Confirm New Password" type="password" />
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-100">
                  <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                  <Button size="sm" className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white">
                    <Key size={16} className="mr-2" /> Update Password
                  </Button>
                </div>
              </Card>
            </FadeIn>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="lg:col-span-2 space-y-6">
            <FadeIn>
              <Card className="p-6 border border-slate-200 bg-white shadow-sm">
                <h3 className="text-lg font-bold text-[#064E3B] mb-6">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Regulatory Updates", desc: "Get notified when regulations change" },
                    { title: "Deadline Reminders", desc: "Receive alerts for upcoming deadlines" },
                    { title: "Team Activity", desc: "Notifications for team member actions" },
                    { title: "Document Approvals", desc: "Alerts when documents need approval" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <div>
                        <p className="font-semibold text-[#064E3B] mb-1 text-sm">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500 font-light">
                          {item.desc}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#064E3B]"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-100">
                  <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                  <Button size="sm" className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white">
                    <Save size={16} className="mr-2" /> Save Preferences
                  </Button>
                </div>
              </Card>
            </FadeIn>
          </div>
        )}

        {/* Regulations Tab */}
        {activeTab === "regulations" && (
          <div className="lg:col-span-2 space-y-6">
            <FadeIn>
              <Card className="p-6 border border-slate-200 bg-white shadow-sm">
                <h3 className="text-lg font-bold text-[#064E3B] mb-6">
                  Active Regulations
                </h3>
                <p className="text-sm text-slate-500 mb-6 font-light">
                  Select which regulations apply to your medical device. This will generate relevant checklists and templates.
                </p>
                <div className="space-y-3">
                  {regulations.map((reg, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="text-[#064E3B]" size={18} />
                        <span className="font-medium text-slate-700 text-sm">
                          {reg.name}
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={reg.enabled}
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#064E3B]"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-100">
                  <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                  <Button size="sm" className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white">
                    <Save size={16} className="mr-2" /> Save Regulations
                  </Button>
                </div>
              </Card>
            </FadeIn>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="lg:col-span-2 space-y-6">
            <FadeIn>
              <Card className="p-6 border border-slate-200 bg-white shadow-sm">
                <h3 className="text-lg font-bold text-[#064E3B] mb-6">
                  Two-Factor Authentication
                </h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200 mb-6">
                  <div>
                    <p className="font-semibold text-[#064E3B] mb-1 text-sm">
                      Enable 2FA
                    </p>
                    <p className="text-xs text-slate-500 font-light">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#064E3B]"></div>
                  </label>
                </div>
                <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                  <Key size={16} className="mr-2" /> Configure 2FA
                </Button>
              </Card>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="p-6 border border-slate-200 bg-white shadow-sm">
                <h3 className="text-lg font-bold text-[#064E3B] mb-6">
                  Active Sessions
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div>
                      <p className="font-semibold text-[#064E3B] mb-1 text-sm">
                        Windows PC - Chrome
                      </p>
                      <p className="text-xs text-slate-500 font-light">
                        San Francisco, CA • Last active: Now
                      </p>
                    </div>
                    <Badge variant="success" size="sm" className="bg-green-50 text-green-600 border-none">Current</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div>
                      <p className="font-semibold text-[#064E3B] mb-1 text-sm">
                        iPhone - Safari
                      </p>
                      <p className="text-xs text-slate-500 font-light">
                        San Francisco, CA • Last active: 2 hours ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 h-8 text-xs">
                      Revoke
                    </Button>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === "billing" && (
          <div className="lg:col-span-2 space-y-6">
            <FadeIn>
              <Card className="p-6 border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#064E3B]">
                    Current Plan
                  </h3>
                  <Badge variant="info" className="bg-blue-50 text-blue-600 border-none">Growth Plan</Badge>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-sm">Monthly Billing</span>
                    <span className="font-bold text-[#064E3B]">$299/month</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-sm">Next Billing Date</span>
                    <span className="font-semibold text-[#064E3B] text-sm">January 15, 2026</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-sm">Payment Method</span>
                    <span className="font-semibold text-[#064E3B] text-sm">•••• •••• •••• 4242</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                    <CreditCard size={16} className="mr-2" /> Update Payment
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                    View Invoices
                  </Button>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="p-6 border border-slate-200 bg-white shadow-sm">
                <h3 className="text-lg font-bold text-[#064E3B] mb-6">
                  Usage Statistics
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Documents</p>
                    <p className="text-xl font-bold text-[#064E3B]">248 / 500</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Team Members</p>
                    <p className="text-xl font-bold text-[#064E3B]">12 / 25</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Storage</p>
                    <p className="text-xl font-bold text-[#064E3B]">8.4 GB / 50 GB</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">API Calls</p>
                    <p className="text-xl font-bold text-[#064E3B]">12,450 / 50k</p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        )}
      </div>
    </div>
  );
}
