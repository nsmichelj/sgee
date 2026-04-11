import { Container } from "@/components/container";
import { AppSidebar } from "@/components/dashboard/sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { QueryProvider } from "@/providers/query-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unidad Educativa Pedro Luis Cedeño",
  description:
    "Sistema de Gestión Extracurricular Escolar de la Unidad Educativa Pedro Luis Cedeño.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 bg-background sticky top-0 border-b border-border z-50">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4">
          <QueryProvider>
            <Container className="py-12">{children}</Container>
          </QueryProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
