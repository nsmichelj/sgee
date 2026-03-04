"use client";

import { Badge } from "@/components/ui/badge";
import { userFormSchema } from "@/lib/validations/users";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteUser } from "./action-row/delete-user";

export type User = {
  id: string;
  name: string;
  username?: string;
  email: string;
  role?: userFormSchema["rol"];
};

const userRoles: Record<userFormSchema["rol"], string> = {
  admin: "Administrador",
  user: "Coordinador",
} as const;

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "username",
    header: "Usuario",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div>
          <Badge>{userRoles[user.role ?? "user"]}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex justify-center">
          <DeleteUser userId={user.id} />
        </div>
      );
    },
  },
];
