"use client";

import { getSchoolNews } from "@/actions/school_news";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Suspense } from "react";
import { schoolNewColumns } from "./columns";
import { SchoolNewsDataTable } from "./data-table";

export function ListSchoolNews() {
  const {
    data: schoolNews,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["school_news"],
    queryFn: getSchoolNews,
  });

  if (isError) {
    return (
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Algo no salió como esperábamos</AlertTitle>
          <AlertDescription>
            No logramos cargar las noticias escolares...
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button onClick={() => refetch()}>
            Intentar de nuevo <RefreshCcw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Suspense>
      <SchoolNewsDataTable
        loading={isPending}
        data={
          schoolNews?.data?.map((news) => ({
            ...news,
            createdBy: news.createdBy?.name ?? "Desconocido",
          })) ?? []
        }
        columns={schoolNewColumns}
      />
    </Suspense>
  );
}
