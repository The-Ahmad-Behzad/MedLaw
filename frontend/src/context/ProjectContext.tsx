"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ChecklistItem {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "complete";
    priority: "low" | "medium" | "high";
    dueDate: string;
    assignee: string;
    section: string; // e.g., "Design & Development"
}

export interface Document {
    id: string;
    name: string;
    type: "PDF" | "Word" | "Excel" | "Other";
    size: string;
    status: "Draft" | "In Review" | "Approved" | "Rejected";
    version: string;
    lastModified: string;
    modifiedBy: string;
    folder: string;
    starred: boolean;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    status: "development" | "compliance" | "market";
    complianceScore: number;
    lastUpdated: Date;
    markets: string[];
    classification: string;
    regulations: string[];
    checklistItems: ChecklistItem[];
    documents: Document[];
}

export interface Project {
    id: string;
    name: string;
    description: string;
    type: string; // "hardware", "software", "hybrid"
    markets: string[];
    classification: string;
    standards: string[];
    createdAt: Date;
    products: Product[];
}

interface ProjectContextType {
    projects: Project[];
    currentProject: Project | null;
    addProject: (project: Omit<Project, "id" | "createdAt" | "products">) => void;
    switchProject: (projectId: string | null) => void;
    deleteProject: (projectId: string) => void;
    addProduct: (projectId: string, product: Omit<Product, "id" | "lastUpdated" | "checklistItems" | "documents">) => void;
    addChecklistItem: (projectId: string, productId: string, item: Omit<ChecklistItem, "id">) => void;
    addDocument: (projectId: string, productId: string, doc: Omit<Document, "id" | "lastModified">) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const savedProjects = localStorage.getItem("projects");
        const savedCurrentId = localStorage.getItem("currentProjectId");

