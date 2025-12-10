"use client";

import { useEffect, useState } from "react";
import { useProject } from "@/context/ProjectContext";
import { useRouter } from "next/navigation";

export default function XRayLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { projects, switchProject, currentProject } = useProject();
    const [isInitialized, setIsInitialized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Find the Apollo X-Ray System project (id: demo-1)
        const xrayProject = projects.find((p) => p.id === "demo-1");

        if (xrayProject) {
            if (currentProject?.id !== "demo-1") {
                switchProject("demo-1");
            }
            setIsInitialized(true);
        } else {
            // If for some reason the project doesn't exist (shouldn't happen with default data),
            // we might want to redirect or just show children. 
            // For now, let's just mark initialized so content shows.
            // In a real app, we might fetch it or show an error.
            setIsInitialized(true);
        }
    }, [projects, currentProject, switchProject]);

    if (!isInitialized) {
        return null; // Or a loading spinner
    }

    return <>{children}</>;
}
