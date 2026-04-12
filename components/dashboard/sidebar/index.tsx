"use client";

import { CalendarDays, Newspaper, School, User } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/dashboard/sidebar/nav-main";
import { NavUser } from "@/components/dashboard/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    title: "Institución",
    url: "#",
    icon: School,
    items: [
      {
        title: "Autoridades",
        url: "/dashboard/authorities",
      },
      {
        title: "Personal",
        url: "/dashboard/personal",
      },
      {
        title: "Estudiantes",
        url: "/dashboard/students",
      },
      {
        title: "Periodos Escolares",
        url: "/dashboard/school-periods",
      },
      {
        title: "Galeria",
        url: "/dashboard/gallery",
      },
    ],
  },
  {
    title: "Noticias",
    url: "/dashboard/school_news",
    icon: Newspaper,
    items: [],
  },
  {
    title: "Calendario",
    url: "/dashboard/calendar-events",
    icon: CalendarDays,
    items: [],
  },
  {
    title: "Usuarios",
    url: "/dashboard/users",
    icon: User,
    items: [],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <Link href="/" className="my-6">
            <Image
              src="/institutional_logo.png"
              width={100}
              height={109}
              alt="Logo Insitucional Unidad Educativa Pedro Luis Cedeño"
              className="max-w-30 h-auto mx-auto"
            />
            <div className="grid flex-1 text-lg leading-tight text-center">
              <span className="truncate font-medium">SGEE</span>
              <span className="truncate text-md">Pedro Luis Cedeño</span>
            </div>
          </Link>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
