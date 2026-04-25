"use client";

import { studentFormSchema } from "@/lib/validations/students";
import { ColumnDef } from "@tanstack/react-table";
import { StudentActions } from "./student-actions";

export const studentColumns: ColumnDef<studentFormSchema>[] = [
  {
    header: "Nombre Complete",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: "fullName",
    cell: ({ row }) => {
      const s = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {s.firstName} {s.lastName}
          </span>
          <span className="text-xs text-muted-foreground">{s.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "cedulaStudent",
    header: "Cédula Escolar",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "birthDate",
    header: "Fecha de Nacimiento",
    cell: ({ row }) => {
      const date = row.original.birthDate;
      if (!date) return "-";
      return new Date(date).toLocaleDateString("es-VE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "address",
    header: "Dirección",
    cell: ({ row }) => (
      <div className="max-w-50 truncate" title={row.original.address}>
        {row.original.address}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <StudentActions student={row.original} />,
  },
];
