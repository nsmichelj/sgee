"use client";

import { getStudents } from "@/actions/students";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Suspense } from "react";
import { studentColumns } from "./columns";
import { StudentsDataTable } from "./data-table";

export function ListStudents() {
  const {
    data: students,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const resp = await getStudents();
      if (!resp.success) throw new Error(resp.error);
      return resp.data;
    },
  });

  if (isError) {
    return (
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error al cargar datos</AlertTitle>
          <AlertDescription>
            No logramos obtener la lista de estudiantes. Por favor, intente de nuevo.
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
      <StudentsDataTable
        loading={isPending}
        data={students ?? []}
        columns={studentColumns}
      />
    </Suspense>
  );
}