        if (savedProjects) {
            const parsedProjects = JSON.parse(savedProjects).map((p: any) => ({
                ...p,
                createdAt: new Date(p.createdAt),
                products: p.products ? p.products.map((prod: any) => ({
                    ...prod,
                    lastUpdated: new Date(prod.lastUpdated)
                })) : []
            }));
            setProjects(parsedProjects);

            if (savedCurrentId) {
                const found = parsedProjects.find((p: Project) => p.id === savedCurrentId);
                if (found) setCurrentProject(found);
            }
        } else {
            // Default demo project
            const demoProject: Project = {
                id: "demo-1",
                name: "Apollo X-Ray System",
                description: "Next-gen digital radiography system",
                type: "hardware",
                markets: ["usa", "eu"],
                classification: "class2",
                standards: ["iso13485", "iso14971", "iec60601"],
                createdAt: new Date(),
                products: [
                    {
                        id: "prod-1",
                        name: "Main Console Unit",
                        description: "Control interface and processing unit",
                        status: "compliance",
                        complianceScore: 85,
                        lastUpdated: new Date(),
                        markets: ["usa", "eu"],
                        classification: "class2",
                        regulations: ["iso13485", "iec60601"],
                        checklistItems: [
                            {
                                id: "chk-1",
                                title: "Design Input Requirements",
                                description: "Document design inputs based on user needs.",
                                status: "complete",
                                priority: "high",
                                dueDate: "2025-11-20",
                                assignee: "Sarah Chen",
                                section: "Design & Development"
                            }
                        ],
                        documents: [
                            {
                                id: "doc-1",
                                name: "Design History File v2.3.pdf",
                                type: "PDF",
                                size: "4.2 MB",
                                status: "Approved",
                                version: "v2.3",
                                lastModified: "2 hours ago",
                                modifiedBy: "Sarah Chen",
                                folder: "Design History File",
                                starred: true
                            }
                        ]
                    },
                    {
                        id: "prod-2",
                        name: "X-Ray Emitter",
                        description: "High-voltage generator and tube",
                        status: "development",
                        complianceScore: 60,
                        lastUpdated: new Date(),
                        markets: ["usa"],
                        classification: "class2",
                        regulations: ["iso13485"],
                        checklistItems: [],
                        documents: []
                    },
                    {
                        id: "prod-3",
                        name: "Smart Vitals Monitor",
                        description: "AI-powered patient monitoring system",
                        status: "development",
                        complianceScore: 45,
                        lastUpdated: new Date(),
                        markets: ["usa", "eu", "canada"],
                        classification: "class2",
                        regulations: ["iso13485", "iec62304", "iso14971"],
                        checklistItems: [
                            {
                                id: "chk-svm-1",
                                title: "Software Development Plan",
                                description: "Define software lifecycle processes and deliverables.",
                                status: "complete",
                                priority: "high",
                                dueDate: "2025-10-15",
                                assignee: "Michael Rodriguez",
                                section: "Design & Development"
                            },
                            {
                                id: "chk-svm-2",
                                title: "Risk Management Plan",
                                description: "Outline risk management activities and responsibilities.",
                                status: "complete",
                                priority: "high",
                                dueDate: "2025-10-20",
                                assignee: "Sarah Chen",
                                section: "Risk Management"
                            },
                            {
                                id: "chk-svm-3",
                                title: "Software Requirements Specification",
                                description: "Document functional and non-functional requirements.",
                                status: "in-progress",
                                priority: "high",
                                dueDate: "2025-11-30",
                                assignee: "Michael Rodriguez",
                                section: "Design & Development"
                            },
                            {
                                id: "chk-svm-4",
                                title: "Architecture Design",
                                description: "High-level software architecture and interface design.",
                                status: "in-progress",
                                priority: "medium",
                                dueDate: "2025-12-15",
                                assignee: "David Kim",
                                section: "Design & Development"
                            },
                            {
                                id: "chk-svm-5",
                                title: "Hazard Analysis",
                                description: "Identify potential hazards and hazardous situations.",
                                status: "in-progress",
                                priority: "high",
                                dueDate: "2025-12-01",
                                assignee: "Sarah Chen",
                                section: "Risk Management"
                            },
                            {
                                id: "chk-svm-6",
                                title: "Document Control Procedure",
                                description: "Establish procedure for document approval and versioning.",
                                status: "pending",
                                priority: "medium",
                                dueDate: "2026-01-10",
                                assignee: "Emily Watson",
                                section: "Document Control"
                            },
                            {
                                id: "chk-svm-7",
                                title: "CAPA Procedure",
                                description: "Define process for corrective and preventive actions.",
                                status: "pending",
                                priority: "medium",
                                dueDate: "2026-01-20",
                                assignee: "Emily Watson",
                                section: "CAPA"
                            }
                        ],
                        documents: []
                    }
                ]
            };
            setProjects([demoProject]);
            // Don't auto-select project to show General Dashboard first if desired, 
            // but for now let's keep behavior or maybe default to null if user wants "General Dashboard"
            // The user said "remember to go back to my more general dashboard". 
            // So default could be null or the last selected. 
            // Let's default to null if no saved ID.
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (projects.length > 0) {
            localStorage.setItem("projects", JSON.stringify(projects));
        }
        if (currentProject) {
            localStorage.setItem("currentProjectId", currentProject.id);
        } else {
            localStorage.removeItem("currentProjectId");
        }
    }, [projects, currentProject]);

    const addProject = (projectData: Omit<Project, "id" | "createdAt" | "products">) => {
        const newProject: Project = {
            ...projectData,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            products: []
        };
        setProjects((prev) => [...prev, newProject]);
        setCurrentProject(newProject);
    };

    const switchProject = (projectId: string | null) => {
        if (!projectId) {
            setCurrentProject(null);
            return;
        }
        const project = projects.find((p) => p.id === projectId);
        if (project) {
            setCurrentProject(project);
        }
    };

    const deleteProject = (projectId: string) => {
        const newProjects = projects.filter((p) => p.id !== projectId);
        setProjects(newProjects);
        if (currentProject?.id === projectId) {
            setCurrentProject(null);
        }
    };

    const addProduct = (projectId: string, productData: Omit<Product, "id" | "lastUpdated" | "checklistItems" | "documents">) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                const newProduct: Product = {
                    ...productData,
                    id: crypto.randomUUID(),
                    lastUpdated: new Date(),
                    checklistItems: [], // Initialize empty checklist
                    documents: [] // Initialize empty documents
                };
                const updatedProject = { ...p, products: [...p.products, newProduct] };
                if (currentProject?.id === projectId) {
                    setCurrentProject(updatedProject);
                }
                return updatedProject;
            }
            return p;
        }));
    };

    const addChecklistItem = (projectId: string, productId: string, item: Omit<ChecklistItem, "id">) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                const updatedProducts = p.products.map(prod => {
                    if (prod.id === productId) {
                        return {
                            ...prod,
                            checklistItems: [...prod.checklistItems, { ...item, id: crypto.randomUUID() }]
                        };
                    }
                    return prod;
                });
                const updatedProject = { ...p, products: updatedProducts };
                if (currentProject?.id === projectId) {
                    setCurrentProject(updatedProject);
                }
                return updatedProject;
            }
            return p;
        }));
    };

    const addDocument = (projectId: string, productId: string, doc: Omit<Document, "id" | "lastModified">) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                const updatedProducts = p.products.map(prod => {
                    if (prod.id === productId) {
                        return {
                            ...prod,
                            documents: [...prod.documents, {
                                ...doc,
                                id: crypto.randomUUID(),
                                lastModified: "Just now"
                            }]
                        };
                    }
                    return prod;
                });
                const updatedProject = { ...p, products: updatedProducts };
                if (currentProject?.id === projectId) {
                    setCurrentProject(updatedProject);
                }
                return updatedProject;
            }
            return p;
        }));
    };

    return (
        <ProjectContext.Provider value={{ projects, currentProject, addProject, switchProject, deleteProject, addProduct, addChecklistItem, addDocument }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProject() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
}
