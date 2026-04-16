"use client";

import * as React from "react";
import {
    ChevronDown,
    Plus,
    Box,
    Check,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { CreateProjectDialog } from "./create-project-dialog";
import { useOrganization } from "@/contexts/organization-context";

export function ProjectSwitcher() {
    const { isMobile } = useSidebar();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);

    const { organizations, activeOrganization: activeOrg, isLoadingList: isPending, setActiveOrganization } = useOrganization()

    const handleCreateProject = () => {
        setIsCreateDialogOpen(true);
    };

    if (isPending) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" className="w-full animate-pulse bg-muted/20 rounded-2xl" disabled>
                        <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-muted/40" />
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <div className="h-4 w-24 bg-muted/40 rounded" />
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="w-full h-14 flex items-center justify-between hover:bg-muted/50 border border-transparent hover:border-border/50 rounded-2xl transition-all duration-300 px-3 group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                                    <Box className="size-5" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-bold text-foreground">
                                        {activeOrg?.name || "Select Project"}
                                    </span>
                                    <span className="truncate text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                        Environment
                                    </span>
                                </div>
                            </div>
                            <ChevronDown className="ml-auto size-4 text-muted-foreground/40 group-hover:text-muted-foreground" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-2xl p-2 bg-background/80 backdrop-blur-xl border-border/50 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={12}
                    >
                        <DropdownMenuLabel className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 border-b border-border/50 mb-2">
                            Organizations
                        </DropdownMenuLabel>
                        {(organizations ?? []).map((org) => (
                            <DropdownMenuItem
                                key={org.id}
                                onClick={() => setActiveOrganization(org.id)}
                                className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl hover:bg-muted transition-all duration-150"
                            >
                                <div className={`flex size-8 items-center justify-center rounded-lg border ${activeOrg?.id === org.id ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-muted/50 border-border/50 text-muted-foreground'}`}>
                                    <Box className="size-4 shrink-0" />
                                </div>
                                <span className={`text-sm tracking-tight ${activeOrg?.id === org.id ? 'font-bold' : 'font-medium'}`}>
                                    {org.name}
                                </span>
                                {activeOrg?.id === org.id && (
                                    <Check className="ml-auto size-4 text-primary" />
                                )}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator className="my-2 bg-border/50" />
                        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl hover:bg-primary/5 hover:text-primary transition-all duration-150 group" onClick={handleCreateProject}>
                            <div className="flex size-8 items-center justify-center rounded-lg border border-dashed border-border group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors">
                                <Plus className="size-4" />
                            </div>
                            <div className="text-sm font-bold">New Organization</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
            <CreateProjectDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
            />
        </SidebarMenu>
    );
}
