"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { personalFormSchema } from "@/lib/validations/personal";
import { ColumnDef } from "@tanstack/react-table";
import { PersonalActions } from "./personal-actions";

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
