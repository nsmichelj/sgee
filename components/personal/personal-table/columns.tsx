"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { personalFormSchema } from "@/lib/validations/personal";
import { ColumnDef } from "@tanstack/react-table";
import { PersonalActions } from "./personal-actions";
import { Badge } from "@/components/ui/badge";

const roleLabels: Record<string, string> = {
  preschool_teacher: "Docente Inicial",
  primary_school_teacher: "Docente Primaria",
  specialist_teacher: "Docente Especialidad",
  physical_education_teacher: "Docente Ed. Física",
  integrated_classroom_teacher: "Docente Aula Integrada",
  learning_resource_librarian: "Docente Biblioteca",
  culture_teacher: "Docente Cultura",
  school_garden_teacher: "Docente Siembra",
  teacher_coordinator: "Coordinador",
  it_teacher: "Docente Informática",
};


const educationalLevelLabels: Record<string, string> = {
  associate_degree: "TSU",
  bachelor_degree: "Licenciatura",
  master_degree: "Maestría",
  doctorate_degree: "Doctorado",
  postgraduate_diploma: "Postgrado",
  other: "Otro",
};

export const personalColumns: ColumnDef<personalFormSchema>[] = [
  {
    accessorKey: "photoUrl",
    header: "",
    cell: ({ row }) => {
      const p = row.original;
      const initials = `${p.firstName?.[0] || ""}${p.lastName?.[0] || ""}`;
      return (
        <Avatar className="h-10 w-10">
          <AvatarImage src={p.photoUrl || undefined} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    header: "Nombre",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: "fullName",
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {p.firstName} {p.lastName}
          </span>
          <span className="text-xs text-muted-foreground">{p.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "cedula",
    header: "Cédula",
  },
  {
    accessorKey: "role",
    header: "Cargo / Rol",
    cell: ({ row }) => roleLabels[row.original.role as string] || row.original.role,
  },
  {
    accessorKey: "educationalLevel",
    header: "Nivel",
    cell: ({ row }) =>
      educationalLevelLabels[row.original.educationalLevel as string] ||
      row.original.educationalLevel,
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    id: "actions",
    cell: ({ row }) => <PersonalActions personal={row.original} />,
  },
];
