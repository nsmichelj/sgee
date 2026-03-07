"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteSchoolNews } from "./action-row/delete-news";
import EditSchoolNews from "./action-row/edit-news";

export type SchoolNew = {
  id: string;
  title: string;
  createdAt: Date;
  createdBy: string;
};

export const schoolNewColumns: ColumnDef<SchoolNew>[] = [
  {
    accessorKey: "title",
    header: "Noticia",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ row }) => {
      const news = row.original;

      return news.createdAt.toLocaleDateString("es", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "createdBy",
    header: "Autor",
    cell: ({ row }) => {
      const news = row.original;

      return <Badge>{news.createdBy}</Badge>;
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      const news = row.original;

      return (
        <div className="flex justify-center gap-2">
          <EditSchoolNews schoolNewsId={news.id} />
          <DeleteSchoolNews schoolNewsId={news.id} />
        </div>
      );
    },
  },
];
