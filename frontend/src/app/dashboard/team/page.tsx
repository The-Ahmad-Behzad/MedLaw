"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { FadeIn } from "@/components/animations/FadeIn";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Modal } from "@/components/ui/Modal";
import {
    User,
    Mail,
    Shield,
    MoreVertical,
    Plus,
    Search,
    Filter,
    CheckCircle,
    XCircle,
    Clock,
} from "lucide-react";

export default function TeamPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [newMember, setNewMember] = useState({
        name: "",
        email: "",
        role: "Viewer",
        department: "Engineering"
    });

    const [teamMembers, setTeamMembers] = useState([
        {
            id: 1,
            name: "Sarah Chen",
            email: "sarah.chen@medtechinnovations.com",
            role: "Admin",
            department: "Quality Assurance",
            status: "Active",
            lastActive: "Now",
            avatar: "SC",
        },
        {
            id: 2,
            name: "Michael Rodriguez",
            email: "m.rodriguez@medtechinnovations.com",
            role: "Editor",
            department: "Engineering",
            status: "Active",
            lastActive: "2 hours ago",
            avatar: "MR",
        },
        {
            id: 3,
            name: "Emily Watson",
            email: "emily.watson@medtechinnovations.com",
            role: "Viewer",
            department: "Regulatory Affairs",
            status: "Active",
            lastActive: "Yesterday",
            avatar: "EW",
        },
        {
            id: 4,
            name: "David Kim",
            email: "david.kim@medtechinnovations.com",
            role: "Editor",
            department: "Product Management",
            status: "Offline",
            lastActive: "3 days ago",
            avatar: "DK",
        },
        {
            id: 5,
            name: "Jessica Lee",
            email: "jessica.lee@medtechinnovations.com",
            role: "Viewer",
            department: "Clinical Operations",
            status: "Invited",
            lastActive: "-",
            avatar: "JL",
        },
    ]);

    const handleInvite = () => {
        if (!newMember.name || !newMember.email) return;

        const member = {
            id: teamMembers.length + 1,
            name: newMember.name,
            email: newMember.email,
            role: newMember.role,
            department: newMember.department,
            status: "Invited",
            lastActive: "-",
            avatar: newMember.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2),
        };

        setTeamMembers([...teamMembers, member]);
        setIsInviteModalOpen(false);
        setNewMember({ name: "", email: "", role: "Viewer", department: "Engineering" });
    };

    const filteredMembers = teamMembers.filter(
        (member) =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#064E3B] mb-1">Team Management</h1>
                    <p className="text-slate-500 font-light text-sm">
                        Manage your team members and their access permissions
                    </p>
                </div>
                <Button
                    size="sm"
                    className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white shadow-sm"
                    onClick={() => setIsInviteModalOpen(true)}
                >
                    <Plus size={16} className="mr-2" /> Invite Member
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FadeIn delay={0.1}>
                    <Card className="p-4 border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500 uppercase tracking-wider">Total Members</span>
                            <span className="text-2xl font-bold text-[#064E3B]">{teamMembers.length}</span>
                        </div>
                    </Card>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <Card className="p-4 border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500 uppercase tracking-wider">Active Now</span>
                            <span className="text-2xl font-bold text-green-600">
                                {teamMembers.filter(m => m.lastActive === "Now").length}
                            </span>
                        </div>
                    </Card>
                </FadeIn>
                <FadeIn delay={0.3}>
                    <Card className="p-4 border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500 uppercase tracking-wider">Admins</span>
                            <span className="text-2xl font-bold text-[#064E3B]">
                                {teamMembers.filter(m => m.role === "Admin").length}
                            </span>
                        </div>
                    </Card>
                </FadeIn>
                <FadeIn delay={0.4}>
                    <Card className="p-4 border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-slate-500 uppercase tracking-wider">Pending Invites</span>
                            <span className="text-2xl font-bold text-orange-500">
                                {teamMembers.filter(m => m.status === "Invited").length}
                            </span>
                        </div>
                    </Card>
                </FadeIn>
            </div>

            {/* Filters & Search */}
            <Card className="p-4 border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <Input
                            placeholder="Search by name, email, or department..."
                            className="pl-10 bg-slate-50 border-slate-200 focus:border-[#064E3B] focus:ring-[#064E3B]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                            <Filter size={16} className="mr-2" /> Filter
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Team List */}
            <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-medium">Member</th>
                                <th className="px-6 py-3 font-medium">Role</th>
                                <th className="px-6 py-3 font-medium">Department</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Last Active</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredMembers.map((member, i) => (
                                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center font-bold text-xs">
                                                {member.avatar}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900">{member.name}</div>
                                                <div className="text-xs text-slate-500">{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="outline" size="sm" className="bg-white border-slate-200 text-slate-600 font-normal">
                                            {member.role === "Admin" && <Shield size={12} className="mr-1 text-[#064E3B]" />}
                                            {member.role}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {member.department}
                                    </td>
                                    <td className="px-6 py-4">
                                        {member.status === "Active" && (
                                            <Badge variant="success" size="sm" className="bg-green-50 text-green-600 border-none">Active</Badge>
                                        )}
                                        {member.status === "Offline" && (
                                            <Badge variant="default" size="sm" className="bg-slate-100 text-slate-500 border-none">Offline</Badge>
                                        )}
                                        {member.status === "Invited" && (
                                            <Badge variant="warning" size="sm" className="bg-orange-50 text-orange-600 border-none">Invited</Badge>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-xs">
                                        {member.lastActive}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-[#064E3B]">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredMembers.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        No team members found matching your search.
                    </div>
                )}
            </Card>

            <Modal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                title="Invite Team Member"
            >
                <div className="space-y-4">
                    <Input
                        label="Full Name"
                        placeholder="e.g. John Doe"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="e.g. john@example.com"
                        value={newMember.email}
                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Role</label>
                            <select
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                                value={newMember.role}
                                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                            >
                                <option value="Viewer">Viewer</option>
                                <option value="Editor">Editor</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Department</label>
                            <select
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                                value={newMember.department}
                                onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                            >
                                <option value="Engineering">Engineering</option>
                                <option value="Quality Assurance">Quality Assurance</option>
                                <option value="Regulatory Affairs">Regulatory Affairs</option>
                                <option value="Product Management">Product Management</option>
                                <option value="Clinical Operations">Clinical Operations</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white"
                            onClick={handleInvite}
                            disabled={!newMember.name || !newMember.email}
                        >
                            <Mail size={16} className="mr-2" /> Send Invitation
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
