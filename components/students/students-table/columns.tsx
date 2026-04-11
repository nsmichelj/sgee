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
    accessorKey: "address",
    header: "Dirección",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate" title={row.original.address}>
        {row.original.address}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <StudentActions student={row.original} />,
  },
];
